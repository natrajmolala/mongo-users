const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchem = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }

});

const Comment = mongoose.model('comment', CommentSchem);

module.exports = Comment;
