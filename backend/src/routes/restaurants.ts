import express from "express";
import * as RestaurantsController from "../controllers/restaurants";

const router = express.Router();

router.get("/", RestaurantsController.getRestaurants);
router.get("/:restaurantId", RestaurantsController.getRestaurant);
router.get("search/:city", RestaurantsController.searchRestaurant);

export default router;
