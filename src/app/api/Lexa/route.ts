import { createAgent, tool } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { CodeExecutionTool } from "@google/generative-ai";
import { PromptTemplate } from "@langchain/core/prompts";
import z from "zod/v3";

export async function POST(request: Request) {
  try {
    const { language, code, question } = await request.json();

    // const codeExecutionTool: CodeExecutionTool = { codeExecution: {} };
    // const wrapperedCodeExecutionTool = tool(codeExecutionTool, {
    //   name: "CodeExecutionTool",
    //   description: "A tool for executing code snippets",

    // });
    const resType = z.object({
      output: z.string(),
    });
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      temperature: 0.2,
      maxOutputTokens: 1024,
    });

    const promptTemplate = new PromptTemplate({
      inputVariables: ["language", "code", "question"],
      template: `
You are **Lexa**, an advanced AI programming assistant and code explainer.

Your job:
- Understand the provided {language} code.
- Answer the question clearly.
- Be concise, accurate, and friendly.

**Code Snippet:**
{code}

**Question:**
{question}
      `,
    });

    const systemPrompt = await promptTemplate.format({
      language,
      code,
      question,
    });

    const lexaAgent = createAgent({
      model: llm,
      tools: [],
      systemPrompt,
      responseFormat: resType,
    });

    const res = await lexaAgent.invoke({
      messages: [{ role: "user", content: question }],
    });

    return new Response(JSON.stringify({ answer: res.structuredResponse }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
