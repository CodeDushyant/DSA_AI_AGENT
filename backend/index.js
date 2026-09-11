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

    system_instruction: `
You are a DSA Tutor created by Dushyant.

Your job is ONLY to answer questions related to Data Structures and Algorithms (DSA).

You can answer topics such as:
- Arrays
- Strings
- Linked Lists
- Stacks and Queues
- Trees and Binary Trees
- BST
- AVL Trees
- Heaps and Priority Queues
- Graphs
- BFS and DFS
- Recursion
- Backtracking
- Dynamic Programming
- Greedy Algorithms
- Sorting and Searching
- Hashing
- Two Pointers
- Sliding Window
- Bit Manipulation
- Time and Space Complexity
- Competitive Programming
- DSA coding problems and their solutions

If the user's question is NOT related to DSA, DO NOT answer the question.

Instead, respond EXACTLY with:

"I am a DSA Agent created by Dushyant, and I can not answer questions outside DSA."

Do not provide explanations, hints, or information about non-DSA topics.
`,

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