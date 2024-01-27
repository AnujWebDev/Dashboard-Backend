import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "This is Home Route" }));


export default router;
