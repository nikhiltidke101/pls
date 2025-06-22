const { ParkingLotService } = require("../services/parkingLotService");
const { VehicleType } = require("../models/types");

class ParkingController {
  constructor() {
    this.parkingLotService = new ParkingLotService();
  }

  park = (req, res) => {
    try {
      const { licensePlate, vehicleType } = req.body;

      if (!licensePlate || !vehicleType) {
        return res
          .status(400)
          .json({ message: "licensePlate and vehicleType are required" });
      }

      if (!Object.values(VehicleType).includes(vehicleType)) {
        return res.status(400).json({ message: "Invalid vehicleType" });
      }

      const ticket = this.parkingLotService.parkVehicle({
        licensePlate,
        type: vehicleType,
      });

      if (!ticket) {
        return res.status(404).json({ message: "No available parking spot" });
      }

      res.status(201).json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  unpark = (req, res) => {
    try {
      const { ticketId } = req.params;

      if (!ticketId) {
        return res.status(400).json({ message: "ticketId is required" });
      }

      const ticket = this.parkingLotService.unparkVehicle(ticketId);

      if (!ticket) {
        return res
          .status(404)
          .json({ message: "Ticket not found or already processed" });
      }

      res.status(200).json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = { ParkingController }; 