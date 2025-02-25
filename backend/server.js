const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = 9000
const genAI = new GoogleGenerativeAI("AIzaSyDrBOFOSO5lGJiv2CpsnysXYhxamwD8rj8");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
   systemInstruction: " Explain even if user geets. You are not a assistant. Do not greet to user. You have to answer anything user asks with explanation. You are QueAI Beta 0.1. You may create notes, essays, emails, letters, programmes, or anything if user wants."
});

app.get('/', (req, res)=>{
  res.json({message: 'Hello from backend'})
})

app.post('/api/askai', async(req, res)=>{
  const {prompt} = req.body

  try{
    const result = await model.generateContent(prompt);
    const responseText = result.response.text()
    let text = responseText
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
      text = text.replace(/```(.*?)```/gs, (match, p1) => {
            const escapedCode = p1.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return `
      ${escapedCode}`;
          });
          text = text.replace(/\*/g, '•')
    res.json({text})
  }catch(err){
    res.json({err})
  }
  
})

app.listen(port, ()=>{
  console.log('backend server started.')
})