import { useMutation, useQueryClient} from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationSetText } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationSetText()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'],  (oldAnecdotes) => oldAnecdotes.concat(newAnecdote))
      setNotification({payload: `succesvolly created ${newAnecdote.content}`, type: 'setNotification'})
      setTimeout(() => {
        setNotification({type: 'clearNotification'})
      }, 5000);
    },
    onError: (error) => {
      if(error.response.status === 400 )
      setNotification({payload: `The anecdote must be 8 characters long`, type: 'setNotification'})
      setTimeout(() => {
        setNotification({type: 'clearNotification'})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
