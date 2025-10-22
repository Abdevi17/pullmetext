import { NextRequest, NextResponse } from 'next/server';

// System prompt to guide the AI on how to rewrite text.
const SYSTEM_PROMPT =
  'You are a helpful assistant tasked with rewriting AI-generated text to sound more human, natural, and engaging. Keep the meaning but adjust tone according to the provided style. Ensure the output sounds like it was written by a person. Avoid generic filler and maintain clarity.';

// Build the messages payload for the chat completion API
const buildMessages = (tone: string, input: string) => {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Tone: ${tone}\n\nOriginal text: """${input}"""\n\nHumanized text:`,
    },
  ];
};

export async function POST(request: NextRequest) {
  const { input, tone } = await request.json();
  if (!input || !tone) {
    return NextResponse.json(
      { error: 'Missing input text or tone' },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured in environment variables.' },
      { status: 500 }
    );
  }

  const body = {
    model: 'gpt-3.5-turbo',
    messages: buildMessages(tone, input),
    max_tokens: 1024,
    temperature: 0.7,
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI error:', errorData);
      return NextResponse.json(
        { error: 'Failed to call OpenAI API' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ output });
  } catch (err) {
    console.error('Unexpected error calling OpenAI:', err);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}