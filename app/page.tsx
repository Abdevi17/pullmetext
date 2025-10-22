'use client';

import { useState } from 'react';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('Casual');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Calls the backend API to humanize the text
  const convert = async () => {
    if (!input) return;
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, tone }),
      });
      if (!res.ok) {
        const data = await res.json();
        setOutput(data.error || 'An error occurred.');
      } else {
        const data = await res.json();
        setOutput(data.output);
      }
    } catch (err) {
      console.error(err);
      setOutput('Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">PullMeText</h1>
      <p className="mb-6 text-center">Humanize your AI-generated text into something real and relatable.</p>

      <textarea
        className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste AI-generated text here..."
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <label htmlFor="tone" className="mr-2 font-medium">Tone:</label>
          <select
            id="tone"
            className="p-2 border rounded-md"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="Casual">Casual</option>
            <option value="Friendly">Friendly</option>
            <option value="Sarcastic">Sarcastic</option>
            <option value="Professional">Professional</option>
          </select>
        </div>
        <button
          onClick={convert}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {loading ? 'Processing...' : 'Humanize Text'}
        </button>
      </div>

      {output && (
        <div className="mt-4 p-4 bg-gray-100 border rounded-md">
          <h2 className="font-semibold mb-2">Result</h2>
          <p className="whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </main>
  );
}