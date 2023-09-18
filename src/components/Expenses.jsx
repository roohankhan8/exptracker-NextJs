'use client'
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ExpensesTable, GetTotal, Popup, Navbar, Months } from "."
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react"
import { dateFormat, showToastMessage } from '@/helpers'

const Expenses = () => {
    const { data: session } = useSession()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [expenses, setexpenses] = useState([])
    const [editExp, seteditExp] = useState({
        userEmail: '',
        category: 'expense',
        typeOfExp: 'food',
        amount: 0.00,
        note: ''
    })
    useEffect(() => {
        getExpenses()
    }, [])
    const getExpenses = async () => {
        const res = await axios.get(`/api/exps?userEmail=${session.user.email}`)
        setexpenses(res.data.data)
    }
    const deleteExp = async (_id) => {
        try {
            const response = await axios.delete(
                `/api/deleteExp?expId=${_id}`
            );
            showToastMessage('delete')
            getExpenses()
        } catch (error) {
            console.log(error.message);
        }
    }
    const openPopup = (expense) => {
        seteditExp(expense);
        setIsPopupOpen(true);
    };
    const updateNoteHandler = async () => {
        try {
            console.log(editExp)
            const res = await axios.put('/api/updateExp', editExp)
            showToastMessage('update')
            getExpenses()
            setIsPopupOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
    const switchType = (e) => {
        if (e === 'income') {
            seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: "salary" }))
        } else if (e === 'expense') {
            seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: "food" }))
        }
    }
    const showType = () => {
        if (editExp.category == '' || editExp.category == 'expense') {
            return (
                <>
                    <div>
                        <input
                            type="radio"
                            id="food"
                            name="typeOfExp"
                            value="food"
                            checked={editExp.typeOfExp === "food"}
                            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="transportation"
                            name="typeOfExp"
                            value="transportation"
                            checked={editExp.typeOfExp === "transportation"}
                            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="transportation">Transportation</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="others"
                            name="typeOfExp"
                            value="others"
                            checked={editExp.typeOfExp === "others"}
                            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="others">Others</label>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div>
                        <input
                            type="radio"
                            id="salary"
                            name="typeOfExp"
                            value="salary"
                            checked={editExp.typeOfExp === "salary"}
                            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="salary">Salary</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="bonus"
                            name="typeOfExp"
                            value="bonus"
                            checked={editExp.typeOfExp === "bonus"}
                            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="bonus">Bonus</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="allowance"
                            name="typeOfExp"
                            value="allowance"
                            checked={editExp.typeOfExp === "allowance"}
                            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="allowance">Allowance</label>
                    </div>
                </>
            )
        }
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
            <div className="m-2">

            {/* <Months/> */}
            </div>
            {expenses.length > 0 ? (
                <>
                    {expenses && (
                        <GetTotal expenses={expenses} />
                    )}
                    <ExpensesTable expenses={expenses} title={'Expenses'} category={'expense'}/>
                    <ExpensesTable expenses={expenses} title={'Income'} category={'income'} />
                </>
            ) : (
                <>
                    <div className="my-44 flex justify-center items-center text-2xl font-bold">
                        No Expenses Yet, Add yours!
                    </div>
                </>
            )}
            <Popup isOpen={isPopupOpen}>
                <div className="flex flex-col m-2 rounded-lg overflow-hidden ">
                    <select value={editExp.category} name="category" id="category" className=" p-2 w-full" onChange={(e) => switchType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <div id="radioTypes" className="flex items-center justify-around p-2 w-full">
                        {showType()}
                    </div>
                    <input className=" p-2 text-white" type="number" value={editExp.amount} onChange={(e) => seteditExp({ ...editExp, amount: e.target.value })} />
                    <textarea className=" p-2 text-white" defaultValue={editExp.note} placeholder="Your Note here..." onChange={(e) => seteditExp({ ...editExp, description: e.target.value })} name="desc" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="flex justify-between text-white p-2" id="options">
                    <button className=" bg-red-700" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                    <button type="submit" className=" bg-blue-700" onClick={updateNoteHandler}>Done</button>
                </div>
            </Popup>
            <ToastContainer />
        </>
    )
}

export default Expenses