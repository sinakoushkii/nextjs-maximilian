import {useRef} from "react"

function HomePage() {
  const emailRef=useRef();
  const feedbackRef=useRef();

  function submitFormHandler(event){
    event.preventDefault();

    const enteredEmail=emailRef.current.value;
    const enteredFeedback=feedbackRef.current.value;

  }
  
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input ref={emailRef} type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your email feedback</label>
          <textArea ref={feedbackRef} id="feedback" name="feedback" rows="5"></textArea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default HomePage;
