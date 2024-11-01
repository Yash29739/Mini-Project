import React from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { CardBody, CardItem, CardContainer } from "./ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { Vortex } from "./ui/vortex";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <Vortex particleCount={210} backgroundColor="black"  rangeY={500} baseRadius={4}>
        <section className="text-center mt-10 h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-[60px] font-bold text-white">
            Welcome !!! <br />
            to Your <br />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-pink-500">
              Digital Detox Journey
            </span>
          </h1>
          <TextGenerateEffect
            words="Take control of your screen time and build healthier habits today"
            duration={1}
          />
        </section>
      </Vortex>

      {/* card details */}
      <div className="hedaing mt-[200px] ">
        <h1 className="text-black text-center text-7xl font-bold font-serif">
          Features
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row">
        <CardContainer className="inter-var m-4 mx-7">
          <CardBody className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-purple-800 to-slate-950 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem translateZ="50" className="text-xl font-bold text-white">
              Track Your Screen Time
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className=" text-sm max-w-full text-white mt-2 "
            >
              Monitor your daily usage and stay on track with your digital detox
              goals.
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/Time.webp"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var m-3 mx-7">
          <CardBody className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-purple-800 to-slate-950 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem translateZ="50" className="text-xl font-bold text-white">
              Manage Your Schedule
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className=" text-sm max-w-full text-white mt-2 "
            >
              Set reminders and schedules for screen breaks and limit your usage
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/schedules.webp"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      {/* Quick Start Section */}
      <section className="m-20 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Ready to Start Your Detox Journey?
        </h2>
        <p className="text-lg text-gray-400 mt-2">
          Take control of your digital habits today.
        </p>
        <button className="mt-6 px-10 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-500">
          <Link href="/schedules">Start Detox</Link>
        </button>
      </section>

      {/* Daily Stats Summary */}
      <section className="m-20 p-8 bg-gradient-to-r lg:w-[500px] lg:h-auto text-center from-blue-100 to-white shadow-lg rounded-xl max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Today's Screen Time:
          <span className="block text-4xl mt-2 text-blue-600">3 hours</span>
        </h2>
        <button className="mt-4 px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
         <Link href="/tracker">
          Check The usage
         </Link>
        </button>
      </section>

      {/* Motivational Quote */}
      <section className="m-12 text-center">
        <blockquote className="text-xl italic text-gray-700 border-l-4 border-r-4 border-blue-500 pr-4 pl-4">
          "Take control of your habits before they control you."
        </blockquote>
      </section>
    </div>
  );
};

export default Home;
