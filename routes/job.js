import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import {
  deleteJob,
  editJob,
  getJobById,
  getAllJobs,
  addJob,
  findByFilter,
} from "../controllers/job.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/one/:id", getJobById);
router.post("/", addJob);
router.get("/filter/:key", findByFilter);
router.patch("/edit/:id", editJob);
router.delete("/delete/:id", deleteJob);

export default router;
