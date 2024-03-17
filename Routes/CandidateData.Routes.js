const express = require('express');
const { getAllCandidates, countByStatus } = require('../Controllers/CandidateData.Controller');
const router = express.Router();

/**
* --------------------------------------------------------------------------------------
*                          Carousel
* --------------------------------------------------------------------------------------
*   .get  '/get-candidates'    ====>  get  candidates according to the query
*   .get  '/get-counted-applicant-by-stauts'    ====>  count depends on Applicant status 
*/




router.get('/get-candidates', getAllCandidates); // get  candidates according to the query
router.get('/get-counted-applicant-by-stauts',countByStatus)    // count depends on Applicant status 




module.exports = router;