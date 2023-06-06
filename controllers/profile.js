import profileModel from "../models/profile.js";
import fs from "fs";


export const getAllProfiles = async (req, res) => {
    try {
      const allProfiles = await profileModel.find();
      res.status(200).json({ message: allProfiles });
    } catch (error) {
      res.json({ error: error.message });
    }  
  };

export const getProfileById = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    res.status(200).json({ message: profile });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const addProfile = async (req, res, next) => {
    try {
      
      const {first_name,last_name,title,about,skill,location,hourly_rate}=req.body;
      const user=req.user._id
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
    } catch (error) {
      next(error);
    }
  };
export const getProfileByUserID= async (req,res)=>{
  const id=req.params.id
  try {
    const profile = await profileModel.findOne({user:id});
    if(!profile){
      return res.status(404).json("Profile not found");
    }
    res.status(200).json({ message: profile });
  } catch (error) {
    res.json({ error: error.message });
  }
}
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

    const updateProfile = await profileModel.findByIdAndUpdate(
      req.params.id,
      
      { $set: updatedProfile},
      { new: true }
    );
    if(!updateProfile){
      return res.status(404).send({message: 'Profile not found'})
    }
    res.status(200).json(updateProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.json({ error: error.message });
  }
};