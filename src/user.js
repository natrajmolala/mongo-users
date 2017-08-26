const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longet than 2 chars'
		},
		required: [true, 'Name is required.']
	},
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

UserSchema.virtual('postCount').get(function (){
		//access instance variables
		return this.posts.length;
});

UserSchema.pre('remove', function(next){
	//retrieving model from mongoose would not need us to
	//add the 'require' dependency for BlogPost
	const BlogPost = mongoose.model('blogPost');
	//access instance variables
	BlogPost.remove({ _id: { $in: this.blogPosts } })
		.then(() => next());

});

const User = mongoose.model('user', UserSchema);
module.exports = User;
