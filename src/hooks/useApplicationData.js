import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState(prev => ({
        ...prev,
        appointments,
        days: updateSpots(appointments, id)
      }));
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

     const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          days: updateSpots(appointments, id) 
        }));
      });

  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      }
      );
  }, []);

function updateSpots(appointments, appointmentId) {
  const foundDay = state.days.find(day => day.appointments.includes(appointmentId))

  const spots = foundDay.appointments.filter(id => !appointments[id].interview).length

  return state.days.map(day => day.appointments.includes(appointmentId) ? {...day, spots} : day)

}

  return { state, bookInterview, cancelInterview, setDay };
}