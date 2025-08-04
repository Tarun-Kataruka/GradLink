import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";
import User from "../../models/User";
import { generateToken } from "../../utils/generateToken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const createUserInDB = async (req: Request, res: Response) => {
  try {
    const firstName = req.body.firstName?.trim();
    const lastName = req.body.lastName?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uid = uuidv4().replace(/-/g, "");

    const baseUsername = `${firstName}${lastName}`.toLowerCase();
    let username: string;
    let isUnique = false;

    do {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      username = `${baseUsername}${randomDigits}`;
      const existingUsername = await User.findOne({ username });
      isUnique = !existingUsername;
    } while (!isUnique);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      uid,
      username,
    });

    const token = generateToken({ id: user.uid, email: user.email });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          uid: user.uid,
          username: user.username,
        },
      });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export  const getUserFromDB = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ type: "notFound", message: "User not found" });
    }
    return res.status(200).json({
      uid: user.uid,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      college: user.college,
      graduationYear: user.graduationYear,
      branch: user.branch,
      jobTitle: user.jobTitle,
      company: user.company,
      linkedin: user.linkedin,
      github: user.github,
      portfolio: user.portfolio,
      bio: user.bio,
      photo: user.photo,
      socialLinks: user.socialLinks,
    });
  } catch (err) {
    console.error("Error identifying user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signInUserInDB = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken({ id: user.uid, email: user.email });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Signed in successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          uid: user.uid,
        },
      });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const googleAuthHandler = async (req: Request, res: Response) => {
  const googleToken = req.query.token as string;

  try {
    if (!googleToken) {
      return res.status(400).json({ message: "Missing token" });
    }

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      const uid = uuidv4().replace(/-/g, "");

      const baseUsername = `${payload.given_name}${payload.family_name}`.toLowerCase();
      let username = baseUsername;
      let suffix = 1;

      while (await User.findOne({ username })) {
        username = `${baseUsername}${suffix++}`;
      }

      // Create user (no password)
      user = await User.create({
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        username,
        uid,
        photo: payload.picture,
      });
    }

    const authToken = generateToken({ id: user.uid, email: user.email });

    res
      .cookie("token", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(`http://localhost:3000/${user.username}`);
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};
interface MulterRequest extends Request {
  file?: Express.Multer.File;
  user?: any;
}

export const updateProfile = async (req: MulterRequest, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      college,
      graduationYear,
      branch,
      jobTitle,
      company,
      linkedin,
      github,
      portfolio,
      bio,
      socialLinks,
    } = req.body;

    const userId = req.user?.uid;

    const updateData: Record<string, any> = {
      firstName,
      lastName,
      college,
      graduationYear,
      branch,
      jobTitle,
      company,
      linkedin,
      github,
      portfolio,
      bio,
    };

    if (req.file) {
      updateData.photo = req.file.buffer.toString("base64");
    }

    if (socialLinks) {
      try {
        const parsedLinks = JSON.parse(socialLinks);

        if (Array.isArray(parsedLinks)) {
          // Ensure each entry has type & url
          const validLinks = parsedLinks
            .filter((link) => link && link.type && link.url)
            .map((link) => ({
              type: String(link.type).trim(),
              url: String(link.url).trim(),
            }));

          updateData.socialLinks = validLinks;
        }
      } catch (e) {
        return res.status(400).json({ message: "Invalid socialLinks format" });
      }
    }
    
    const updatedUser = await User.findOneAndUpdate({ uid: userId }, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};