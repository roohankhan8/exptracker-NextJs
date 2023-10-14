
"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link"

const Form = ({ page }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div id="form" className="">
                <h1 className="text-2xl font-bold mb-3">{page == 'Login' ? 'Login' : 'Register'}</h1>
                {page == 'Login' ? (
                    <>
                        <input type="email" name='email' placeholder="Email" />
                        <input type="password" name='password' placeholder="Password" /></>
                ) : (
                    <>
                        <input type="email" name='email' placeholder="Email" />
                        <input type="password" name='password1' placeholder="Password" />
                        <input type="password" name='password2' placeholder="Confirm password" />
                    </>
                )}
                <button>{page == 'Login' ? 'Login' : 'Register'}</button>
                OR
                <button
                    onClick={() => signIn("google")}
                    className=""
                >Continue with Google
                </button>
                <div className=" text-sm text-gray-300 underline">
                    {page == 'Login' ? (
                        <Link href='/register'>No account? Register</Link>
                    ) : (
                        <Link href='/login'>Already have an account? Login</Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Form
