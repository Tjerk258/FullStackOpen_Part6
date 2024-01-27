import { useEffect } from 'react'
import AnacdoteList from './components/AnacdoteList'
import AnacdoteForm from './components/AnacdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <Filter />
      <Notification />
      <AnacdoteList />
      <AnacdoteForm />
    </div>
  )
}

export default App