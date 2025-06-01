import mongoose from "mongoose";

const Connection = () => {
  const URLa =
    "mongodb+srv://kavezo:rkPLxRSJSpcSjeap@cluster0.q7veg.mongodb.net/react_basic_crud?retryWrites=true&w=majority&appName=Cluster0";

  try {
    mongoose.connect(URLa, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default Connection;
