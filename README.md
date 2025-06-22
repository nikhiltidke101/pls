# Smart Parking Lot System

This project is a backend system for a smart parking lot designed to manage vehicle entry/exit, allocate parking spaces, and calculate fees.

## Core Features

-   **Dynamic Parking Spot Allocation**: Assigns spots based on vehicle type (Motorcycle, Car, Bus) and availability.
-   **Check-In/Check-Out**: Logs vehicle entry and exit times.
-   **Automated Fee Calculation**: Calculates parking fees based on time spent and vehicle type.
-   **Real-Time Spot Availability**: Keeps track of open and occupied spots.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [pnpm](https://pnpm.io/)

### Installation

1.  Navigate to the project directory:
    ```bash
    cd design-parking-lot-system-nikhiltidke101
    ```
2.  Install the dependencies:
    ```bash
    pnpm install
    ```

### Running the Application

To start the server, run:

```bash
pnpm start
```

The application will be running on `http://localhost:3000`.

## API Documentation

### Park a Vehicle

Parks a vehicle and returns a parking ticket.

-   **Endpoint**: `POST /api/parking/park`
-   **Request Body**:
    ```json
    {
      "licensePlate": "string",
      "vehicleType": "Motorcycle" | "Car" | "Bus"
    }
    ```
-   **Example `curl` command**:
    ```bash
    curl -X POST http://localhost:3000/api/parking/park \
    -H "Content-Type: application/json" \
    -d '{
      "licensePlate": "VEH-123",
      "vehicleType": "Car"
    }'
    ```

### Unpark a Vehicle

Unparks a vehicle and calculates the fee.

-   **Endpoint**: `POST /api/parking/unpark/:ticketId`
-   **URL Parameter**:
    -   `ticketId` (string): The ID of the ticket received when parking.
-   **Example `curl` command**:
    ```bash
    curl -X POST http://localhost:3000/api/parking/unpark/your-ticket-id
    ``` 