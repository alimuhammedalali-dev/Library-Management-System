const { default: mongoose } = require("mongoose");
const Reservation = require("../models/Reservation");
const Material = require("../models/Material");
const User = require("../models/User");

class ReservationController {
  getAll = async (req, res) => {
    const reservations = await Reservation.find()
    res.status(200).json({reservations})
  }
  getone = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.findById(id);
    if (!reservation) return res.status(404).json("not found");
    res.status(200).json({ reservation });
  }
  add = async (req, res) => {
    const { materialsId, memberId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(materialsId) || !mongoose.Types.ObjectId.isValid(memberId))
      return res.status(404).json("invalide id")
    
    const user = await User.findById(memberId)
    if (!user || user.role !== "member")
      return res.status(404).json("invalide id")
    
    const material = await Material.findById(materialsId)
    if (!material) return res.status(404).json("not found")

    const currentReservationsCount = await Reservation.countDocuments({ 
      materialsId,
      notifiedWhenAvailable: false 
    });
    const autoCancelAfter = new Date();
    autoCancelAfter.setDate(autoCancelAfter.getDate() + 7);

    const reservation = await Reservation.create({
      materialsId, memberId, queuePriority: currentReservationsCount + 1, autoCancelAfter
    });
    res.status(201).json({ reservation });
  }
  delete = async (req, res) => {
    const id = req.params.id;
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) return res.status(404).json("not found");
    res.status(200).json("deleted successfully");
  }
}

module.exports = new ReservationController();
