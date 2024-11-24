import React from "react";
import Image from "next/image";
import Link from "next/link";
import './global.css';


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white  to-gray-100 mt-16 mx-4 flex flex-col items-center">
      {/* Header */}
      <div className="min-h-[90vh] w-full bg-gradient-to-b from-white to-gray-100 flex flex-col items-center relative overflow-hidden">
  {/* Floating Elements with Different Blue Shades */}
  <div className="absolute lg:top-14 lg:left-28 lg:w-28 lg:h-28 top-10 left-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 via-blue-600 to-blue-950 w-24 h-24 rounded-full animate-floatUpDown shadow-lg"></div>
  <div className="absolute lg:h-36 lg:w-36 top-20 right-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 via-blue-600 to-blue-950 w-20 h-20 rounded-full animate-floatUpDown shadow-lg"></div>
  <div className="absolute lg:h-36 lg:w-36 bottom-36 right-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 via-blue-600 to-blue-950 w-20 h-20 rounded-full animate-floatUpDown shadow-lg"></div>
  <div className="absolute bottom-12 lg:bottom-10 left-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 via-blue-600 to-blue-950 w-36 h-36 rounded-full animate-floatUpDown shadow-lg"></div>
  <div className="absolute lg:h-28 lg:w-28 bottom-20 right-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 via-blue-600 to-blue-950 w-28 h-28 rounded-full animate-floatUpDown shadow-lg"></div>
  <div className="absolute lg:w-38 lg:h-38 lg:top-32 lg:left-56 top-28 left-28 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 via-blue-600 to-blue-950 w-32 h-32 rounded-full animate-floatUpDown shadow-lg"></div>

  {/* Header Section */}
  <header className="z-10 flex flex-col justify-center items-center h-[90vh] text-center px-4">
  <h1 className="text-[45px] md:text-[60px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-700 leading-tight relative">
    <span className="absolute inset-0 bg-white/50 rounded-lg blur-md -z-10"></span>
    Welcome to Your <br />
    <span className="text-blue-900 relative">Digital Detox Journey</span>
  </h1>
  <p className="relative text-lg md:text-xl text-gray-600 font-medium mt-4 max-w-lg">
    <span className="absolute inset-0 bg-white/50 rounded-lg blur-md -z-10"></span>
    Take control of your screen time and build healthier habits today.
  </p>
  <button className="relative mt-6 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out">
    <Link href="/info">Get Started</Link>
  </button>
</header>




  {/* Footer Section */}
  <footer className="absolute bottom-5 text-gray-500 text-sm">
    <pre>© 2024 Digital Detox. All rights reserved.</pre>
  </footer>
</div>

      {/* Features Section */}
      <section className="my-20 w-full max-w-6xl px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Features
        </h2>
        <div className="flex flex-wrap justify-center gap-16">
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
    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-blue-600 to-blue-800 shadow-lg rounded-xl p-6 w-[90%] md:w-[30rem]">
      <h3 className="text-xl font-bold text-gray-10 mb-2">{title}</h3>
      <p className="text-gray-10 text-sm mb-4">{description}</p>
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
