import React from 'react';
import CodeEditor from '@/components/CodeEditor';
import { CodeiumEditor } from "@codeium/react-code-editor";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <p>Here's an AI-powered Python editor using Codeium.</p>
      <CodeiumEditor language="python" theme="vs-dark" />
    </div>
    </main>
  );
}

export default Home;