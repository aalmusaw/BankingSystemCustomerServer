const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(400).json({
            message: 'No bearer token'
        });
        return;
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
        if (err) {
            res.status(403).json({
                message: 'Authentication failed.'
            });
        }
        else {
            req.user = decoded;
            next();
        }
    });
};

module.exports = authenticate;