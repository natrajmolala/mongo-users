const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('required a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    assert(validationResult.errors.name.message === 'Name is required.')
  });

  it('requires a name longer than 2 chars', () => {
    const user = new User({name: 'Al'});
    const validationResult = user.validateSync();
    assert(validationResult.errors.name.message === 'Name must be longet than 2 chars')
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({name: 'Al'});
    user.save()
      .catch((validationResult) => {
        assert(validationResult.errors.name.message === 'Name must be longet than 2 chars')
        done();
      });
  });
});
