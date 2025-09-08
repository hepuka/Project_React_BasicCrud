import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  published: { type: Number, required: true },
  language: { type: String, required: true },
  pages: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  isbn: { type: Number, required: true },
  rating: { type: Number, required: true },
  status: { type: String, required: true },
  rentedBy: { type: Number, required: true },
});

autoIncrement.initialize(mongoose.connection);
bookSchema.plugin(autoIncrement.plugin, "book");

const Book = mongoose.model("book", bookSchema);

export default Book;
