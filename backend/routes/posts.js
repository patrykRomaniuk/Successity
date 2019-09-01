const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post(
    '/',
    auth,
    async(req,res) => {
        try {
            
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
)

module.exports = router;