import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const rentSchema = new mongoose.Schema({
  bookid: { type: Number, required: true },
  startdate: { type: String },
  enddate: { type: String },
  status: { type: String, default: "Kölcsönözve" },
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
  postcode: { type: Number, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  housenumber: { type: Number, required: true },
  floor: { type: Number, required: true },
  doornumber: { type: Number, required: true },
  rents: [rentSchema],
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "user");

const User = mongoose.model("user", userSchema);

export default User;
