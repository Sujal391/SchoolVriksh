// src/pages/admin/exams/schedule/[id].js

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../../components/layout/AdminLayout';
import AdminService from '../../../../services/adminService';

const ExamSchedulePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [examEvent, setExamEvent] = useState(null);
  const [schedules, setSchedules] = useState({});
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
        setSchedules(scheduleRes.data.data.schedule || {});
        
      } catch (error) {
        console.error('Error fetching exam schedule:', error);
        setError(error.response?.data?.message || 'Failed to load exam schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
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
              onClick={() => router.push('/admin/exams')}
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
            <h2 className="text-xl font-semibold text-gray-700">Exam Event Not Found</h2>
            <p className="text-gray-500 mt-2">The exam event you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/admin/exams')}
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{examEvent.name}</h1>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">
                <span className="font-medium">Type:</span> {' '}
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {examEvent.examType === 'Other' ? examEvent.customExamType : examEvent.examType}
                </span>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Duration:</span> {' '}
                {formatDate(examEvent.startDate)} - {formatDate(examEvent.endDate)}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Classes:</span> {' '}
                {examEvent.classes?.map(cls => `${cls.name}-${cls.division}`).join(', ')}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Status:</span> {' '}
                <span className={`px-2 py-1 rounded-full text-sm ${
                  examEvent.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  examEvent.status === 'completed' ? 'bg-green-100 text-green-800' :
                  examEvent.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {examEvent.status.replace('_', ' ')}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/admin/exams')}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Exams
          </button>
        </div>

        {/* Non-working days */}
        {examEvent.nonWorkingDays && examEvent.nonWorkingDays.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h3 className="font-medium text-yellow-800">Non-working Days:</h3>
            <p className="text-yellow-700">
              {examEvent.nonWorkingDays.map(date => formatDate(date)).join(', ')}
            </p>
          </div>
        )}

        {/* Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Exam Schedule</h2>
          </div>
          
          {!hasSchedules ? (
            <div className="px-6 py-8 text-center">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No Schedule Created</h3>
                <p className="mt-1 text-gray-500">
                  The exam schedule hasn't been created yet for this exam event.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {scheduleKeys.map(dateKey => (
                <div key={dateKey} className="px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {formatDate(dateKey)}
                  </h3>
                  <div className="space-y-3">
                    {schedules[dateKey].map(exam => (
                      <div
                        key={exam._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium text-gray-900">
                              {exam.subject.name}
                            </h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {exam.class.name}-{exam.class.division}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              ⏰ {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                            </span>
                            <span>
                              📝 {exam.totalMarks} marks
                            </span>
                            <span>
                              ⏱️ {Math.round(exam.duration / 60)} hours
                            </span>
                          </div>
                          {exam.seatingArrangement && exam.seatingArrangement.length > 0 && (
                            <div className="mt-2 text-sm text-gray-600">
                              🏫 Rooms: {exam.seatingArrangement.map(seat => seat.classroom).join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            exam.status === 'published' ? 'bg-purple-100 text-purple-800' :
                            exam.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {exam.status.replace('_', ' ')}
                          </span>
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