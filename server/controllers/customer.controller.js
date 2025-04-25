//Utils
import asyncHandler from "express-async-handler";
import { findProductsByIdUtility } from "../utility/findProduct.js";
//Models
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";

import { redisClient } from "../config/redis.js";

// Post
const createCustomer = asyncHandler(async (req, res) => {
  console.log("Bodyyy: ", req.body);

  const data = req.body;
  if (!data.name || !data.phone || !data.address) {
    res.status(400).json({ error: "قم بملئ جميع الحقول" });
  }
  const customerExists = await Customer.findOne({ name: data?.name }).lean();
  if (customerExists) {
    res.status(400).json({ error: "العميل موجود مسبقا" });
  }
  await Customer.create({
    ...data,
  });
  res.status(201).json({ message: "تم انشاء العميل بنجاح" });
});

const buyProduct = asyncHandler(async (req, res) => {
  const { id: customerId } = req.params;
  const { productId, installment } = req.body;
  const product = await Product.findById(productId);
  if (product.stock <= 0) {
    return res
      .status(400)
      .json({ error: "المنتج غير متوفر جرب اضافه بعض منه للمخزن" });
  }
  const customer = await Customer.findById(customerId);

  customer.products.push({
    product: productId,
  });

  const targetProduct = findProductsByIdUtility(customer.products, productId); //finds the product in the customer products so we can make changes or add installments to it
  if (!targetProduct) {
    return res.status(404).json({ error: "Product is not found!" });
  }
  await redisClient.del("products");
  targetProduct.installments.push({ amount: installment });
  let total = 0;
  targetProduct.installments.forEach((install) => {
    total += install.amount;
  });

  product.stock -= 1;
  await product.save();

  if (total >= product.price) {
    targetProduct.paid = true;
  }

  await customer.save();

  res.status(200).json({ message: "تم شراء المنتج بنجاح" });
});

const addInstallments = asyncHandler(async (req, res) => {
  const { id: customerId } = req.params;
  const { productId, installment } = req.body;
  const customer = await Customer.findById(customerId);

  const targetProduct = findProductsByIdUtility(customer.products, productId);

  if (!targetProduct)
    return res.status(404).json({ error: "Product is not found!" });

  targetProduct.installments.push({ amount: installment });

  let total = 0;

  targetProduct.installments.forEach((install) => {
    total += install.amount;
  });
  const product = await Product.findById(productId).lean();
  if (total >= product.price) {
    targetProduct.paid = true;
  }
  await customer.save();
  res.status(200).json({ message: "تمت اضافه القسط بنجاح!" });
});

// Get
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({}, "name phone").lean();
  res.status(200).json(customers);
});

const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findById(id)
    .populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .lean();

  if (customer?.products?.length > 0) {
    customer.products.forEach((p) => {
      if (Array.isArray(p.installments)) {
        p.installments.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
      }
    });
  }

  res.status(200).json(customer);
});

// Patch
const updateCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  await Customer.findByIdAndUpdate(id, updateData);

  res.status(200).json({ message: "تح تحديث البيانات بنجاح" });
});

export {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  buyProduct,
  addInstallments,
};
