const process = require("process");
const {
  candidateCollection,
  jobCollection,
} = require("../MongoDB/Collections");
const { ObjectId } = require("mongodb");
const { errorSend } = require("../Shared/Scripts/scripts");

// get  candidates according to the query
const getAllCandidates = async (req, res) => {
  try {
    const { role, status, gender, from, to } = req.query;

    const pipeline = [];

    if (role) {
      pipeline.push({
        $match: { role: role },
      });
    }

    if (status && status !== "All") {
      pipeline.push({
        $match: { status: { $regex: new RegExp(status, "i") } },
      });
    }

    if (gender !== undefined && gender !== "") {
      pipeline.push({
        $match: { gender: { $regex: new RegExp(`^${gender}$`, "i") } },
      });
    }

    if (from || to) {
      const duration = {};
      if (from) {
        duration.$gte = new Date(from).toISOString();
      }
      if (to) {
        duration.$lte = new Date(to).toISOString();
      }
      pipeline.push({ $match: { "timestamps.Application": duration } });
    }

    pipeline.push({
      $lookup: {
        from: "jobs",
        let: { role_ID: { $toObjectId: "$role" } },
        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$role_ID"] } } }],
        as: "job_Detail",
      },
    });

    pipeline.push({
      $unwind: { path: "$job_Detail", preserveNullAndEmptyArrays: true },
    });

    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        gender: 1,
        // phone: 1,
        experience: 1,
        expectedSalary: 1,
        status: 1,
        imgURL: 1,
        applicationTime: "$timestamps.Application",
        role: "$job_Detail.position",
        // salary : '$job_Detail.salary',
      },
    });

    pipeline.push({ $sort: { "timestamps.Application": -1 } });

    const result = await candidateCollection.aggregate(pipeline).toArray();

    res.status(200).json({ result });
  } catch (error) {
    errorSend(res, 500, "Internal server error");
  }
};

// count depends on Applicant status & all jobs
const allJobs_and_applicantCount = async (req, res) => {
  try {
    const allJobs = await jobCollection
      .aggregate([
        { $sort: { "timestamp.posted": -1 } },
        {
          $project: {
            _id: 1,
            position: 1,
          },
        },
      ])
      .toArray();
    const groupCountedData = await candidateCollection
      .aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            Status: "$_id",
            count: 1,
          },
        },
      ])
      .toArray();
    const resultData = [
      {
        Status: "All",
        count: groupCountedData.reduce((sum, i) => sum + i.count, 0),
      },
      ...groupCountedData,
    ];

    res.status(200).send({
      counts: resultData,
      allJobs,
    });
  } catch (error) {
    errorSend(res, 500, "Internal server error");
  }
};



module.exports = {
  getAllCandidates,
  allJobs_and_applicantCount,
 
};
