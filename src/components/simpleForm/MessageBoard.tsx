import Form from "./Form";
import Messages from "./Messages";
import "../../App.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function MessageBoard() {
  const [messages, setMessages]: any = useState([]);
  const messagesCollection = collection(db, "messages");
  const q = query(messagesCollection, orderBy("num", "desc"));

  const getData = async () => {
    const data = await getDocs(q);
    setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <Form collection={messagesCollection} messages={messages} getData={getData} />
      <Messages data={messages} />
    </main>
  );
}

export default MessageBoard;
