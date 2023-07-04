const express = require("express");
const errorHandler = require("./Middleware/ErrorHandler");
const connectDb = require("./Config/dbConnections");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORt || 5001;
connectDb();
app.use(express.json());
app.use("/api/contacts", require("./Routes/ContactRoutes"));
app.use("/api/user", require("./Routes/UserRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
