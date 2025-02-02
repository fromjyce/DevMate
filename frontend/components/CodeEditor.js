'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const languages = ['javascript', 'python', 'typescript', 'java', 'c', 'cpp']

export default function CodeEditor() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)

  const handleLanguageChange = (value) => {
    setLanguage(value)
  }

  const handleEditorChange = (value) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleAIAssist = async () => {
    try {
      const response = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      })

      if (!response.ok) {
        throw new Error('AI assistance request failed')
      }

      const data = await response.json()
      setOutput('AI Suggestion: ' + data.result)
    } catch (error) {
      setOutput('Error getting AI assistance: ' + error.message)
    }
  }

  const handleExecuteCode = async () => {
    setIsExecuting(true)
    setOutput('Executing code...')
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      })

      if (!response.ok) {
        throw new Error('Code execution failed')
      }

      const data = await response.json()
      setOutput(data.output)
    } catch (error) {
      setOutput('Error executing code: ' + error.message)
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between mb-4">
        <Select onValueChange={handleLanguageChange} value={language}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Button onClick={handleAIAssist} className="mr-2">AI Assist</Button>
          <Button onClick={handleExecuteCode} disabled={isExecuting}>
            {isExecuting ? 'Executing...' : 'Execute'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <MonacoEditor
          height="500px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
          }}
        />
        <div className="bg-gray-800 text-white p-4 rounded-md overflow-auto h-[500px]">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  )
}
