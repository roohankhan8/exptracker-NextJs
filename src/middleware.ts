import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request:NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  console.log(token);
  if (!token) return NextResponse.redirect(new URL("/", request.url));
  else return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/addExpense",'/charts','/details'],
};
