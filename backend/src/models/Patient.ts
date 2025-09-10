import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
  name: string;
  dateOfBirth: Date;
  medicalConditions: string[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    instructions?: string;
  }[];
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  }[];
  allergies: string[];
  seizureHistory: {
    type: string;
    triggers?: string[];
    duration?: string;
    frequency?: string;
    lastSeizure?: Date;
  };
  emergencyInstructions: string;
  qrCode: string;
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
