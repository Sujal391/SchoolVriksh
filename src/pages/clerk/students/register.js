// src/pages/clerk/students/register.js
import { useAuth } from "../../../contexts/AuthContext";
import withProtectedRoute from "../../../components/common/ProtectedRoute";
import ClerkLayout from "../../../components/layout/ClerkLayout";
import ExistingStudentForm from "../../../components/clerk/admissions/ExistingStudentForm";
import useClerk from "../../../hooks/useClerk";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const RegisterStudentPage = () => {
  const { registerExistingStudent, classes, loading, error } = useClerk();
  const router = useRouter();

  const handleSubmit = async (studentData) => {
    try {
      await registerExistingStudent(studentData);
      router.push("/clerk/students");
    } catch (err) {
      console.error("Student registration failed:", err);
    }
  };

  return (
    <ClerkLayout>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Register Existing Student</h1>
            <Link href="/clerk/students" passHref>
              <Button variant="outlined">Back to Students</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <ExistingStudentForm
              classes={classes}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </LocalizationProvider>
    </ClerkLayout>
  );
};

export default withProtectedRoute(RegisterStudentPage, ["clerk"]);



