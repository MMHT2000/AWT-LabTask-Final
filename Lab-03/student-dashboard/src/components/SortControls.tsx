import PropTypes from "prop-types";
import { useStudentContext } from "../context/StudentContext";

function SortControls() {
  const { sortBy, setSortBy } = useStudentContext();

  return (
    <div className="sort-controls">
      <button
        type="button"
        onClick={() => setSortBy("name")}
        className={sortBy === "name" ? "active" : ""}
      >
        Name A–Z
      </button>

      <button
        type="button"
        onClick={() => setSortBy("gpa")}
        className={sortBy === "gpa" ? "active" : ""}
      >
        GPA High-to-Low
      </button>

      <button
        type="button"
        onClick={() => setSortBy("default")}
        className={sortBy === "default" ? "active" : ""}
      >
        Default
      </button>
    </div>
  );
}

SortControls.propTypes = {};

export default SortControls;