import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text, tone } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const systemPrompt = `
You are a professional editor. Rewrite the given text to sound natural,
fluent, and human-written — like something a real person would post online.
Make sure to:
- vary sentence length and rhythm
- add natural connectors ("well", "you know", "frankly", etc.)
- avoid robotic phrasing
Tone: ${tone}
Output only the rewritten text.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.7,
    });

    const humanized =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Error: no output from model.";

    return NextResponse.json({ humanized });
  } catch (err) {
    console.error("Humanize error:", err);
    return NextResponse.json(
      { error: "Failed to humanize text." },
      { status: 500 }
    );
  }
}
