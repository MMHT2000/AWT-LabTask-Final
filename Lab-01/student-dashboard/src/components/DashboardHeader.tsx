import PropTypes from "prop-types";

interface DashboardHeaderProps {
  title: string;
  tagline: string;
}

function DashboardHeader({ title, tagline }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>

      <nav className="dashboard-nav">
        <a href="#dashboard">Dashboard</a>
        <a href="#students">Students</a>
        <a href="#courses">Courses</a>
      </nav>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default DashboardHeader;