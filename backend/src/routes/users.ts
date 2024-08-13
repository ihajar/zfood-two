import express from "express";
import * as UserController from "../controllers/users";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});


const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.patch("/:userId", upload.single('profilePic') ,UserController.updateUser);

router.get("/all-users", UserController.getAllUsers);

router.delete("/delete/:userId", UserController.deleteUser);

export default router;