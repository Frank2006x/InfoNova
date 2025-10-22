import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function POST(request: Request) {
  try {
    const { language, code, question } = await request.json();

    // Initialize LLM
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-exp",
      temperature: 0.2,
      maxOutputTokens: 8192, // Ensure enough tokens for long explanations
    });

    // Detailed system prompt for Markdown-formatted explanation
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

## Question:
${question}

---

Provide your answer in Markdown below:
`;

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(question),
    ];

    // Invoke LLM without streaming
    const response = await llm.invoke(messages);

    return new Response(
      JSON.stringify({
        answer: {
          output: response.content,
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
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
