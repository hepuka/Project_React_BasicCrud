import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

autoIncrement.initialize(mongoose.connection);
languageSchema.plugin(autoIncrement.plugin, "language");

const Language = mongoose.model("language", languageSchema);

export default Language;
