"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { TextCarousel, Navbar } from "@/components";
import { useSession } from "next-auth/react"
import { Charts } from "@/components"
import Link from 'next/link'

const ChartsPage = () => {
  const { data: session } = useSession();
  const [expenses, setexpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  useEffect(() => {
    getExpenses();
  }, []);
  const getExpenses = async () => {
    const res = await axios.get(`/api/exps?userEmail=${session?.user?.email}`);
    setexpenses(res.data.data);
  };
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.dateCreated);
    return expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === selectedYear
  });
  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May'],
  //   datasets: [
  //     {
  //       label: 'Monthly Expenses',
  //       data: [12, 19, 3, 5, 2],
  //       backgroundColor: ['rgba(255, 99, 132, 0.2)'],
  //       borderColor: ['rgba(255, 99, 132, 1)'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };
  return (
    <div>
      <Navbar 
      page={'Chart'}
      image={session?.user?.image} 
      />
      <div className="m-2">
        <div className=" bg-slate-900 w-full text-lg rounded-lg">
          <TextCarousel setSelectedYear={setSelectedYear} setSelectedMonth={setSelectedMonth} className="" />
        </div>
      </div>
      {/* <BarChart data={data} options={options} /> */}
      {expenses != [] ? (
        <Charts
          expenses={filteredExpenses}
        />
      ) : (
        <></>
      )}

    </div>
  )
}

export default ChartsPage