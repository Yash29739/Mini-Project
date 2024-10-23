'use client';

import { useState } from 'react';
import ScreenTimeGraph from '@/components/AreaChartComponent'; // Only use one import for the graph component
import { toast, ToastContainer } from 'react-toastify'; // For better notifications
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';

const Track = () => {
  const [screenTime, setScreenTime] = useState(''); // This is a string initially
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false); // State for managing loading spinner

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Convert screenTime to a number for validation
    const screenTimeNum = Number(screenTime);

    // Input validation: Screen time should be a positive number between 1 and 24
    if (isNaN(screenTimeNum) || screenTimeNum <= 0 || screenTimeNum > 24) {
      toast.error('Please enter valid screen time between 1 and 24 hours.');
      return;
    }

    // Input validation: Date should not be in the future
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate > today) {
      toast.error('Please select a valid past date.');
      return;
    }

    const weeklyUsage = {
      usage: screenTimeNum, // Now the correct number type
      date: selectedDate.toISOString(), // ISO string format for the backend
    };

    setLoading(true); // Set loading state to true when starting the fetch
    try {
      const response = await fetch(
        'https://digital-detox-y73b.onrender.com/tracker',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ weeklyUsage }),
        }
      );

      if (response.ok) {
        toast.success('Screen time data saved!');
        // Reset the form after successful submission
        setScreenTime('');
        setDate('');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error saving data');
    } finally {
      setLoading(false); // End loading state
    }
  };


                                                // Main Part


  return (
    <div>
      {/* Form for screen time tracking */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Track Screen Time
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Screen Time (hrs)
          </label>
          <input
            type="number"
            value={screenTime}
            onChange={(e) => setScreenTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {loading ? <LoadingSpinner/> : ''}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading} // Disable button when loading
        >
          
          {loading ? "Submitting..." : 'Submit'} {/* Button text changes */}
        </button>
      </form>

      {/* Toast Notifications */}
      <div className="mt-10 mx-auto max-w-[1000px] ">
        <p className="text-center text-[30px] mb-8">Screen Time Usage</p>
        <ScreenTimeGraph />
      </div>

      <ToastContainer/>
    </div>
  );
};

export default Track;
