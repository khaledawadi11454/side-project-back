import profileModel from "../models/profile.js";
import fs from "fs";


export const getAllProfiles = async (req, res) => {
    try {
      const allProfiles = await profileModel.find();
      res.status(200).json({ message: allProfiles });
    } catch (err) {
      res.json({ error: err.message });
    }  
  };

export const getProfileById = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    res.status(200).json({ message: profile });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addProfile = async (req, res, next) => {
    try {
      
      const {first_name,last_name,title,about,skill,location,hourly_rate,user}=req.body;
      const image=req.imagePath;
      const newProfile = new profileModel({
        first_name,
        last_name,
        title,
        about,
        skill,
        location,
        hourly_rate,
        user,
        image
      });
    
      await newProfile.save();
      res.status(200).json("Profile has been added successfully");
    } catch (err) {
      next(err);
    }
  };

export const editProfile = async (req, res) => {
  try {
    const {first_name,last_name,title,about,skill,location,hourly_rate}=req.body;
    const image=req.imagePath;
    const updatedProfile = ({
      first_name,
      last_name,
      title,
      about,
      skill,
      location,
      hourly_rate,
      image
    });
    const profile = await profileModel.findById(req.params.id);
    if (req.imagePath) {
      fs.unlinkSync(profile.image);
    }
    const updateProfile = await profileModel.findByIdAndUpdate(
      req.params.id,
      
      { $set: updatedProfile},
      { new: true }
    );
    res.status(200).json(updateProfile);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
      if (profile.image) {
        fs.unlinkSync(profile.image);
      }
    await profileModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Profile deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};