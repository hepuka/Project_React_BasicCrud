import Book from "../schema/book-schema.js";
import Language from "../schema/language-schema.js";
import Category from "../schema/category-schema.js";

export const addBook = async (req, res) => {
  try {
    const book = req.body;
    const newBook = new Book(book);
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const addLanguage = async (req, res) => {
  try {
    const language = req.body;
    const newLanguage = new Language(language);
    await newLanguage.save();

    res.status(201).json(newLanguage);
  } catch (error) {
    console.error(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = new Category(category);
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { name, author, year, category } = req.body;
    let query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (year) query.year = year;
    if (category) query.category = { $regex: category, $options: "i" };

    const books = await Book.find(query);

    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBook = async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    response.status(200).json(book);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const deleteBook = async (request, response) => {
  try {
    await Book.deleteOne({ _id: request.params.id });
    response.status(200).json({ message: "Book deleted Successfully" });
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const editBook = async (request, response) => {
  let book = request.body;
  const editBook = new Book(book);

  try {
    await Book.updateOne({ _id: request.params.id }, editBook);
    response.status(201).json(editBook);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { name, author, year, category } = req.body;

    let query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (year) query.published = year;
    if (category) query.category = category;

    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
