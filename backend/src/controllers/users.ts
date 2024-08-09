import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import brcypt from "bcrypt";
import mongoose, { Types } from "mongoose";



export const getAuthenticatedUser: RequestHandler = async(req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        if(!authenticatedUserId) {
            throw createHttpError(401, "User not authenticated");
        }

        const user = await UserModel.findById(authenticatedUserId).select("+email").exec();
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};

interface SingUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SingUpBody, unknown> = async(req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if(!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }
        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if(existingUsername) {
            throw createHttpError(409, "Username already taken! Please choose a different one or log in instead.");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if(existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead");
        }

        const passwordHashed = await brcypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        if(!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }
    
    const user = await UserModel.findOne({ username: username }).select("+password +email").exec();
    
    if(!user) {
        throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await brcypt.compare(password, user.password);

    if(!passwordMatch){
        throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(201).json(user);

    } catch (error) {
        next(error);
    }
};


export const logout: RequestHandler = async(req, res, next) => {
    req.session.destroy(error => {
        if(error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
};

interface UpdateUserParams {
    userId: string,
}

interface updateUserBody {
    username?: string,
    email?: string,
    password?: string,
    profilePic?: string, 
    address?: string,
    city?: string,
    country?: string,
}

export const updateUser: RequestHandler<UpdateUserParams, unknown, updateUserBody, unknown> = async(req, res, next) => {
    const authenticatedUserId = req.session.userId as string | undefined;
    const userId = req.params.userId;

    // extract update fields:
    const { username, email, password, profilePic, address, city, country } = req.body;

    try {
        if(!authenticatedUserId) {
            throw createHttpError(401, "User not authenticated");
        }

        const user = await UserModel.findById(userId).exec();
        if(!user) {
            throw createHttpError(404, "User not found");
        }
        if (userId !== authenticatedUserId) {
            throw createHttpError(403, "You are not authorized to update this user");
        }

        if(username) user.username = username;
        if(email) user.email = email;
        if(password) user.password = await brcypt.hash(password, 10);
        if(profilePic) user.profilePic = profilePic;
        if(address) user.address = address;
        if(city) user.city = city;
        if(country) user.country = country;

        const updatedUser = await user.save();
        // const updatedUser = await UserModel.findByIdAndUpdate(userId).exec();

        res.status(200).json(updatedUser);

    } catch (error) {
        next(error);
    }
    
};

export const getAllUsers: RequestHandler = async(req, res, next) => {
    try {
        const allUsers = await UserModel.find().select("+email").exec();
        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
};


export const deleteUser: RequestHandler<{ userId: string }> = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById(userId).exec();
        
        if(!user) {
            throw createHttpError(404, "User not found");
        }

        const authenticatedUserId = req.session.userId as string | undefined;
        if(authenticatedUserId !== userId) {
            throw createHttpError(403, "You are not authorized to delete this user");
        }

        await UserModel.findByIdAndDelete(userId).exec();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}
