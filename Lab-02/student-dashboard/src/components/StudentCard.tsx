import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";
import PropTypes from "prop-types";

interface Course {
  courseName: string;
  color: string;
}

interface StudentCardProps {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  courses: Course[];
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

function StudentCard({
  name,
  id,
  avatar,
  gpa,
  major,
  courses,
  isFavorite,
  onFavoriteToggle,
}: StudentCardProps) {
  return (
    <div className="student-card">
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="student-avatar"
      />

      <div className="student-info">
        <h2>{name}</h2>

        <p>Student ID: {id}</p>
        <p>Major: {major}</p>

        <StatBadge label="GPA" value={gpa} />
        <StatBadge label="Courses" value={courses.length} />

        <div className="course-tags">
          {courses.map((course, index) => (
            <CourseTag
              key={index}
              courseName={course.courseName}
              color={course.color}
            />
          ))}
        </div>

          <button
            type="button"
            onClick={onFavoriteToggle}
          >
            {isFavorite ? "★ Favorited" : "☆ Favorite"}
          </button>
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      courseName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default StudentCard;