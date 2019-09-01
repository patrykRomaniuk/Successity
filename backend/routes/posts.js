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
)

router.get(
    '/:post_id',
    async(req,res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            res.json(post);  
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
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
            res.json(post);
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
            res.json(post);
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
)

module.exports = router;