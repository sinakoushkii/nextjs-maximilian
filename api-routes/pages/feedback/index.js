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
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.feedback}</li>
      ))}
    </ul>
  );
}

export default FeedbackPage;
