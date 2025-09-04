import express from "express";
import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  changePassword,
} from "../controller/user-controller.js";

const router = express.Router();

// Static routes first
router.post("/add", addUser);
router.get("/all", getUsers);
router.put("/change-password", changePassword);

// Dynamic routes last
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
