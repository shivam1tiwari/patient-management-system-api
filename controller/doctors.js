const express = require('express')
const router = express.Router()
const doctor = require('../model/doctars')

router.post('/register',doctor.signUp);
router.post('/login',doctor.login);
router.delete('/delete',doctor.deleteDoctor);

module.exports = router