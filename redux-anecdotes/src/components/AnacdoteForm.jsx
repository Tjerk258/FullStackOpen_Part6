import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnacdoteForm = () => {
  const dispatch = useDispatch()

  const addAnacdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    try {
      dispatch(createAnecdote(content))
      dispatch(setNotification(`You created '${content}'`, 5))
    } catch (error) {
      dispatch(setNotification(error.message, 5))
    }
  }

  return (
    <div>
      <h2>create new </h2>
      <form onSubmit={addAnacdote} >
        <div><input name='content' placeholder='Anecdote'/> </div>
        <button> create </button>
      </form>
    </div>
    )
}

export default AnacdoteForm