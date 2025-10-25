import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { idea, platform: userPlatform, tone: userTone } = await req.json();

    // 🔹 1. Detect platform automatically if not provided
    let platform = userPlatform;
    if (!platform || platform === "Auto") {
      const detectPrompt = `
        You are a classifier. Based on this idea, decide if it's best for Instagram, TikTok, YouTube, Twitter, LinkedIn, or Blog.
        Reply with only one word: the platform name.
        Idea: "${idea}"
      `;

      const detect = await client.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "system", content: detectPrompt }],
        temperature: 0,
        max_tokens: 10,
      });

      platform =
        detect.choices?.[0]?.message?.content?.trim() || "Instagram";
    }

    // 🔹 2. Define contextual tones — tuned by platform relevance
    const toneGuide: Record<string, string> = {
      Motivational:
        "Use strong, forward-moving language. Short, rhythmic sentences. End with an inspiring takeaway.",
      Funny:
        "Use irony, surprise, or exaggeration. Maintain witty rhythm, like a comedian delivering lines.",
      Emotional:
        "Use storytelling with human vulnerability. Evoke empathy, warmth, or nostalgia.",
      Professional:
        "Maintain authority and clarity. Use polished, precise phrasing, but stay relatable.",
      Storytelling:
        "Use narrative pacing — setup, tension, payoff. Include real-world cues and conversational flow.",
      Educational:
        "Focus on clarity and value. Explain insights like teaching a friend, not lecturing.",
    };

    const tone = userTone || "Natural";

    // 🔹 3. Define platform storytelling guides
    const platformGuides: Record<string, string> = {
      Instagram: `
        • Hook within first 3 seconds.
        • Keep lines short and scannable.
        • Use emojis, spacing, and rhythm.
        • Story should feel visual.
        • Include 3–5 hashtags.
        • Default duration: ~35s.
      `,
      TikTok: `
        • Hook fast, first 2 seconds.
        • High-energy pacing; 25–30s max.
        • Include irony or humor when fitting.
        • End with surprise or emotional twist.
      `,
      YouTube: `
        • Write as voiceover script.
        • Hook in first 5 seconds, then build narrative.
        • Maintain scene rhythm and story logic.
        • Suggest ~1–2 min duration.
      `,
      Twitter: `
        • Write in 3–5 tweet thread style.
        • Start with bold, curiosity hook.
        • Keep sentences punchy and thought-provoking.
      `,
      LinkedIn: `
        • Write like an authentic professional storyteller.
        • Begin with a personal observation.
        • Add takeaway or reflection at end.
      `,
      Blog: `
        • Use subheadings and conversational flow.
        • Open with a strong hook paragraph.
        • Add a few examples or lessons.
        • End with a thoughtful conclusion.
      `,
    };

    // 🔹 4. Build prompt
    const systemPrompt = `
      You are a creative strategist helping users turn raw ideas into viral, platform-specific content.

      The user wrote: "${idea}"
      Detected Platform: ${platform}
      Desired Tone: ${tone}

      Adapt content following:
      ${platformGuides[platform] ?? "Be engaging and natural."}

      Style Rules for "${tone}":
      ${toneGuide[tone] ?? "Keep it conversational and human."}

      Always output in this exact structure:
      1️⃣ Hook
      2️⃣ Story / Body
      3️⃣ Closing / Punchline
      4️⃣ Suggested Duration

      Don’t mention you're an AI.
      Make the tone naturally human and platform-appropriate.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: idea },
      ],
      temperature: 0.9,
    });

    const output =
      completion.choices?.[0]?.message?.content?.trim() ||
      "No content generated.";

    return NextResponse.json({ output, platform });
  } catch (err) {
    console.error("Content generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate content." },
      { status: 500 }
    );
  }
}
