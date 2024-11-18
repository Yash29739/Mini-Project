"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoadingCursor from "@/app/loading";
import DotLoader from "./DotLoading";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Query = () => {
  const [ml, setml] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [mlResponse, setMlResponse] = useState("");
  const [Suggestions, setSuggestions] = useState([]);

  const [Feedback, setFeedback] = useState("");
  const [FeedbackReaction, setFeedbackReaction] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [cluster, setCluster] = useState(-1);
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
    setml(true);

    const data = {
      input: {
        screen_time: responses.screenTime,
        main_activity: responses.screenActivity,
        social_media_time: responses.socialMediaTime,
        reduce_social_media: responses.socialMediaStrategy,
        tech_free_breaks: responses.workTimeBreaks,
        detox_goal: responses.primaryGoal,
        screen_time_challenges: responses.challengingTask,
        detox_support: responses.whatHelp,
        detox_priorities: responses.activityPriority,
      },
      cluster: cluster,
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
        // toast.success("Successfully communicated wiht the AI");
        console.log("Log Response", res.prediction);
        console.log("Log suggestions", res.suggestions);
        setMlResponse(res.prediction);
        setSuggestions(res.suggestions);
      } else {
        console.log("Log error", res.message);
        toast.success("Communiczation Unsuccessfull");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    } finally {
      setml(false);
    }
  };

  const handleEmoji = (emoji: React.SetStateAction<string>) => {
    setFeedbackReaction(emoji);
  };

  const handleFeedback = async (e: { preventDefault: () => void }) => {
    setisSubmitting(true);
    e.preventDefault();
    
    // if (!FeedbackReaction || !Feedback) {
    //   alert("Please select an emoji and write your feedback!");
    //   setisSubmitting(false);
    //   return;
    // }
    
    const data = {
      feedback: Feedback,
      ratings: FeedbackReaction,
      cluster:cluster
    };
    
    console.log("Entered the Feedback  Post");
    
    
    try {
      const response = await fetch(
        "https://digital-detox-ml.onrender.com/feedback",
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
          console.log("Feedback Submitted" + res);
          alert("Feedback submitted successfully!");
          setFeedback("");
          setFeedbackReaction("");
        } else {
          console.log("Feedback Failed" + res);
          alert("Failed to submit feedback.");
        }
      } catch (error) {
        console.log("Error Occured" + error);
        alert("Something went wrong. Please try again later.");
      }finally{
        setisSubmitting(false);
        console.log("Entered the Feedback  Post");
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
  isLoading;

  // Fetch existing survey responses on component mount
  useEffect(() => {
    const fetchSurveyResponses = async () => {
      setIsLoading(true);
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
          setCluster(result.foundSurvey.cluster);
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

  const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: "bold",
      textAlign: "left",
      padding: theme.spacing(1),
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      padding: theme.spacing(1),
      wordBreak: "break-word",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const questions = [
    {
      question: "How many hours per day do you spend on screens?",
      responseKey: "screenTime",
    },
    {
      question: "What is your most frequent screen activity?",
      responseKey: "screenActivity",
    },
    {
      question: "How much time do you spend on social media each day?",
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
  ];

  return (
    <div>
      <div className="flex justify-center items-center mb-[60px] mt-20 bg-gray-100">
        <div className="w-full max-w-2xl mx-4">
          {/* Button to open survey */}
          {!isSurveyVisible && (
            <button
              onClick={toggleSurvey}
              className="w-full bg-black text-white p-4 font-bold rounded-2xl text-center hover:bg-gray-800"
            >
              Survey for personalized suggestions
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

      {isLoading ? (
        <div className="flex justify-center">
          <LoadingCursor w={300} h={300} />
        </div>
      ) : (
        <div className=" my-8 mx-10 ">
          <h1 className="text-2xl text-center font-bold mb-6">
            Survey Responses
          </h1>
          <div className="overflow-x-auto">
            <TableContainer
              component={Paper}
              sx={{ borderRadius: "8px", boxShadow: 3, overflowX: "auto" }}
            >
              <Table
                sx={{
                  minWidth: isMobile ? 300 : 700,
                  tableLayout: "fixed",
                }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Question</StyledTableCell>
                    <StyledTableCell
                      sx={{ borderLeft: `2px solid ${theme.palette.divider}` }}
                    >
                      Response
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {item.question}
                      </StyledTableCell>
                      <StyledTableCell>
                        {responses[item.responseKey] || "No response"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

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
      <div className="flex justify-center rounded-lg mx-10 border flex-col items-center">
        <p className=" text-[30px] text-ellipsis mt-4 -font-serif text-center ">
          AI Suggestions
        </p>
        <button
          className="bg-green-600 text-white my-4 py-2 px-4 rounded-md w-[250px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={requestML}
        >
          Get some Suggestions
        </button>
        {ml ? (
          <div className="mb-10">
            <DotLoader />
          </div>
        ) : (
          <span className="my-5 font-serif m-10">
            <div className="text-center">
              <TextGenerateEffect
                words={mlResponse}
                duration={2}
                className="text-[20px] text-black text-center opacity-0"
              />
            </div>
            {Suggestions.map((i) => (
              <div className="my-2 p-5">{i}</div>
            ))}
          </span>
        )}
      </div>

      <div className="flex flex-col lg:my-10 lg:mx-40 mx-10 my-10 space-y-8 items-center p-10 bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-lg shadow-lg">
        <p className="text-[25px] lg:text-[30px] font-serif font-extrabold text-blue-800">
          Provide Feedback
        </p>

        {/* Emoji Feedback Section */}
        <div className="flex space-x-3">
          {[
            { title: "1", src: "/1.png" },
            { title: "2", src: "/2.png" },
            { title: "3", src: "/3.png" },
            { title: "4", src: "/4.png" },
            { title: "5", src: "/5.png" },
          ].map((emoji) => (
            <button
              key={emoji.title}
              className={`transition transform hover:scale-110 focus:outline-none rounded-full ${
                FeedbackReaction === emoji.title
                  ? "border border-yellow-500 scale-125"
                  : ""
              }`}
              onClick={() => handleEmoji(emoji.title)}
              title={emoji.title}
            >
              <img src={emoji.src} alt={emoji.title} />
            </button>
          ))}
        </div>

        {/* Feedback Text Area */}
        <textarea
          className="w-full max-w-2xl h-[15vh] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg py-2 px-4 shadow-sm placeholder-gray-500 text-gray-700"
          name="feedback"
          placeholder="Write your feedback here..."
          id="feedback"
          value={Feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleFeedback}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out"
        >
          {isSubmitting? "Submitting" : "Submit" }
        </button>
      </div>
    </div>
  );
};

export default Query;
