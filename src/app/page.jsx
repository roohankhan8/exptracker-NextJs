"use client";
import { useSession, signIn } from "next-auth/react";
import { Expenses, Navbar } from "@/components";
import { useState, useEffect } from "react"
import axios from "axios"
import { showToastMessage } from '@/helpers'
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession();
  const [expenses, setexpenses] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={() => signIn("google")}
          className="bg-white text-slate-800 px-2 py-1 rounded-xl hover:scale-105 shadow-lg"
        >
          Login With Google
        </button>
      </div>
    );
  }
  return (
    <>
      <Navbar image={session.user.image} />
      <div className="m-2">
        <Link href='/addExpense' className="">
          <button className="w-full bg-slate-900 text-lg p-2 rounded-lg shadow-md hover:shadow-black">
            <span>Add Expense </span>
            +
          </button>
        </Link>
      </div>
      {expenses.length > 0 ? (
        <Expenses
          session={session}
          expenses={expenses}
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
      ) : (
        <>
          <div className="my-44 flex justify-center items-center text-2xl font-bold">
            No Expenses Yet, Add yours!
          </div>
        </>
      )}
    </>
  );
}
