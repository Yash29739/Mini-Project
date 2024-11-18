import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import LoadingCursor from "@/app/loading";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

const groupByDate = (data: { date: string; usage: number }[]) => {
  const groupedData = new Map<string, number>();

  data.forEach((entry) => {
    const formattedDate = formatDate(entry.date);
    groupedData.set(
      formattedDate,
      (groupedData.get(formattedDate) || 0) + entry.usage
    );
  });

  return Array.from(groupedData, ([date, screenTime]) => ({ date, screenTime })).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

interface ScreenTimeGraphProps {
  refreshGraph: boolean;
  dotThreshold?: number;
}

const CustomizedDot: React.FC<{
  cx?: number;
  cy?: number;
  value?: number;
  dotThreshold: number;
}> = React.memo(({ cx, cy, value, dotThreshold }) => {
  if (!cx || !cy || value === undefined) return null;

  const isBelowThreshold = value < dotThreshold;
  const fill = isBelowThreshold ? "green" : "red";
  const path = isBelowThreshold
    ? "M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76..."
    : "M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304...";

  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill={fill} viewBox="0 0 1024 1024">
      <path d={path} />
    </svg>
  );
});

const ScreenTimeGraph: React.FC<ScreenTimeGraphProps> = ({ refreshGraph, dotThreshold = 6 }) => {
  const [state, setState] = useState<{
    loading: boolean;
    data: { date: string; screenTime: number }[];
  }>({
    loading: true,
    data: [],
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/tracker", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await response.json();
      const groupedData = groupByDate(result.existingTracker.weeklyUsage);
      setState({ loading: false, data: groupedData });
    } catch (error) {
      console.error("Error in the fetch", error);
      setState({ loading: false, data: [] });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshGraph]);

  const chartData = useMemo(() => state.data, [state.data]);

  return (
    <div className="w-full h-80">
      {state.loading ? (
        <div className="flex justify-center items-center">
          <LoadingCursor w={300} h={300} />
        </div>
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="screenTime"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              dot={<CustomizedDot dotThreshold={dotThreshold} />}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center">No data available</div>
      )}
    </div>
  );
};

export default React.memo(ScreenTimeGraph);