import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnacdote(state, action) {
      state.push(action.payload)
    },
    voteAnacdote(state, action) {
      return state.map(anacdote => anacdote.id === action.payload ? { ...anacdote, votes: anacdote.votes + 1 } : anacdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    changeAnecdote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    }
  }
})

export const {appendAnacdote, voteAnacdote, setAnecdotes, changeAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnacdote = await anecdoteService.createNew(content)
    dispatch(appendAnacdote(newAnacdote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch(changeAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer