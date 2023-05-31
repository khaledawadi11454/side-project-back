import requestModel from "../models/request.js";



export const getAllRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allRequests = await requestModel.find().skip(startIndex).limit(limit);
    const totalCount = await requestModel.countDocuments();

    const pagination = {};
    if (endIndex < totalCount) {
      pagination.next = {
        page: page + 1,
        limit: limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit
      };
    }

    res.status(200).json({ message: allRequests, pagination });
  } catch (err) {
    res.json({ error: err.message });
  }
};


export const getRequestById = async (req, res) => {
  try {
    const request = await requestModel.findById(req.params.id);
    res.status(200).json({ message: request });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addRequest = async (req, res, next) => {
    try {
      const {proposal,user,job}=req.body;
      const newRequest = new requestModel({
        proposal,user,job
      });
      await newRequest.save();
      res.status(200).json("Request has been added successfully");
    } catch (err) {
      next(err);
    }
  };

export const editRequest = async (req, res) => {
  try {
    const updateRequest = await requestModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true }
    );
    res.status(200).json(updateRequest);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await requestModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Request deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};