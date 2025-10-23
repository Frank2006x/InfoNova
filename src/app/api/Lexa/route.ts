import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  createAgent,
  HumanMessage,
  SystemMessage,
  toolStrategy,
} from "langchain";
import { RedisSaver } from "@langchain/langgraph-checkpoint-redis";
import z from "zod";

export async function POST(request: Request) {
  try {
    const { language, code, question } = await request.json();

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-exp",
      temperature: 0.2,
      maxOutputTokens: 8192,
    });
    const outputType = z.object({
      response: z.string().describe("The assistant's response to the user."),
    });

    const checkpointer = await RedisSaver.fromUrl(
      "redis://default:cCiWcv5vaZj2Xv4k1cF5fzk3j2O7WseW@redis-13642.crce217.ap-south-1-1.ec2.redns.redis-cloud.com:13642"
    );

    const systemPrompt = `# Lexa — Expert ${language} Code Explainer 🤖💡
    
    You are Lexa, an expert ${language} programmer and code explainer. Analyze the given code and provide a **complete, structured explanation in Markdown**.
    
    ---
    
    ## Guidelines:
    
    1. **Step-by-step breakdown** with numbered steps.
    2. Highlight key concepts in **bold**.
    3. Use \`inline code\` for functions, variables, and code references.
    4. Include **examples or sample outputs** where relevant.
    5. Use headings, bullet points, and proper Markdown formatting.
    6. **Do not modify, optimize, or debug the code** unless explicitly asked.
    7. **Complete the full explanation**; never stop mid-sentence.
    8. make use of emojis to enhance readability and engagement.
    9. whenever you refer to code blocks, use proper Markdown triple backticks with language specified.
    
    ---
    
    ## Code to analyze:
    \`\`\`${language}
    ${code}
    \`\`\`
    
    

---

Provide your answer in Markdown below:
`;

    const agent = createAgent({
      model: llm,
      checkpointer: checkpointer,
      systemPrompt: systemPrompt,
      tools: [],
      responseFormat: toolStrategy(outputType),
    });

    const res = await agent.invoke(
      {
        messages: [{ role: "user", content: question }],
      },
      { configurable: { thread_id: "2" } }
    );

    // Invoke LLM without streaming

    return new Response(
      JSON.stringify({
        answer: {
          output: res.structuredResponse.response,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
