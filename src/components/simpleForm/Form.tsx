import axios from "axios";
import { useState } from "react";
import "./form.css";

const Form = () => {
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
    const date = new Date();
    const message = {
      user: form.user !== '' ? form.user : 'anonymous',
      message: form.message,
      date: `${date.toLocaleDateString()} (${
        date.toDateString().split(" ")[0]
      }) ${date.toTimeString().split(" ")[0]}`,
    };

    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: message,
    };
    let res = await axios.post("http://localhost:3002/messages", options);
    window.location.reload()
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="nameInput"
          type="text"
          name="user"
          placeholder="name"
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
