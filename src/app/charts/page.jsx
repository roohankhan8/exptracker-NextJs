"use client";
import axios from "axios";
import { PieChart } from "@/components";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
const Charts = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email
  const [expenses, setexpenses] = useState([]);
  useEffect(() => {
    getExpenses(userEmail);
    console.log(expenses)
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
    console.log(data)
    let total = foodTotal+transportationTotal+othersTotal
    if (total>0){
      return (
        <div>
          <h1>Pie Chart Example</h1>
          <div className="w-40 h-40">
            <PieChart data={data} />
          </div>
        </div>
      );
    }
  }
  if (session){
    return (
      <div>{getTotal()}</div>
    )
  } else{
    return (
      <div>
        Nothing
      </div>
    )
  }
};

export default Charts;
