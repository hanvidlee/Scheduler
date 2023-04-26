function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const selectedDay = state.days.find(dayName => dayName.name === day)

  if(!selectedDay) {
    return []
  }

  const appointmentsForDay = selectedDay.appointments.map(id => state.appointments[id])

  return appointmentsForDay
  }

function getInterview(state, interview) {
  
  if(!interview) {
    return null
  }
  const interviewer = state.interviewers[interview.interviewer];

  return {student: interview.student, interviewer: interviewer}
}

function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const selectedDay = state.days.find(dayName => dayName.name === day)

  if(!selectedDay) {
    return []
  }

  const interviewersForDay = selectedDay.interviewers.map(id => state.interviewers[id])

  return interviewersForDay
  }

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay}