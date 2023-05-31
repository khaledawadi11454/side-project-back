import eventModel from "../models/event.js";


export const getAllEvents = async (req, res) => {
  try {
    const allEvents = await eventModel.find();
    res.status(200).json({ message: allEvents });
  } catch (err) {
    res.json({ error: err.message });
  }  
};



export const getEventById = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);
    res.status(200).json({ message: event });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addEvent = async (req, res, next) => {
    try {
      const {title,date,description,location,Details}=req.body;
      const newEvent = new eventModel({
        title,date,description,location,Details
      });
      await newEvent.save();
      res.status(200).json("event has been added successfully");
    } catch (err) {
      next(err);
    }
  };


export const editEvent = async (req, res) => {
  try {
    const updateEvent = await eventModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true }
    );
    res.status(200).json(updateEvent);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await eventModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Event deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};