const express = require('express')
const router = express.Router()
const adminControler = require('../controler/adminControler')
const jwtVerify = require('../../jwt/jwtVerify')


router.post('/register', adminControler.register)
router.post('/login', adminControler.login)
router.post('/addskill', adminControler.addskill)
router.put('/updateSkill/:id', adminControler.updateSkill)
router.get('/getAllSkills', adminControler.getAllSkills)

router.get('/getSkills', adminControler.getSkills)
router.delete('/deleteSkill/:id', adminControler.deleteSkill)
router.get('/getAllUser', adminControler.getAllUser)
router.get('/getUser', adminControler.getUser)

router.get('/getExperience', adminControler.getExperience)
router.put('/updateExperience/:id', adminControler.updateExperience)
router.get('/getEducation', adminControler.getEducation)
router.put('/updateEducation/:id', adminControler.updateEducation)

router.get('/userSkill/:id', adminControler.userSkill)
router.get('/getAlldata/:id', adminControler.getAlldata)

router.get('/getPost', adminControler.getPost)
router.get('/getJob', adminControler.getJob)



module.exports = router