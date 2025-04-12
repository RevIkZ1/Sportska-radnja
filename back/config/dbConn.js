const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://petarstanojkovic2021:PwP0XBKLlDrvXUKe@cluster0.gea3pzz.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch {
    console.error(err);
  }
};
module.exports = connectDB;
