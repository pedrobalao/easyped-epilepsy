import mongoose, { Document, Schema } from "mongoose";

export interface IEmergencyContact {
  name: string;
  relation: string;
  phoneNumber: string;
}

export interface IPatient extends Document {
  name: string;
  age: number;
  bloodType: string;
  emergencyContacts: IEmergencyContact[];
  observations?: string;
  qrCode: string;
  createdBy: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const emergencyContactSchema = new Schema<IEmergencyContact>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 1, max: 120 },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergencyContacts: [emergencyContactSchema],
    observations: { type: String },
    qrCode: { type: String, required: true, unique: true },
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
