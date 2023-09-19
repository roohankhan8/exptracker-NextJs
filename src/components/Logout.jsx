import { signOut } from "next-auth/react"

const Logout = () => {
    return (
        <div>
            <button onClick={() => signOut()} id="back">Logout</button>
        </div>
    )
}

export default Logout