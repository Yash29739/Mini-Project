import React from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="text-center flex flex-col justify-center items-center h-[90vh]">
        <h1 className="text-[45px] md:text-[60px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-gray-700">
          Welcome to Your <br />
          <span>
            Digital Detox Journey
          </span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Take control of your screen time and build healthier habits today.
        </p>
      </header>

      {/* Features Section */}
      <section className="my-20 w-full max-w-6xl px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Features
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <FeatureCard
            title="Track Your Screen Time"
            description="Monitor your daily usage and stay on track with your digital detox goals."
            image="/Time.webp"
          />
          <FeatureCard
            title="Manage Your Schedule"
            description="Set reminders and schedules for screen breaks and limit your usage."
            image="/schedules.webp"
          />
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="my-16 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Ready to Start Your Detox Journey?
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Take control of your digital habits today.
        </p>
        <Link href="/schedules">
          <button className="mt-6 px-10 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
            Start Detox
          </button>
        </Link>
      </section>

      {/* Daily Stats Summary */}
      <section className="my-16 bg-white shadow-md rounded-xl p-8 text-center max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Today's Screen Time:
        </h2>
        <p className="text-4xl text-blue-600 font-extrabold mt-2">3 hours</p>
        <Link href="/tracker">
          <button className="mt-6 px-10 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
            Check Usage
          </button>
        </Link>
      </section>

      {/* Motivational Quote */}
      <section className="my-12 text-center px-6">
        <blockquote className="text-xl italic text-gray-600 border-l-4 border-blue-600 pl-4">
          "Take control of your habits before they control you."
        </blockquote>
      </section>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-[90%] md:w-[30rem]">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Image
        src={image}
        height={1000}
        width={1000}
        alt={title}
        className="rounded-xl h-48 w-full object-cover"
      />
    </div>
  );
};

export default Home;