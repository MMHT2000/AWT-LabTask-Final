import "./App.css";
import StudentCard from "./components/StudentCard";
import DashboardHeader from "./components/DashboardHeader";

function App() {
  return (
    <div className="app">
      <DashboardHeader
        title="Student Dashboard"
        tagline="Manage and view student information"
      />

      <div className="student-grid">
        <StudentCard
          name="MD. Mohaiminul Haque"
          id="23-50302-1"
          avatar="https://i.pravatar.cc/150?img=11"
          gpa={3.8}
          major="Computer Science & Engineering"
          courses={[
            { courseName: "React", color: "#61dafb" },
            { courseName: "Database", color: "#f59e0b" },
            { courseName: "Networking", color: "#8b5cf6" },
          ]}
        />

        <StudentCard
          name="Nusrat Jahan"
          id="24-50567-1"
          avatar="https://i.pravatar.cc/150?img=5"
          gpa={3.9}
          major="Microbiology"
          courses={[
            { courseName: "Microbiology", color: "#34d399" },
            { courseName: "Biology", color: "#f472b6" },
            { courseName: "Genetics", color: "#8b5cf6" },
          ]}
        />

        <StudentCard
          name="Faysal Arafat"
          id="24-50568-1"
          avatar="https://i.pravatar.cc/150?img=12"
          gpa={3.6}
          major="Data Sciene"
          courses={[
            { courseName: "Data Science", color: "#61dafb" },
            { courseName: "Statistics", color: "#f59e0b" },
            { courseName: "Machine Learning", color: "#8b5cf6" },
          ]}
        />

        <StudentCard
          name="Mumtahin Binte Abedin"
          id="24-50569-1"
          avatar="https://i.pravatar.cc/150?img=9"
          gpa={3.7}
          major="Genetic Engineering & Biotehnology"
          courses={[
            { courseName: "Genetics", color: "#61dafb" },
            { courseName: "Biotechnology", color: "#a78bfa" },
            { courseName: "Biology", color: "#4ade80" },
          ]}
        />
      </div>
    </div>
  );
}

export default App;