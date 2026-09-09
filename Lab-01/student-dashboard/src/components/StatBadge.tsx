import PropTypes from "prop-types";

interface StatBadgeProps {
  label: string;
  value: string | number;
}

function StatBadge({ label, value }: StatBadgeProps) {
  return (
    <div className="stat-badge">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default StatBadge;