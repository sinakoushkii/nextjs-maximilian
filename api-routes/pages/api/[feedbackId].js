import { exctractFileData, extractFilePath } from "./feedback";

function handler(req,res){
    if(req.method==="GET"){
        const filePath = extractFilePath();
        const data = exctractFileData(filePath);
        const feedbackId=req.query.feedbackId;
        const selectedFeedback=data.find((feedback)=>feedback.id===feedbackId);
    
        res.status(200).json({feedback:selectedFeedback});
    }
}

export default handler;