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
        
    }
)