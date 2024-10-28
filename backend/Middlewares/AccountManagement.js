// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
            const email = req.body.email;
            if (!email) {
                return res.status(404).json({ message: 'User not found' });
            }   
            // Query user
            const user = await UserModel.deleteOne({ email: email });

            if (user.deletedCount != 1) {
                return res.status(403).json({ message: 'User does not exist' });
            }
            next();
        } catch (err) {
            return res.status(504).json({ message: 'Check deleteAccount in Auth' });
        }
    }
}

const createAccount = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist!', success: false });
        }
        const userModel = new UserModel({ name, email, password, role });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Account created successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    deleteAccount,
    createAccount
};