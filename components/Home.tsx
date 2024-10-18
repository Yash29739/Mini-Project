import React from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { CardBody,CardItem,CardContainer } from "./ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import { Vortex } from "./ui/vortex";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <Vortex backgroundColor="black"
      rangeY={500}
      baseRadius={2}>
        <section className="text-center mt-10 h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-[60px] font-bold text-white">
            Welcome !!! <br />
            to Your <br />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-pink-500">
              Digital Detox Journey
            </span>
          </h1>
          <TextGenerateEffect words="Take control of your screen time and build healthier habits today" duration={1}/>
        </section>
      </Vortex>


    {/* card details */}

    <div className="flex flex-col lg:flex-row">
      <CardContainer className="inter-var m-3 ">
        <CardBody className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-purple-800 to-slate-950 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-white"
          >
          Track Your Screen Time
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className=" text-sm max-w-full text-white mt-2 "
          >
            Monitor your daily usage and stay on track with your digital detox goals.
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
      <CardContainer className="inter-var m-3 ">
        <CardBody className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-purple-800 to-slate-950 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-white"
          >
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
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ready to Start?
        </h2>
        <button className="mt-4 px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Start Detox
        </button>
      </section>

      {/* Daily Stats Summary */}
      <section className="mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">
          Today's Screen Time: 3 hours
        </h2>
        <button className="mt-4 px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
          Set New Limits
        </button>
      </section>

      {/* Motivational Quote */}
      <section className="mt-12 text-center">
        <p className="text-gray-600 italic">
          "Take control of your habits before they control you."
        </p>
      </section>
    </div>
  );
};

export default Home;
