"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
  Pie,
  PieChart,
  Cell
} from "recharts";
import LoadingCursor from "@/app/loading";
import "react-datepicker/dist/react-datepicker.css";

interface ScreenTimeEntry {
  category: string;
  timeSpent: number; // in minutes
}

interface ScreenTimeData {
  date: string;
  entries: ScreenTimeEntry[];
}

interface ScreenTimeGraphProps {
  refreshGraph: boolean;
  limitedUsage: number; // Passed from parent component
}

const ScreenTimeGraph: React.FC<ScreenTimeGraphProps> = ({ refreshGraph, limitedUsage }) => {
  const [state, setState] = useState<{
    loading: boolean;
    data: ScreenTimeData[];
  }>({
    loading: true,
    data: [],
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  // Fetch data from backend
  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/tracker", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await response.json();
      const groupedData = groupByDate(result.data);

      setState({
        loading: false,
        data: groupedData,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setState({ loading: false, data: [] });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshGraph]);

  // Group data by date
  const groupByDate = (data: ScreenTimeData[]): ScreenTimeData[] => {
    const grouped = new Map<string, ScreenTimeEntry[]>();

    data.forEach((entry) => {
      const existing = grouped.get(entry.date) || [];
      entry.entries.forEach((subEntry) => {
        const existingCategory = existing.find((e) => e.category === subEntry.category);
        if (existingCategory) {
          existingCategory.timeSpent += subEntry.timeSpent;
        } else {
          existing.push(subEntry);
        }
      });
      grouped.set(entry.date, existing);
    });

    return Array.from(grouped.entries())
      .map(([date, entries]) => ({ date, entries }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  // Calculate total time
  const calculateTotalTime = (entries: ScreenTimeEntry[]): number =>
    entries.reduce((sum, entry) => sum + entry.timeSpent, 0);

  // Calculate threshold percentage
  const calculateThresholdPercentage = (average: number): string => {
    const difference = average - limitedUsage;
    const percentage = (Math.abs(difference) / limitedUsage) * 100;
    return difference > 0
      ? `You are ${percentage.toFixed(2)}% above the screen limit`
      : `You are ${percentage.toFixed(2)}% below the screen limit`;
  };

  const getCategoryWiseData = () => {
    const categoryData: Record<string, number> = {};

    state.data.flatMap((entry) => entry.entries).forEach((subEntry) => {
      categoryData[subEntry.category] = (categoryData[subEntry.category] || 0) + subEntry.timeSpent;
    });

    return Object.entries(categoryData).map(([category, timeSpent]) => ({
      category,
      timeSpent,
    }));
  };

  const formatXAxisDate = (date: string) => {
    const newDate = new Date(date);
    // Format date to show day and month (e.g., "07 Nov", "15 Nov")
    return newDate.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  // Filter data by date range
  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return state.data;
    return state.data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }, [state.data, startDate, endDate]);

  // Weekly and Monthly Stats
  const getRangeStats = (range: "weekly" | "monthly"): ScreenTimeData[] => {
    const now = new Date();
    let start: Date, end: Date;

    if (range === "weekly") {
      start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      end = new Date(start);
      end.setDate(start.getDate() + 6);
    } else {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    return state.data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    });
  };

  const weeklyStats = useMemo(() => getRangeStats("weekly"), [state.data]);
  const monthlyStats = useMemo(() => getRangeStats("monthly"), [state.data]);

  const renderAverageStats = (label: string, data: ScreenTimeData[]) => {
    const total = data.flatMap((entry) => entry.entries).reduce((sum, e) => sum + e.timeSpent, 0);
    const average = total / data.length || 0;
    const percentageMessage = calculateThresholdPercentage(average);

    return (
      <div className="text-center">
        <p className="text-lg text-blue-600">
          Average Screen Time {label}: {average.toFixed(2)} minutes ({percentageMessage})
        </p>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-blue-50 py-10 px-5">
      {state.loading ? (
        <div className="flex justify-center items-center">
          <LoadingCursor w={300} h={300} />
        </div>
      ) : (
        <div>
          {/* Daily Stats */}
          <div className="bg-white p-5 rounded-lg shadow-lg mb-5">
            <h2 className="text-xl font-semibold text-center text-blue-700">
              Daily Screen Time
            </h2>
            {renderAverageStats("Today", filteredData)}
          </div>

          {/* Weekly Stats */}
          <div className="bg-white p-5 rounded-lg shadow-lg mb-5">
            <h2 className="text-xl font-semibold text-center text-blue-700">
              Weekly Screen Time
            </h2>
            {renderAverageStats("This Week", weeklyStats)}
          </div>

          {/* Monthly Stats */}
          <div className="bg-white p-5 rounded-lg shadow-lg mb-5">
            <h2 className="text-xl font-semibold text-center text-blue-700">
              Monthly Screen Time
            </h2>
            {renderAverageStats("This Month", monthlyStats)}
          </div>

          <div className="bg-white p-5 rounded-lg shadow-lg mb-5">
            <h2 className="text-xl font-semibold text-center text-blue-700">
              Total Screen Time with Threshold
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={filteredData.map((entry) => ({
                  date: entry.date,
                  total: calculateTotalTime(entry.entries),
                  threshold: limitedUsage,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatXAxisDate}  // Format the X-axis labels for better readability
                  angle={-45}  // Rotate labels to avoid congestion
                  textAnchor="end"  // Align labels to the right
                  height={80}  // Increase space for the X-axis labels
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#4C9FEF" />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="red"
                  dot={false}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center text-blue-700">Category-Wise Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getCategoryWiseData()}
                  dataKey="timeSpent"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  labelLine={false}  // Remove the line connecting the label to the pie slice
                  // Custom label rendering
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index, name }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 10;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    // Return custom label with category name and time spent
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        fontSize={12}
                      >
                        {value} min
                      </text>
                    );
                  }}
                >
                  {getCategoryWiseData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index % 3 === 0
                          ? "#4C9FEF"  // First color
                          : index % 3 === 1
                            ? "#6CC8FF"  // Second color
                            : "#F2A900"  // Third color
                      }
                    />
                  ))}
                </Pie>
                {/* Add Legend to display category names */}
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconSize={20}
                  iconType="circle"
                  layout="horizontal"
                  payload={getCategoryWiseData().map((entry, index) => ({
                    value: entry.category,
                    type: "square", // You can use 'circle' or 'square' for the legend icon
                    color:
                      index % 3 === 0
                        ? "#4C9FEF"  // First color
                        : index % 3 === 1
                          ? "#6CC8FF"  // Second color
                          : "#F2A900", // Third color
                  }))}
                  wrapperStyle={{
                    paddingTop: "20px",  // Add some padding between pie chart and legend
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      )}
    </div>
  );
};

export default React.memo(ScreenTimeGraph);