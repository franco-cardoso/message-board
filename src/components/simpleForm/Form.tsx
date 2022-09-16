import axios from "axios";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import "./form.css";

const Form = (props: any) => {
  const [form, setForm] = useState({ user: "", message: "" });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.message) alert("you forgot your message dumbass");

    function convertTZ(date: any, tzString: any) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: tzString }
        )
      );
    }
    const date = convertTZ(new Date(), "America/Argentina/Buenos_Aires");
    console.log(`${date.getDay}/${date.getMonth}/${date.getFullYear}`);

    const message = {
      user: form.user !== "" ? form.user : "anonymous",
      message: form.message,
      date: `${
        date.getDate() < 10 && date.getDate().toString().length === 1
          ? "0" + date.getDate().toString()
          : date.getDate()
      }/${
        date.getMonth() + 1 < 10 &&
        (date.getMonth() + 1).toString().length === 1
          ? "0" + (date.getMonth() + 1).toString()
          : date.getMonth() + 1
      }/${date.getFullYear()} (${date.toDateString().split(" ")[0]}) ${
        date.toTimeString().split(" ")[0]
      }`,
      num: props.messages.length + 1,
    };

    console.log(props.collection);

    await addDoc(props.collection, message);

    window.location.reload();
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="nameInput"
          type="text"
          name="user"
          placeholder="anonymous"
          onChange={handleChange}
          value={form.user}
        />
        <textarea
          name="message"
          placeholder="type some message here faggot"
          onChange={handleChange}
          value={form.message}
        ></textarea>
        <input type="submit" className="submit" />
      </form>
    </div>
  );
};

export default Form;
