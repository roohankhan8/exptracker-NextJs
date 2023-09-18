import React from 'react'

const Months = () => {
  // Create a new Date object to get the current date and time
  const currentDate = new Date();

  // Get the current day (0-6, where 0 is Sunday and 6 is Saturday)
  const currentDay = currentDate.getDay();

  // Define an array of day names for reference
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get the current date (1-31)
  const currentDateOfMonth = currentDate.getDate();

  // Get the current month (0-11, where 0 is January and 11 is December)
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
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 to adjust for the zero-based index

  // Get the current year (e.g., 2023)
  const currentYear = currentDate.getFullYear();

  return (
    <div>
      <p>Current Day: {daysOfWeek[currentDay]}</p>
      <p>Current Date: {currentDateOfMonth}</p>
      <p>Current Month: {currentMonth} - {months[currentMonth-1]} </p>
      <p>Current Year: {currentYear}</p>
    </div>
  );
}

export default Months