import React from "react";
import Card from "./ui/Card";
import "../global.css"

const About = () => {
  return (
    <div>
      <div className="mt-20 flex p-10 flex-3 w-full flex-col space-y-9 justify-center items-center">
        <Card
          title="Log-In"
          description="Create an account or log in to your existing account"
          image="/Login.png"
          link="/login"
          linkText="Go To Login"
          frontText="Step-1"
        />
        <Card
          title="Log-In"
          description="Create an account or log in to your existing account"
          image="/Login.png"
          link=""
          linkText="Go To Login"
          frontText="Step-2"
        />
        <Card
          title="Log-In"
          description="Create an account or log in to your existing account"
          image="/Login.png"
          link="/login"
          linkText="Go To Login"
          frontText="Step-3"
        />
        <Card
          title="Log-In"
          description="Create an account or log in to your existing account"
          image="/Login.png"
          link="/login"
          linkText="Go To Login"
          frontText="Step-4"
        />
      </div>
    </div>
  );
};

export default About;
