export const dynamic = 'force-dynamic'

import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Expense from "@/models/expenseModel";
import { NextURL } from "next/dist/server/web/next-url";

connect();

export async function GET(request: NextRequest) {
  try {
    const reqQuery = new NextURL(request?.url).searchParams;
    const userEmail = reqQuery.get("userEmail");
    const expenses = await Expense.find({ userEmail: userEmail });
    return NextResponse.json({
      mesaaage: "User found",
      data: expenses,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
