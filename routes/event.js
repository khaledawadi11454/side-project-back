import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import {
  deleteEvent,
  editEvent,
  getEventById,
  getAllEvents,
  addEvent,
} from "../controllers/event.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", addEvent);

router.patch("/edit/:id", editEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
