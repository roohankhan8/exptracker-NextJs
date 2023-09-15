import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Expense from "@/models/expenseModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { category, typeOfExp, amount, note } = reqBody;
    console.log(reqBody);
    const newExpense = new Expense({
      category,
      typeOfExp,
      amount,
      note,
    });

    const savedExpense = await newExpense.save();
    console.log("saved Expense", savedExpense);
    return NextResponse.json({
      message: "Expense created",
      succes: true,
      savedExpense,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
