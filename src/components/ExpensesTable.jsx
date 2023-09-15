

const ExpensesTable = ({ title, children }) => {
    return (
        <>
            <h1 className='text-center'>{title}</h1>
            <table className="border-2 w-full text-center">
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
        </>
    )
}

export default ExpensesTable