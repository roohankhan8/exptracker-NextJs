'use client'
import axios from "axios"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ExpensesTable, GetTotal, Popup, Navbar } from "."
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
    const switchType = (e) => {
        if (e === 'income') {
            seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: "salary" }))
        } else if (e === 'expense') {
            seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: "food" }))
        }
    }
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
            {expenses.length > 0 ? (
                <>
                    {expenses && (
                        <GetTotal expenses={expenses} />
                    )}
                    <ExpensesTable title={'Expenses'}>
                        {expenses.slice().reverse().map((expense) => (
                            <>
                                {expense.category == 'expense' ? (
                                    <tr key={expense._id} className=" text-sm">
                                        <td className="" >{expense?.typeOfExp}</td>
                                        <td>Rs.{expense?.amount}</td>
                                        <td>{dateFormat(expense.dateCreated)}</td>
                                        <td className="flex justify-around items-center">
                                            <button className="text-sm" onClick={() => openPopup(expense)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </button>
                                            <button className="text-sm" onClick={() => deleteExp(expense._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <></>
                                )}
                            </>
                        ))}
                    </ExpensesTable>
                    <ExpensesTable title={'Income'}>
                        {expenses.slice().reverse().map((expense) => (
                            <>
                                {expense.category == 'income' ? (
                                    <tr key={expense._id} className=" text-sm">
                                        <td>{expense?.typeOfExp}</td>
                                        <td>Rs.{expense?.amount}</td>
                                        <td>{dateFormat(expense.dateCreated)}</td>
                                        <td className="flex justify-around items-center">
                                            <button className="text-sm" onClick={() => openPopup(expense)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </button>
                                            <button className="text-sm" onClick={() => deleteExp(expense._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <></>
                                )}
                            </>
                        ))}
                    </ExpensesTable>
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