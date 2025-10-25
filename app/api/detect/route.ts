import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // Ask ChatGPT to act as an AI detector
   const completion = await client.chat.completions.create({
  model: "gpt-4o-mini",
  temperature: 0.3,
  max_tokens: 50,
  messages: [
    {
      role: "system",
      content: `You are an expert at identifying AI-generated writing.
Respond only with a number from 0–100 representing how likely the text was written by AI.
Base your decision on tone, repetition, factual structure, and style.
Return nothing except the number.`,
    },
    {
      role: "user",
      content: `Text:\n${text}`,
    },
  ],
});




    // Get the response and extract a number
    const raw = completion.choices[0].message?.content?.trim() || "0";
    const aiScore = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;

    return NextResponse.json({ score: aiScore });
  } catch (error: any) {
    console.error("Detection error:", error);
    return NextResponse.json(
      { error: "Detection failed", details: error.message },
      { status: 500 }
    );
  }
}
