const Notification = ({ message }) => {
  if (message === null || message.length === 0) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

export default Notification