// eslint-disable-next-line react/prop-types
const Search = ({searchText, setSearchText}) => {
    return (
        <div className="search">
            <div>
                <img src='search.svg' alt="Search Icon" />
                <input
                    type='text'
                    placeholder='Search your desired movie'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search;