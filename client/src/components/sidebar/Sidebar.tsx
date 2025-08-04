"use client";

import React, { useState } from "react";
import {
  Home,
  Users,
  Newspaper,
  Briefcase,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { IMAGE_URLS } from "../../libs/imageUrls";

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "Alumni Profiles", icon: Users },
  { label: "Events & Meetups", icon: Newspaper },
  { label: "Jobs & Mentorship", icon: Briefcase },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-25 z-50 bg-[#0B1C5B] text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header: Logo + Toggle */}
        <div className="flex justify-between items-center p-2 border-b border-[#23327D]">
        <div className="w-full flex justify-start md:justify-center px-2 md:px-0">
          <Image
            src={IMAGE_URLS.LOGO_IMG}
            alt="Logo"
            width={30}
            height={30}
            className="md:w-9 md:h-9 w-7 h-7 "
          />
          </div>

          {/* Close (mobile only) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white absolute top-6 right-2"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center py-6 space-y-6">
          {navItems.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`flex flex-col items-center px-3 py-3 rounded-md w-16 ${
                  isActive
                    ? "bg-[#FFD700] text-black"
                    : "hover:bg-[#FFD700] hover:text-black text-gray-200"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] leading-tight text-center">
                  {label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Toggle menu button (mobile) */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#0B1C5B] text-white rounded"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  );
}