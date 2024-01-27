import { useSelector, useDispatch } from 'react-redux'
import { voteAnacdote } from '../reducers/anecdoteReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)
  console.log('notification:', notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const element = notification ? (
    <div style={style}>
      {notification}
    </div>
  ) : null
  return element
}

export default Notification