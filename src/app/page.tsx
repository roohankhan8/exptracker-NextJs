"use client";
import Image from "next/image";
import { AddExpense, Expenses, PieChart } from "@/components";

export default function Home() {
  return (
    <main>
      <Expenses />
    </main>
  );
}
