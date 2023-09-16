import { signOut } from "next-auth/react"

const Logout = () => {
    return (
        <div>
            <button onClick={() => signOut()} className="bg-white text-slate-800 px-2 py-1 rounded-xl hover:scale-105 shadow-lg">Logout</button>
        </div>
    )
}

export default Logout