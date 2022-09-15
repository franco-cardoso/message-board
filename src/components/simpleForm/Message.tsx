

const Message = (props:{user:string,message:string}) => {

  return (
    <div className="message">
        <div className="messageInfo">
            <p><b>{props.user}</b></p>
            <p><b>12th jan 2022 22:30</b></p>
        </div>
        <div className="messageContent">
            <p>{props.message}</p>
        </div>
    </div>
  )
}

export default Message