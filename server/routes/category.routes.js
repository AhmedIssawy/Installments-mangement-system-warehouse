import { Router } from "express";

import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/category").get(getAllCategories).post(createCategory);

router
  .route("/category/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

export default router;
