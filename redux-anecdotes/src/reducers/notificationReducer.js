import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: '',
    timer: null
  },
  reducers: {
    setText(state, action) {
      clearTimeout(state.timer)
      return action.payload
    },
    clearNotification(state, action) {
      return {
        notification: '',
        timer: null
      }
    }
  }
})


export const { setText, clearNotification } = notificationSlice.actions

export const setNotification = (notification, timeout) => {
  return dispatch => {
    const timer = setTimeout(() => dispatch(clearNotification()), timeout * 1000)
    dispatch(setText({ notification, timer }))
  }
}

export default notificationSlice.reducer