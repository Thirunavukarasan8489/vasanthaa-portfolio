import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  customId?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  discipline: string;
  highlightMetric?: string;
  year?: string;
  rating?: number;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    customId: {
      type: String,
      trim: true,
      index: true,
    },
    quote: {
      type: String,
      required: [true, "Quote is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role/Title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    discipline: {
      type: String,
      required: [true, "Discipline is required"],
      trim: true,
      default: "Writing",
    },
    highlightMetric: {
      type: String,
      trim: true,
      default: "",
    },
    year: {
      type: String,
      trim: true,
      default: () => new Date().getFullYear().toString(),
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
