require("dotenv").config();
require("express-async-errors");
// async errors

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.json());

// db

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

// route

app.get("/", (req, res) => {
  res.send("<h3>Store Api</h3><a href='/api/v1/products'>products route</a>");
});
app.use("/api/v1/products", productRouter);

// products route
app.use(notFoundMiddleware); // after app.get('/')
app.use(errorHandlerMiddleware); // after app.get('/')

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    connectDB(process.env.MONGOO_URI);
    app.listen(port, () => {
      console.log(`listen on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
