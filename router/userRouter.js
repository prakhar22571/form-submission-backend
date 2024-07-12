import express from "express";
import {
  addNewAdmin,
  getUserDetails,
  login,
  logoutAdmin,
  logoutClient,
  clientRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isClientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/client/register", clientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/client/me", isClientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/client/logout", isClientAuthenticated, logoutClient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
