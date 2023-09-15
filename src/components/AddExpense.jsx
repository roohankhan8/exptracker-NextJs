'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const AddExpense = () => {
    const router = useRouter()
    const [exp, setexp] = useState({
        category: 'expense',
        typeOfExp: 'food',
        amount: 0.00,
        note: ''
    })
    const addExpense = async () => {
        console.log(exp)
        if (exp.amount > 0) {
            // if (exp.category == '' && exp.typeOfExp == '') {
            //     console.log('chala')
            //     setexp(prevExp => ({ ...prevExp, category: 'expense', typeOfExp: "food" }))
            // }
            const res = await axios.post('/api/addexp', exp)
            router.push('/')
        }
    }
    const switchType = (e) => {
        if (e === 'income') {
            setexp(prevExp => ({ ...prevExp, category: e, typeOfExp: "salary" }))
        } else if (e === 'expense') {
            setexp(prevExp => ({ ...prevExp, category: e, typeOfExp: "food" }))
        }
    }
    const showType = () => {
        if (exp.category == '' || exp.category == 'expense') {
            console.log(exp.typeOfExp)
            return (
                <select name="typeOfExp" id="typeOfExp expSelect" className="border-2 p-2" onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}>
                    <option selected value="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="others">Others</option>
                </select>
            )
        }
        else {
            console.log(exp.typeOfExp)
            return (
                <select name="typeOfExp" id="typeOfExp" className="border-2 p-2" onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}>
                    <option selected value="salary">Salary</option>
                    <option value="bonus">Bonus</option>
                    <option value="allowance">Allowance</option>
                </select>
            )
        }
    }
    return (
        <div className="flex flex-col justify-center items-center border-2 p-2">
            <select name="category" id="category firstSelect" className="border-2 p-2" onChange={(e) => switchType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            <div>
                {showType()}
            </div>
            <input onChange={(e) => { setexp({ ...exp, amount: parseFloat(e.target.value) }) }} type="number" name="amount" id="amount" placeholder="Amount" className="border p-2" />
            <textarea onChange={(e) => { setexp({ ...exp, note: e.target.value }) }} name="note" placeholder="Note" id="" cols="30" rows="10" className="border-2 p-2"></textarea>
            <div className="flex justify-between border-2 w-full">
                <button className=" bg-red-700 text-white p-2 rounded-lg">Cancel</button>
                <button className=" bg-blue-700 text-white p-2 rounded-lg" onClick={addExpense}>Add</button>
            </div>

        </div>
    )
}

export default AddExpense