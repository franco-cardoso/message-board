const Message = (props: {
  user: string;
  message: string;
  date: string;
  id: string;
}) => {
  return (
    <div className="message">
      <div className="messageInfo">
        <div>
          <p>
            <b>{props.user}</b>
          </p>
          <p style={{ marginLeft: "10px" }}>ID: {props.id.slice(0, 6)}</p>
        </div>
        <p>
          <b>{props.date.replaceAll(".", "/")}</b>
        </p>
      </div>
      <div className="messageContent">
        <p >{props.message}</p>
      </div>
    </div>
  );
};

export default Message;
