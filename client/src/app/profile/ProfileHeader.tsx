"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ProfileForm from "../../components/Profile/ProfileForm";

// You can move this type to a shared location if reused
type UserType = {
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
  user: UserType;
  username: string;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export default function ProfileHeader({ user, username, setUser }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...", username);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full flex justify-end items-center px-6 py-4 bg-white border-b border-gray-200 relative z-20">
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {user.photo ? (
              <Image
                src={
                  typeof user.photo === "string"
                    ? (user.photo as string).startsWith("data:image") // already formatted?
                      ? user.photo
                      : `data:image/jpeg;base64,${user.photo}` // treat as base64
                    : URL.createObjectURL(user.photo) // File object
                }
                alt="Profile"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FaUserCircle className="text-gray-600 w-6 h-6" />
              </div>
            )}

            <span className="font-semibold text-black">{user.firstName}</span>
            <IoIosArrowDown className="w-4 h-4 text-gray-600" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
              <button
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setShowProfileForm(true);
                  setDropdownOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showProfileForm && (
        <ProfileForm
          user={user}
          username={username}
          onClose={() => setShowProfileForm(false)}
          setUser={setUser}
        />
      )}
    </>
  );
}
