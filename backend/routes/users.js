const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const User = require('../modules/User');
const { check,validationResult } = require('express-validator');

router.post(
    '/',
    [
        check('name','Name is required').not().isEmpty(),
        check('last_name','Last Name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password',"Password is required").not().isEmpty(),
        check('username',"Username is required").not().isEmpty()
    ],
    async(req,res) => {
        const { name,last_name,email,password,username } = req.body;
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
)

module.exports = router;