const express = require("express");
const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/parking", parkingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 