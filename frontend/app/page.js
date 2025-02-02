import React from 'react';
import CodeEditor from '@/components/CodeEditor';

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">DevMate – AI-Assisted Code Editor</h1>
      <CodeEditor />
    </main>
  );
}

export default Home;