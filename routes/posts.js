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

router.get(
    '/posts/user_posts',
    auth,
    async(req,res) => {
        try {
            let posts = await Post.find();
            let userPosts = posts.filter(post => post.user.toString() === req.user.id);
            res.json(userPosts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error" });
        }
    }
);

router.get(
    '/posts/user_posts/posts/:user_id',
    async(req,res) => {
        try {
            let posts = await Post.find({ user: req.params.user_id });
            res.json(posts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Errror..." });
        }
    }
)

router.post(
    '/',
    [
        check('text','Text is required').not().isEmpty()
    ],
    auth,
    async(req,res) => {
        const { text } = req.body;
        const errors = validationResult(req);
        let user = await User.findById(req.user.id).select('-password');

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let post = new Post({
                text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });
            const registeredPost = await post.save();
            res.json(registeredPost);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.post(
    '/search_post',
    [
        check('searchValue', "Input must be fulfilled")
    ],
    async(req,res) => {
        try {
            let { searchValue } = req.body;
            let posts = await Post.find();
            if(searchValue === "" || searchValue === null){
                let searchTextPosts = posts;
                res.json(searchTextPosts);
            } else {
                let searchValueToLowerLetter = searchValue.toLowerCase().split(' ').join('');
                let searchTextPosts = posts
                .filter(post => post.text.toLowerCase().split(' ').join('').includes(searchValueToLowerLetter))
                res.json(searchTextPosts);
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.put(
    '/likes/:post_id',
    auth,
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            if(!post){
                return res.status(401).json({ msg: "There is not post that, you want like" });
            }
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({ msg: "Post Already Liked" });
            }
            post.likes.unshift({ user: req.user.id });
            await post.save();
            res.json(post.likes);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.put(
    '/likes/:post_id/:comment_id',
    auth,
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            if(!post){
                return res.status(401).json({ msg: "There is not post that, you want like" });
            }

            const searchComments = post.comments
            .find(comment => comment._id.toString() === req.params.comment_id);

            if(searchComments.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({ msg: "Post Already Liked" });
            }

            searchComments.likes.unshift({ user: req.user.id });
            await post.save();

            res.json(searchComments);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.put(
    '/comments/:post_id',
    [
        check('text',"Text is required").not().isEmpty()
    ],
    auth,
    async(req,res) => {
        const { text } = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let post = await Post.findById(req.params.post_id);
            let user = await User.findById(req.user.id);
            let comment = {
                text,
                name: user.name,
                avatar: user.avatar
            };
            post.comments.unshift(comment);
            await post.save();
            res.json(post.comments);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

router.delete(
    '/:post_id',
    auth,
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            if(post.user.toString() !== req.user.id){
                return res.status(500).json({ msg: "You are not allowed to do that" });
            }
            await post.remove();
            res.json({ msg: "Post removed" });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.delete(
    '/likes/:post_id/:like_id',
    auth,
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            const likeAllow = post.likes.find(like => like.user.toString() === req.user.id);
            if(!likeAllow){
                return res.status(404).json({ msg: "There is no like" });
            }
            if(likeAllow.user.toString() !== req.user.id){
                return res.status(401).json({ msg: "User is not authorized to do that" });
            }
            const removeLikeIndex = post.likes
            .find(like => like._id !== req.params.like_id);
            post.likes.splice(removeLikeIndex,1);
            await post.save();
            res.json(post.likes);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.delete(
    '/likes/remove_comment_like/:post_id/:comment_id/:like_id',
    auth,
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            let searchLike = post.comments
            .find(comment => comment._id.toString() === req.params.comment_id);
            let removeIndex = searchLike.likes.find(like => like._id.toString() === req.params.like_id);
            if(removeIndex){
                searchLike.likes.splice(removeIndex,1);
                await post.save();
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