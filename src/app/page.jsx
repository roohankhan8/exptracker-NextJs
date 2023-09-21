"use client";
import { useSession, signIn } from "next-auth/react";
import { Expenses, Navbar } from "@/components";
import { useState, useEffect } from "react"
import axios from "axios"
import { dateFormat, showToastMessage } from '@/helpers'

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
  // const showType = () => {
  //   if (editExp.category == '' || editExp.category == 'expense') {
  //     return (
  //       <>
  //         <div>
  //           <input
  //             type="radio"
  //             id="food"
  //             name="typeOfExp"
  //             value="food"
  //             checked={editExp.typeOfExp === "food"}
  //             onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
  //           />
  //           <label htmlFor="food">Food</label>
  //         </div>
  //         <div>
  //           <input
  //             type="radio"
  //             id="transportation"
  //             name="typeOfExp"
  //             value="transportation"
  //             checked={editExp.typeOfExp === "transportation"}
  //             onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
  //           />
  //           <label htmlFor="transportation">Transportation</label>
  //         </div>
  //         <div>
  //           <input
  //             type="radio"
  //             id="others"
  //             name="typeOfExp"
  //             value="others"
  //             checked={editExp.typeOfExp === "others"}
  //             onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
  //           />
  //           <label htmlFor="others">Others</label>
  //         </div>
  //       </>
  //     )
  //   }
  //   else {
  //     return (
  //       <>
  //         <div>
  //           <input
  //             type="radio"
  //             id="salary"
  //             name="typeOfExp"
  //             value="salary"
  //             checked={editExp.typeOfExp === "salary"}
  //             onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
  //           />
  //           <label htmlFor="salary">Salary</label>
  //         </div>
  //         <div>
  //           <input
  //             type="radio"
  //             id="bonus"
  //             name="typeOfExp"
  //             value="bonus"
  //             checked={editExp.typeOfExp === "bonus"}
  //             onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
  //           />
  //           <label htmlFor="bonus">Bonus</label>
  //         </div>
  //         <div>
  //           <input
  //             type="radio"
  //             id="allowance"
  //             name="typeOfExp"
  //             value="allowance"
  //             checked={editExp.typeOfExp === "allowance"}
  //             onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
  //           />
  //           <label htmlFor="allowance">Allowance</label>
  //         </div>
  //       </>
  //     )
  //   }
  // }
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
      <Expenses
        session={session}
        expenses={expenses}
        editExp={editExp}
        getExpenses={getExpenses}
        updateNoteHandler={updateNoteHandler}
        deleteExp={deleteExp}
        openPopup={openPopup}
        switchType={switchType}
        // showType={showType}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        seteditExp={seteditExp}
      />
    </>
  );
}
