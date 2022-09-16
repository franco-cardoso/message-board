import Message from "./Message";

const Messages = (props:any) => {
  const { data } = props

  return (
    <div className="messagesContainer">
      {  data.map((message: { user: string; message: string, date:string, id:string }) => (
        <Message user={message.user} message={message.message} date={message.date} id={message.id}   />
      )) }
      {data.length === 0 && <h1>loading...</h1>}
    </div>
  );
};

export default Messages;
