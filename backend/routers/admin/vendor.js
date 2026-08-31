import { Router } from "express";
import { createVendor, deleteVendor, getAllVendors, getVendorById, updateVendor } from "../../controllers/admin/vendorController.js";

export const vendorRouter = Router()

vendorRouter.get("/getAll", getAllVendors)
vendorRouter.get("/get/:id", getVendorById)
vendorRouter.put("/update/:id", updateVendor)
vendorRouter.post("/add", createVendor)
vendorRouter.delete("/delete/:id", deleteVendor)