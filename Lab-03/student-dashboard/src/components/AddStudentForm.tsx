import { useEffect, useState } from "react";
import { useStudentContext } from "../context/StudentContext";

interface FormErrors {
  name?: string;
  id?: string;
  major?: string;
  gpa?: string;
}

function AddStudentForm() {
  const { students, addStudent } = useStudentContext();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [major, setMajor] = useState("");
  const [gpa, setGpa] = useState("");
  const [courses, setCourses] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!successMessage) {
        return;
    }

    const timer = setTimeout(() => {
        setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
 }, [successMessage]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    if (!id.trim()) {
      newErrors.id = "Student ID is required.";
    } else if (!/^\d+$/.test(id)) {
      newErrors.id = "Student ID must be numeric.";
    } else if (students.some((student) => student.id === id)) {
      newErrors.id = "Student ID must be unique.";
    }

    if (!major.trim()) {
      newErrors.major = "Major is required.";
    }

    const gpaValue = Number(gpa);

    if (!gpa.trim()) {
      newErrors.gpa = "GPA is required.";
    } else if (Number.isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      newErrors.gpa = "GPA must be between 0 and 4.0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const newStudent = {
        name: name.trim(),
        id: id.trim(),
        avatar: "https://i.pravatar.cc/150?img=1",
        gpa: Number(gpa),
        major: major.trim(),
        courses: courses
        .split(",")
        .map((course) => course.trim())
        .filter((course) => course !== "")
        .map((course) => ({
            courseName: course,
            color: "#2563eb",
        })),
    };

    addStudent(newStudent);

    setSuccessMessage("Student added successfully!");

    setName("");
    setId("");
    setMajor("");
    setGpa("");
    setCourses("");
    setErrors({});
 };

  return (
    <form
      className="add-student-form"
      onSubmit={handleSubmit}
    >
      <h2>Add Student</h2>

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name && (
          <p className="form-error">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="id">Student ID</label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        {errors.id && (
          <p className="form-error">{errors.id}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="major">Major</label>
        <input
          id="major"
          type="text"
          value={major}
          onChange={(event) => setMajor(event.target.value)}
        />
        {errors.major && (
          <p className="form-error">{errors.major}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gpa">GPA</label>
        <input
          id="gpa"
          type="number"
          min="0"
          max="4"
          step="0.01"
          value={gpa}
          onChange={(event) => setGpa(event.target.value)}
        />
        {errors.gpa && (
          <p className="form-error">{errors.gpa}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="courses">
          Courses (comma-separated)
        </label>
        <input
          id="courses"
          type="text"
          value={courses}
          onChange={(event) => setCourses(event.target.value)}
        />
      </div>

      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;