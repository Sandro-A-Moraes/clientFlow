import { Router } from "express";
import { authRoutes } from "../../modules/auth/routes/auth.routes";


const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


export default router;