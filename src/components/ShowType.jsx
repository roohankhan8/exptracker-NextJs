const ShowType = ({exp}) => {
    if (exp.category == '' || exp.category == 'expense') {
        console.log(exp.typeOfExp)
        return (
            <select name="typeOfExp" id="typeOfExp expSelect" className="border-2 p-2 w-full" onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}>
                <option selected value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="others">Others</option>
            </select>
        )
    }
    else {
        console.log(exp.typeOfExp)
        return (
            <select name="typeOfExp" id="typeOfExp" className="border-2 p-2 w-full" onChange={(e) => { setexp({ ...exp, typeOfExp: e.target.value }) }}>
                <option selected value="salary">Salary</option>
                <option value="bonus">Bonus</option>
                <option value="allowance">Allowance</option>
            </select>
        )
    }
}
export default ShowType