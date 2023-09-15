
const GetTotal = ({expenses}) => {
  let expTotal = 0
  let incTotal = 0
  let total = 0
  const getTotal = () => {
    for (let i in expenses) {
        if (expenses[i].category == 'expense') {
            expTotal += parseInt((expenses[i].amount))
        }
        else if (expenses[i].category == 'income') {
            incTotal += parseInt((expenses[i].amount))
        }
    }
    console.log(expTotal, incTotal)
    total = incTotal - expTotal
    return (
        <table className="w-full text-center">
            <thead>
                <tr>
                    <th>Income</th>
                    <th>Expenses</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{incTotal}</td>
                    <td>{expTotal}</td>
                    <td>{total}</td>
                </tr>
            </tbody>
        </table>
    )
}
  return (
    <>{getTotal()}</>
  )
}

export default GetTotal