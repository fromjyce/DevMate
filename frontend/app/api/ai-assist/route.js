import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  if (!openai.apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
  }

  const { code, language } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
    model: "gpt-4o",
      messages: [
        { role: 'developer', content: 'You are an AI programming assistant.' },
        { role: 'user', content: `I'm writing code in ${language}. Here's my current code:\n\n${code}\n\nProvide a suggestion to improve or complete this code:` }
      ],
      max_tokens: 16,
      temperature: 0.1,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}