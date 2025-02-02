// src/app/api/execute-code/route.js
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export async function POST(req) {
  const { code, language } = await req.json();
  const fileName = `${uuidv4()}.${language}`;
  const filePath = path.join('/tmp', fileName);

  try {
    await writeFile(filePath, code);
    const executionCommand = getExecutionCommand(language, filePath);
    const output = await executeCode(executionCommand);
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Clean up the temporary file
    exec(`rm ${filePath}`);
  }
}

function getExecutionCommand(language, filePath) {
  switch (language) {
    case 'javascript':
      return `node ${filePath}`;
    case 'python':
      return `python ${filePath}`;
    case 'typescript':
      return `ts-node ${filePath}`;
    // Add more languages as needed
    default:
      throw new Error('Unsupported language');
  }
}

function executeCode(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
}