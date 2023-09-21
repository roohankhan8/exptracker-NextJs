const ShowType = ({ 
  editExp,
  seteditExp 
}) => {
  if (editExp.category == '' || editExp.category == 'expense') {
    return (
      <>
        <div>
          <input
            type="radio"
            id="food"
            name="typeOfExp"
            value="food"
            checked={editExp.typeOfExp === "food"}
            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
          />
          <label htmlFor="food">Food</label>
        </div>
        <div>
          <input
            type="radio"
            id="transportation"
            name="typeOfExp"
            value="transportation"
            checked={editExp.typeOfExp === "transportation"}
            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
          />
          <label htmlFor="transportation">Transportation</label>
        </div>
        <div>
          <input
            type="radio"
            id="others"
            name="typeOfExp"
            value="others"
            checked={editExp.typeOfExp === "others"}
            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
          />
          <label htmlFor="others">Others</label>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div>
          <input
            type="radio"
            id="salary"
            name="typeOfExp"
            value="salary"
            checked={editExp.typeOfExp === "salary"}
            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
          />
          <label htmlFor="salary">Salary</label>
        </div>
        <div>
          <input
            type="radio"
            id="bonus"
            name="typeOfExp"
            value="bonus"
            checked={editExp.typeOfExp === "bonus"}
            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
          />
          <label htmlFor="bonus">Bonus</label>
        </div>
        <div>
          <input
            type="radio"
            id="allowance"
            name="typeOfExp"
            value="allowance"
            checked={editExp.typeOfExp === "allowance"}
            onChange={(e) => { seteditExp({ ...editExp, typeOfExp: e.target.value }) }}
          />
          <label htmlFor="allowance">Allowance</label>
        </div>
      </>
    )
  }
}

export default ShowType