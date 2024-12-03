const jwt = require('jsonwebtoken');

function verifyToken(req) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) { throw new Error() }
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = verifyToken;
