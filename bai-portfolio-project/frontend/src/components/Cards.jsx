import React from "react";

const Card = ({ title, description, imageUrl, link }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        {link && <a href={link} target="_blank" className="text-blue-500">View More</a>}
      </div>
    </div>
  );
};

export default Card;