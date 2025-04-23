import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    store: {
      type: String,
      // required: true,
      trim: true,
      lowercase: true,
      default: "unknown",
    },
    brand: {
      type: String,
      trim: true,
      lowercase: true,
      default: "unknown",
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
