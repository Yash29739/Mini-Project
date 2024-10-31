// pages/index.js

import TaskList from '@/components/TaskList';

const Home = () => {
  return (
    <div>
      <main className="my-10 ">
       <TaskList />
      </main>
    </div>
  );
};

export default Home;