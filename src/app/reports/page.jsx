"use client";
import { TextCarousel, Navbar, GetTotal } from "@/components";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import axios from "axios"

const Details = () => {
  const { data: session } = useSession();
  const [expenses, setexpenses] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    getExpenses()
  }, [])
  const getExpenses = async () => {
    const res = await axios.get(`/api/exps?userEmail=${session?.user?.email}`)
    setexpenses(res.data.data)
  }
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.dateCreated);
    return expenseDate.getFullYear() === selectedYear
  });
  return (
    <div className=" h-screen">
      <Navbar
        page={'Report'}
        image={session?.user?.image}
      />
      <div className="m-2">
        <div className=" bg-slate-900 w-full text-lg rounded-lg">
          <TextCarousel report={'Report'} setSelectedYear={setSelectedYear} />
        </div>
      </div>
      <h1 className=" p-4 text-xl font-semibold text-center">Annual Report of {selectedYear}</h1>
      <GetTotal page={'Report'} expenses={filteredExpenses} />
    </div>
  )
}

export default Details
