import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Expense from "@/models/expenseModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const expenses = await Expense.find();
    console.log(expenses)
    return NextResponse.json({
      mesaaage: "User found",
      data: expenses,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
