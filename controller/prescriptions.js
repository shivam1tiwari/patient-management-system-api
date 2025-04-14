const express = require('express')
const router = express.Router()
const prescription = require('../model/prescriptions')

router.post('/prescription',prescription.addPrescription);
router.get('/all-prescription',prescription.allPrescription);
router.delete('/delete',prescription.deletePrescription);

module.exports = router