const express = require('express');
const { getAllCandidates, allJobs_and_applicantCount, } = require('../Controllers/CandidateData.Controller');
const router = express.Router();

/**
* --------------------------------------------------------------------------------------
*                          Carousel
* --------------------------------------------------------------------------------------
*   .get  '/get-candidates'    ====>  get  candidates according to the query
*   .get  '/get-counted-applicant-by-stauts'    ====>  count depends on Applicant status & all jobs
*/




router.get('/get-candidates', getAllCandidates); // get  candidates according to the query
router.get('/get-counted-applicant-by-stauts-and-all-jobs',allJobs_and_applicantCount)    // count depends on Applicant status  & all jobs





module.exports = router;