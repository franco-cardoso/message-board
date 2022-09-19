import { addDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import "./form.css";

const Form = (props: any) => {
  const [form, setForm] = useState({ user: "", message: "" });
  const [isPosting, setIsPosting] = useState(false)
  const { getData } = props;

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.message) {
      return alert("you forgot your message dumbass");
    }
    setIsPosting(true)
    getData();
    
    function convertTZ(date: any, tzString: any) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: tzString }
          )
          );
        }
    const date = convertTZ(new Date(), "America/Argentina/Buenos_Aires");
    
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
      num: props.messages[0].num + 1,
    };

    await addDoc(props.collection, message);
    setIsPosting(false)
    getData();
    
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
        <div className="formButtons">
          <input type="submit" disabled={isPosting ? true : false} />
          <input type="button" value="Refresh" onClick={() => getData()} />
        </div>
      </form>
        {isPosting && <p>posting...</p>}
    </div>
  );
};

export default Form;
