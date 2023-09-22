"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { Charts } from "@/components"
import Link from 'next/link'

const ChartsPage = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email
  const [expenses, setexpenses] = useState([]);
  useEffect(() => {
    getExpenses(userEmail);
  }, [userEmail]);
  const getExpenses = async (userEmail) => {
    const res = await axios.get(`/api/exps?userEmail=${userEmail}`);
    setexpenses(res.data.data);
  };
  return (
    <div>
      <div className="flex p-2 items-center justify-between">
        <Link href='/' id="back">
          Back
        </Link>
        <h1 className="text-2xl font-bold" >Expenses Chart</h1>
        <div></div>
      </div>
      {expenses != [] ? (
        <Charts
        expenses={expenses}
        />
      ):(
        <></>
      )}
    </div>
  )
}

export default ChartsPage