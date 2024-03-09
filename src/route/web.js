import express from "express";
import homeController from "../controllers/homeController";


let router = express.Router();


let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    app.use("/", router);
};


//rest api

module.exports = initWebRoutes