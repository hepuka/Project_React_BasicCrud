import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "user");

const User = mongoose.model("user", userSchema);

export default User;
