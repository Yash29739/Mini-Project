import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, link }) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-md overflow-hidden hover:shadow-blue-500 hover:drop-shadow-2xl transition-shadow duration-300 flex flex-col p-6">
      {/* Image section */}
      <div className="relative w-full h-56">
        <Image
          src={image || '/images/fallback.jpg'} // Fallback image path
          alt={title || 'Article Image'}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block hover:border-white bg-white px-3 py-2 border border-blue-200 rounded-xl text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export default Card;
