import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShowType } from ".";

const AddExpense = ({
    switchType,
    editExp,
    seteditExp,
    addExpense, 
    router
}) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex bg-slate-900 flex-col items-center justify-center p-2" id="addExpContainer" >
                <h1 className="text-2xl font-bold my-2">Add Expense</h1>
                <select name="category" id="category" className=" p-2 w-full" onChange={(e) => switchType(e.target.value)}>
                    <option value="editExpense" className='rounded-lg p-2' >Expense</option>
                    <option value="income" className='rounded-lg p-2' >Income</option>
                </select>
                <div id="radioTypes" className="flex items-center justify-around p-2 w-full">
                    <ShowType
                        editExp={editExp}
                        seteditExp={seteditExp}
                    />
                </div>
                <input required onChange={(e) => { seteditExp({ ...editExp, amount: parseFloat(e.target.value) }) }} type="number" name="amount" id="amount" placeholder="Amount" className=" p-2 w-full" />
                <textarea onChange={(e) => { seteditExp({ ...editExp, note: e.target.value }) }} name="note" placeholder="Note" id="" cols="30" rows="3" className=" p-2"></textarea>
                <div className="flex justify-between w-full my-2" id="options" >
                    <button className=" bg-red-700" onClick={() => { router.push('/') }}>Cancel</button>
                    <button type="submit" className=" bg-blue-700" onClick={addExpense} >Add</button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AddExpense