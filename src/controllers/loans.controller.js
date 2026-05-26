const { default: mongoose } = require("mongoose");
const Loan = require("../models/Loan");
const Material = require("../models/Material");
const User = require("../models/User");

class LoanController {
  getAll = async (req, res) => {
    const loans = await Loan.find();
    res.status(200).json({ loans });
  }
  getone = async (req, res) => {
    const id = req.params.id;
    const loan = await Loan.findById(id);
    if (!loan) 
        return res.status(404).json("not found");

    //حساب غرامة التاخير
    const currentDate = new Date();
    if (currentDate > loan.dueDate && loan.status !== "returned" && !loan.actualReturnDate) {
      const diffTime = Math.abs(currentDate - loan.dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      loan.totalFineAmount = diffDays * loan.finePerDay;
      loan.status = "overdue";
      await loan.save();
    }

    res.status(200).json({ loan });
  }

  add = async (req, res) => {
    const { materialsId, memberId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(materialsId) || !mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(404).json("invalide id");
    }
    const user = await User.findById(memberId);
    if (!user || user.role !== "member") {
      return res.status(404).json("invalide id");
    }

    const material = await Material.findById(materialsId);
    if (!material) return res.status(404).json("not found");
    
    if (material.availableCopies <= 0) {
      return res.status(400).json("No copies available");
    }
    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + 14);

    const loan = await Loan.create({
      materialsId, memberId, loanDate, dueDate, status: "active", finePerDay: 1, totalFineAmount: 0, paymentStatus: "unpaid"
    });
    material.availableCopies -= 1;
    await material.save();

    res.status(201).json({ loan });
  }
  update = async (req, res) => {
    const id = req.params.id;
    const loan = await Loan.findById(id);
    if (!loan)
         return res.status(404).json("not found");

    if (loan.status === "returned") 
      return res.status(400).json("already returned");
    
    const currentDate = new Date();
    loan.actualReturnDate = currentDate;
    if (currentDate > loan.dueDate) {
      const diffTime = Math.abs(currentDate - loan.dueDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      loan.totalFineAmount = diffDays * loan.finePerDay;
      loan.status = "returned";
    } else {
      loan.status = "returned";
      loan.totalFineAmount = 0;
      loan.paymentStatus = "paid";
    }
    await loan.save();
    const material = await Material.findById(loan.materialsId);
    if (material) {
      material.availableCopies += 1;
      await material.save();
    }

    res.status(200).json({ loan });
  }
}

module.exports = new LoanController();
