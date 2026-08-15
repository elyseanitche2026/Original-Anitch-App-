import { Router } from "express";
import { authenticate, requireRole } from "../middlewares/auth.middleware";
import {
  createDeliveryHandler,
  acceptDeliveryHandler,
  makeOfferHandler,
  acceptOfferHandler,
  scanPickupHandler,
  requestDropoffOtpHandler,
  completeDeliveryHandler,
  submitSurveyHandler,
} from "../controllers/delivery.controller";

const router = Router();

router.post("/", authenticate, requireRole("MERCHANT"), createDeliveryHandler);
router.patch("/:deliveryId/accept", authenticate, requireRole("COURIER"), acceptDeliveryHandler);

router.post("/:deliveryId/offers", authenticate, requireRole("MERCHANT", "COURIER"), makeOfferHandler);
router.patch("/:deliveryId/offers/:offerId/accept", authenticate, requireRole("MERCHANT", "COURIER"), acceptOfferHandler);

router.post("/:deliveryId/scan-pickup", authenticate, requireRole("COURIER"), scanPickupHandler);
router.post("/:deliveryId/request-dropoff-otp", authenticate, requireRole("COURIER"), requestDropoffOtpHandler);
router.post("/:deliveryId/complete", authenticate, requireRole("COURIER"), completeDeliveryHandler);

router.patch("/surveys/:surveyId/respond", authenticate, requireRole("MERCHANT", "RECIPIENT"), submitSurveyHandler);

export default router;
