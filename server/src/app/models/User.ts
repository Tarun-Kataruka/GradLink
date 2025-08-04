import mongoose, { Schema, Document } from "mongoose";

export interface ISocialLink {
  type: string;
  url: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  username: string;
  uid: string;
  college?: string;
  graduationYear?: string;
  branch?: string;
  jobTitle?: string;
  company?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  bio?: string;
  photo?: string; // this could be a URL or base64 string
  socialLinks?: ISocialLink[];
}

const SocialLinkSchema = new Schema<ISocialLink>({
  type: { type: String, required: true },
  url: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    username: { type: String, required: true, unique: true },
    uid: { type: String, required: true, unique: true },
    college: { type: String },
    graduationYear: { type: String },
    branch: { type: String },
    jobTitle: { type: String },
    company: { type: String },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    bio: { type: String },
    photo: { type: String },
    socialLinks: { type: [SocialLinkSchema], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
