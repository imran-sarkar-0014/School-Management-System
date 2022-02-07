const express = require('express')
const router = express.Router()
const userMiddleware = require('../middlewares/userMiddleware')
router.use(userMiddleware)

const notice = require('../models/notice')

router.get('/', async (req, res) => {
    try {

        const notices = await notice.find({}).sort({ updatedAt: -1 })

        return res.json(notices)

    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/', async (req, res) => {

    if (req.type === 'Student')
        return res.status(403).json("Student can't add notice.")

    try {

        const _notice = await new notice({
            noticerId: req.auth._id,
            noticerName: req.auth.name,
            userType: req.type,
            header: req.body.header,
            body: req.body.body
        })

        const result = await _notice.save()
        return res.status(201).json(result)
    } catch (e) {
        res.status(500).json(e)
    }
})



router.put('/:id', async (req, res) => {

    if (req.type === 'Student')
        return res.status(403).json("Student can't add notice.")

    try {
        const _notice = await notice.findOne({ _id: req.params.id })

        if (!_notice)
            return res.status(404).json('Notice not found.')



        if (req.type === 'Teacher' && _notice.noticerId !== req.auth._id.toString())
            return res.status(403).json("A teacher can not modify other teacher's notice.")

        _notice.noticerId = req.auth._id
        _notice.noticerName = req.auth.name
        _notice.header = req.body.header
        _notice.userType = req.type
        _notice.body = req.body.body

        const result = await _notice.save()

        return res.json(result)

    } catch (e) {
        res.status(500).json(e)
    }
})


router.delete('/:id', async (req, res) => {

    if (req.type === 'Student')
        return res.status(403).json("Student can't add notice.")

    try {
        const _notice = await notice.findOne({ _id: req.params.id })

        if (!_notice)
            return res.status(404).json('Notice not found.')

        if (req.type === 'Teacher' && _notice.noticerId !== req.auth._id.toString())
            return res.status(403).json("A teacher can not delete other teacher's notice.")

        const result = await _notice.remove()

        return res.json(result)

    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router
