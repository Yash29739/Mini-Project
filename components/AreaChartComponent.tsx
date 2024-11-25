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
  Cell,
} from "recharts";
import LoadingCursor from "@/app/loading";
import "react-datepicker/dist/react-datepicker.css";

interface ScreenTimeEntry {
  category: string;
  timeSpent: number; // in hours
}

interface ScreenTimeData {
  date: string;
  entries: ScreenTimeEntry[];
}

interface ScreenTimeGraphProps {
  refreshGraph: boolean;
  limitedUsage: number; // Passed from parent component, in hours
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
      console.log("Grouped Data:", groupedData);

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
          existingCategory.timeSpent += subEntry.timeSpent; // Now in hours
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

  const getRangeStats = (range: "weekly" | "monthly"): ScreenTimeData[] => {
    const now = new Date();
    let start: Date, end: Date;

    if (range === "weekly") {
      start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      end = new Date(start);
      end.setDate(start.getDate() + 6);
    } else {
      start = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the month
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month
    }

    return state.data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    });
  };

  const monthlyStats = useMemo(() => getRangeStats("monthly"), [state.data]);
  const weeklyStats = useMemo(() => getRangeStats("weekly"), [state.data])


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

  const renderAverageStats = (label: string, data: ScreenTimeData[]) => {
    const total = data.flatMap((entry) => entry.entries).reduce((sum, e) => sum + e.timeSpent, 0);
    const average = total / data.length || 0;
    const percentageMessage = calculateThresholdPercentage(average);

    return (
      <div className="text-center">
        <p className="text-lg text-blue-600">
          Average Screen Time {label}: {average.toFixed(2)} hours ({percentageMessage})
        </p>
      </div>
    );
  };

  const renderDailyTotalStats = (data: ScreenTimeData[]) => {
    const totalTime = data.flatMap((entry) => entry.entries).reduce((sum, e) => sum + e.timeSpent, 0);

    return (
      <div className="text-center">
        <p className="text-lg text-blue-600">
          Total Screen Time Today: {totalTime} hours
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
            {renderDailyTotalStats(filteredData)}
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

          {/* Total Screen Time */}
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
                  tickFormatter={formatXAxisDate}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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

          {/* Category-Wise Distribution */}
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center text-blue-700">
              Category-Wise Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getCategoryWiseData()}
                  dataKey="timeSpent"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  labelLine={false}
                >
                  {getCategoryWiseData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index % 3 === 0
                          ? "#4C9FEF"
                          : index % 3 === 1
                            ? "#6CC8FF"
                            : "#F2A900"
                      }
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconSize={20}
                  layout="horizontal"
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