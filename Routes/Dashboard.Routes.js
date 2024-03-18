
const express = require('express');
const { allJobApplicantCount, classifyApplicantByGender, classifyApplicantStatus, getDashboardData } = require('../Controllers/Dashboard.Controller');
const router = express.Router();

/**
* --------------------------------------------------------------------------------------
*                          Carousel
* --------------------------------------------------------------------------------------
*   .get  '/get-applicant-count-by-job'    ====>  get //job & applicant count
*   .get  '/get-applicant-count-by-gender'    ====>  classify by gender
*   .get  '/get-applicant-count-by-status'    ====>  classify by status



*    .get '/dashboard-data'                   ==> all dashboard data
*/



/**
 * ---------- Turned off -----
 * Can be send individually by adding response instead of return
 */
// router.get('/get-applicant-count-by-job',allJobApplicantCount)    //job & applicant count
// router.get('/get-applicant-count-by-gender',classifyApplicantByGender)    //classify by gender
// router.get('/get-applicant-count-by-status',classifyApplicantStatus)    //classify by gender


router.get('/dashboard-data',getDashboardData); //all dashboard data



module.exports = router;