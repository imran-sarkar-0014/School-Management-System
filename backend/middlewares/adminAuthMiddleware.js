const jwt = require('jsonwebtoken')
const admin = require('../models/admin')

const adminAuthMiddleware = async (req, res, next) => {
    try {

        if (!req.headers.authorization)
            throw 'forbidden'
        const token = req.headers.authorization.split(' ')[1]

        // const authData =  
        const decoded = jwt.decode(token, process.env.JWT_SCERET)


        const auth = await admin.findById(decoded.id)

        if (!auth)
            throw 'forbidden'
        req.auth = auth

        next()

    } catch {
        res.status(403).json('forbidden')
    }
}

module.exports = adminAuthMiddleware