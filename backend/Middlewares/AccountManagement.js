// const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

/* 
    The deleteAccount is a function that returns a middleware function. 
    The middleware function checks if the user exists in the database. 
    If the user exists, the function will delete the user from the database. 
    If the user does not exist, the function will return a 403 status code with a message.
*/
const deleteAccount = () => {
    return async (req, res, next) => {
    try {
        // Get jwt payload
        const email  = req.body.email;
        if (!email) {
            return res.status(404).json({ message: 'User not found' });
        }   
        // Query user
        const user = await UserModel.deleteOne({ email: email });

        if (user.deletedCount != 1) {
            return res.status(403).json({ message: 'User do not exist' });
        }
        next();
    } catch (err) {
        return res.status(504).json({ message: 'Check deleteAccount in Auth' });
    }
    }
}

module.exports = deleteAccount;