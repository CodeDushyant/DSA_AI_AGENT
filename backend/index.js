import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());

console.log("API KEY:", process.env.GEMINI_API_KEY ? "Loaded" : "Not Loaded");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/ask" , async (req , res) =>{
   try{
      const {question}= req.body;
      const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input:question,
  });
  console.log(interaction.output_text);
  res.json({
  answer: interaction.output_text
});

   }catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
      }
   }
)



app.get("/", (req, res) => {
    res.send("DSA Tutor API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
