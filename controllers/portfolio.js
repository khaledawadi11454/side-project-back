import portfolioModel from "../models/portfolio.js";
import fs from "fs";


export const getAllPortfolios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allPortfolios = await portfolioModel.find().skip(startIndex).limit(limit);
    const totalCount = await portfolioModel.countDocuments();

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

    res.status(200).json({ message: allPortfolios, pagination });
  } catch (err) {
    res.json({ error: err.message });
  }
};


export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    res.status(200).json({ message: portfolio });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addPortfolio = async (req, res, next) => {
    try {
      const {user,title,description,websiteURL,githubURL,linkedinURL}=req.body;
      const image=req.imagePath;
      const newPortfolio = new portfolioModel({
        user,
        title,
        description,
        image,
        websiteURL,
        githubURL,
        linkedinURL
      });
      await newPortfolio.save();
      res.status(200).json("Portfolio has been added successfully");
    } catch (err) {
      next(err);
    }
  };

  export const editPortfolio = async (req, res) => {
    try {
      const { user, title, description, websiteURL, githubURL, linkedinURL } = req.body;
      const image = req.imagePath;
      const updatedPortfolio = {
        user,
        title,
        description,
        websiteURL,
        githubURL,
        linkedinURL,
        image
      };
  
      const portfolio = await portfolioModel.findById(req.params.id);
      if (req.imagePath) {
        fs.unlinkSync(portfolio.image);
      }
  
      const updated = await portfolioModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedPortfolio },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.json({ error: err.message });
    }
  };

  export const deletePortfolio = async (req, res) => {
    try {
      const portfolio = await portfolioModel.findById(req.params.id);
      if (portfolio.image) {
        fs.unlinkSync(portfolio.image);
      }
     
      await portfolioModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Portfolio deleted successfully");
    } catch (err) {
      res.json({ error: err.message });
    }
  };