const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Material = require("../models/Material");

class MaterialController {
  getAll = async (req, res) => {
    const material = await Material.find();
    res.status(200).json({ material });
  };
  getone = async (req, res) => {
    const id = req.params.id;
    const material = await Material.findById(id).select("-userID -_id");
    if (!material) return res.status(404).json("not found");
    res.status(200).json({ material });
  };
  addM = async (req, res) => {
    const {
      materialType,
      available,
      title,
      author,
      publisher,
      year,
      category,
      totalCopies,
      availableCopies,
      coverImageUrl,
      ISBN,
      issueNumber,
      month,
      userID,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(404).json("invalide id d");
    }
    const user = await User.findById(userID);
    if (!user || user.role !== "manager") {
      return res.status(404).json("invalide id");
    }
    const material = await Material.create({
      materialType,
      available,
      title,
      author,
      publisher,
      year,
      category,
      totalCopies,
      availableCopies,
      coverImageUrl,
      ISBN,
      issueNumber,
      month,
      userID,
    });

    res.status(201).json({ material });
  };
  updateM = async (req, res) => {
    const id = req.params.id;
    const material = await Material.findById(id);
    if (!material) return res.status(404).json("not found");

    const { materialType, available, title, author, publisher, year, category, totalCopies, availableCopies, coverImageUrl, ISBN, issueNumber, month} = req.body;

    material.materialType = materialType ?? material.materialType;
    material.available = available ?? material.available;
    material.title = title ?? material.title;
    material.author = author ?? material.author;
    material.publisher = publisher ?? material.publisher;
    material.year = year ?? material.year;
    material.category = category ?? material.category;
    material.totalCopies = totalCopies ?? material.totalCopies;
    material.availableCopies = availableCopies ?? material.availableCopies;
    material.coverImageUrl = coverImageUrl ?? material.coverImageUrl;
    material.ISBN = ISBN ?? material.ISBN;
    material.issueNumber = issueNumber ?? material.issueNumber;
    material.month = month ?? material.month;

    await material.save()
    res.status(200).json({ material })
  }

  deleteM = async (req, res) => {
    const id = req.params.id;
    const material = await Material.findByIdAndDelete(id);

    if (!material) return res.status(404).json("not found");
    res.status(200).json("deleted successfully");
  };
}

module.exports = new MaterialController();
