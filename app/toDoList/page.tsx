// pages/index.js

import TaskList from '@/components/TaskList';
import Head from 'next/head';
const Home = () => {
  return (
    <div>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
       <TaskList/>
      </main>
    </div>
  );
};

export default Home;