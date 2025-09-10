import mongoose, { Document } from "mongoose";
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
export declare const Patient: mongoose.Model<IPatient, {}, {}, {}, mongoose.Document<unknown, {}, IPatient, {}, {}> & IPatient & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Patient.d.ts.map