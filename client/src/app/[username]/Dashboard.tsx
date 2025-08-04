"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import  ProfileHeader from "../profile/ProfileHeader";
import Loader from "../../components/loader/Loader";

type Props = {
  username: string;
};
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
export default function Dashboard({ username }: Props) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/identify/${username}`
      );
      const data = await res.json();
      console.log("Fetched user data:", data);
      setUser(data);
    };

    fetchUser();
  }, [username]);

  if (!user){
    if (!user) return <Loader text="Loading" />;
  }

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <div className="bg-white">
      <Sidebar />
    </div>
  
    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white">
      <ProfileHeader user={user} username={username} setUser={setUser} />
      </div>
    </div>
  </div>
  
  );
}
