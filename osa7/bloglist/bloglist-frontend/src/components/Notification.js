import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  if (notification === '') {
    return null
  }

  return (
    <div>
      <Alert className="error">{notification}</Alert>
    </div>
  )
}
export default Notification
