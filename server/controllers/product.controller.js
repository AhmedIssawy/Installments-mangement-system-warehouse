//Models
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

//Utils
import asyncHandler from "express-async-handler";

//post req
const createProduct = asyncHandler(async (req, res) => {
  const data = req.body;
  const productExists = await Product.findOne({
    name: data.name,
  });
  if (productExists)
    res
      .status(400)
      .json({ error: "هذا المنتج موجود مسبقا لا جاحه لانشائه مجددا" });
  console.log(data);

  await Product.create({
    ...data,
  });
  res.status(201).json({ message: "تم انشاء المنتج بنجاح" });
});

//patch req
const addStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  const product = await Product.findById(id);
  product.stock += stock;
  await product.save();
  res.status(200).json({ message: `تمت اضافه ${stock} بنجاح للمنتج` });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await Product.findByIdAndUpdate(id, data);
  res.status(200).json({ message: `تم تحديث المنتج بنجاح` });
});

//Get req
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category", "name").lean();
  res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("category", "name")
    .lean();
  res.status(200).json(product);
});

const getProductByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ category: id })
    .populate("category", "name")
    .lean();
  res.status(200).json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.status(200).json({ product });
});

export {
  createProduct,
  updateProduct,
  addStock,
  getProductById,
  getAllProducts,
  getProductByCategory,
  deleteProduct,
};
