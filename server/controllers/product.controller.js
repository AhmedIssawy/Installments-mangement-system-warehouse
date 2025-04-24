//Models
import Product from "../models/product.model.js";

//Cach
import { redisClient } from "../config/redis.js";

//Utils
import asyncHandler from "express-async-handler";

//timers
const fiveMinutes = 60 * 5;

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

  const createdProduct = await Product.create({
    ...data,
  });
  await redisClient.setEx(
    `products:${createdProduct._id}`,
    fiveMinutes,
    JSON.stringify(createdProduct)
  );
  await redisClient.del("products");
  res.status(201).json({ message: "تم انشاء المنتج بنجاح" });
});

//patch req
const addStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  const product = await Product.findById(id);
  product.stock += stock;
  await product.save();
  await redisClient.setEx(
    `products:${id}`,
    fiveMinutes,
    JSON.stringify(product)
  );
  redisClient.del("products");
  res.status(200).json({ message: `تمت اضافه ${stock} بنجاح للمنتج` });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await Product.findByIdAndUpdate(id, data);

  await redisClient.setEx(`products:${id}`, fiveMinutes, JSON.stringify(data));
  await redisClient.del("products");
  res.status(200).json({ message: `تم تحديث المنتج بنجاح` });
});

//Get req
const getAllProducts = asyncHandler(async (req, res) => {
  const cachedProducts = await redisClient.get("products");

  if (cachedProducts) {
    return res.json(JSON.parse(cachedProducts));
  }

  const products = await Product.find().populate("category", "name").lean();

  await redisClient.setEx("products", fiveMinutes, JSON.stringify(products));

  return res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cachedProduct = await redisClient.get(`products:${id}`);

  if (cachedProduct) {
    return res.json(JSON.parse(cachedProduct));
  }

  const product = await Product.findById(id)
    .populate("category", "name")
    .lean();

  await redisClient.setEx(
    `products:${id}`,
    fiveMinutes,
    JSON.stringify(product)
  );
  await redisClient.del("products");
  res.status(200).json(product);
});

const getProductByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cachedProducts = await redisClient.get(`products:${id}`);
  if (cachedProducts) {
    return res.json(JSON.parse(cachedProducts));
  }

  const products = await Product.find({ category: id })
    .populate("category", "name")
    .lean();

  res.status(200).json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Promise.all([
      redisClient.del(`products:${id}`),
      redisClient.del("products"),
    ]);
    console.log(`Deleted Redis keys: products:${id}, products`);
  } catch (err) {
    console.error("Redis deletion error:", err);
  }

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
