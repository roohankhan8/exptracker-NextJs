'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { Expenses } from "@/components";

export default function Home() {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button onClick={() => signIn('google')} className="bg-white text-slate-800 px-2 py-1 rounded-xl hover:scale-105 shadow-lg">Login With Google</button>
      </div>
    )
  }
  return (
    <main>
      <Expenses />
    </main>
  );
}
