const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    options: {},
    stock: {
      type: Number,
      required: true, 
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ], 
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
