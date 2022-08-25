const express = require("express");
const app = express();
const errorMIddleware = require('./middleware/error')

app.use(express.json())


//route imports '
const product = require("./routes/productRoute");
app.use("/api/v1", product);

//Middleware for error
app.use(errorMIddleware)



module.exports = app;
