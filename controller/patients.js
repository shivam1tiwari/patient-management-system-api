const express = require('express')
const router = express.Router()
const patient = require('../model/patients')

router.post('/register',patient.register);
router.get('/patients',patient.getPatients);
router.delete('/delete',patient.deletePatient);


module.exports = router