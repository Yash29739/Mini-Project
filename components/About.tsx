import React from "react";
import Card from "./ui/Card";
import "../global.css";

const About = () => {
  return (
    <div>
      <div className="mt-20 flex p-10 flex-3 space-x-4 w-[100px] flex-col space-y-9 mx-auto justify-center items-center">
        <Card
          title="Log In"
          description="Get started by creating an account or logging in to your existing one. Access all features tailored to you."
          image="/Login.png"
          link="/login"
          linkText="Go to Log In"
          frontText="Step 1"
        />
        <Card
          title="Suggestions"
          description="Complete a short survey to receive personalized, AI-driven recommendations tailored to your needs."
          image="/schedules.png"
          link="/schedules"
          linkText="Go to Suggestions"
          frontText="Step 2"
        />
        <Card
          title="To-Do List"
          description="Stay organized by listing your tasks. Check them off as you complete them and stay productive with helpful reminders."
          image="/Todolist.png"
          link="/toDoList"
          linkText="Go to To-Do List"
          frontText="Step 3"
        />
        <Card
          title="Tracker"
          description="Keep track of your screen time by entering the necessary data. Visualize your usage and build better habits."
          image="/Tracker.png"
          link="/tracker"
          linkText="Go to Tracker"
          frontText="Step 4"
        />
        <Card
          title="Resources"
          description="Feeling overwhelmed? Explore curated resources to help you unwind, relax, and refresh your mind."
          image="/Resources.png"
          link="/resources"
          linkText="Go to Resources"
          frontText="Step 5"
        />
      </div>
    </div>
  );
};

export default About;
