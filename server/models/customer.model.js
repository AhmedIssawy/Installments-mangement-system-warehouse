import mongoose from "mongoose";

const ProductEntrySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
    installments: [
      {
        amount: {
          type: Number,
        },
        paidAt: {
          type: Date,
          default: Date.now,
        },
      },
      { _id: true },
    ],

    paid: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    products: [ProductEntrySchema],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
