import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Helper function to format the date into MM/DD format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are 0-indexed
  const day = date.getDate();
  return `${month}/${day}`; // e.g., "10/23"
};

// Function to group usage by date and sum usage for duplicate dates
const groupByDate = (data: { date: string; usage: number }[]) => {
  const groupedData: { [key: string]: number } = {};

  data.forEach((entry) => {
    const formattedDate = formatDate(entry.date);
    if (groupedData[formattedDate]) {
      // If the date already exists, sum the usage
      groupedData[formattedDate] += entry.usage;
    } else {
      // Otherwise, set the usage for that date
      groupedData[formattedDate] = entry.usage;
    }
  });

  // Convert the object back to an array and sort by date (assuming MM/DD format)
  return Object.keys(groupedData)
    .map((date) => ({
      date,
      screenTime: groupedData[date],
    }))
    .sort((a, b) => new Date(`2024/${a.date}`).getTime() - new Date(`2024/${b.date}`).getTime()); // Sort in increasing order
};

const ScreenTimeGraph: React.FC = () => {
  const [data, setData] = useState<{ date: string; screenTime: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://digital-detox-y73b.onrender.com/tracker',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        const result = await response.json();

        // Sort the weeklyUsage data based on the date
        const sortedData = result.existingTracker.weeklyUsage.sort(
          (a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Group data by date and sum up the usage if the date repeats
        const groupedData = groupByDate(sortedData);

        setData(groupedData); // Update state with grouped and sorted data
      } catch (error) {
        console.log("Error in the fetch", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" /> {/* Display dates (MM/DD) on X-axis */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="screenTime"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScreenTimeGraph;
