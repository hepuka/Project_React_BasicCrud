import express from "express";
import {
  addUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  changePassword,
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

router.post("/add", addUser);
router.get("/all", getUsers);
router.put("/change-password", changePassword);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/categories", getCategories);
router.get("/languages", getLanguages);
router.post("/addBook", addBook);
router.post("/addLanguage", addLanguage);
router.post("/addCategory", addCategory);
router.post("/books/search", searchBooks);
router.get("/books", getBooks);
router.post("/rent", addRent);
router.get("/rents", getRents);

router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/book/:id", getBook);
router.put("/book/edit/:id", editBook);
router.delete("/book/:id", deleteBook);
router.get("/rent/:id", getRent);
router.get("/rent/user/:userid", getRentByUser);
router.put("/rent/:id", updateRent);

export default router;
