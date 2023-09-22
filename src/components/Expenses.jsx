'use client'
import Link from "next/link"
import { useEffect } from "react"
import { ExpensesTable, GetTotal, Popup } from "."
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Expenses = ({ expenses, editExp, getExpenses, updateNoteHandler, deleteExp, openPopup, switchType, isPopupOpen, setIsPopupOpen, seteditExp }) => {
    useEffect(() => {
        getExpenses()
    }, [])
    return (
        <>
            <div className="m-2">
                <Link href='/charts' className="">
                    <button className="w-full bg-sky-900 text-lg p-2 rounded-lg shadow-md hover:shadow-black">
                        <span>Charts </span>
                    </button>
                </Link>
            </div>
            <GetTotal expenses={expenses} />
            <ExpensesTable expenses={expenses} category={"expense"} title={'Expenses'} deleteExp={deleteExp} openPopup={openPopup} />
            <ExpensesTable expenses={expenses} category={"income"} title={'Incomes'} deleteExp={deleteExp} openPopup={openPopup} />
            <Popup isOpen={isPopupOpen} editExp={editExp} switchType={switchType} updateNoteHandler={updateNoteHandler} setIsPopupOpen={setIsPopupOpen} seteditExp={seteditExp} />
            <ToastContainer />
        </>
    )
}

export default Expenses