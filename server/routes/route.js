import express from "express";
import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  changePassword,
} from "../controller/user-controller.js";
import { addBook } from "../controller/book-controller.js";
import { loginUser, logoutUser } from "../controller/login-controller.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getUsers);
router.put("/change-password", changePassword);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.post("/addBook", addBook);

export default router;
