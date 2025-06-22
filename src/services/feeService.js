const { VehicleType } = require("../models/types");

const HOURLY_RATES = {
  [VehicleType.MOTORCYCLE]: 5,
  [VehicleType.CAR]: 10,
  [VehicleType.BUS]: 20,
};

class FeeService {
  calculateFee(ticket, vehicleType) {
    if (!ticket.exitTime) {
      ticket.exitTime = new Date();
    }

    const durationInMs =
      ticket.exitTime.getTime() - ticket.entryTime.getTime();
    const durationInHours = durationInMs / (1000 * 60 * 60);

    const rate = HOURLY_RATES[vehicleType];
    const fee = Math.ceil(durationInHours) * rate;

    return fee;
  }
}

module.exports = { FeeService }; 