const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../modules/User');
const { check,validationResult } = require('express-validator');

router.get(
    '/',
    auth,
    async(req,res) => {
        try {
            let user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.get(
    '/user/:user_email',
    async(req,res) => {
        try {
            let email = req.params.user_email;
            let user = await User.findOne({ email });
            res.json(user);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.get(
    '/user/id/:user_id',
    async(req,res) => {
        try {
            let id = req.params.user_id;
            let user = await User.findById(id);
            res.json(user);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.get(
    '/users',
    async(req,res) => {
        try {
            let users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

router.post(
    '/',
    [
        check('name','Name is required').not().isEmpty(),
        check('last_name','Last Name is required').not().isEmpty(),
        check('username',"Username is required").not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password',"Password is required").isLength({ min: 6 })
    ],
    async(req,res) => {
        const { name,last_name,username,email,password } = req.body;
        let validateUserByEmail = await User.findOne({ email });
        let validateUserByUserName = await User.findOne({ username });
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        if(validateUserByEmail){
            return res.status(401).json({ msg: "There is already user with this Email" });
        }
        if(validateUserByUserName){
            return res.status(401).json({ msg: "There is already user with this Username" });
        }
        try {
            const avatar = gravatar.url(email,{
                r: 'pg',
                d: 'mm',
                s: '200'
            });
            user = new User({
                name,
                email,
                username,
                last_name,
                password,
                avatar
            });
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password,salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err,token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.post(
    '/login',
    [
        check('email','Email is required').not().isEmpty(),
        check('password','Password is required').not().isEmpty()
    ],
    async(req,res) => {
        const { email,password } = req.body;
        let user = await User.findOne({ email });
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }
        if(!user) {
            return res.status(404).json({ msg: "User Not found" });
        }
        try {
            const isMatch = await bcryptjs.compare(password,user.password);
            if(!isMatch){
                return res.status(404).json({ msg: "Password does not match" });
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err,token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.put(
    '/',
    [
        check('searchValue','Search value is required').not().isEmpty()
    ],
    async(req,res) => {
        try {
            const { searchValue } = req.body;
            let users = await await User.find();
            if(searchValue !== '' && searchValue !== null){
                const searchUsers = users.filter(user => 
                    user.name.toLowerCase().split(' ').join('').includes(searchValue.toLowerCase()));
                res.json(searchUsers);
            } else {
                res.json(users);
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

module.exports = router;