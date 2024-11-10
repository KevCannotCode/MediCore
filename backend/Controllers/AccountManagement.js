// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");

/* 
    The deleteAccount is a function that returns a middleware function. 
    The middleware function checks if the user exists in the database. 
    If the user exists, the function will delete the user from the database. 
    If the user does not exist, the function will return a 403 status code with a message.
*/
const deleteAccount = async (req, res, next) => {
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

/*
    The createAccount is a function that returns a middleware function.
    The middleware function checks if the user exists in the database.
    If the user exists, the function will return a 409 status code with a message.
    If the user does not exist, the function will create a new user in the database.
*/
const createAccount = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User is already exist!', success: false });
        }
        const userModel = new UserModel({ name, email, password, role });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server errror", success: false });
    }
}

/*
    AssignRole is a function that returns a middleware function.
    The middleware function checks if the user exists in the database.
    If the user exists, the function will update the user's role in the database.
    If the user does not exist, the function will return a 404 status code with a message.
*/
const assignRole = async (req, res, next) => {
    try {
        // Get verify email
        const { email, newRole } = req.body;
        if (!email) {
            return res.status(404).json({ message: 'User not found' });
        }   

        const updatedUser = await UserModel.findOneAndUpdate(
            { email: email },
            { role: newRole },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        next();
    } catch (err) {
        return res.status(504).json({ message: 'Check assignRole in AccountManagement' });
    }
}

/*
    The module.exports object is used to make the functions available to other files.
*/
module.exports = {
    deleteAccount,
    createAccount,
    assignRole
};
