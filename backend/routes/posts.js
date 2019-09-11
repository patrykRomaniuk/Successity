const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../modules/User');
const Post = require('../modules/Post');
const { validationResult,check } = require('express-validator');

router.get(
    '/posts',
    async(req,res) => {
        try {
            let posts = await Post.find();
            res.json(posts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error" });
        }
    }
);

router.get(
    '/latest',
    async(req,res) => {
        try {
            let posts = await Post.find();

            console.log(posts)

            let changedPosts = posts.filter(post => post.date)

            let searchForDates = posts
            .filter(post => post.date)
            .sort((a,b) => a.valueOf() - b.valueOf());

            console.log(changedPosts)
            
            res.json(changedPosts);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.get(
    '/post/:post_id',
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            res.json(post);  
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
            let searchTextPosts = posts.filter(post => post.text.includes(searchValue))
            res.json(searchTextPosts);
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
            if(post.likes.filter(like => like.user.toString()).length > 0){
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