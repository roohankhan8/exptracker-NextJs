'use client'
import React, { useState } from 'react';



const TextCarousel = ({ months }) => {
  // Create a new Date object to get the current date and time
  const currentDate = new Date();

  // Get the current day (0-6, where 0 is Sunday and 6 is Saturday)
  const currentDay = currentDate.getDay();

  // Define an array of day names for reference
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get the current date (1-31)
  const currentDateOfMonth = currentDate.getDate();

  const currentMonth = currentDate.getMonth() + 1; // Adding 1 to adjust for the zero-based index

  // Get the current year (e.g., 2023)
  const currentYear = currentDate.getFullYear();
  const [index, setIndex] = useState(currentMonth-1);

  const goToNextItem = () => {
    setIndex((prevIndex) => (prevIndex + 1) % months.length);
  };

  const goToPrevItem = () => {
    setIndex((prevIndex) => (prevIndex - 1 + months.length) % months.length);
  };

  return (
    <div className="text-carousel flex justify-between items-center">
      <button onClick={goToPrevItem}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <p>{months[index]}</p>
      <button onClick={goToNextItem}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
};

export default TextCarousel;
