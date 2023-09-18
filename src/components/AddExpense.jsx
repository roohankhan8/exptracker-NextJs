'use client'
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react"
import { showToastMessage } from "@/helpers";

const AddExpense = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [exp, setexp] = useState({
        userEmail: session?.user?.email,
        category: 'expense',
        typeOfExp: 'food',
        amount: 0.00,
        note: ''
    })
    const addExpense = async () => {
        console.log(exp)
        if (exp.amount > 0) {
            showToastMessage('add')
            const res = await axios.post('/api/addexp', exp)
            router.push('/')
        } else {
            showToastMessage('invalid amount')
        }
    }
    const switchType = (e) => {
        if (e === 'income') {
            setexp(prevExp => ({ ...prevExp, category: e, typeOfExp: 'salary' }))
        } else if (e === 'expense') {
            setexp(prevExp => ({ ...prevExp, category: e, typeOfExp: 'food' }))
        }
    }
    const showType = () => {
        if (exp.category == '' || exp.category == 'expense') {
            return (
                <>
                    <div>
                        <input
                            type="radio"
                            id="food"
                            name="typeOfExp"
                            value="food"
                            checked={exp.typeOfExp === "food"}
                            onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="transportation"
                            name="typeOfExp"
                            value="transportation"
                            checked={exp.typeOfExp === "transportation"}
                            onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="transportation">Transportation</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="others"
                            name="typeOfExp"
                            value="others"
                            checked={exp.typeOfExp === "others"}
                            onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}
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
                            checked={exp.typeOfExp === "salary"}
                            onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="salary">Salary</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="bonus"
                            name="typeOfExp"
                            value="bonus"
                            checked={exp.typeOfExp === "bonus"}
                            onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="bonus">Bonus</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="allowance"
                            name="typeOfExp"
                            value="allowance"
                            checked={exp.typeOfExp === "allowance"}
                            onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}
                        />
                        <label htmlFor="allowance">Allowance</label>
                    </div>
                </>
            )
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex bg-slate-900 flex-col items-center justify-center p-2" id="addExpContainer" >
                <h1 className="text-2xl font-bold my-2">Add Expense</h1>
                <select name="category" id="category" className="border-2 p-2 w-full" onChange={(e) => switchType(e.target.value)}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <div id="radioTypes" className="flex items-center justify-around p-2 w-full">
                    {showType()}
                </div>
                <input required onChange={(e) => { setexp({ ...exp, amount: parseFloat(e.target.value) }) }} type="number" name="amount" id="amount" placeholder="Amount" className="border p-2 w-full" />
                <textarea onChange={(e) => { setexp({ ...exp, note: e.target.value }) }} name="note" placeholder="Note" id="" cols="30" rows="3" className="border-2 p-2"></textarea>
                <div className="flex justify-between w-full my-2" id="options" >
                    <button className=" bg-red-700" onClick={() => { router.push('/') }}>Cancel</button>
                    <button type="submit" className=" bg-blue-700" onClick={addExpense} >Add</button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AddExpense