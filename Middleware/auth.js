const jwt = require("jsonwebtoken");
const User = require("../models/user")



const requireAuth = async (req, res, next) =>{


    try {
        const token = req.header.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, 'secrate-key');

        const user = await User.findById(decodedToken.userId);


        req.user = user;
        
    } catch (error) {
        console.error('Authentication error:', error);
    res.status(401).json({ success: false, error: 'Unauthorized' });
    }
}


module.exports = {requireAuth}; 