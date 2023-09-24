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
                    <div className="m-2 p-2 flex justify-around items-center">
                        <Link href='/reports' id='option_buttons'>
                            Reports
                        </Link>
                        <Link href='/charts' id='option_buttons'>
                            Charts
                        </Link>
                    </div>
                    <GetTotal expenses={expenses} />
                    <SearchBar
                        expenses={expenses}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        setSearchedResults={setSearchedResults}
                    />
                    {searchText ? (
                        <>
                            <ExpensesTable expenses={searchedResults} category={"expense"} title={'Expenses'} deleteExp={deleteExp} openPopup={openPopup} />
                            <ExpensesTable expenses={searchedResults} category={"income"} title={'Incomes'} deleteExp={deleteExp} openPopup={openPopup} />
                        </>
                    ) : (
                        <>
                            <ExpensesTable expenses={expenses} category={"expense"} title={'Expenses'} deleteExp={deleteExp} openPopup={openPopup} />
                            <ExpensesTable expenses={expenses} category={"income"} title={'Incomes'} deleteExp={deleteExp} openPopup={openPopup} />
                        </>
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