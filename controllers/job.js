import jobModel from "../models/job.js";

export const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allJobs = await jobModel.find().skip(startIndex).limit(limit);
    const totalCount = await jobModel.countDocuments();

    const pagination = {};
    if (endIndex < totalCount) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.status(200).json({ message: allJobs, pagination });
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.id);
    res.status(200).json({ message: job });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addJob = async (req, res, next) => {
  try {
    const { title, description, salary, location, type, urldemo, company } =
      req.body;
    const newJob = new jobModel({
      title,
      description,
      salary,
      location,
      type,
      urldemo,
      company,
    });
    await newJob.save();
    res.status(200).json("Job has been added successfully");
  } catch (err) {
    next(err);
  }
};

export const editJob = async (req, res) => {
  try {
    const updateJob = await jobModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateJob);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await jobModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Job deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};
export const findByFilter = async (req, res, next) => {
  try {
    const id = req.params.key;
    const jobsByName = await jobModel.find({
      title: { $regex: id, $options: "i" },
    });
    if (jobsByName.length < 1) {
      return res.status(404).json("No Data Found");
    }
    res.status(200).json(jobsByName);
  } catch (error) {
    next(error);
  }
};
