const express = require('express')
const router = express.Router()

const fund = require('../models/fund')
const transition = require('../models/transition')
const students = require('../models/students')
const teacher = require('../models/teacher')
const admin = require('../models/admin')

const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')
router.use(adminAuthMiddleware)


const schoolFundName = 'school'

/// create a new school fund
router.post('/create-fund', async (req, res) => {
    try {

        if (req.auth.position !== 'principal')
            return res.status(403).json('Without principal, admin can not create fund.')


        const schoolFund = await fund.findOne({ name: schoolFundName })

        if (schoolFund)
            return res.status(406).json('School Fund Already Created.')

        const newSchoolFundQuery = await new fund({
            name: schoolFundName,
            total: req.body.total,
            totalPendingFees: req.body.totalPendingFees,
            totalPendingSalaries: req.body.totalPendingSalaries,
            transitions: []
        })

        const newSchoolFund = await newSchoolFundQuery.save()
        res.json(newSchoolFund)

    } catch (e) {
        return res.status(406).json('Cannot create same fund again.')
    }
})


/// update all students outstanding fee order by it's monthly fee
// update all teachers pending salary order by it's salary
// update all admins pending salary order by it's salary
router.put('/update-month', async (req, res) => {

    try {

        const schoolFund = await fund.findOne({ name: schoolFundName })
        if (!schoolFund)
            return res.status(404).json('School fund not found.')

        if (req.auth.position !== 'Principal')
            return res.status(403).json('Without principal, admin can not change month.')


        students.find((err, studs) => {
            if (err)
                throw 'Error'
            studs.forEach(stud => {
                stud.outstandingFees += stud.fees
                stud.save()
            })
        })

        teacher.find((err, techs) => {
            if (err)
                throw 'Error'
            techs.forEach(tech => {
                tech.pendingSalary += tech.salary
                tech.save()
            })
        })

        admin.find((err, adms) => {
            if (err)
                throw 'Error'
            adms.forEach(adm => {
                adm.pendingSalary += adm.salary
                adm.save()
            })
        })


        // Update school fund information
        const studPip = await students.aggregate([{
            $group: {
                _id: '',
                fees: { $sum: '$fees' }
            }
        }])
        const newPendingFees = studPip[0].fees
        schoolFund.totalPendingFees += newPendingFees

        const teacherPip = await teacher.aggregate([{
            $group: {
                _id: 0,
                salary: { $sum: '$salary' }
            }
        }])
        const newTechSalaries = teacherPip[0].salary
        schoolFund.totalPendingSalaries += newTechSalaries


        const adminPip = await admin.aggregate([{
            $group: {
                _id: 0,
                salary: { $sum: '$salary' }
            }
        }])
        const newAdmSalaries = adminPip[0].salary
        schoolFund.totalPendingSalaries += newAdmSalaries

        const f = await schoolFund.save()

        return res.json({
            msg: "Update month successful.",
            fund: f
        })

    } catch (e) {
        return res.status(500).json(e)
    }

})




/// recieve student fee by it's it 
router.post('/get-student-fee/:id', async (req, res) => {

    try {

        const stud = await students.findOne({ _id: req.params.id }, {
            password: 0
        })
        const schoolFund = await fund.findOne({ name: schoolFundName })

        if (!schoolFund)
            return res.status(404).json('School Fund not found.')

        if (!stud)
            return res.status(404).json('Student not found.')


        if (req.body.total > stud.outstandingFees)
            return res.status(406).json('Money Overflow.')


        //Create a new transition
        const newTransition = await new transition({
            type: 'Student Fee',
            payerId: req.params.id,
            payerName: stud.name,
            recieverId: req.auth._id,
            recieverName: req.auth.name,
            amount: req.body.total
        })

        const newTrans = await newTransition.save()


        stud.outstandingFees -= newTrans.amount
        stud.transitions = [...stud.transitions, newTrans._id]


        schoolFund.total += newTrans.amount
        schoolFund.newPendingFees -= newTrans.amount
        schoolFund.transitions = [...schoolFund.transitions, newTrans._id]


        await schoolFund.save()
        const savedStudent = await stud.save()

        // console.log(savedStudent)

        res.json({
            msg: `Payment recieved amount ${newTrans.amount}`,
            user: {

                _id: savedStudent._id,
                currentClass: savedStudent.currentClass,
                fees: savedStudent.fees,
                outstandingFees: savedStudent.outstandingFees
            }
        })

    } catch (e) {
        res.status(500).json(e)
    }
})


router.post('/pay-teacher-salary/:id', async (req, res) => {
    try {

        const tech = await teacher.findOne({ _id: req.params.id }, {
            password: 0
        })
        const schoolFund = await fund.findOne({ name: schoolFundName })


        if (!schoolFund)
            return res.status(404).json('School Fund not found.')

        if (!tech)
            return res.status(404).json('Teacher not found.')


        if (schoolFund.total < req.body.amount)
            return res.status(403).json('School fund has insufficent balance.')


        if (req.body.amount > tech.pendingSalary)
            return res.status(403).json('Overflowing amount.')

        const newTrans = await new transition({
            type: 'Paying Teacher salary',
            amount: req.body.amount,
            payerId: req.auth._id,
            payerName: req.auth.name,
            recieverId: tech._id,
            recieverName: tech.name
        })

        const successTrans = await newTrans.save()

        tech.pendingSalary -= successTrans.amount
        tech.transitions = [...tech.transitions, successTrans._id]

        schoolFund.total -= successTrans.amount
        schoolFund.totalPendingSalaries -= successTrans.amount
        schoolFund.transitions = [...schoolFund.transitions, successTrans._id]

        await schoolFund.save()
        const upTech = await tech.save()

        return res.json({
            msg: 'salary paid.',
            user: upTech
        })
    } catch (e) {
        return res.status(500).json(e)
    }
})



router.post('/pay-admin-salary/:id', async (req, res) => {
    try {

        const adm = await admin.findOne({ _id: req.params.id }, {
            password: 0
        })
        const schoolFund = await fund.findOne({ name: schoolFundName })


        if (!schoolFund)
            return res.status(404).json('School Fund not found.')

        if (!adm)
            return res.status(404).json('Admin not found.')


        if (schoolFund.total < req.body.amount)
            return res.status(403).json('School fund has insufficent balance.')


        if (req.body.amount > adm.pendingSalary)
            return res.status(403).json('Overflowing amount.')

        const newTrans = await new transition({
            type: 'Paying Teacher salary',
            amount: req.body.amount,
            payerId: req.auth._id,
            payerName: req.auth.name,
            recieverId: adm._id,
            recieverName: adm.name
        })

        const successTrans = await newTrans.save()

        adm.pendingSalary -= successTrans.amount
        adm.transitions = [...adm.transitions, successTrans._id]

        schoolFund.total -= successTrans.amount
        schoolFund.totalPendingSalaries -= successTrans.amount
        schoolFund.transitions = [...schoolFund.transitions, successTrans._id]

        await schoolFund.save()
        const upAdm = await adm.save()

        return res.json({
            msg: 'salary paid.',
            user: upAdm
        })
    } catch (e) {
        return res.status(500).json(e)
    }
})




router.get('/fund', async (req, res) => {
    try {
        const _fund = await fund.findOne({ name: schoolFundName }, { transitions: 0 })

        if (!_fund)
            return res.status(404).json('fund not found.')

        return res.json(_fund)

    } catch (e) {
        return res.json(e)
    }
})


router.post('/fund', async (req, res) => {

    try {

        if (req.auth.position !== 'principal')
            return res.status(403).json('Without principal, admin can not change month.')

        const _fund = await fund.findOne({ name: schoolFundName }, { transitions: 0 })

        if (!_fund)
            return res.status(404).json('fund not found.')

        _fund.total = req.body.total
        _fund.totalPendingFees = req.body.totalPendingFees
        _fund.totalPendingSalaries = req.body.totalPendingSalaries

        const result = await _fund.save()

        return res.json(result)

    } catch (e) {
        return res.json(e)
    }
})


module.exports = router