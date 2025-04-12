const mongoose = require("moongose");
const adminSchema = new mongoose.Schema({
  Role: {
    type: String,
    default: "Admin",
  },
});
module.exports = User.discriminator("Admin", adminSchema);
