import Book from "../schema/book-schema.js";

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

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
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

export const getBooksByAuthor = async (request, response) => {
  try {
    const books = await Book.find({ author: request.params.author });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByTitle = async (request, response) => {
  try {
    const books = await Book.find({ title: request.params.title });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByGenre = async (request, response) => {
  try {
    const books = await Book.find({ genre: request.params.genre });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByPublisher = async (request, response) => {
  try {
    const books = await Book.find({ publisher: request.params.publisher });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByYear = async (request, response) => {
  try {
    const books = await Book.find({ year: request.params.year });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByRating = async (request, response) => {
  try {
    const books = await Book.find({ rating: request.params.rating });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByLanguage = async (request, response) => {
  try {
    const books = await Book.find({ language: request.params.language });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByFormat = async (request, response) => {
  try {
    const books = await Book.find({ format: request.params.format });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByISBN = async (request, response) => {
  try {
    const books = await Book.find({ ISBN: request.params.ISBN });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByStock = async (request, response) => {
  try {
    const books = await Book.find({ stock: request.params.stock });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByStatus = async (request, response) => {
  try {
    const books = await Book.find({ status: request.params.status });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getBooksByCategory = async (request, response) => {
  try {
    const books = await Book.find({ category: request.params.category });
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
