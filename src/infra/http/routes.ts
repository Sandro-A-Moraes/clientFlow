import { Router } from "express";
import { authRoutes } from "../../modules/auth/routes/auth.routes";
import { clientRoutes } from "../../modules/clients/routes/client.routes";
import { appointmentRouter } from "../../modules/appointments/routes/appointment.routes";


const router = Router();

router.use("/auth", authRoutes);

router.use("/clients", clientRoutes);

router.use("/appointments", appointmentRouter);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


export default router;