import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Course {
  courseName: string;
  color: string;
}

export interface Student {
  name: string;
  id: string;
  avatar: string;
  gpa: number;
  major: string;
  courses: Course[];
}

interface StudentContextType {
  students: Student[];
  loading: boolean;
  query: string;
  setQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  favorites: string[];
  toggleFavorite: (studentId: string) => void;
  removeStudent: (studentId: string) => void;
  addStudent: (student: Student) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(
  undefined
);

interface StudentProviderProps {
  children: ReactNode;
}

export function StudentProvider({ children }: StudentProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setStudents([
        {
          name: "MD. Mohaiminul Haque",
          id: "23-50302-1",
          avatar: "https://i.pravatar.cc/150?img=11",
          gpa: 3.8,
          major: "Computer Science & Engineering",
          courses: [
            { courseName: "CSE", color: "#2563eb" },
            { courseName: "SWE", color: "#16a34a" },
          ],
        },
        {
          name: "Nusrat Jahan",
          id: "24-50567-1",
          avatar: "https://i.pravatar.cc/150?img=5",
          gpa: 3.9,
          major: "Microbiology",
          courses: [
            { courseName: "BIO", color: "#dc2626" },
            { courseName: "MIC", color: "#9333ea" },
          ],
        },
        {
          name: "Faysal Arafat",
          id: "24-50568-1",
          avatar: "https://i.pravatar.cc/150?img=12",
          gpa: 3.6,
          major: "Data Sciene",
          courses: [
            { courseName: "DS", color: "#ea580c" },
            { courseName: "AI", color: "#0891b2" },
          ],
        },
        {
          name: "Mumtahin Binte Abedin",
          id: "24-50569-1",
          avatar: "https://i.pravatar.cc/150?img=9",
          gpa: 3.7,
          major: "Genetic Engineering & Biotehnology",
          courses: [
            { courseName: "GEN", color: "#65a30d" },
            { courseName: "BIO", color: "#db2777" },
          ],
        },
      ]);

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, loading]);

  const toggleFavorite = (studentId: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(studentId)
        ? currentFavorites.filter((id) => id !== studentId)
        : [...currentFavorites, studentId]
    );
  };

  const removeStudent = (studentId: string) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );

    setFavorites((currentFavorites) =>
      currentFavorites.filter((id) => id !== studentId)
    );
  };

  const addStudent = (student: Student) => {
    setStudents((currentStudents) => [...currentStudents, student]);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        query,
        setQuery,
        sortBy,
        setSortBy,
        favorites,
        toggleFavorite,
        removeStudent,
        addStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudentContext must be used within StudentProvider"
    );
  }

  return context;
}