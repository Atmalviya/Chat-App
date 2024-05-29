const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DB");
const dotenv = require("dotenv");
const router = require('./routes/index')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);


//* API END POINTS 

app.use('/api', router);


app.get("/", (req, res) => {
  res.status(200).json({ msg: `server running at ${PORT}` });
});
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong during mongoDB connection", err);
  });
