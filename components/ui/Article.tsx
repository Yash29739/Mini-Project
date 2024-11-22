import React from 'react';
import Image from 'next/image';

interface Article {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-blue-100 rounded-lg shadow-md overflow-hidden hover:shadow-blue-500 hover:drop-shadow-2xl transition-shadow duration-300"
        >
          <div className="relative w-full h-56">
            <Image
              src={article.image || '/images/fallback.jpg'} // Fallback image path
              alt={article.title || 'Article Image'}
              layout="fill"
              objectFit=""
            /> 
          </div>
          <div className=" p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {article.title}
            </h2>
            <p className="text-gray-600 mt-2 text-sm line-clamp-3">
              {article.description}
            </p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block hover:border-white bg-white px-3 py-2 border border-blue-200 rounded-xl text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Read More →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleGrid;
