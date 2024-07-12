import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username Is Required!"],
    minLength: [6, "Username must contain at least 6 Characters!"],
    maxLength: [15, "Username can contain at most 15 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [6, "Password must contain at least 6 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Client", "Admin"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
