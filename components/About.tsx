import React from "react";
import Card from "./ui/Card";

const About = () => {
  return (
    <div>
      <div className="mt-20 w-[400px] h-[400px]">
        <Card
          title="Log-In"
          description="Create an account or log in to your existing account"
          image="/Login.png"
          link="/login"
        />
      </div>
    </div>
  );
};

export default About;
