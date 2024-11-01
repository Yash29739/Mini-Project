"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

const Query = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [responses, setResponses] = useState<Record<string, string>>({
    screenTime: "",
    screenActivity: "",
    socialMediaTime: "",
    socialMediaStrategy: "",
    workScreenTime: "",
    workTimeBreaks: "",
    primaryGoal: "",
    activityPriority: "",
    challengingTask: "",
    whatHelp: "",
  });

  const requestML = async () => {
    console.log("Entered the ml");
    
    const data = {
      screen_time: "More than 6 hours",
      main_activity: "Gaming",
      social_media_time: "Less than 1 hour",
      screen_time_challenges: "Work requirements",
      work_screen_time: "More than 4 hours",
    };
    try {
      const response = await fetch(
        "https://digital-detox-ml.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (response.ok) {
        toast.success("Successfully communicated wiht the AI");
        console.log("Log Response", res.message);
      } else {
        console.log("Log error", res.message);
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    }
  };

  const isMounted = useRef(true);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    // Sending survey to backend to store
    try {
      const responsedata = { responses };
      const response = await fetch(
        "https://digital-detox-y73b.onrender.com/survey",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(responsedata),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (!isEditing) {
          setResponses({
            screenTime: "",
            screenActivity: "",
            socialMediaTime: "",
            socialMediaStrategy: "",
            workScreenTime: "",
            workTimeBreaks: "",
            primaryGoal: "",
            activityPriority: "",
            challengingTask: "",
            whatHelp: "",
          });
        }
        setIsEditing(false);
        toast.success("Submission successful");
      } else {
        console.error("Submission error:", result.message);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsSaving(false);
      setSurveyVisible(false);
    }
    console.log("User Responses:", responses);
  };

  // Fetch existing survey responses on component mount
  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const response = await fetch(
          "https://digital-detox-y73b.onrender.com/survey", // Replace with actual API endpoint
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        // Log the entire response for debugging
        console.log("Fetched survey data:", result);

        // Ensure result contains the correct data structure
        if (result && result.foundSurvey.responses) {
          setResponses(result.foundSurvey.responses);
        } else {
          console.warn("No responses found in the fetched data");
        }
      } catch (error) {
        console.error("Error fetching survey responses:", error);
      } finally {
        setIsLoading(false);
        setSurveyVisible(false);
      }
    };

    fetchSurveyResponses();
    return () => {
      isMounted.current = false;
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value, // No type assertion needed here
    }));
  };

  // Toggle for showing/hiding the survey
  const [isSurveyVisible, setSurveyVisible] = useState(false);
  const toggleSurvey = () => setSurveyVisible(!isSurveyVisible);

  const handleEdit = () => {
    setIsEditing(true);
    setSurveyVisible(true);
  };
  const handleSave = async () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-[60px] mt-[20px] bg-gray-100">
        <div className="w-full max-w-2xl mx-4">
          {/* Button to open survey */}
          {!isSurveyVisible && (
            <button
              onClick={toggleSurvey}
              className="w-full bg-black text-white p-4 font-bold rounded-2xl text-center hover:bg-gray-800"
            >
              Take a Survey !!
            </button>
          )}

          {/* Survey form */}
          {isSurveyVisible && (
            <div className="bg-white rounded-lg border border-gray-300 pt-16 px-10 py-10 shadow-lg relative">
              {/* Close button */}
              <IoIosCloseCircle
                onClick={toggleSurvey}
                className="text-3xl text-red-600 absolute top-4 right-4 cursor-pointer hover:text-red-800"
              />

              <h1 className="text-2xl font-bold mb-6 text-center">Survey</h1>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Screen Time Habits Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    1. Screen Time Habits
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      How many hours per day do you spend on screens?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Less than 2 hours",
                        "2-4 hours",
                        "4-6 hours",
                        "More than 6 hours",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="screenTime"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      What is your most frequent screen activity?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Social media",
                        "Work-related tasks",
                        "Streaming services",
                        "Gaming",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="screenActivity"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Media Usage Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    2. Social Media Usage
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      How much time do you spend on social media each day?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Less than 1 hour",
                        "1-2 hours",
                        "2-4 hours",
                        "More than 4 hours",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="socialMediaTime"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Which strategy would you consider to reduce social media
                      usage?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Disable notifications",
                        "Set daily limits on apps",
                        "Use social media only at set times",
                        "Take a break from social media",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="socialMediaStrategy"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Work-Related Screen Usage Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    3. Work-Related Screen Usage
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      How much of your screen time is work-related?
                    </label>
                    <div className="space-y-2">
                      {[
                        "None",
                        "less than 2 hours",
                        "2-4 hours",
                        "More than 4 hours",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="workScreenTime"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Would you be open to scheduling tech-free work breaks
                      throughout the day?
                    </label>
                    <div className="space-y-2">
                      {["Yes", "No"].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="workTimeBreaks"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desired Outcomes Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    4. Desired Outcomes
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      What is your primary goal for a digital detox?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Reduce stress",
                        "Improve sleep quality",
                        "Increase focus/productivity",
                        "Improve mental well-being",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="primaryGoal"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Which activities do you want to prioritize 1st during your
                      detox?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Physical exercise",
                        "Spending time with family/friends",
                        "Reading",
                        "Meditation/mindfulness",
                        "Outdoor activities",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="activityPriority"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Barriers to Reducing Screen Time Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    5. Barriers to Reducing Screen Time
                  </h2>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      What do you find most challenging about reducing your
                      screen time?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Work requirements",
                        "Social media habits",
                        "Entertainment",
                        "Habitual device checking",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="challengingTask"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      What would help you stick to a detox plan?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Daily reminders/notifications",
                        "Clear goals and progress tracking",
                        "Accountability from others",
                        "Rewards for milestones reached",
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="whatHelp"
                            value={option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-70 transition duration-300"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {!isLoading && (
        <div className=" my-8">
          <h1 className="text-2xl text-center font-bold mb-6">
            Survey Responses
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-6  text-center text-gray-700 font-semibold uppercase tracking-wider border border-gray-300">
                    Question
                  </th>
                  <th className="py-3 px-6 text-center text-gray-700 font-semibold uppercase tracking-wider border border-gray-300">
                    Response
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    question: "How many hours per day do you spend on screens?",
                    responseKey: "screenTime",
                  },
                  {
                    question: "What is your most frequent screen activity?",
                    responseKey: "screenActivity",
                  },
                  {
                    question:
                      "How much time do you spend on social media each day?",
                    responseKey: "socialMediaTime",
                  },
                  {
                    question:
                      "Which strategy would you consider to reduce social media usage?",
                    responseKey: "socialMediaStrategy",
                  },
                  {
                    question: "How much of your screen time is work-related?",
                    responseKey: "workScreenTime",
                  },
                  {
                    question:
                      "Would you be open to scheduling tech-free work breaks throughout the day?",
                    responseKey: "workTimeBreaks",
                  },
                  {
                    question: "What is your primary goal for a digital detox?",
                    responseKey: "primaryGoal",
                  },
                  {
                    question:
                      "Which activities do you want to prioritize 1st during your detox?",
                    responseKey: "activityPriority",
                  },
                  {
                    question:
                      "What do you find most challenging about reducing your screen time?",
                    responseKey: "challengingTask",
                  },
                  {
                    question: "What would help you stick to a detox plan?",
                    responseKey: "whatHelp",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-6 text-gray-600 border border-gray-300">
                      {item.question}
                    </td>
                    <td className="py-4 px-6 text-gray-700 border border-gray-300">
                      {responses[item.responseKey] || "No response"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Edit and Save  */}

            <div className="text-center my-5 space-x-5">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
        <ToastContainer />
      <div className="flex justify-center h-[50vh] mx-10 border flex-col items-center border-red-500">
        <p className=" text-[30px] text-ellipsis font-serif text-center ">ML OutPut</p>
        <button className="bg-green-600 text-white py-2 px-4 rounded-md w-[250px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={requestML}>Chat with the AI</button>
      </div>
    </div>
  );
};

export default Query;
