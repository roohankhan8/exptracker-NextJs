import { dateFormat } from '@/helpers'
const SearchBar = ({ 
    expenses,
    searchText,
    setSearchText,
    setSearchedResults
}) => {
    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext);
        return expenses.filter(
            (item) =>
                regex.test(item.typeOfExp) ||
                regex.test(item.amount) ||
                regex.test(dateFormat(item.dateCreated))
        );
    };
    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchText(e.target.value);
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
    };
    return (
        <form className='flex my-4 justify-center items-center w-full'>
            <input
                type='text'
                placeholder='Search for a date,type or amount'
                value={searchText}
                onChange={handleSearchChange}
                required
                className='search_input peer'
            />
        </form>
    )
}

export default SearchBar