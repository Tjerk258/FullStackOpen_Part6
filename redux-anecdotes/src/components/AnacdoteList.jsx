import { useSelector, useDispatch } from 'react-redux'
import { voteAnacdote, updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnacdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(
    anecdotes => anecdotes.content.toLowerCase().includes(filter.toLowerCase())
  ))
  const dispatch = useDispatch()

  const vote = async (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    try {
      dispatch(updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 }))
      dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    } catch (error) {
      
    }
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default AnacdoteList