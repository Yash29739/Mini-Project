import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  image: string;
  frontText: string;
  link: string;
  linkText:string;
}

const Card: React.FC<CardProps> = ({ title, description, image, frontText, link, linkText }) => {
  return (
    <div className="relative bg-blue-50 border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 transform group">
      {/* Overlay Div */}
      <div className="bg-gradient-to-bl from-[#0014af] via-[#0037ff] to-[#0014af] absolute inset-0 flex items-center text-white justify-center bg-gray-100 font-serif text-4xl font-bold transition-opacity duration-300 group-hover:opacity-0 z-10">
        {frontText}
      </div>

      {/* Main Content */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
        {/* Image Section */}
        <div className="relative w-full h-64 md:h-64 lg:h-72 mb-4">
          <Image
            src={image || '/images/fallback.jpg'} // Fallback image path
            alt={title || 'Article Image'}
            layout="fill"
            className="rounded-t-lg"
            objectFit="cover"
          />
        </div>

        {/* Content Section */}
        <div className="mb-7 flex flex-col justify-between h-full">
          <h2 className="text-xl font-semibold px-5 text-gray-800 text-center mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm px-5 pb-1 text-center line-clamp-3">
            {description}
          </p>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pointer z-10 inline-block self-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:shadow-lg transition duration-300 text-sm font-medium"
            >
              {linkText} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
