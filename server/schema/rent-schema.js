import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const rentSchema = mongoose.Schema({
  bookids: { type: Array, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  issued: { type: String, required: true },
});

autoIncrement.initialize(mongoose.connection);
rentSchema.plugin(autoIncrement.plugin, "rent");

const Rent = mongoose.model("rent", rentSchema);

export default Rent;
