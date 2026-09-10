import PropTypes from "prop-types";

interface SortControlsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

function SortControls({
  sortBy,
  onSortChange,
}: SortControlsProps) {
  return (
    <div className="sort-controls">
      <button
        type="button"
        onClick={() => onSortChange("name")}
        className={sortBy === "name" ? "active" : ""}
      >
        Name A–Z
      </button>

      <button
        type="button"
        onClick={() => onSortChange("gpa")}
        className={sortBy === "gpa" ? "active" : ""}
      >
        GPA High-to-Low
      </button>

      <button
        type="button"
        onClick={() => onSortChange("default")}
        className={sortBy === "default" ? "active" : ""}
      >
        Default
      </button>
    </div>
  );
}

SortControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortControls;