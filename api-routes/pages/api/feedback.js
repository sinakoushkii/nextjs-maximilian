import fs from "fs";
import path from "path";

export function extractFilePath() {
  return path.join(process.cwd(), "data", "feedback.json");
}
export function exctractFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;
    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    const filePath = extractFilePath();
    const data = exctractFileData(filePath);

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success !", feedback: newFeedback });
  } else {
    const filePath = extractFilePath();
    const data = exctractFileData(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
