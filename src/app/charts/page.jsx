"use client";
import axios from "axios";
import { PieChart } from "@/components";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
const Charts = () => {
  const [expenses, setexpenses] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    getExpenses();
    console.log(expenses)
  }, []);
  const getExpenses = async () => {
    const res = await axios.get(`/api/exps?userEmail=${session.user.email}`);
    setexpenses(res.data.data);
  };

  const data = {
    labels: ["Food", "Transportation", "Others"],
    values: [30, 40, 30],
    colors: ["#FF5733", "#33FF57", "#5733FF"],
  };
  return (
    <div>
      <h1>Pie Chart Example</h1>
      <div className="w-40 h-40">
        <PieChart data={data} />
      </div>
    </div>
  );
};

export default Charts;
