// src/pages/admin/exams/schedule/[id].js

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AdminLayout from "../../../../components/layout/AdminLayout";
import AdminService from "../../../../services/adminService";

const ExamSchedulePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [examEvent, setExamEvent] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [schedules, setSchedules] = useState({});
  const [unscheduledExams, setUnscheduledExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch exam event details
        const examRes = await AdminService.getExamEvent(id);
        setExamEvent(examRes.data.data);

        // Fetch schedules for this exam event
        const scheduleRes = await AdminService.getExamSchedulesForEvent(id);
        const scheduleData = scheduleRes.data.data;
        setScheduleData(scheduleData);
        setSchedules(scheduleData.schedule || {});
        setUnscheduledExams(scheduleData.unscheduled || []);
      } catch (error) {
        console.error("Error fetching exam schedule:", error);
        setError(
          error.response?.data?.message || "Failed to load exam schedule"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${remainingMinutes}m`;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading exam schedule...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">
              <h3 className="text-lg font-medium">Error</h3>
              <p className="mt-1">{error}</p>
            </div>
            <button
              onClick={() => router.push("/admin/exams")}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Back to Exams
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!examEvent) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-700">
              Exam Event Not Found
            </h2>
            <p className="text-gray-500 mt-2">
              The exam event you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push("/admin/exams")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Exams
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const scheduleKeys = Object.keys(schedules).sort();
  const hasSchedules = scheduleKeys.length > 0;

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {examEvent.name}
            </h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Exam Details</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>{" "}
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {examEvent.examType === "Other"
                        ? examEvent.customExamType
                        : examEvent.examType}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Academic Year:</span>{" "}
                    <span className="font-medium">
                      {examEvent.academicYear}
                    </span>
                  </div>
                  {examEvent.weightage && (
                    <div>
                      <span className="text-gray-600">Weightage:</span>{" "}
                      <span className="font-medium">
                        {examEvent.weightage}%
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Compulsory Exam:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        examEvent.requiresExam
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {examEvent.requiresExam ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">
                  Schedule Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <span className="text-gray-600">Start Date:</span>{" "}
                    <span className="font-medium">
                      {formatDate(examEvent.startDate)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">End Date:</span>{" "}
                    <span className="font-medium">
                      {formatDate(examEvent.endDate)}
                    </span>
                  </div>
                  {scheduleData && (
                    <div>
                      <span className="text-gray-600">Total Exams:</span>{" "}
                      <span className="font-medium">
                        {scheduleData.totalExams || 0}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Classes</h3>
                <div className="space-y-2 text-sm mt-1">
                  <div className="flex flex-wrap gap-1">
                    {examEvent.classes?.map((cls, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {cls.name}-{cls.division}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push("/admin/exams")}
            className="ml-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Exams
          </button>
        </div>

        {/* Non-working days */}
        {examEvent.nonWorkingDays && examEvent.nonWorkingDays.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="font-medium text-yellow-800">Non-working Days:</h3>
            <p className="text-yellow-700">
              {examEvent.nonWorkingDays
                .map((date) => formatDate(date))
                .join(", ")}
            </p>
          </div>
        )}

        {/* Unscheduled Exams Warning */}
        {unscheduledExams && unscheduledExams.length > 0 && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
            <h3 className="font-medium text-orange-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Unscheduled Exams ({unscheduledExams.length})
            </h3>
            <p className="text-orange-700 mb-2">
              The following exams haven't been scheduled yet:
            </p>
            <div className="space-y-2">
              {unscheduledExams.map((exam) => (
                <div
                  key={exam._id}
                  className="flex items-center justify-between p-3 bg-white rounded border"
                >
                  <div>
                    <span className="font-medium">{exam.subject.name}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-600">
                      {exam.class.name}-{exam.class.division}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exam.totalMarks} marks • {formatDuration(exam.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Exam Schedule
            </h2>
            {scheduleData?.totalExams && (
              <p className="text-sm text-gray-600 mt-1">
                Total {scheduleData.totalExams} exam
                {scheduleData.totalExams !== 1 ? "s" : ""}
                {hasSchedules &&
                  ` scheduled across ${scheduleKeys.length} day${
                    scheduleKeys.length !== 1 ? "s" : ""
                  }`}
              </p>
            )}
          </div>

          {!hasSchedules ? (
            <div className="px-6 py-8 text-center">
              <div className="text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No Schedule Created
                </h3>
                <p className="mt-1 text-gray-500">
                  The exam schedule hasn't been created yet for this exam event.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {scheduleKeys.map((dateKey) => (
                <div key={dateKey} className="px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span>{formatDate(dateKey)}</span>
                    <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {schedules[dateKey].length} exam
                      {schedules[dateKey].length !== 1 ? "s" : ""}
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {schedules[dateKey].map((exam) => (
                      <div
                        key={exam._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {exam.subject.name}
                            </h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {exam.class.name}-{exam.class.division}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <span className="mr-2">⏰</span>
                              <span>
                                {formatTime(exam.startTime)} -{" "}
                                {formatTime(exam.endTime)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">📝</span>
                              <span>{exam.totalMarks} marks</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">⏱️</span>
                              <span>{formatDuration(exam.duration)}</span>
                            </div>
                            {exam.passingMarks && (
                              <div className="flex items-center">
                                <span className="mr-2">✅</span>
                                <span>Pass: {exam.passingMarks} marks</span>
                              </div>
                            )}
                          </div>

                          {exam.seatingArrangement &&
                            exam.seatingArrangement.length > 0 && (
                              <div className="mt-2 flex items-center text-sm text-gray-600">
                                <span className="mr-2">🏫</span>
                                <span>
                                  Rooms:{" "}
                                  {exam.seatingArrangement
                                    .map((seat) => seat.classroom)
                                    .join(", ")}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ExamSchedulePage;
