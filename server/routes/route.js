import express from "express";
import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  logoutUser,
} from "../controller/user-controller.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.post("/logout", logoutUser);

export default router;
