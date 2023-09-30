'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { ExpensesTable, GetTotal, Popup, SearchBar } from "."
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Expenses = ({
    expenses,
    editExp,
    getExpenses,
    updateNoteHandler,
    deleteExp,
    openPopup,
    switchType,
    isPopupOpen,
    setIsPopupOpen,
    seteditExp
}) => {
    const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);
    useEffect(() => {
        getExpenses()
    }, [getExpenses])
    return (
        <>
            {expenses.length > 0 ? (
                <>
                    <div className="flex justify-center">
                        <div className="sm:w-[50%] w-full">
                            <GetTotal expenses={expenses} />
                        </div>
                    </div>
                    <SearchBar
                        expenses={expenses}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        setSearchedResults={setSearchedResults}
                    />
                    {searchText ? (
                        <div className='sm:flex'>
                            <ExpensesTable expenses={searchedResults} category={"expense"} title={'Expenses'} deleteExp={deleteExp} openPopup={openPopup} />
                            <ExpensesTable expenses={searchedResults} category={"income"} title={'Incomes'} deleteExp={deleteExp} openPopup={openPopup} />
                        </div>
                    ) : (
                        <div className='sm:flex'>
                            <ExpensesTable expenses={expenses} category={"expense"} title={'Expenses'} deleteExp={deleteExp} openPopup={openPopup} />
                            <ExpensesTable expenses={expenses} category={"income"} title={'Incomes'} deleteExp={deleteExp} openPopup={openPopup} />
                        </div>
                    )}
                    <Popup isOpen={isPopupOpen} editExp={editExp} switchType={switchType} updateNoteHandler={updateNoteHandler} setIsPopupOpen={setIsPopupOpen} seteditExp={seteditExp} />
                </>
            ) : (
                <>
                    <div className="my-48 flex justify-center items-center text-2xl font-bold">
                        No Expenses Yet, Add yours!
                    </div>
                </>
            )}
            <ToastContainer />
        </>
    )
}

export default Expenses