const { candidateCollection } = require("../MongoDB/Collections");
const { errorSend } = require("../Shared/Scripts/scripts");

//all jobs and the applicant count
const allJobApplicantCount = async (req, res) => {
    try {
      const data = await candidateCollection
        .aggregate([
          {
            $group: {
              _id: { $toObjectId: "$role" },
              totalApplicants: { $sum: 1 },
            },
          },
          {
            $lookup: {
              from: "jobs",
              localField: "_id",
              foreignField: "_id",
              as: "job_Detail",
            },
          },
          {
            $project: {
              _id: 0,
              role: { $toString: "$_id" },
              totalApplicants: 1,
              position: { $arrayElemAt: ["$job_Detail.position", 0] },
            },
          },
        ])
        .toArray();
      return data;
    } catch (error) {
      errorSend(res, 500, "Internal server error");
    }
  };
  
  
  //classify Applicant By Gender
  const classifyApplicantByGender  = async (req, res) => {
    try {
      const data = await candidateCollection
        .aggregate([
          {
            $group: {
              _id:  "$gender" ,
              sum: { $sum: 1 },
            },
          },
      
        ])
        .toArray();
     return data;
    } catch (error) {
      errorSend(res, 500, "Internal server error");
    }
  };

  

  //classify Applicant By status


  const classifyApplicantStatus  = async (req, res) => {
    try {
      const data = await candidateCollection
        .aggregate([
          {
            $group: {
              _id:  "$status" ,
              sum: { $sum: 1 },
            },
          },
      
        ])
        .toArray();
    //  res.status(200).send(data);
     return data;
    } catch (error) {
      errorSend(res, 500, "Internal server error");
    }
  };
  


  const getDashboardData = async (req, res) => {
    try {
      const AllJobApplicantCount = await allJobApplicantCount(req,res);
      const ApplicantByGender = await classifyApplicantByGender(req,res);
      const ApplicantByStatus = await classifyApplicantStatus(req,res);
      res.status(200).send({AllJobApplicantCount,ApplicantByGender,ApplicantByStatus})
    } catch (error) {
      errorSend(res, 500, "Internal server error");
    }
  };

  
  module.exports={
    classifyApplicantByGender,
    allJobApplicantCount,
    classifyApplicantStatus,
    getDashboardData,
  }