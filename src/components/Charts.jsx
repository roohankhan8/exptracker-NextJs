"use client";
import axios from "axios";
import { PieChart } from "@/components";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import Link from 'next/link'

const Charts = () => {
    const { data: session } = useSession();
    const userEmail = session?.user?.email
    const [expenses, setexpenses] = useState([]);
    useEffect(() => {
        getExpenses(userEmail);
    }, []);
    const getExpenses = async (userEmail) => {
        const res = await axios.get(`/api/exps?userEmail=${userEmail}`);
        setexpenses(res.data.data);
    };
    let foodTotal = 0
    let transportationTotal = 0
    let othersTotal = 0
    const getTotal = () => {
        for (let i in expenses) {
            if (expenses[i].typeOfExp == 'food') {
                foodTotal += parseInt((expenses[i].amount))
            }
            else if (expenses[i].typeOfExp == 'transportation') {
                transportationTotal += parseInt((expenses[i].amount))
            }
            else if (expenses[i].typeOfExp == 'others') {
                othersTotal += parseInt((expenses[i].amount))
            }
        }
        const data = {
            labels: ["Food", "Transportation", "Others"],
            values: [foodTotal, transportationTotal, othersTotal],
            colors: ["#FF5733", "#33FF57", "#5733FF"],
        };
        let total = foodTotal + transportationTotal + othersTotal
        console.log(total)
        if (total > 0) {
            return (<>
                <div className="h-screen w-full flex items-center justify-center">
                    <PieChart data={data} />
                </div>
            </>
            );
        } else {
            return (
                <div className="h-screen text-3xl font-bold w-full flex items-center justify-center">Loading...</div>
            )
        }
    }
    return (
        <>
            <div className="flex p-2 items-center justify-between">
                <Link href='/' id="back">
                    Back
                </Link>
                <h1 className="text-2xl font-bold" >Expenses Chart</h1>
                <div></div>
            </div>
            {session?.user?.email == userEmail ? (
                <div>
                    {getTotal()}
                </div>
            ) : (
                <div>
                    Nothing
                </div>
            )}

        </>

    )
};

export default Charts;