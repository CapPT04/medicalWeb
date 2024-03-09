import express from "express";


let confifgViewEngine = (app) => {
    //arrow function
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs"); //jsp, blade
    app.set("views", "./src/views")
}

module.exports = confifgViewEngine