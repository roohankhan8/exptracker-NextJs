import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Expense from "@/models/expenseModel";

connect();

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { _id, category, typeOfExp, amount, note } = reqBody;
    console.log(reqBody);
    console.log(_id, category, amount, note);

    const updatedExp = await Expense.findByIdAndUpdate(
      _id,
      { category, typeOfExp, amount, note, dateCreated: new Date() },
      { new: true }
    );
    return NextResponse.json({
      message: "Expense updated",
      success: true,
      updatedExp,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
