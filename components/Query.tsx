"use client";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

const Query = () => {
  const [close, setclose] = useState(true);
  const [button, setButton] = useState(false);
  // const router = useRouter();

  const handleClose = () => {
    setclose(!close);
    setButton(!button);
  };

  // handle your submit form
  const handleSub = () => {
    console.log("handle error");
    try {
      console.log("successfully submitted the Survey");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-red flex-2 justify-center items-center">
      <div className="mb-[70px] w-full ml-[10%] mr-[10%]">
        <button
          onClick={handleClose}
          className={`bg-black w-full ${
            button ? "hidden" : ""
          } flex justify-center items-center text-white p-[15px] font-bold rounded-2xl `}
        >
          Take a Survey !!
        </button>
        <div
          className={`flex justify-center items-center ${
            close ? "hidden" : ""
          } m-[20%]`}
        >
          <form className="bg-gray-100 min-w-[400px] p-[50px] rounded-xl relative">
            <IoIosCloseCircle
              onClick={handleClose}
              className="text-[25px] absolute top-4 right-4 cursor-pointer "
            />

            {/* survey */}

            <div>
              <h1 className="text-center mb-[20px] text-[40px] font-serif">
                Query
              </h1>
              <div className="mb-[20px] ">
                <label htmlFor="feedback" className="text-[15px] font-serif">
                  1) How many hours per day do you spend on screens (including
                  phone, computer, tablet, TV)?
                </label>
                <div className="flex flex-col mt-[10px]">
                  <div>
                    <input type="radio" />
                    <label htmlFor="">Less than 2 hours</label>
                  </div>
                  <div>
                    <input type="radio" />
                    <label htmlFor="">2-4 hours</label>
                  </div>
                </div>
              </div>
              <div className="query">
                <label htmlFor="feedback" className="text-[15px] font-serif">
                  2) Your Feedback:
                </label>
                <textarea
                  className=" border-solid border-2 w-full h-[100px] text-[15px] border-grey-500 p-[8px] mt-[10px] mb-[15px]"
                  id="feedback"
                  name="feedback"
                  placeholder="Write your feedback here..."
                  required
                />
              </div>
              <div className="query">
                <label htmlFor="feedback" className="text-[15px] font-serif">
                  3) Your Feedback:
                </label>
                <textarea
                  className=" border-solid border-2 w-full h-[100px] text-[15px] border-grey-500 p-[8px] mt-[10px] mb-[15px]"
                  id="feedback"
                  name="feedback"
                  placeholder="Write your feedback here..."
                  required
                />
              </div>
              <div className="query">
                <label htmlFor="feedback" className="text-[15px] font-serif">
                  4) Your Feedback:
                </label>
                <textarea
                  className=" border-solid border-2 w-full h-[100px] text-[15px] border-grey-500 p-[8px] mt-[10px] mb-[15px]"
                  id="feedback"
                  name="feedback"
                  placeholder="Write your feedback here..."
                  required
                />
              </div>
              <div className="query">
                <label htmlFor="feedback" className="text-[15px] font-serif">
                  5) Your Feedback:
                </label>
                <textarea
                  className=" border-solid border-2 w-full h-[100px] text-[15px] border-grey-500 p-[8px] mt-[10px] mb-[15px]"
                  id="feedback"
                  name="feedback"
                  placeholder="Write your feedback here..."
                  required
                />
              </div>
            </div>
            <button
              onClick={handleSub}
              className="bg-black w-full flex justify-center h-[40px] items-center text-white p-[15px] font-bold rounded-2xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Query;
