const JobModel = require("../model/job");

const createJob = async (req, res) => {
  try {
    const newlyInsertedJob = await JobModel.create(req.body); // to save the data in db
    console.log(newlyInsertedJob);
    res.json({
      success: true,
      message: "job created sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Somthing went wrong please try again after sometime!",
    });
  }
};

const listJob = async (req, res) => {
  const jobList = await JobModel.find();
  res.json({
    status: true,
    message: "Job List",
    results: jobList,
  });
};

const updateJob = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const update = {
      $set: req.body,
    };

    const updatedJob = await JobModel.findByIdAndUpdate(id, update, {
      new: true,
    }); // Add { new: true } to return the updated document

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    res.json({
      success: true,
      message: "Job Updated Successfully!",
      data: updatedJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later!",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const deletedJob = await JobModel.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    res.json({
      success: true,
      message: "Job Deleted Successfully!",
    });
    console.log(id, "Delete this job id");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later!",
    });
  }
};

const jobController = {
  createJob,
  listJob,
  updateJob,
  deleteJob,
};

module.exports = jobController;
