const JobModel = require("../model/job");

const createJob = async (req, res) => {
  try {
    // console.log(req.body);
    const newlyInsertedJob = await JobModel.create(req.body);
    console.log(newlyInsertedJob);
    res.json({
      success: true,
      message: "job created sucessfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Somthing went wrong please try again after sometime!",
    });
  }
};

const listJob = async (req, res) => {
  try {
    let query = {}; 
    if (req.query.minSalary) {
      const minSalary = Number(req.query.minSalary);
      query = { salary: { $gt: minSalary } };
    }
    const jobList = await JobModel.find(query);
    res.json({
      success: true,
      message: "Job List API",
      result: jobList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving job list",
      error: error.message,
    });
  }
};

const updateJob = (req, res) => {
  res.json({
    success: true,
    message: "update job api",
  });
};

const deleteJob = (req, res) => {
  res.json({
    success: true,
    message: "delete job api",
  });
};

const jobController = {
  createJob,
  listJob,
  updateJob,
  deleteJob,
};

module.exports = jobController;
