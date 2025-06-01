import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const LoginSchema = mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "user");
// we need to turn it into a model
const postUser = mongoose.model("user", userSchema);

export default postUser;
