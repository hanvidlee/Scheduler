export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const selectedDay = state.days.find(dayName => dayName.name === day)

  if(!selectedDay) {
    return []
  }

  const appointmentsForDay = selectedDay.appointments.map(id => state.appointments[id])

  return appointmentsForDay
  }