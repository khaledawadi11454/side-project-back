import reviewModel from "../models/review.js";


export const getAllReviews = async (req, res) => {
  try {
    const allReviews = await reviewModel.find();
    res.status(200).json({ message: allReviews });
  } catch (err) {
    res.json({ error: err.message });
  }  
};



export const getReviewById = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    res.status(200).json({ message: review });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addReview = async (req, res, next) => {
    try {
      const {rating , comment,user}=req.body;
      const newReview = new reviewModel({
        rating,
        comment,
        user,
      });
      await newReview.save();
      res.status(200).json("Review has been added successfully");
    } catch (err) {
      next(err);
    }
  };


export const editReview = async (req, res) => {
  try {
    const updateReview = await reviewModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true }
    );
    res.status(200).json(updateReview);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Review deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};