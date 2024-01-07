"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { TextCarousel, Navbar, GetTotal } from "@/components";
import { useSession } from "next-auth/react"
import { Charts } from "@/components"

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
  console.log(filteredExpenses)
  return (
    <div className="">
      <Navbar
        page={'Chart'}
        image={session?.user?.image}
      />
      <div className="m-2">
        <div className=" bg-slate-900 w-full text-lg rounded-lg">
          <TextCarousel setSelectedYear={setSelectedYear} setSelectedMonth={setSelectedMonth} className="" />
        </div>
      </div>
      <GetTotal expenses={filteredExpenses} />
      <Charts
        expenses={filteredExpenses}
      />
    </div>
  )
}

export default ChartsPage
