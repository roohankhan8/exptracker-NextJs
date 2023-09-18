const ExpensesTable = ({ title, children }) => {
    return (
        <div id="boxes" className=" p-3 my-5 shadow-md shadow-black rounded-lg m-2">
            <h1 className='text-center text-xl p-2 font-bold'>{title}</h1>
            <table className="border-2 sh rounded-lg w-full text-center">
                <thead className="border-2">
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default ExpensesTable