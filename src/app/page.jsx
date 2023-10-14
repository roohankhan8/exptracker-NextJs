"use client";
import { useSession } from "next-auth/react";
import { Expenses, Navbar, TextCarousel } from "@/components";
import { useState, useEffect } from "react"
import { showToastMessage } from '@/helpers'
import Link from "next/link"
import axios from "axios"

export default function Home() {
  const { data: session } = useSession();
  const [expenses, setexpenses] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [editExp, seteditExp] = useState({
    category: 'expense',
    typeOfExp: 'food',
    amount: 0.00,
    note: ''
  })
  useEffect(() => {
    getExpenses()
  }, [])
  const getExpenses = async () => {
    const res = await axios.get(`/api/exps?userEmail=${session?.user?.email}`)
    setexpenses(res.data.data)
  }
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.dateCreated);
    return expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === selectedYear
  });
  const deleteExp = async (_id) => {
    try {
      const res = await axios.delete(
        `/api/deleteExp?expId=${_id}`
      );
      showToastMessage('delete')
      getExpenses()
    } catch (error) {
      console.log(error.message);
    }
  }
  const updateNoteHandler = async () => {
    try {
      const res = await axios.put('/api/updateExp', editExp)
      showToastMessage('update')
      getExpenses()
      setIsPopupOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  const openPopup = (expense) => {
    seteditExp(expense);
    setIsPopupOpen(true);
  };
  const switchType = (e) => {
    if (e === 'income') {
      seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: "salary" }))
    } else if (e === 'expense') {
      seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: "food" }))
    }
  }
  return (
    <>
      <Navbar
        page={'Tracker'}
        image={session?.user?.image} />
      <div className="m-2">
        <div className=" bg-slate-900 w-full text-lg rounded-lg">
          <TextCarousel setSelectedYear={setSelectedYear} setSelectedMonth={setSelectedMonth} className="" />
        </div>
      </div>
      <div className="m-2">
        <Link href='/addExpense' className="">
          <button className="w-full bg-sky-700 text-lg p-2 rounded-lg shadow-md hover:shadow-black">
            <span>Add Expense </span>
            +
          </button>
        </Link>
      </div>
      <div className="m-2 p-2 flex justify-around items-center">
        <Link href='/reports' id='option_buttons'>
          Reports
        </Link>
        <Link href='/charts' id='option_buttons'>
          Charts
        </Link>
      </div>
      {expenses && (
        <Expenses
          session={session}
          expenses={filteredExpenses}
          editExp={editExp}
          getExpenses={getExpenses}
          updateNoteHandler={updateNoteHandler}
          deleteExp={deleteExp}
          openPopup={openPopup}
          switchType={switchType}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          seteditExp={seteditExp}
        />
      )}
    </>
  );
}
