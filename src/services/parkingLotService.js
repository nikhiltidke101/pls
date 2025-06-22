const { v4: uuidv4 } = require("uuid");
const { VehicleType } = require("../models/types");
const { FeeService } = require("./feeService");

const parkingSpots = [];
const tickets = [];
const vehicles = [];

const FLOORS = 2;
const SPOTS_PER_FLOOR = 10;

class ParkingLotService {
  constructor() {
    this.feeService = new FeeService();

    if (parkingSpots.length === 0) {
      for (let floor = 1; floor <= FLOORS; floor++) {
        for (let i = 1; i <= SPOTS_PER_FLOOR; i++) {
          let type;
          if (i <= 2) type = VehicleType.MOTORCYCLE;
          else if (i <= 7) type = VehicleType.CAR;
          else type = VehicleType.BUS;

          parkingSpots.push({
            id: `F${floor}-S${i}`,
            floor,
            type,
            isOccupied: false,
          });
        }
      }
    }
  }

  parkVehicle(vehicle) {
    if (!vehicles.find((v) => v.licensePlate === vehicle.licensePlate)) {
      vehicles.push(vehicle);
    }

    const spot = this.findAvailableSpot(vehicle.type);

    if (!spot) {
      return null;
    }

    spot.isOccupied = true;

    const ticket = {
      id: uuidv4(),
      licensePlate: vehicle.licensePlate,
      spotId: spot.id,
      entryTime: new Date(),
    };

    tickets.push(ticket);
    return ticket;
  }

  unparkVehicle(ticketId) {
    const ticket = this.getTicket(ticketId);
    if (!ticket || ticket.exitTime) {
      return null;
    }

    const vehicle = this.getVehicle(ticket.licensePlate);
    const spot = this.getSpot(ticket.spotId);

    if (!vehicle || !spot) {
      return null;
    }

    const fee = this.feeService.calculateFee(ticket, vehicle.type);
    ticket.exitTime = new Date();
    ticket.fee = fee;

    spot.isOccupied = false;

    return ticket;
  }

  findAvailableSpot(vehicleType) {
    if (vehicleType === VehicleType.CAR) {
      const carSpot = parkingSpots.find(
        (spot) => spot.type === VehicleType.CAR && !spot.isOccupied
      );
      if (carSpot) return carSpot;

      const busSpot = parkingSpots.find(
        (spot) => spot.type === VehicleType.BUS && !spot.isOccupied
      );
      return busSpot;
    }

    return parkingSpots.find(
      (spot) => spot.type === vehicleType && !spot.isOccupied
    );
  }

  getTicket(ticketId) {
    return tickets.find((t) => t.id === ticketId);
  }

  getVehicle(licensePlate) {
    return vehicles.find((v) => v.licensePlate === licensePlate);
  }

  getSpot(spotId) {
    return parkingSpots.find((s) => s.id === spotId);
  }
}

module.exports = { ParkingLotService }; 