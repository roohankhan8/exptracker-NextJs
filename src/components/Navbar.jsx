import { Logout } from '.'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = ({ page, image }) => {
    return (
        <div id='sticky_header'>
            <div className="flex justify-between items-center p-2">
                {page == 'Tracker' ? (
                    <Logout />
                ) : (
                    <Link href='/' id="back">
                        Back
                    </Link>
                )}
                <h1 className=' text-xl font-bold' >Expense {page}</h1>
                <Image src={image} alt="profile pic" width={50} height={50} className="rounded-full" />
            </div>
        </div>
    )
}

export default Navbar