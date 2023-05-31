import resourceModel from "../models/resource.js";


export const getAllResources = async (req, res) => {
  try {
    const allResources = await resourceModel.find();
    res.status(200).json({ message: allResources });
  } catch (err) {
    res.json({ error: err.message });
  }  
};



export const getResourceById = async (req, res) => {
  try {
    const resource = await resourceModel.findById(req.params.id);
    res.status(200).json({ message: resource });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addResource = async (req, res, next) => {
    try {
      const {rating , title,category,link}=req.body;
      const newResource = new resourceModel({
        rating,
        title,
        category,
        link,
      });
      await newResource.save();
      res.status(200).json("Resource has been added successfully");
    } catch (err) {
      next(err);
    }
  };


export const editResource = async (req, res) => {
  try {
    const updateResource = await resourceModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true }
    );
    res.status(200).json(updateResource);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    await resourceModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Resource deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};