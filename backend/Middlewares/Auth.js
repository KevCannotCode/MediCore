const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

/*
    The ensureAuthenticated function is used to check if the user is authenticated or not. 
    If the user is not authenticated, the function will return a 403 status code with a message. 
    If the user is authenticated, the function will call the next middleware function.
*/
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}
/*
    The verifyRole function is a higher-order function that takes a role as an argument and returns a middleware function. 
    The middleware function checks if the user has the specified role. 
    If the user has the specified role, the function will call the next middleware function. 
    If the user does not have the specified role, the function will return a 403 status code with a message.
*/
const verifyRole = (allowedRole) => {
    return async (req, res, next) => {
        try {
            // Get jwt payload
            let auth = req.headers['authorization'];
            if (auth.startsWith('Bearer ')) {
                auth = auth.slice(7, auth.length).trimLeft();
            }
            const decoded = jwt.verify(auth, process.env.JWT_SECRET);
            const userId = decoded._id;

            // Query user
            const user = await UserModel.findOne({ _id: userId });
            if (!user || user.role.toString() !== allowedRole) {
                return res.status(403).json({ message: 'Forbidden, insufficient permissions' });
            }

            next();
        } catch (err) {
            return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
        }
    }
}

module.exports = {
    ensureAuthenticated,
    verifyRole
}
// module.exports = ensureAuthenticated;