import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

interface DashboardHeaderProps {
  title: string;
  tagline: string;
  favoriteCount: number;
}

function DashboardHeader({ title, tagline, favoriteCount, }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();

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

      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  favoriteCount: PropTypes.number.isRequired,
};

export default DashboardHeader;