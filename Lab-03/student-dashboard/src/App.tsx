import { useMemo } from "react";
import "./App.css";
import DashboardHeader from "./components/DashboardHeader";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import StudentCard from "./components/StudentCard";
import StatBadge from "./components/StatBadge";
import AddStudentForm from "./components/AddStudentForm";
import { useStudentContext } from "./context/StudentContext";

function App() {
  const { students, loading, query, sortBy, favorites } =
    useStudentContext();

  const visibleStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = normalizedQuery
      ? students.filter(
          (student) =>
            student.name.toLowerCase().includes(normalizedQuery) ||
            student.major.toLowerCase().includes(normalizedQuery)
        )
      : students;

    const sorted = [...filtered];

    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "gpa") {
      sorted.sort((a, b) => b.gpa - a.gpa);
    }

    return sorted;
  }, [students, query, sortBy]);

  const averageGpa = useMemo(() => {
    if (students.length === 0) return "0.00";
    const total = students.reduce((sum, student) => sum + student.gpa, 0);
    return (total / students.length).toFixed(2);
  }, [students]);

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage and view student information"
      />

      <main className="dashboard-main">
        <section className="dashboard-stats">
          <StatBadge label="Total Students" value={students.length} />
          <StatBadge label="Average GPA" value={averageGpa} />
          <StatBadge label="Favorites" value={favorites.length} />
        </section>

        <section className="dashboard-controls">
          <SearchBar />
          <SortControls />
        </section>

        {loading ? (
          <p className="loading-message">Loading students...</p>
        ) : visibleStudents.length === 0 ? (
          <p className="empty-message">No students match your search.</p>
        ) : (
          <section className="student-grid">
            {visibleStudents.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                id={student.id}
                avatar={student.avatar}
                gpa={student.gpa}
                major={student.major}
                courses={student.courses}
              />
            ))}
          </section>
        )}

        <AddStudentForm />
      </main>
    </div>
  );
}

export default App;
