const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
require("dotenv").config();

const database = mongoose.connection;

database.on("connected",()=>{
    console.log("Database Connected");
});
//Starting Point of the server
app.get("/",cors(),(req,res)=>{
    res.status(200).json("Welcome to Notecompass-API, To use the api navigate through /api route");
});

var corsOptions = {
    origin: '*',
    credentails : true,
    optionSuccessStatus : 200,
    port : PORT,
};

app.use(cors(corsOptions));
app.use(express.json());
//Import route
const routes = require("./routes");

// This will help in the navigating the api using /api route
app.use("/api",routes);

mongoose.connect(process.env.MONGODB_URL);


app.listen(PORT,()=>{
    console.log(`Server started listening on PORT:${PORT}`);
});


module.exports = app;