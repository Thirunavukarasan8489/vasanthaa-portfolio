import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  details: string;
  status: "new" | "contacted" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    service: {
      type: String,
      required: [true, "Service is required"],
    },
    budget: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      required: [true, "Project details are required"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite in Next.js development hot-reload
export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
