import { json, RequestHandler } from "express";
import Restaurant from "../models/restaurant";
import createHttpError from "http-errors";

export const getRestaurants: RequestHandler = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find().exec();
        res.status(200).json(restaurants);
    } catch (error) {
        next(error);
    }
}

export const getRestaurant: RequestHandler = async(req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurant =  await Restaurant.findById(restaurantId).exec();

        if(!restaurant) {
            throw createHttpError(404, "restaurant not found");
        }
        res.status(200).json(restaurant);
    } catch (error) {
        next(error);
    }
};

export const searchRestaurant: RequestHandler = async(req, res, next) => {
    try {
        const city = req.params.city;

        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {};

        query["city"] = new RegExp(city, "i")
        const cityCheck = await Restaurant.countDocuments(query).exec();
        if(cityCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1,
                },
            });
        }

        if(selectedCuisines) {
            const cuisineArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine, "i"));
            query["cuisines"] = { $all: cuisineArray };
        }

        if(searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] }},
            ];
        }

        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const restaurants = await Restaurant.find(query).sort({ [sortOption]: 1 }).skip(skip).limit(pageSize).lean();
        const total = await Restaurant.countDocuments(query).exec();

        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};