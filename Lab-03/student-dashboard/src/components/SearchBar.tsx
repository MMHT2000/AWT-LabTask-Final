import PropTypes from "prop-types";
import { useStudentContext } from "../context/StudentContext";

function SearchBar() {
  const { query, setQuery } = useStudentContext();

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or major..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {};

export default SearchBar;