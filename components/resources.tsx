"use client";

import React, { useState } from 'react';
import ArticleGrid from './ui/Article';

interface Video {
  id: number;
  title: string;
  image: string;
  src: string;
}

const articles = [
  {
    title: ' 8 Steps to Break Free from Internet Addiction',
    description: 'Simple strategies to reduce phone dependency and reclaim focus in a hyper-connected world.',
    image: '/redit1.png', // Replace with actual image path
    link: 'https://www.reddit.com/r/nosurf/comments/7p9cin/how_i_curbed_my_internet_addiction_8_steps/',
  },
  {
    title: 'Nosurf Made Simple: Reclaim Your Life',
    description: 'A practical guide to breaking free from digital distractions and finding peace.',
    image: '/redit2.1.png',
    link: 'https://www.reddit.com/r/nosurf/comments/7eszt3/a_bulletproof_and_simple_way_to_succeed_in_nosurf/',
  },
  {
    title: 'Mastering Digital Discipline: A Practical Guide',
    description: 'Tips and tools to build a healthier, more intentional relationship with technology.',
    image: '/redit3.1.png',
    link: 'https://www.reddit.com/r/nosurf/comments/6lrot7/a_guide_to_better_internet_and_computer_uselong/',
  },
  {
    title: 'Digital Detox: Reclaim Balance and Ease Tech Stress',
    description: 'Practical strategies to reduce tech dependency, ease stress, and restore balance in a digital-driven life.',
    image: '/redit4.png',
    link: 'https://www.reddit.com/r/DopamineDetoxing/comments/1cbby6l/digital_detox_10_practical_tips_to_free_your_body/',
  },
];

const videos: Video[] = [
  { id: 1, image: "/Image-1.png", title: 'Digital Detox Ideas | What is a Digital Detox | Social Media Detox | Nth Sense', src: 'https://www.youtube.com/embed/2hu9s7RPA0M' },
  { id: 2, image: "/Image-2.png", title: 'Apps That Will Help You In Digital Detox', src: 'https://www.youtube.com/embed/j_B_OPDQUG8' },
  { id: 3, image: "/Image-3.png", title: 'What is digital detox? What is its importance?', src: 'https://www.youtube.com/embed/nF9Hk4wIQXk?si=kpaQPedFNYBfw9cU' },
  { id: 4, image: "/Image-4.png", title: 'Digital Detox Animation', src: 'https://www.youtube.com/embed/L45CyNKB1ao?si=uzERtWXTGkiUpCTE' },
  { id: 5, image: "/Image-5.png", title: 'IT WORKED! I did a 30-Day Digital Detox to help my anxiety.', src: 'https://www.youtube.com/embed/B739ez1PPWo?si=R3r_InKgJTFW595R' },
  { id: 6, image: "/Image-6.png", title: 'How to Stop Wasting your Life │ Full Dopamine Detox Protocol', src: 'https://www.youtube.com/embed/gh2m0dj_lFk?si=JQha34xG5Kwt_0c7' },
];

const VideoGallery: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<Video | null>(videos[0]); // Default to first video

  const handleVideoClick = (video: Video) => {
    setPlayingVideo(video); // Set clicked video as the playing video
  };

  return (
    <div className="p-4 my-20">
      {/* Display the selected video */}
      {playingVideo && (
        <div className="mb-8 ">
          <h3 className="text-xl py-3 my-2 font-semibold border-2 border-gray-20 rounded-lg text-center">{playingVideo.title}</h3>
          <iframe
            src={`${playingVideo.src}?autoplay=1&rel=0`}  // Play the selected YouTube video with autoplay
            title={playingVideo.title}
            className="w-full h-64 md:h-96 rounded-lg"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      {/* Video Thumbnails */}
      <div className="grid my-5  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border p-3 rounded-xl bg-blue-50  hover:shadow-[0px_0px_15px_1px_blue] border-blue-600 cursor-pointer transform hover:scale-105 transition duration-300 ease-in"
            onClick={() => handleVideoClick(video)}
          >
            <img
              src={video.image}  // Display the thumbnail
              alt={video.title}
              className="w-full hover:shadow-[0px_0px_1px_1px_blue] h-40 lg:h-[300px] rounded-lg"
            />
            <h3 className="text-lg mt-2">{video.title}</h3>
          </div>
        ))}
      </div>

      <div className="article">
        <h2 className="text-3xl text-center my-20 font-bold mb-4">Digital Detox Articles</h2>
          <ArticleGrid articles={articles}/>
      </div>

      
    </div>
  );
};

export default VideoGallery;
