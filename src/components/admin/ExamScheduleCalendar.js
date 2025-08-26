import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ExamScheduleCalendar = ({ schedule }) => {
  const events = schedule.map(exam => ({
    title: `${exam.subject.name} - ${exam.class.name}`,
    start: new Date(`${exam.examDate}T${exam.startTime}`),
    end: new Date(`${exam.examDate}T${exam.endTime}`),
    allDay: false,
    resource: exam
  }));

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['day', 'week', 'month']}
        step={60}
        timeslots={1}
        showMultiDayTimes
        selectable
        onSelectEvent={event => {
          console.log('Selected event:', event.resource);
        }}
      />
    </div>
  );
};

export default ExamScheduleCalendar;