const express = require('express');
const router = express.Router();
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
            
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

module.exports = router;