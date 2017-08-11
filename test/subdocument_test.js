const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

    it('can create a Subdocument', (done) => {
      const joe = new User({
        name: 'Joe',
        posts: [{ title: 'PostTitle1'}]
      });

      joe.save()
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
          assert(user.posts[0].title === 'PostTitle1');
          done();
        });
    });

    it('can add subdocuments to an existing record', (done) => {
        const joe = new User({ name: 'Joe', posts: [] });
        joe.save()
          .then(() => User.findOne({ name: 'Joe'}))
          .then((user) => {
            user.posts.push({ title: 'New Post'});
            return user.save();
          })
          .then(() => User.findOne({ name: 'Joe'}))
          .then((user) => {
            assert(user.posts[0].title === 'New Post');
            done();
          });
    });

    it('can remove subdocuments from existing record', (done) => {
      const joe = new User({
        name: 'Joe',
        posts: [{title: 'New Title'}]
      });
      

      joe.save()
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
          user.posts[0].remove();
          return user.save();
        })
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
          assert(user.posts.length === 0);
          done();
        });
    });
});
