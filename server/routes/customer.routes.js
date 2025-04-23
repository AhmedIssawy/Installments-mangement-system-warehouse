import { Router } from "express";
import {
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomerById,
  buyProduct,
  addInstallments,
} from "../controllers/customer.controller.js";
const router = Router();

router.route("/customer").get(getAllCustomers).post(createCustomer);

router.route("/customer/:id/installments").post(addInstallments);
router
.route("/customer/:id")
.get(getCustomerById)
.patch(updateCustomerById)
.post(buyProduct);

export default router;
