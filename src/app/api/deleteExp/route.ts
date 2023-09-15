import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import Expense from "@/models/expenseModel";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const reqQuery = new NextURL(request.url).searchParams;
    const ExpenseId = reqQuery.get("expId");

    const deletedExpense = await Expense.findByIdAndDelete(ExpenseId);

    return NextResponse.json({
      message: "Expense deleted successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: "An error occurred",
      success: false,
    });
  }
}
