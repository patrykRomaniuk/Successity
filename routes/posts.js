const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../modules/User');
const Post = require('../modules/Post');
const { validationResult,check } = require('express-validator');

//Getting all posts
router.get(
    '/posts',
    async(req,res) => {
        try {
            //Getting all posts
            let posts = await Post.find();
            //Displaying data
            res.json(posts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error" });
        }
    }
);

//Sort posts by likes
router.get(
    '/posts/most_liked',
    async(req,res) => {
        try {
            //Get all posts and sort them
            let posts = await Post.find().sort({ likes: -1 });
            //Displaying data
            res.json(posts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

//Get posts by date
router.get(
    '/latest',
    async(req,res) => {
        try {
            //Get all posts and 
            let posts = await Post.find().sort({ date: -1 });
            //Displaying data
            res.json(posts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Get post by ID
router.get(
    '/post/:post_id',
    async(req,res) => {
        try {
            //Sorting posts by id and number of likes
            let post = await Post.findById(req.params.post_id).sort({ likes: -1 });
            //Displaying data
            res.json(post);  
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Getting posts by number of comments
router.get(
    '/posts/most_commented',
    async(req,res) => {
        try {
            //Getting pots and sorting them by number of comments
            let posts = await Post.find().sort({ comments: -1 });
            //Displaying data
            res.json(posts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Getting user posts
router.get(
    '/posts/user_posts',
    auth,
    async(req,res) => {
        try {
            //Getting all posts
            let posts = await Post.find();
            //Searching for specific user posts by ID
            let userPosts = posts.filter(post => post.user.toString() === req.user.id);
            //Displaying data
            res.json(userPosts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error" });
        }
    }
);

//Getting user posts by user's id
router.get(
    '/posts/user_posts/posts/:user_id',
    async(req,res) => {
        try {
            //Getting user posts 
            let posts = await Post.find({ user: req.params.user_id });
            //Displaying data
            res.json(posts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Errror..." });
        }
    }
)

//Adding post
router.post(
    '/',
    [
        check('text','Text is required').not().isEmpty()
    ],
    auth,
    async(req,res) => {
        //Fetching data from user
        const { text } = req.body;
        //Validation result errors
        const errors = validationResult(req);
        //Getting user by id without password
        let user = await User.findById(req.user.id).select('-password');

        //Checking if there are errors
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //Creating new post with fetched data
            let post = new Post({
                text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });
            //Saving post to database
            const registeredPost = await post.save();
            //Displaying data
            res.json(registeredPost);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Searching posts
router.post(
    '/search_post',
    [
        check('searchValue', "Input must be fulfilled")
    ],
    async(req,res) => {
        try {
            //Getting data from user
            let { searchValue } = req.body;
            //Fetching all posts
            let posts = await Post.find();
            //Checking if input is empty
            if(searchValue === "" || searchValue === null){
                let searchTextPosts = posts;
                res.json(searchTextPosts);
            } else {
                //Changed text for easier search function
                let searchValueToLowerLetter = searchValue.toLowerCase().split(' ').join('');
                //Searching the posts with previous text changes
                let searchTextPosts = posts
                .filter(post => post.text.toLowerCase().split(' ').join('').includes(searchValueToLowerLetter));
                //Displaying data
                res.json(searchTextPosts);
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Adding like
router.put(
    '/likes/:post_id',
    auth,
    async(req,res) => {
        try {
            //Getting post by id
            let post = await Post.findById(req.params.post_id);
            //Checking if there is post
            if(!post){
                return res.status(401).json({ msg: "There is not post that, you want like" });
            }
            //Checking if post is already liked
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({ msg: "Post Already Liked" });
            }
            // If it is not liked, add the user id ( like post )
            post.likes.unshift({ user: req.user.id });
            //Save to database
            await post.save();
            //Displaying data
            res.json(post.likes);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Like comment
router.put(
    '/likes/:post_id/:comment_id',
    auth,
    async(req,res) => {
        try {
            //Getting post by id
            let post = await Post.findById(req.params.post_id);
            //Checking if there is post
            if(!post){
                return res.status(401).json({ msg: "There is not post that, you want like" });
            }

            //Searching for comment
            const searchComments = post.comments
            .find(comment => comment._id.toString() === req.params.comment_id);

            //Checking if post is already liked
            if(searchComments.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({ msg: "Post Already Liked" });
            }

            //If not, adding like
            searchComments.likes.unshift({ user: req.user.id });
            //Save to database
            await post.save();
            //Displaying data
            res.json(searchComments);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Adding comment
router.put(
    '/comments/:post_id',
    [
        check('text',"Text is required").not().isEmpty()
    ],
    auth,
    async(req,res) => {
        //Getting data from user
        const { text } = req.body;
        //Getting errors from validationResult
        const errors = validationResult(req);
        //Checking if there are errors
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //Fetching post
            let post = await Post.findById(req.params.post_id);
            //Fetching user
            let user = await User.findById(req.user.id);
            //Making comment
            let comment = {
                text,
                name: user.name,
                avatar: user.avatar
            };
            //Adding comment to comments
            post.comments.unshift(comment);
            //Saving to database
            await post.save();
            //Displaying data
            res.json(post.comments);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

//Removing post
router.delete(
    '/:post_id',
    auth,
    async(req,res) => {
        try {
            //Getting post
            let post = await Post.findById(req.params.post_id);
            //Checking if user is allowed to delete post
            if(post.user.toString() !== req.user.id){
                return res.status(500).json({ msg: "You are not allowed to do that" });
            }
            //Removing post from database
            await post.remove();
            //Message 
            res.json({ msg: "Post removed" });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Removing like
router.delete(
    '/likes/:post_id/:like_id',
    auth,
    async(req,res) => {
        try {
            //Getting post
            let post = await Post.findById(req.params.post_id);
            //Getting like
            const likeAllow = post.likes.find(like => like.user.toString() === req.user.id);
            //Checking if post is liked
            if(!likeAllow){
                return res.status(404).json({ msg: "There is no like" });
            }
            //Checking if is allowed to like post
            if(likeAllow.user.toString() !== req.user.id){
                return res.status(401).json({ msg: "User is not authorized to do that" });
            }
            //Getting index of post to remove
            const removeLikeIndex = post.likes
            .find(like => like._id !== req.params.like_id);
            //Removing post by index
            post.likes.splice(removeLikeIndex,1);
            //Saving to database
            await post.save();
            //Displaying data
            res.json(post.likes);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

//Remove like from comment
router.delete(
    '/likes/remove_comment_like/:post_id/:comment_id/:like_id',
    auth,
    async(req,res) => {
        try {
            //Getting post
            let post = await Post.findById(req.params.post_id);
            //Taking like from comment
            let searchLike = post.comments
            .find(comment => comment._id.toString() === req.params.comment_id);
            //Getting index of this like
            let removeIndex = searchLike.likes.find(like => like._id.toString() === req.params.like_id);
            //Checking if there is like 
            if(removeIndex){
                //Removing like by index
                searchLike.likes.splice(removeIndex,1);
                //Saving to database
                await post.save();
                //Displaying data
                res.json(post);
            } else {
                res.json({ msg: "There is no like of this comment" });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." })
        }
    }
)

router.delete(
    '/comments/:post_id/:comment_id',
    auth,
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            const removeCommentIndex = post.comments
            .find(comment => comment._id === req.params.comment_id);
            post.comments.splice(removeCommentIndex,1);
            await post.save();
            res.json(post.comments);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

module.exports = router;