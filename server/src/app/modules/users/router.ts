import express from "express";
import {
    createUserInDB,
    getUserFromDB,
    signInUserInDB,
    googleAuthHandler,
    updateProfile} from "../users/controller";
import { isAuthenticated } from "../../middleware/auth";
import { upload } from "../../middleware/multer";

const router = express.Router();

router.post("/createUser", createUserInDB);
router.get("/identify/:username", getUserFromDB);
router.post("/signin", signInUserInDB);
router.get("/google-auth", googleAuthHandler);
router.post("/update-profile", isAuthenticated,upload.single("photo"), updateProfile);

export default router;
