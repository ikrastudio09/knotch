const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productSize: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const AddressSchema = new mongoose.Schema(
  {
    AddressLine1: {
      type: String,
      required: true,
    },
    AddressLine2: {
      type: String,
    },
    State: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    PinCode: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      default: "India",
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  userNumber: {
    type: String,
  },

  userEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },

  userAddress: {
    type: [AddressSchema],
    default: [],
  },

  userPassword: {
    type: String,
    minlength: 8,
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },

  userRole: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true,
  },

  resetToken: String,
  resetTokenExpiry: Date,

  signUpDate: {
    type: Date,
    default: Date.now,
  },

  cartData: {
    type: [cartSchema],
    default: [],
  },

  wishListData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
