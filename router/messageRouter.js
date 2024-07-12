import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import {
  isAdminAuthenticated,
  isClientAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();

router.post("/send", isClientAuthenticated, sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;
