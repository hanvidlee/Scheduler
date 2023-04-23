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

module.exports = {getAppointmentsForDay, getInterview}