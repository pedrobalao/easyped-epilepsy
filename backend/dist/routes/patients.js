"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrcode_1 = __importDefault(require("qrcode"));
const crypto_1 = require("crypto");
const Patient_1 = require("../models/Patient");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Create a new patient
router.post("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const { name, dateOfBirth, medicalConditions, medications, emergencyContacts, allergies, seizureHistory, emergencyInstructions, } = req.body;
        // Generate unique QR code identifier
        const qrCodeId = (0, crypto_1.randomUUID)();
        // Create patient
        const patient = new Patient_1.Patient({
            name,
            dateOfBirth,
            medicalConditions,
            medications,
            emergencyContacts,
            allergies,
            seizureHistory,
            emergencyInstructions,
            qrCode: qrCodeId,
            createdBy: req.user.userId,
        });
        await patient.save();
        // Generate QR code URL that points to the public patient info page
        const qrCodeUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/patient/${qrCodeId}`;
        const qrCodeDataUrl = await qrcode_1.default.toDataURL(qrCodeUrl);
        res.status(201).json({
            message: "Patient created successfully",
            patient: {
                id: patient._id,
                name: patient.name,
                qrCode: qrCodeId,
                qrCodeDataUrl,
            },
        });
    }
    catch (error) {
        console.error("Create patient error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Get all patients for the authenticated user
router.get("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const patients = await Patient_1.Patient.find({
            createdBy: req.user.userId,
            isActive: true,
        }).select("-__v");
        res.json({ patients });
    }
    catch (error) {
        console.error("Get patients error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Get a specific patient by ID (for the owner)
router.get("/:id", auth_1.authMiddleware, async (req, res) => {
    try {
        const patient = await Patient_1.Patient.findOne({
            _id: req.params.id,
            createdBy: req.user.userId,
            isActive: true,
        }).select("-__v");
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        // Generate QR code data URL
        const qrCodeUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/patient/${patient.qrCode}`;
        const qrCodeDataUrl = await qrcode_1.default.toDataURL(qrCodeUrl);
        res.json({
            patient: {
                ...patient.toObject(),
                qrCodeDataUrl,
            },
        });
    }
    catch (error) {
        console.error("Get patient error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Get patient info by QR code (public endpoint for emergency access)
router.get("/qr/:qrCode", async (req, res) => {
    try {
        const patient = await Patient_1.Patient.findOne({
            qrCode: req.params.qrCode,
            isActive: true,
        }).select("name dateOfBirth medicalConditions medications emergencyContacts allergies seizureHistory emergencyInstructions");
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json({ patient });
    }
    catch (error) {
        console.error("Get patient by QR error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Update a patient
router.put("/:id", auth_1.authMiddleware, async (req, res) => {
    try {
        const patient = await Patient_1.Patient.findOneAndUpdate({
            _id: req.params.id,
            createdBy: req.user.userId,
            isActive: true,
        }, { ...req.body }, { new: true }).select("-__v");
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json({
            message: "Patient updated successfully",
            patient,
        });
    }
    catch (error) {
        console.error("Update patient error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Soft delete a patient
router.delete("/:id", auth_1.authMiddleware, async (req, res) => {
    try {
        const patient = await Patient_1.Patient.findOneAndUpdate({
            _id: req.params.id,
            createdBy: req.user.userId,
            isActive: true,
        }, { isActive: false }, { new: true });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json({ message: "Patient deleted successfully" });
    }
    catch (error) {
        console.error("Delete patient error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
//# sourceMappingURL=patients.js.map