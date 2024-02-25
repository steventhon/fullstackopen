const Notification = ({ message, notificationClass }) => {
  if (message === null || message.length === 0) {
    return null
  }

  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}

export default Notification