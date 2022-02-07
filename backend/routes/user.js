const express = require('express')
const router = express.Router()

// middlewares
const studentAuthMiddleware = require('../middlewares/studentAuthMiddleware')
const teacherAuthMiddleware = require('../middlewares/teacherAuthMiddleware')
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')
const userMiddleware = require('../middlewares/userMiddleware')

///
const admins = require('../models/admin')
const teachers = require('../models/teacher')
const students = require('../models/students')
const uniqueKey = require('../models/uniqueKey')
const transition = require('../models/transition')

// get student user information
router.get('/st-user', studentAuthMiddleware, (req, res) => {
    try {


        const { password, ...user } = req.auth._doc

        res.json({ ...user, type: 'Student' })
    }
    catch (e) {
        res.status(500).json(e)
    }

})

// get teacher information
router.get('/tech-user', teacherAuthMiddleware, (req, res) => {
    try {

        const { password, ...user } = req.auth._doc
        res.json({ ...user, type: 'Teacher' })

    } catch (e) {
        res.status(500).json(e)
    }

})

router.get('/admin-user', adminAuthMiddleware, (req, res) => {

    try {

        const { password, ...user } = req.auth._doc
        res.json({ ...user, type: 'Admin' })

    } catch (e) {
        res.status(500).json(e)
    }
})


// get total teachers
router.get('/teachers', userMiddleware, async (req, res) => {
    try {
        const totalTeachers = await teachers.find({}, {
            password: 0
        })
        return res.json(totalTeachers)

    } catch (e) {
        res.status(500).json(e)
    }
})

//get total admins
router.get('/admins', userMiddleware, async (req, res) => {
    try {
        const totalAdmins = await admins.find({}, {
            password: 0
        })
        return res.json(totalAdmins)
    } catch (e) {
        res.status(500).json(e)
    }
})

///
router.delete('/student/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const result = await students.findByIdAndDelete(req.params.id, {
            password: 0
        }).exec()
        await uniqueKey.deleteOne({ email: result.email })
        res.json(result)

    } catch (e) {
        res.status(500).json(e)
    }
})

// delete a teacher by id when you are admin as principal
router.delete('/teachers/:id', adminAuthMiddleware, async (req, res) => {
    try {

        if (req.auth.possition !== 'principal')
            return res.status(403).json('forbidden')

        const result = await teachers.findByIdAndDelete(req.params.id, {
            password: 0
        }).exec()
        await uniqueKey.deleteOne({ email: result.email })
        res.json(result)

    } catch (e) {
        res.status(500).json(e)
    }
})




//get total student as an admin or a teacher

router.get('/total-students', userMiddleware, async (req, res) => {
    try {

        if (req.type === 'Student')
            return res.status(403).json('Forbidded')

        const result = await students.find({}, {
            password: 0
        })

        return res.json(result)

    } catch (e) {
        return res.status(500).json(e)
    }
})


/// get all student of a class
router.post('/class-students', userMiddleware, async (req, res) => {
    try {
        if (req.type === 'Student') {
            if (req.auth.currentClass !== req.body.className)
                return res.status(401).json('You cannot get data of other classes')
        }

        const getRole = () => {
            if (req.type === 'Student')
                return {
                    _id: 1,
                    name: 1,
                    email: 1
                }
            return { password: 0 }
        }

        const result = await students.find({ currentClass: req.body.className }, getRole())

        return res.status(200).json(result)

    } catch (e) {
        return res.status(500).json(e)
    }
})


router.get('/transition/:id', userMiddleware, async (req, res) => {
    try {

        const _trans = await transition.findOne({ _id: req.params.id })
        return res.json(_trans)

    } catch (e) {
        return res.status(500).json(e)
    }
})




module.exports = router