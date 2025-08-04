"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

type UserProfileData = {
  firstName: string;
  lastName: string;
  college: string;
  graduationYear: string;
  branch: string;
  jobTitle: string;
  company: string;
  linkedin: string;
  github: string;
  portfolio: string;
  bio: string;
  photo: File | null;
  socialLinks?: string[];
};

type Props = {
  user: UserProfileData;
  username: string;
  onClose: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserProfileData | null>>;
};

export default function ProfileForm({ user, username, onClose }: Props) {
  const [formData, setFormData] = useState<UserProfileData>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    college: user.college || "",
    graduationYear: user.graduationYear || "",
    branch: user.branch || "",
    jobTitle: user.jobTitle || "",
    company: user.company || "",
    linkedin: user.linkedin || "",
    github: user.github || "",
    portfolio: user.portfolio || "",
    bio: user.bio || "",
    photo: null,
    socialLinks: user.socialLinks || [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/identify/${username}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user");

        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (error: unknown) {
        toast.error((error as Error).message || "Failed to load user data");
      }
    };

    fetchUserData();
  }, [username]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    (Object.keys(formData) as (keyof UserProfileData)[]).forEach((key) => {
      const value = formData[key];
      if (key === "photo" && value instanceof File) {
        form.append(key, value); // file
      } else if (key !== "socialLinks" && value) {
        form.append(key, value as string);
      }
    });

    if (formData.socialLinks && Array.isArray(formData.socialLinks)) {
      formData.socialLinks.forEach((link) => {
        form.append(`socialLinks[]`, link);
      });
    }  

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/update-profile`,
      {
        method: "POST",
        credentials: "include",
        body: form,
      }
    );

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.message || "Failed to update profile");
      return;
    }

    toast.success("Profile updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50  overflow-y-auto px-4 py-10">
      <div className="relative max-w-5xl w-full mx-auto bg-gray-200 p-8 rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <section className="bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 border-b pb-1">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Upload Profile Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b pb-2">
              Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Graduation Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Year
                </label>
                <select
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select</option>
                  {[...Array(35)].map((_, i) => {
                    const currentYear = new Date().getFullYear();
                    const year = currentYear + 4 - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* College */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  College Name
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </section>

          {/* Professional Info */}
          <section className="bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 border-b pb-1">
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Role
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
          </section>

          {/* Social Links */}
          {/* Social Links */}
          <section className="bg-white border border-gray-300 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 border-b pb-1">
              Social Links
            </h3>

            {formData.socialLinks && formData.socialLinks.length > 0 ? (
              <div className="space-y-3">
                {formData.socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => {
                        const updatedLinks = [...(formData.socialLinks || [])];
                        updatedLinks[index] = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          socialLinks: updatedLinks,
                        }));
                      }}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedLinks = formData.socialLinks?.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          socialLinks: updatedLinks,
                        }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      socialLinks: [...(prev.socialLinks || []), ""],
                    }))
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Add Another Social Link
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, socialLinks: [""] }))
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Add Social Links
                </button>
              </div>
            )}
          </section>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
