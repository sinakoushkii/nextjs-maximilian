import { useState } from "react";
import { exctractFileData, extractFilePath } from "../api/feedback";

export async function getStaticProps() {
  const filePath = extractFilePath();
  const data = exctractFileData(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

function FeedbackPage(props) {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  async function feedbackHandler(id) {
    const response = await fetch(`/api/${id}`);
    const data = await response.json();
    console.log(data.feedback)
    setSelectedFeedback(data.feedback);
  }

  return (
    <>
      {selectedFeedback && <p>{selectedFeedback.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback}
            <button onClick={feedbackHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FeedbackPage;
