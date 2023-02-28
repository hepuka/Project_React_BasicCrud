import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URLa = `mongodb+srv://${username}:${password}@cluster0.q7veg.mongodb.net/react_basic_crud`;

  try {
    await mongoose.connect(URLa, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default Connection;
