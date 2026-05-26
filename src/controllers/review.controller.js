const mongoose = require("mongoose");
const Review = require("../models/Review");
const Material = require("../models/Material");
const User = require("../models/User");

class ReviewController {
  getAll = async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json({ reviews });
  }
  getone = async (req, res) => {
    const id = req.params.id;
    const review = await Review.findById(id);
    if (!review) return res.status(404).json("not found");
    res.status(200).json({ review });
  }
  add = async (req, res) => {
    const { materialsId, memberId, stars, comment, disReview } = req.body;

    if (!mongoose.Types.ObjectId.isValid(materialsId) && !mongoose.Types.ObjectId.isValid(memberId)) 
      return res.status(404).json("invalide id ")
    
    const user = await User.findById(memberId)
    if (!user && user.role !== "member") 
      return res.status(404).json("invalide id")
    
    const material = await Material.findById(materialsId)
    if (!material) return res.status(404).json("not found")

    if (stars < 1 || stars > 5) 
      return res.status(400).json("Stars must be between 1 and 5")
    

    const existingReview = await Review.findOne({ materialsId, memberId });
    if (existingReview) 
      return res.status(400).json("Duplicate review forbidden: You already reviewed this item");
    

    const review = await Review.create({
        materialsId, memberId, stars, comment, disReview: disReview ?? false 
    })
    res.status(201).json({ review });
  }
}

module.exports = new ReviewController();
