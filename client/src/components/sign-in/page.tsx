"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IMAGE_URLS } from "../../libs/imageUrls";
import { X, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

type Props = {
  isSignInOpen: boolean;
  onSignInClose: () => void;
  openSignUpModal: () => void;
};

export default function SignIn({
  isSignInOpen,
  onSignInClose,
  openSignUpModal,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Sign in failed");
      }

      toast.success("Signed in successfully!");
      onSignInClose();
      router.push(`/${data.user.username}`);
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("Something went wrong");
    }
  };

  if (!isSignInOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-md relative bg-white shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onSignInClose}
        >
          <X className="h-5 w-5" />
        </button>

        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src={IMAGE_URLS.LOGO_IMG}
              alt="GradLink Logo"
              width={60}
              height={60}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800">
            Welcome Back
          </CardTitle>
          <CardDescription>Sign in to your alumni account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* ✅ Google Login */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse.credential;
              if (!token) return toast.error("Google sign-in failed");

              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/google-auth?token=${token}`;
            }}
            onError={() => toast.error("Google Sign In failed")}
          />

          <div className="text-center text-sm">
            Don’t have an account?{" "}
            <button
              className="text-blue-600 hover:underline font-medium"
              onClick={() => {
                onSignInClose();
                openSignUpModal();
              }}
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
