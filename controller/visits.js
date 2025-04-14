const express = require('express')
const router = express.Router()
const visit = require('../model/visits')

router.post('/visit',visit.addVisit);
router.get('/all-visit',visit.allVisit);
router.delete('/delete',visit.deleteVisit);


module.exports = router