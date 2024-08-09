import express from "express";
import * as UserController from "../controllers/users";


const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.patch("/:userId", UserController.updateUser);

router.get("/all-users", UserController.getAllUsers);

router.delete("/delete/:userId", UserController.deleteUser);

export default router;