import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Category from "../models/category.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "قم باضافه اسم للصنف" });
  }
  const categoryExists = await Category.findOne({ name: name }).lean();
  if (categoryExists) {
    res.status(400).json({ error: "الصنف موجود مسبقا" });
  }
  const category = await Category.create({ name });
  res.status(201).json({ "تم انشاء الصنف بنجاح": name });
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).lean();
  res.status(200).json(categories);
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).lean();
  res.status(200).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findById(id);
  category.name = name;
  await category.save();
  res.status(200).json({ message: `${name} تم تعديل اسم الصنف بنجاح ` });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Category.deleteOne({ _id: id }).lean();
  res.status(200).json({ message: "تم الحذف بنجاح" });
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
