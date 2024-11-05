// components/LoadingCursor.js
"use client"
import { useState, useEffect } from 'react';

// Define the type for each clone object
type Clone = {
  x: number;
  y: number;
  id: number;
};

export default function LoadingCursor() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clones, setClones] = useState<Clone[]>([]); // Explicitly set the type of clones as an array of Clone objects

  // Handle window resize to update loading screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse move to update cursor position
  useEffect(() => {
    const handleMouseMove = (e: { pageX: any; pageY: any; }) => {
      setMousePosition({ x: e.pageX, y: e.pageY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle click to create cursor clone at click position
  const handleClick = (e: { pageX: any; pageY: any; }) => {
    setClones((prevClones) => [
      ...prevClones,
      { x: e.pageX, y: e.pageY, id: Date.now() },
    ]);
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-white flex items-center justify-center"
      style={{ width: windowSize.width, height: windowSize.height }}
      onClick={handleClick}
    >
      {/* Loading animation */}
      <div className="loading">
        <img
          src="http://a.top4top.net/p_1990j031.gif"
          alt="Loading animation"
          className="min-h-[209px] min-w-[200px] mx-auto"
        />
      </div>

      {/* Custom cursor */}
      <div
        className="mouse fixed bg-yellow-300 rounded-full pointer-events-none animate-pulse"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          width: '25px',
          height: '25px',
        }}
      />

      {/* Render clones of the cursor on click */}
      {clones.map((clone) => (
        <div
          key={clone.id}
          className="fixed bg-yellow-300 rounded-full pointer-events-none"
          style={{
            left: clone.x - 12,
            top: clone.y - 12,
            width: '25px',
            height: '25px',
          }}
        />
      ))}
    </div>
  );
}
