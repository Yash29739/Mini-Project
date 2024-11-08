"use client";

import React, { useState } from 'react';

interface Video {
  id: number;
  title: string;
  image: string;
  src: string;
}

const videos: Video[] = [
  { id: 1, image: "/Image-1.png", title: 'Digital Detox Ideas | What is a Digital Detox | Social Media Detox | Nth Sense', src: 'https://www.youtube.com/embed/2hu9s7RPA0M' },
  { id: 2, image: "/Image-2.png", title: 'Apps That Will Help You In Digital Detox', src: 'https://www.youtube.com/embed/j_B_OPDQUG8' },
  { id: 3, image: "/Image-3.png", title: 'What is digital detox? What is its importance?', src: 'https://www.youtube.com/embed/nF9Hk4wIQXk?si=kpaQPedFNYBfw9cU' },
  { id: 4, image: "/Image-4.png", title: 'Digital Detox Animation', src: 'https://www.youtube.com/embed/L45CyNKB1ao?si=uzERtWXTGkiUpCTE' },
  { id: 5, image: "/Image-5.png", title: 'IT WORKED! I did a 30-Day Digital Detox to help my anxiety.', src: 'https://www.youtube.com/embed/B739ez1PPWo?si=R3r_InKgJTFW595R' },
  { id: 6, image: "/Image-6.png", title: 'How to Stop Wasting your Life │ Full Dopamine Detox Protocol', src: 'https://www.youtube.com/embed/gh2m0dj_lFk?si=JQha34xG5Kwt_0c7' },
  { id: 7, image: "/Image-4.png", title: 'Dopamine Detox - How I Reset my Brain in 7 Days | Anuj Pachhel', src: 'https://www.youtube.com/embed/ymIY9bWHVfY?si=UDMaIcFqKmftoOH3' },
];

const VideoGallery: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<Video | null>(videos[0]); // Default to first video

  const handleVideoClick = (video: Video) => {
    setPlayingVideo(video); // Set clicked video as the playing video
  };

  return (
    <div className="p-4">
      {/* Display the selected video */}
      {playingVideo && (
        <div className="mb-8">
          <h3 className="text-xl py-3 my-2 font-semibold bg-gray-300 rounded-lg text-center">{playingVideo.title}</h3>
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
            className="border p-3 rounded-xl bg-gray-200  hover:shadow-[0px_0px_15px_1px_#ec02bf] border-red-600 cursor-pointer transform hover:scale-105 transition duration-300 ease-in"
            onClick={() => handleVideoClick(video)}
          >
            <img
              src={video.image}  // Display the thumbnail
              alt={video.title}
              className="w-full hover:shadow-[0px_0px_1px_1px_#ec02bf] h-40 lg:h-[300px] rounded-lg"
            />
            <h3 className="text-lg mt-2">{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
