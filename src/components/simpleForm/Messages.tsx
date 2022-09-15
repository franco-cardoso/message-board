import Message from "./Message";
import axios from "axios";
import { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages]: any = useState([]);

  const getData = async () => {
    await axios
      .get("http://localhost:3002/messages")
      .catch((err) => console.log(err))
      .then((res: any) => setMessages(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="messagesContainer">
      {messages.map((message: { user: string; message: string }) => {
        <Message user={message.user} message={message.message} />;
      })}
    </div>
  );
};

export default Messages;
