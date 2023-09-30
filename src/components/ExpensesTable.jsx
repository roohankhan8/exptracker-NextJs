import { dateFormat } from '@/helpers'

const ExpensesTable = ({ expenses, category, title, deleteExp, openPopup }) => {
    return (
        <div id="boxes" className=" sm:w-[50%] p-3 my-5 shadow-md shadow-black rounded-lg m-2">
            <h1 className='text-center text-xl p-2 font-bold'>{title}</h1>
            <table className="border-2 w-full rounded-lg text-center">
                <thead className="border-2">
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {expenses.slice().reverse().map((expense) => (
                        <>
                            {expense.category == category ? (
                                <tr key={expense._id} className=" text-sm">
                                    <td className="" >{expense?.typeOfExp}</td>
                                    <td>{expense?.amount}</td>
                                    <td>{dateFormat(expense.dateCreated)}</td>
                                    <td className="flex justify-around items-center">
                                        <button className="text-sm text-green-500" onClick={() => openPopup && openPopup(expense)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button className="text-sm text-red-500" onClick={() => deleteExp && deleteExp(expense._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExpensesTable