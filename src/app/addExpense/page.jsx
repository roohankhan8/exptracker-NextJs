'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useSession } from "next-auth/react"
import { AddExpense } from "@/components";
import { showToastMessage } from "@/helpers";

const NewExpense = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [editExp, seteditExp] = useState({
        userEmail: session?.user?.email,
        category: 'expense',
        typeOfExp: 'food',
        amount: 0.00,
        note: ''
    })
    const addExpense = async () => {
        if (session && editExp.amount > 0) {
            showToastMessage('add')
            const res = await axios.post('/api/addexp', editExp)
            router.push('/')
        } else if (!session) {

        } else {
            showToastMessage('invalid amount')
        }
    }
    const switchType = (e) => {
        if (e === 'income') {
            seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: 'salary' }))
        } else if (e === 'editExpense') {
            seteditExp(prevExp => ({ ...prevExp, category: e, typeOfExp: 'food' }))
        }
    }
    return (
        <div>
            <AddExpense
                switchType={switchType}
                editExp={editExp}
                seteditExp={seteditExp}
                addExpense={addExpense}
                router={router}
            />
        </div>
    );
};

export default NewExpense;
