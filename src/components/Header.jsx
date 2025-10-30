import PropTypes from "prop-types";
import Search from "./Search.jsx";

const Header = ({ searchText, setSearchText }) => {
  return (
    <header>
      <img src="hero.png" alt="Hero Banner" />
      <h1>
        Find <span className="text-gradient">Movies</span> You&#39;ll Enjoy
        Without the Hassle
      </h1>

      <Search searchText={searchText} setSearchText={setSearchText} />
    </header>
  );
};

Header.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
};

export default Header;
