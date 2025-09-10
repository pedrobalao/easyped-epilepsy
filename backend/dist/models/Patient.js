"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const patientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    medicalConditions: [
        {
            type: String,
            trim: true,
        },
    ],
    medications: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            dosage: {
                type: String,
                required: true,
                trim: true,
            },
            frequency: {
                type: String,
                required: true,
                trim: true,
            },
            instructions: {
                type: String,
                trim: true,
            },
        },
    ],
    emergencyContacts: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            relationship: {
                type: String,
                required: true,
                trim: true,
            },
            phone: {
                type: String,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
            },
        },
    ],
    allergies: [
        {
            type: String,
            trim: true,
        },
    ],
    seizureHistory: {
        type: {
            type: String,
            required: true,
            trim: true,
        },
        triggers: [
            {
                type: String,
                trim: true,
            },
        ],
        duration: {
            type: String,
            trim: true,
        },
        frequency: {
            type: String,
            trim: true,
        },
        lastSeizure: {
            type: Date,
        },
    },
    emergencyInstructions: {
        type: String,
        required: true,
        trim: true,
    },
    qrCode: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Patient = mongoose_1.default.model("Patient", patientSchema);
//# sourceMappingURL=Patient.js.map