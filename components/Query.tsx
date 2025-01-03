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
import { useRouter } from "next/navigation";
import { useLogin } from "@/context/LoginContext";
import { FaRegEdit } from "react-icons/fa";

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Query = () => {
  const [ml, setMl] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mlResponse, setMlResponse] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackReaction, setFeedbackReaction] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cluster, setCluster] = useState(-1);
  const { isLoggedIn } = useLogin();
  const [responses, setResponses] = useState({
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
  const surveyHeadingRef = useRef<HTMLHeadingElement>(null); // Create a ref for the heading
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMounted = useRef(true);
  const [isSurveyVisible, setSurveyVisible] = useState(false);
  const router = useRouter();

  const questions = [
    {
      question: "How many hours per day do you spend on screens?",
      responseKey: "screenTime",
      options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "More than 6 hours"],
    },
    {
      question: "What is your most frequent screen activity?",
      responseKey: "screenActivity",
      options: ["Social media", "Work-related tasks", "Streaming services", "Gaming"],
    },
    {
      question: "How much time do you spend on social media each day?",
      responseKey: "socialMediaTime",
      options: ["Less than 1 hour", "1-2 hours", "2-4 hours", "More than 4 hours"],
    },
    {
      question: "Which strategy would you consider to reduce social media usage?",
      responseKey: "socialMediaStrategy",
      options: [
        "Disable notifications",
        "Set daily limits on apps",
        "Use social media only at set times",
        "Take a break from social media",
      ],
    },
    {
      question: "How much of your screen time is work-related?",
      responseKey: "workScreenTime",
      options: ["None", "less than 2 hours", "2-4 hours", "More than 4 hours"],
    },
    {
      question: "Would you be open to scheduling tech-free work breaks throughout the day?",
      responseKey: "workTimeBreaks",
      options: ["Yes", "No"],
    },
    {
      question: "What is your primary goal for reducing screen time?",
      responseKey: "primaryGoal",
      options: [
        "Reduce stress",
        "Improve sleep quality",
        "Increase focus/productivity",
        "Improve mental well-being",
      ],
    },
    {
      question: "What activities would you prioritize during reduced screen time?",
      responseKey: "activityPriority",
      options: [
        "Physical exercise",
        "Spending time with family/friends",
        "Reading",
        "Meditation/mindfulness",
        "Outdoor activities",
      ],
    },
    {
      question: "What do you find most challenging about reducing your screen time?",
      responseKey: "challengingTask",
      options: [
        "Work requirements",
        "Social media habits",
        "Entertainment",
        "Habitual device checking",
      ],
    },
    {
      question: "What would help you stick to a detox plan?",
      responseKey: "whatHelp",
      options: [
        "Daily reminders/notifications",
        "Clear goals and progress tracking",
        "Accountability from others",
        "Rewards for milestones reached",
      ],
    },
  ];


  const requestML = async () => {
    setMl(true);
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
      const response = await fetch("https://digital-detox-ml.onrender.com/predict ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.ok) {
        setMlResponse(res.prediction);
        setSuggestions(res.suggestions);
      } else {
        toast.error("Communication Unsuccessful");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    } finally {
      setMl(false);
    }
  };

  const handleFeedback = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/survey/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: feedback }),
        credentials: "include"
      });
      if (response.ok) {
        toast.success("Feedback submitted successfully.");
        setFeedback("");
        setFeedbackReaction("");
      } else {
        toast.error("Failed to submit feedback.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSaving(true);
    const responsedata = { responses };

    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/survey", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(responsedata),
      });

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
        fetchSurveyResponses();

      } else {
        toast.error("Submission error");
      }
    } catch (error) {
      toast.error("An error occurred: " + error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
      setSurveyVisible(false);
    }
  };

  const fetchSurveyResponses = async () => {
    setIsLoading(true);

    if (!isLoggedIn) {
      router.push("/login")
    }

    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/survey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      if (result && result.foundSurvey.responses) {
        setResponses(result.foundSurvey.responses);
        setCluster(result.foundSurvey.cluster);
      }
    } catch (error) {
      console.log("Error fetching survey responses: " + error);
      // toast.error("Internal server error");
    } finally {
      setIsLoading(false);
      setSurveyVisible(false);
    }
  };
  useEffect(() => {
    fetchSurveyResponses();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setResponses((prevResponses) => ({ ...prevResponses, [name]: value }));
  };

  const toggleSurvey = () => setSurveyVisible(!isSurveyVisible);
  const handleEdit = () => {
    surveyHeadingRef.current?.scrollIntoView({ behavior: "smooth" });

    // Set survey visibility and edit state
    setIsEditing(true);
    setSurveyVisible(true);
  };

  return (
    <div ref={surveyHeadingRef}>
      <div className="flex justify-center items-center mb-16 mt-20 bg-blue-50" >
        <div className="w-full my-5 max-w-2xl mx-4"  >
          {!isSurveyVisible && (
            <button
              onClick={toggleSurvey}
              className="w-full bg-blue-600 my-6 text-white p-4 font-bold rounded-2xl text-center hover:bg-blue-700"
            >
              Survey for personalized suggestions
            </button>
          )}
          {isSurveyVisible && (
            <div className="bg-white rounded-lg border border-gray-300 pt-16 px-10 py-10 shadow-lg relative">
              <IoIosCloseCircle
                onClick={toggleSurvey}
                className="text-3xl text-red-600 absolute top-4 right-4 cursor-pointer hover:text-red-800"
              />
              <h1 className="text-2xl font-bold mb-6 text-center" >Survey</h1>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  {questions.map((item, index) => (
                    <div key={index}>
                      <h2 className="text-xl font-semibold mb-2">
                        {index + 1}. {item.question}
                      </h2>
                      <div className="space-y-2 mb-8">
                        {item.options.map((option) => (
                          <label key={option} className="flex  items-center">
                            <input
                              type="radio"
                              name={item.responseKey}
                              value={option}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
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
        <div className="my-8 mx-10">
          <h1 className="text-2xl text-center font-bold mb-6">Survey Responses</h1>
          <div className="overflow-x-auto">
            <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: 3 }}>
              <Table sx={{ minWidth: isMobile ? 300 : 700, tableLayout: "fixed" }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Question</StyledTableCell>
                    <StyledTableCell sx={{ borderLeft: `2px solid ${theme.palette.divider}` }}>Response</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">{item.question}</StyledTableCell>
                      <StyledTableCell>{responses[item.responseKey as keyof typeof responses] || "No response"}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="justify-center text-center items-center flex my-5 space-x-5">
              <button
                className="bg-red-600 inline-flex text-white py-2 px-4 rounded-md hover:bg-red-700"
                onClick={handleEdit}
              >
                <FaRegEdit className={"h-5 w-5 mr-2"} /><span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <div className="flex justify-center rounded-lg mx-10 border flex-col items-center p-6 bg-gray-100 shadow-lg">
        <p className="text-[36px] font-serif mt-4 text-center text-indigo-600">
          ML Suggestions
        </p>
        <button
  className={`bg-blue-600 text-white my-4 py-3 px-5 rounded-lg w-[250px] text-lg ${
    ml ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 transition-all duration-200"
  }`}
  onClick={requestML}
  disabled={ml}
>
  {ml ? "Getting ML Suggestions..." : "Get Some Suggestions"}
</button>
        {ml ? (
          <div className="mb-10">
            <DotLoader />
          </div>
        ) : (
          <div className="my-6 font-serif w-full  max-w-[800px]">
            <div className="text-center mb-4">
              <TextGenerateEffect
                words={mlResponse}
                duration={2}
                className="text-[24px] text-gray-800 text-center"
              />
            </div>
            <ul className="list-disc list-inside space-y-4 text-[22px] text-gray-700">
              {suggestions.map((i, index) => (
                <li key={index} className="leading-relaxed">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>


      <div className="flex flex-col lg:my-10 lg:mx-40 mx-10 my-10 space-y-8 items-center p-10 bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-lg shadow-lg">
        <p className="text-[25px] lg:text-[30px] font-serif font-extrabold text-blue-800">Provide Feedback</p> <div className="flex space-x-3">
          {[
            { title: "1", src: "/1.png" },
            { title: "2", src: "/2.png" },
            { title: "3", src: "/3.png" },
            { title: "4", src: "/4.png" },
            { title: "5", src: "/5.png" },
          ].map((emoji) => (
            <button
              key={emoji.title}
              className={`transition transform hover:scale-110 focus:outline-none rounded-full ${feedbackReaction === emoji.title ? "border border-yellow-500 scale-125" : ""
                }`}
              onClick={() => setFeedbackReaction(emoji.title)}
              title={emoji.title}
            >
              <img src={emoji.src} alt={emoji.title} />
            </button>
          ))}
        </div>

        <textarea
          className="w-full max-w-2xl h-[15vh] border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg py-2 px-4 shadow-sm placeholder-gray-500 text-gray-700"
          name="feedback"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleFeedback}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Query;