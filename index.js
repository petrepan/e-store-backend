require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product")
const connectDB = require("./config/db")

const app = express();

connectDB();

//Built-in Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//THird-party Middleware
 
app.use(cors());


//Application level middleware

app.use('/api/product', productRoutes)

app.get("/", (req, res) => {
  res.status(200).send("Api is running!");
});

app.all("*", (req, res) => {
  res.status(404).json({ msg: "This URL cannot be found" });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
     