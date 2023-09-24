import { ShowType } from ".";

const Popup = ({ isOpen, editExp, switchType, updateNoteHandler, setIsPopupOpen, seteditExp }) => {
  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p className="text-center text-xl">
          Your Expense
        </p>
        <div className="flex flex-col m-2 rounded-lg overflow-hidden ">
          <select value={editExp.category} name="category" id="category" className=" p-2 w-full" onChange={(e) => switchType && switchType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <div id="radioTypes" className="flex items-center justify-around p-2 w-full">
            <ShowType
            editExp={editExp}
            seteditExp={seteditExp}
            />
          </div>
          <input className=" p-2 text-white" type="number" value={editExp.amount} onChange={(e) => seteditExp && seteditExp({ ...editExp, amount: e.target.value })} />
          <textarea className=" p-2 text-white" defaultValue={editExp.note} placeholder="Your Note here..." onChange={(e) => seteditExp && seteditExp({ ...editExp, note: e.target.value })} name="desc" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="flex justify-between text-white p-2" id="options">
          <button className=" bg-red-700" onClick={() => setIsPopupOpen && setIsPopupOpen(false)}>Cancel</button>
          <button type="submit" className=" bg-blue-700" onClick={() => updateNoteHandler && updateNoteHandler()}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
