import express from "express";
import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  changePassword,
  returnBook,
  addOrUpdateRent,
} from "../controller/user-controller.js";

import {
  addBook,
  addLanguage,
  addCategory,
  getLanguages,
  getCategories,
  searchBooks,
  getBooks,
  getBook,
  editBook,
  deleteBook,
} from "../controller/book-controller.js";

import { loginUser, logoutUser } from "../controller/login-controller.js";

import {
  addRent,
  getRentByUser,
  getRents,
  getRent,
  updateRent,
} from "../controller/rent-controller.js";

const router = express.Router();

// ---------- AUTH ----------
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// ---------- USER ----------
router.post("/user/add", addUser);
router.get("/user/all", getUsers);
router.put("/user/change-password", changePassword);

// Rent inside user
router.post("/user/rent", addOrUpdateRent);
router.put("/user/:userId/return", returnBook);

// ---------- GENERIC USER ROUTES ----------
router.get("/user/:id", getUser);
router.put("/user/:id", editUser);
router.delete("/user/:id", deleteUser);

// ---------- RENT ----------
router.post("/rent", addRent);
router.get("/rents", getRents);
router.get("/rent/user/:userid", getRentByUser);
router.get("/rent/:id", getRent);
router.put("/rent/:id", updateRent);

// ---------- BOOK ----------
router.post("/book/add", addBook);
router.post("/book/addLanguage", addLanguage);
router.post("/book/addCategory", addCategory);
router.get("/categories", getCategories);
router.get("/languages", getLanguages);
router.post("/books/search", searchBooks);
router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.put("/book/edit/:id", editBook);
router.delete("/book/:id", deleteBook);

export default router;
