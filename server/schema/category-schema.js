import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, "category");

const Category = mongoose.model("category", categorySchema);

export default Category;
