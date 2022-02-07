const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Models
const pendingRegistration = require('../models/pendingRegistration')
const students = require('../models/students')
const teacher = require('../models/teacher')
const admin = require('../models/admin')
const uniqueKey = require('../models/uniqueKey')

// middlewares

const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')

// login route
router.post('/login', async (req, res) => {

    try {
        let user = null;

        switch (req.body.type) {
            case 'Student':
                user = await students.findOne({ 'email': req.body.email })
                break
            case 'Teacher':
                user = await teacher.findOne({ 'email': req.body.email })
                break
            case 'Admin':
                user = await admin.findOne({ 'email': req.body.email })
                break
            default: user = null
        }

        if (!user)
            return res.status(401).json('User Account not Found.')

        const isPassMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPassMatch)
            return res.status(403).json('Login failed.')

        const token = await jwt.sign({
            id: user._id,
            email: user.email,
            type: req.body.type
        }, process.env.JWT_SCERET)



        return res.json(token)

    } catch (e) {
        return res.status(500).json(e)
    }

})


const addEmail = async (email) => {
    const newEmail = await new uniqueKey({ email: email })
    return await newEmail.save()
}



router.post('/register', async (req, res) => {

    try {

        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const newRegister = await new pendingRegistration({
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            gender: req.body.gender,

            // should be encrypted
            password: req.body.password,
            classLevel: req.body.classLevel,
            type: req.body.type

        })

        await addEmail(req.body.email)
        const result = await newRegister.save()

        return res.json(result)

    } catch (e) {
        return res.status(500).json(e)
    }

})



// accepting registrations

// student accepting method
const accpetStudent = async (pendReq, res) => {

    try {

        // return res.json(pendReq)

        const newStudent = await new students({
            name: pendReq.name,
            dateOfBirth: pendReq.dateOfBirth,
            email: pendReq.email,
            gender: pendReq.gender,
            password: pendReq.password,
            currentClass: pendReq.classLevel,
            fees: pendReq.value,

        }, {
            password: 0
        })

        const result = await newStudent.save()
        pendingRegistration.deleteOne({ '_id': pendReq._id }).exec()
        return res.json(result)

    } catch (e) {
        return res.status(500).json(e)
    }

}

// teacher accepting method
const acceptTeacher = async (pendReq, res) => {
    try {

        // return res.json(pendReq)

        const newTeacher = await new teacher({
            name: pendReq.name,
            dateOfBirth: pendReq.dateOfBirth,
            email: pendReq.email,
            gender: pendReq.gender,
            password: pendReq.password,
            subject: pendReq.classLevel,
            salary: pendReq.value,

        }, {
            password: 0
        })

        const result = await newTeacher.save()
        pendingRegistration.deleteOne({ '_id': pendReq._id }).exec()
        return res.json(result)

    } catch (e) {
        return res.status(500).json(e)
    }
}

// admin accepting method
const acceptAdmin = async (pendReq, res) => {
    try {


        const newAdmin = await new admin({
            name: pendReq.name,
            dateOfBirth: pendReq.dateOfBirth,
            email: pendReq.email,
            gender: pendReq.gender,
            password: pendReq.password,
            position: pendReq.classLevel,
            salary: pendReq.value,

        }, {
            password: 0
        })


        const result = await newAdmin.save()


        pendingRegistration.deleteOne({ '_id': pendReq._id }).exec()
        return res.json(result)

    } catch (e) {
        return res.status(500).json(e)
    }
}


// Accept a registration
router.put('/accept', adminAuthMiddleware, async (req, res) => {
    try {
        const pendReq = await pendingRegistration.findOne({ _id: req.body.id })

        if (!pendReq)
            return res.status(404).json('Registration not found.')


        switch (pendReq.type) {
            case 'Student':
                return await accpetStudent({ ...pendReq._doc, value: req.body.value }, res)

            case 'Teacher':
                return await acceptTeacher({ ...pendReq._doc, value: req.body.value }, res)

            case 'Admin':
                return await acceptAdmin({ ...pendReq._doc, value: req.body.value }, res)

            default: return res.status(404).json('Registration not found.')
        }

    } catch (e) {
        res.status(500).json(e)
    }
})






// get all pending students
router.get('/registrations/students', adminAuthMiddleware, async (req, res) => {
    try {

        const pendings = await pendingRegistration.find({ 'type': 'Student' }, {
            password: 0
        })
        res.json(pendings)

    } catch (e) {
        res.status(500).json(e)
    }
})

// get all pending teacher
router.get('/registrations/teachers', adminAuthMiddleware, async (req, res) => {
    try {

        const pendings = await pendingRegistration.find({ 'type': 'Teacher' }, {
            password: 0
        })
        res.json(pendings)

    } catch (e) {
        res.status(500).json(e)
    }
})


// get all pending admin
router.get('/registrations/admins', adminAuthMiddleware, async (req, res) => {
    try {

        const pendings = await pendingRegistration.find({ 'type': 'Admin' }, {
            password: 0
        })
        res.json(pendings)

    } catch (e) {
        res.status(500).json(e)
    }
})


// delete pending admission
router.delete('/admission/:id', adminAuthMiddleware, async (req, res) => {
    try {

        const result = await pendingRegistration.findByIdAndDelete(req.params.id, {
            password: 0
        }).exec()



        await uniqueKey.deleteOne({ email: result.email })

        res.json(result)


    } catch (e) {
        res.status(500).json(e)
    }
})



module.exports = router