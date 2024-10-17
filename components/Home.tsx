import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Header */}
      <section className="text-center mt-10 h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-[60px] font-bold text-gray-800">Welcome !!! <br />to Your <br /><span className='font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-pink-500'>Digital Detox Journey</span></h1>
        <p className="text-gray-600 text-[20px] font-semibold mt-4">"Take control of your screen time and build healthier habits today"</p>
      </section>

      {/* Main Features */}
      <section className="mt-10 flex flex-col md:flex-row justify-around w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-500">Track Your Screen Time</h2>
          <p className="text-gray-600 mt-2">Monitor your daily usage and stay on track with your digital detox goals.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 md:mt-0">
          <h2 className="text-xl font-semibold text-red-500">Manage Your Schedule</h2>
          <p className="text-gray-600 mt-2">Set reminders and schedules for screen breaks and limit your usage.</p>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Ready to Start?</h2>
        <button className="mt-4 px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Start Detox
        </button>
      </section>

      {/* Daily Stats Summary */}
      <section className="mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Today's Screen Time: 3 hours</h2>
        <button className="mt-4 px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
          Set New Limits
        </button>
      </section>

      {/* Motivational Quote */}
      <section className="mt-12 text-center">
        <p className="text-gray-600 italic">"Take control of your habits before they control you."</p>
      </section>
    </div>
  );
};

export default Home;
