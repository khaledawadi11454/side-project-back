import projectModel from "../models/project.js";


export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await projectModel.find();
    res.status(200).json({ message: allProjects });
  } catch (err) {
    res.json({ error: err.message });
  }  
};



export const getProjectById = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    res.status(200).json({ message: project });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addProject = async (req, res, next) => {
    try {
      const {title , description,user}=req.body;
      const newProject = new projectModel({
        title,
        description,
        user,
      });
      await newProject.save();
      res.status(200).json("Project has been added successfully");
    } catch (err) {
      next(err);
    }
  };


export const editProject = async (req, res) => {
  try {
    const updateProject = await projectModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true }
    );
    res.status(200).json(updateProject);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await projectModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Project deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};