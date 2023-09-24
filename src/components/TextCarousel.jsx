'use client'
import React, { useState } from 'react';

const TextCarousel = ({ setSelectedYear, setSelectedMonth }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  // console.log(currentMonth)
  const currentYear = currentDate.getFullYear();
  const [disabled, setdisabled] = useState(true)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const [month, setMonth] = useState(currentMonth - 1);
  const [year, setyear] = useState(currentYear)


  const goToNextItem = () => {
    // console.log(month,currentMonth,year,currentYear)
    if (month + 2 == currentMonth && year === currentYear) setdisabled(true)
    if (month == 11) {
      setyear(year + 1)
      setSelectedYear(year + 1)
    }
    setMonth((prevMonth) => (prevMonth + 1) % months.length);
    setSelectedMonth(month + 1)
    // console.log(year,month)
  };

  const goToPrevItem = () => {
    setdisabled(false)
    if (month == 0) {
      setyear(year - 1)
      setSelectedYear(year - 1)
    }
    setMonth((prevMonth) => (prevMonth - 1 + months.length) % months.length);
    setSelectedMonth(month - 1)
    // console.log(year,month)
  };

  return (
    <div className="flex justify-between items-center p-3">
      <button onClick={goToPrevItem}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <p>{months[month]} {year}</p>
      <button onClick={goToNextItem} disabled={disabled} className={disabled ? 'opacity-50' : ''}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
};

export default TextCarousel;
