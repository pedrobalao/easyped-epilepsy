import express from "express";
import QRCode from "qrcode";
import { randomUUID } from "crypto";
import { Patient } from "../models/Patient";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = express.Router();

// Create a new patient
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, age, bloodType, emergencyContacts, observations } = req.body;

    // Validate required fields
    if (
      !name ||
      !age ||
      !bloodType ||
      !emergencyContacts ||
      emergencyContacts.length === 0
    ) {
      return res.status(400).json({
        message:
          "Name, age, blood type, and at least one emergency contact are required",
      });
    }

    // Generate unique QR code identifier
    const qrCodeId = randomUUID();

    // Create patient
    const patient = new Patient({
      name,
      age,
      bloodType,
      emergencyContacts,
      observations,
      qrCode: qrCodeId,
      createdBy: (req as AuthRequest).user.userId,
    });

    await patient.save();

    // Generate QR code URL that points to the public patient info page
    const qrCodeUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/emergency/${qrCodeId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);

    res.status(201).json({
      message: "Patient created successfully",
      patient: {
        id: patient._id,
        name: patient.name,
        qrCode: qrCodeId,
        qrCodeDataUrl,
      },
    });
  } catch (error) {
    console.error("Create patient error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all patients for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find({
      createdBy: (req as AuthRequest).user.userId,
      isActive: true,
    }).select("-__v");

    res.json({ patients });
  } catch (error) {
    console.error("Get patients error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a specific patient by ID (for the owner)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      createdBy: (req as AuthRequest).user.userId,
      isActive: true,
    }).select("-__v");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Generate QR code data URL
    const qrCodeUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/patient/${patient.qrCode}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrCodeUrl);

    res.json({
      patient: {
        ...patient.toObject(),
        qrCodeDataUrl,
      },
    });
  } catch (error) {
    console.error("Get patient error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get patient info by QR code (public endpoint for emergency access)
router.get("/qr/:qrCode", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      qrCode: req.params.qrCode,
      isActive: true,
    }).select("name age bloodType emergencyContacts observations");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ patient });
  } catch (error) {
    console.error("Get patient by QR error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a patient
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: (req as AuthRequest).user.userId,
        isActive: true,
      },
      { ...req.body },
      { new: true }
    ).select("-__v");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    console.error("Update patient error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Soft delete a patient
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: (req as AuthRequest).user.userId,
        isActive: true,
      },
      { isActive: false },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Delete patient error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
