const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const userMiddleware = require('../middlewares/userMiddleware')
router.use(userMiddleware)


const attendance = require('../models/attendance')


router.get('/:className', async (req, res) => {

    try {

        const _attends = await attendance.find({ className: req.params.className.replace('_', ' ') }).limit(req.query.limit || 30).sort({ updatedAt: -1 })

        if (req.type !== 'Student')
            return res.json(_attends)

        const studId = req.auth._id.toString()

        _attends.forEach(attend => {
            attend.attendances = attend.attendances.filter(a => a.id === studId)
        })

        return res.json(_attends)

    } catch (e) {
        return res.status(500).json(e)
    }

})

//// get attendance 
router.post('/', async (req, res) => {

    if (req.type === 'Student')
        return res.status(403).json("Student can not post attendance")

    // return res.json(req.body)

    try {

        const newAttendance = await new attendance({
            attendorId: req.auth._id,
            attendorName: req.auth.name,

            className: req.body.className,
            date: req.body.date,
            attendances: req.body.attendances
        })

        const _attend = await newAttendance.save()

        return res.status(201).json(_attend)

    } catch (e) {
        return res.status(500).json(e)
    }
})



router.put('/:id', async (req, res) => {
    if (req.type === 'Student')
        return res.status(403).json("Student can not update.")
    try {

        const attend = await attendance.findOne({ _id: req.params.id })

        if (!attend)
            return res.status(404).json("attendance not found.")

        if (req.type === 'Teacher' && attend.attendorId !== req.auth._id.toString())
            return res.status(403).json("A teacher can not modify other's attendance.")

        attend.attendorId = req.auth._id
        attend.attendorName = req.auth.name

        attend.className = req.body.className
        attend.date = req.body.date
        attend.attendances = req.body.attendances

        const _result = await attend.save()
        return res.json(_result)

    } catch (e) {
        return res.status(500).json(e)
    }
})


router.delete('/:id', async (req, res) => {
    if (req.type === 'Student')
        return res.status(403).json("Student can not delete attendances")

    try {


        const attend = await attendance.findOne({ _id: req.params.id })

        if (!attend)
            return res.status(404).json("attendance not found.")

        if (req.type === 'Teacher' && attend.attendorId !== req.auth._id.toString())
            return res.status(403).json("A teacher can not delete other's attendance.")

        const _result = await attend.remove()
        return res.json(_result)

    } catch (e) {
        return res.status(500).json(e)
    }

})




module.exports = router






