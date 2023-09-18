import { Logout } from '.'
import Image from 'next/image'

const Navbar = ({image}) => {
    return (
        <div className=' bg-slate-800'>
            <div className="flex justify-between items-center p-2">
                <Logout />
                <h1 className=' text-xl font-bold' >Expense Tracker</h1>
                <Image src={image} alt="profile pic" width={50} height={50} className="rounded-full" />
            </div>
        </div>
    )
}

export default Navbar