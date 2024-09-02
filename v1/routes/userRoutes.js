const express = require('express')
const router = express.Router()

const userControler = require('../controler/userControler')
const jwtVerify = require('../../jwt/jwtVerify')
const upload = require('../../multer/upload')


router.post('/signup',upload.single('image'),userControler.signup)
router.post('/login', userControler.login)
router.post('/adduserskill', jwtVerify, userControler.AddUserskill)

router.get('/getskill', jwtVerify, userControler.getskill)
router.post('/createeducation', userControler.createeducation)
router.get('/geteducation', jwtVerify, userControler.geteducation)
router.put('/updateeducation/:id', jwtVerify, userControler.updateeducation)
router.delete('/deleteeducation/:id', jwtVerify, userControler.deleteeducation)

router.post('/createexperience', userControler.createexperience)
router.get('/getexperience', jwtVerify, userControler.getexperience)
router.put('/updateexperience/:id', jwtVerify, userControler.updateexperience)
router.delete('/deleteexperience/:id', jwtVerify, userControler.deleteexperience)

router.get('/getalldata', jwtVerify, userControler.getalldata)


router.post('/addpost', upload.single('image'), userControler.addpost)
router.get('/getpost', jwtVerify, userControler.getpost)
router.put('/updatepost/:id', jwtVerify, upload.single('image'), userControler.updatepost)
router.delete('/deletepost/:id', jwtVerify, userControler.deletepost)


router.post('/addjob', userControler.addjob)
router.get('/getjob', jwtVerify, userControler.getjob)
router.put('/updatejob/:id', jwtVerify, userControler.updatejob)
router.delete('/deletejob/:id', jwtVerify, userControler.deletejob)


router.put('/updateresume/:id', jwtVerify, upload.single('image'), userControler.updateResume)


module.exports = router