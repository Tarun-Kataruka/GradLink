"use client";

import Image from "next/image";
import { useState } from "react";
import SignIn from "../sign-in/page";
import SignUp from "../sign-up/page";
import Header from "../header";

type HeroProps = {
  image: string;
};

export default function Hero({ image }: HeroProps) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);
  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <section className="bg-gradient-to-b from-white via-[#f2f7ff] to-[#e4f0ff] min-h-screen w-full">
      {isSignInModalOpen && (
        <SignIn
          isSignInOpen={isSignInModalOpen}
          onSignInClose={closeSignInModal}
          openSignUpModal={openSignUpModal}
        />
      )}
      {isSignUpModalOpen && (
        <SignUp
          isSignUpOpen={isSignUpModalOpen}
          onSignUpClose={closeSignUpModal}
          openSignInModal={openSignInModal}
        />
      )}

      <Header onLoginClick={openSignInModal} />
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 leading-tight">
          Welcome to <span className="text-blue-800">GradLink</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mt-6 mb-12">
          A platform to <span className="text-blue-800 font-medium">reconnect</span> with batchmates,{" "}
          <span className="text-blue-800 font-medium">discover</span> career opportunities, and{" "}
          <span className="text-blue-800 font-medium">celebrate achievements</span>.
        </p>

        <div className="rounded-xl p-4 mb-12">
          <Image
            src={image}
            alt="Graduation hats"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        <button
          onClick={openSignUpModal}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-4 rounded-full text-lg shadow-md hover:scale-105 transition-transform duration-200"
        >
          Join the Network
        </button>
      </div>
    </section>
  );
}
