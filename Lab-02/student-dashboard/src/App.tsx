import { useEffect, useState } from "react";
import "./App.css";
import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";

interface Course {
  courseName: string;
  color: string;
}

interface Student {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  courses: Course[];
}

const studentData: Student[] = [
  {
    name: "MD. Mohaiminul Haque",
    id: "23-50302-1",
    avatar: "https://i.pravatar.cc/150?img=11",
    gpa: 3.8,
    major: "Computer Science & Engineering",
    courses: [
      { courseName: "React", color: "#61dafb" },
      { courseName: "Database", color: "#f59e0b" },
      { courseName: "Networking", color: "#8b5cf6" },
    ],
  },
  {
    name: "Nusrat Jahan",
    id: "24-50567-1",
    avatar: "https://i.pravatar.cc/150?img=5",
    gpa: 3.9,
    major: "Microbiology",
    courses: [
      { courseName: "Microbiology", color: "#34d399" },
      { courseName: "Biology", color: "#f472b6" },
      { courseName: "Genetics", color: "#8b5cf6" },
    ],
  },
  {
    name: "Faysal Arafat",
    id: "24-50568-1",
    avatar: "https://i.pravatar.cc/150?img=12",
    gpa: 3.6,
    major: "Data Sciene",
    courses: [
      { courseName: "Data Science", color: "#61dafb" },
      { courseName: "Statistics", color: "#f59e0b" },
      { courseName: "Machine Learning", color: "#8b5cf6" },
    ],
  },
  {
    name: "Mumtahin Binte Abedin",
    id: "24-50569-1",
    avatar: "https://i.pravatar.cc/150?img=9",
    gpa: 3.7,
    major: "Genetic Engineering & Biotehnology",
    courses: [
      { courseName: "Genetics", color: "#61dafb" },
      { courseName: "Biotechnology", color: "#a78bfa" },
      { courseName: "Biology", color: "#4ade80" },
    ],
  },
];

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(studentData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  

    const filteredStudents = students.filter((student) => {
      const searchTerm = query.toLowerCase();

      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.major.toLowerCase().includes(searchTerm)
      );
    });

    const sortedStudents = [...filteredStudents].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "gpa") {
        return b.gpa - a.gpa;
      }

      return 0;
    });

    useEffect(() => {
      document.title = `Dashboard — ${filteredStudents.length} Students`;
    }, [filteredStudents.length]);

    const toggleFavorite = (studentId: string) => {
      setFavorites((currentFavorites) =>
        currentFavorites.includes(studentId)
          ? currentFavorites.filter((id) => id !== studentId)
          : [...currentFavorites, studentId]
      );
    };

  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage and view student information"
        favoriteCount={favorites.length}
      />

      <SearchBar
        query={query}
        onQueryChange={setQuery}
      />

      <SortControls
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : (
        <div className="student-grid">
          {sortedStudents.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              id={student.id}
              avatar={student.avatar}
              gpa={student.gpa}
              major={student.major}
              courses={student.courses}
              isFavorite={favorites.includes(student.id)}
              onFavoriteToggle={() => toggleFavorite(student.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;