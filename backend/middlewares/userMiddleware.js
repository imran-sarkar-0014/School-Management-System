const jwt = require('jsonwebtoken')
const admin = require('../models/admin')
const teacher = require('../models/teacher')
const student = require('../models/students')

const userMiddleware = async (req, res, next) => {
    try {

        if (!req.headers.authorization)
            throw 'forbidden'

        const token = req.headers.authorization.split(' ')[1]

        // const authData =  

        const decoded = await jwt.decode(token, process.env.JWT_SCERET)
        let auth = null


        switch (decoded.type) {
            case 'Admin':
                auth = await admin.findById(decoded.id)
                break
            case 'Teacher':
                auth = await teacher.findById(decoded.id)
                break
            case 'Student':
                auth = await student.findById(decoded.id)
                break
        }

        if (!auth)
            throw 'forbidden'

        req.auth = auth
        req.type = decoded.type

        next()

    } catch {
        res.status(403).json('forbidden')
    }
}

module.exports = userMiddleware