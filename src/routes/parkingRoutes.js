const { Router } = require("express");
const { ParkingController } = require("../controllers/parkingController");

const router = Router();
const parkingController = new ParkingController();

router.post("/park", parkingController.park);
router.post("/unpark/:ticketId", parkingController.unpark);

module.exports = router; 