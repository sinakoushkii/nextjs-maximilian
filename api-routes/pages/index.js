import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  async function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;

    const reqBody = { email: enteredEmail, feedback: enteredFeedback };
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    emailRef.current.value = "";
    feedbackRef.current.value = "";
    alert("Feedback submitted successfully!");
  }
  async function loadFeedBackHandler() {
    const response = await fetch("api/feedback");
    const data = await response.json();
    setFeedbackItems(data.feedback);
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input ref={emailRef} type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="feedback">Your email feedback</label>
          <textarea
            ref={feedbackRef}
            id="feedback"
            name="feedback"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form> <br />
      <button onClick={loadFeedBackHandler}>Load Feedback</button>
      <hr />

      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
