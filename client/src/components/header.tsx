// Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGE_URLS } from "../libs/imageUrls";

type HeaderProps = {
  onLoginClick?: () => void;
};

export default function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="bg-transparent px-4 py-4 flex justify-between items-center max-w-7xl mx-auto">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image src={IMAGE_URLS.LOGO_IMG} alt="GradLink Logo" width={90} height={90} />
      </Link>

      {/* Navigation Links */}
      <nav className="space-x-6 hidden sm:flex">
        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
          Home
        </Link>
        <Link href="/faqs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
          FAQs
        </Link>
      </nav>

      {/* Login Button */}
      <button
        onClick={onLoginClick}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
      >
        Login
      </button>
    </header>
  );
}
