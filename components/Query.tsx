"use client"
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

const Query = () => {
    const [close, setclose] = useState(true);
    const [button,setButton] = useState(false);
    // const router = useRouter();

    const handleClose=()=>{
        setclose(!close);
        setButton(!button);
    }

    // handle your submit form 
    const handleSub=()=>{
        console.log("handle error");
        try {
            console.log("successfully submitted the Survey");
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div className="flex bg-red flex-2 justify-center items-center">
      <div className="mb-[70px] w-full ml-[10%] mr-[10%]">
        <button onClick={handleClose} className={`bg-black w-full ${button ? "hidden":""} flex justify-center items-center text-white p-[15px] font-bold rounded-2xl `}>
          Take a Survey !!
        </button>
        <div className={`flex justify-center items-center ${close ? "hidden" : ""} m-[20%]`}>
          <form className="bg-gray-100 min-w-[400px] p-[50px] rounded-xl relative">
            <IoIosCloseCircle onClick={handleClose} className="text-[35px] absolute top-4 right-4 cursor-pointer " />
            <div>
              <h1 className="text-center mb-[20px] text-[56px] font-serif">
                Query
              </h1>
              <label htmlFor="feedback" className="text-xl font-serif">
                1) Your Feedback:
              </label>
              <textarea
                className=" border-solid border-2 w-full border-grey-500 p-[20px] mt-[10px] mb-[15px]"
                id="feedback"
                name="feedback"
                placeholder="Write your feedback here..."
                required
              />
            </div>
            <button onClick={handleSub} className="bg-black w-full flex justify-center items-center text-white p-[15px] font-bold rounded-2xl">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Query;
