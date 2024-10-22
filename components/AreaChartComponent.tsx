// components/ScreenTimeGraph.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Example data for screen time
const data = [
  { day: 'Monday', screenTime: 2 },
  { day: 'Tuesday', screenTime: 3.5 },
  { day: 'Wednesday', screenTime: 4 },
  { day: 'Thursday', screenTime: 2.8 },
  { day: 'Friday', screenTime: 5 },
  { day: 'Saturday', screenTime: 1.5 },
  { day: 'Sunday', screenTime: 3 },
];

const ScreenTimeGraph: React.FC = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="screenTime" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScreenTimeGraph;
