"use client";

import Hero from "../components/home/Hero";
import Puzzle from "../components/home/Puzzle";
import FeatureCard from "../components/home/FeatureCard";
import Footer from "../components/home/Footer";
import { IMAGE_URLS } from "../libs/imageUrls"; // Keep using this and remove local export

export default function Home() {
  return (
    <main className="bg-[#f9fafb] text-[#1f2937]"> {/* Light gray bg + dark text */}
      {/* Hero Section with Image */}
      <Hero image={IMAGE_URLS.HERO_IMAGE} />

      {/* Puzzle Section with Image */}
      <Puzzle image={IMAGE_URLS.PUZZLE_NETWORK} />
      <FeatureCard
        title="Job Referrals & Opportunities"
        description="Discover and share career openings within the community."
        imageSrc={IMAGE_URLS.JOB_REFERRALS}
        imageWidth={300}
        imageHeight={250}
        imageAlignment="left"
      />

      <FeatureCard
        title="Celebrate Alumni Achievements"
        description="Recognize and showcase alumni milestones and impact."
        imageSrc={IMAGE_URLS.ACHIEVEMENTS}
        imageWidth={300}
        imageHeight={250}
        imageAlignment="right"
      />

      <FeatureCard
        title="AI-Powered Mentorship Matching"
        description="Smart suggestions to help you connect with ideal mentors."
        imageSrc={IMAGE_URLS.MENTOR_MATCH}
        imageWidth={300}
        imageHeight={250}
        imageAlignment="left"
      />

      <Footer />
    </main>
  );
}
