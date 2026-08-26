// Code execution engine for the A11Code Code Playground.
//
// Execution is delegated to the Wandbox public compile service
// (https://wandbox.org). It is free, needs no API key or sign-up, permits
// browser (CORS) requests, and compiles AND runs in a single request — so one
// "Run" button performs both steps, exactly as online editors do. For
// interpreted languages (Python, JavaScript, Ruby, PHP) there is no separate
// compilation step; for compiled languages (C, C++, Java, C#, Go, Rust) the
// service compiles first and then runs, reporting compiler errors when they
// occur.
//
// The engine is intentionally isolated behind runCode() so the underlying
// service can be swapped later (for example a self-hosted runner) without
// touching the user interface.

const WANDBOX_ENDPOINT = 'https://wandbox.org/api/compile.json';
const WANDBOX_LIST = 'https://wandbox.org/api/list.json';
const REQUEST_TIMEOUT_MS = 45000;

const joinLines = (arr) => arr.join('\n');

// Java on Wandbox is written to a file named prog.java, so a top-level
// `public class X` fails to compile ("should be declared in a file named
// X.java"). Removing the `public` modifier from the single top-level public
// class is behaviour-preserving and lets learners keep the familiar
// `public class Main { ... }` shape.
function stripJavaPublicClass(code) {
  return code.replace(/public\s+class\b/, 'class');
}

export const LANGUAGES = [
  {
    id: 'python',
    label: 'Python',
    wandboxLang: 'Python',
    fallbackCompiler: 'cpython-3.13.8',
    sample: joinLines([
      '# Welcome to the A11Code Code Playground!',
      '# Press Control + Enter, or activate the Run button, to run this program.',
      '',
      'print("Hello from Python!")',
      '',
      'for i in range(1, 6):',
      '    print("Line", i)',
      '',
      '# To read input, use input(). Type the value in the',
      '# "Standard input" box below, then run again.',
      '# name = input()',
      '# print("Hello,", name)',
    ]),
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    wandboxLang: 'JavaScript',
    fallbackCompiler: 'nodejs-20.17.0',
    sample: joinLines([
      '// Welcome to the A11Code Code Playground!',
      'console.log("Hello from JavaScript!");',
      '',
      'for (let i = 1; i <= 5; i++) {',
      '  console.log("Line " + i);',
      '}',
    ]),
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    wandboxLang: 'TypeScript',
    fallbackCompiler: 'typescript-5.6.2',
    sample: joinLines([
      'const greeting: string = "Hello from TypeScript!";',
      'console.log(greeting);',
      '',
      'for (let i: number = 1; i <= 5; i++) {',
      '  console.log("Line " + i);',
      '}',
    ]),
  },
  {
    id: 'c',
    label: 'C',
    wandboxLang: 'C',
    fallbackCompiler: 'gcc-13.2.0-c',
    sample: joinLines([
      '#include <stdio.h>',
      '',
      'int main(void) {',
      '    printf("Hello from C!\\n");',
      '    for (int i = 1; i <= 5; i++) {',
      '        printf("Line %d\\n", i);',
      '    }',
      '    return 0;',
      '}',
    ]),
  },
  {
    id: 'cpp',
    label: 'C++',
    wandboxLang: 'C++',
    fallbackCompiler: 'gcc-13.2.0',
    sample: joinLines([
      '#include <iostream>',
      'using namespace std;',
      '',
      'int main() {',
      '    cout << "Hello from C++!" << endl;',
      '    for (int i = 1; i <= 5; i++) {',
      '        cout << "Line " << i << endl;',
      '    }',
      '    return 0;',
      '}',
    ]),
  },
  {
    id: 'java',
    label: 'Java',
    wandboxLang: 'Java',
    fallbackCompiler: 'openjdk-jdk-22+36',
    transform: stripJavaPublicClass,
    sample: joinLines([
      'public class Main {',
      '    public static void main(String[] args) {',
      '        System.out.println("Hello from Java!");',
      '        for (int i = 1; i <= 5; i++) {',
      '            System.out.println("Line " + i);',
      '        }',
      '    }',
      '}',
    ]),
  },
  {
    id: 'csharp',
    label: 'C#',
    wandboxLang: 'C#',
    fallbackCompiler: 'mono-6.12.0.199',
    sample: joinLines([
      'using System;',
      '',
      'class Program {',
      '    static void Main() {',
      '        Console.WriteLine("Hello from C#!");',
      '        for (int i = 1; i <= 5; i++) {',
      '            Console.WriteLine("Line " + i);',
      '        }',
      '    }',
      '}',
    ]),
  },
  {
    id: 'go',
    label: 'Go',
    wandboxLang: 'Go',
    fallbackCompiler: 'go-1.23.2',
    sample: joinLines([
      'package main',
      '',
      'import "fmt"',
      '',
      'func main() {',
      '    fmt.Println("Hello from Go!")',
      '    for i := 1; i <= 5; i++ {',
      '        fmt.Println("Line", i)',
      '    }',
      '}',
    ]),
  },
  {
    id: 'rust',
    label: 'Rust',
    wandboxLang: 'Rust',
    fallbackCompiler: 'rust-1.82.0',
    sample: joinLines([
      'fn main() {',
      '    println!("Hello from Rust!");',
      '    for i in 1..=5 {',
      '        println!("Line {}", i);',
      '    }',
      '}',
    ]),
  },
  {
    id: 'ruby',
    label: 'Ruby',
    wandboxLang: 'Ruby',
    fallbackCompiler: 'ruby-3.4.9',
    sample: joinLines([
      'puts "Hello from Ruby!"',
      '',
      '(1..5).each do |i|',
      '  puts "Line #{i}"',
      'end',
    ]),
  },
  {
    id: 'php',
    label: 'PHP',
    wandboxLang: 'PHP',
    fallbackCompiler: 'php-8.3.12',
    sample: joinLines([
      '<?php',
      'echo "Hello from PHP!\\n";',
      'for ($i = 1; $i <= 5; $i++) {',
      '    echo "Line $i\\n";',
      '}',
    ]),
  },
];

export function getLanguage(id) {
  return LANGUAGES.find((l) => l.id === id) || LANGUAGES[0];
}

// Resolve the newest stable Wandbox compiler for each language, cached for the
// session. Falls back to a known-good compiler name if the list cannot be
// fetched, so the playground keeps working even if the catalogue is briefly
// unavailable.
let listPromise = null;
const compilerCache = {};

function pickCompiler(list, lang) {
  const candidates = list.filter((c) => c.language === lang.wandboxLang);
  let pool = candidates.filter((c) => !/head/i.test(c.name));
  if (lang.id === 'python') {
    const cpy = pool.filter((c) => /^cpython-3/.test(c.name));
    if (cpy.length) pool = cpy;
  }
  if (lang.id === 'csharp') {
    const mono = pool.filter((c) => /^mono/.test(c.name));
    if (mono.length) pool = mono;
  }
  if (!pool.length) pool = candidates;
  // Wandbox lists newest versions first within a language.
  return pool.length ? pool[0].name : lang.fallbackCompiler;
}

async function resolveCompiler(lang) {
  if (compilerCache[lang.id]) return compilerCache[lang.id];
  try {
    if (!listPromise) {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 15000);
      listPromise = fetch(WANDBOX_LIST, { signal: controller.signal })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('list'))))
        .finally(() => clearTimeout(t));
    }
    const list = await listPromise;
    const name = pickCompiler(list, lang);
    compilerCache[lang.id] = name;
    return name;
  } catch (e) {
    listPromise = null; // allow a later retry
    return lang.fallbackCompiler;
  }
}

function countLines(text) {
  if (!text) return 0;
  const trimmed = text.replace(/\n$/, '');
  if (trimmed === '') return 0;
  return trimmed.split('\n').length;
}

// Run (compile if needed, then execute) the given code. Resolves to a
// normalised result object; rejects only for network/transport failures.
export async function runCode({ languageId, code, stdin }) {
  const lang = getLanguage(languageId);
  const compiler = await resolveCompiler(lang);
  const source = lang.transform ? lang.transform(code) : code;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(WANDBOX_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler,
        code: source,
        stdin: stdin || '',
        save: false,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if (err && err.name === 'AbortError') {
      throw new Error(
        'The program took too long to run and was stopped. If it waits for input, add it in the Standard input box; otherwise check for an endless loop.'
      );
    }
    throw new Error(
      'Could not reach the code runner. Please check your internet connection and try again.'
    );
  }
  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(
      'The code runner returned an error (status ' + response.status + '). Please try again in a moment.'
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error('The code runner sent an unexpected response. Please try again.');
  }

  const exitCode = data.status !== undefined && data.status !== '' ? parseInt(data.status, 10) : null;
  const compileError = (data.compiler_error || '') + (data.compiler_output || '');
  const stdout = data.program_output || '';
  const stderr = data.program_error || '';

  return {
    language: lang.label,
    compiler,
    exitCode,
    signal: data.signal || '',
    compileMessages: compileError.trim(),
    stdout,
    stderr,
    success: exitCode === 0,
    stdoutLines: countLines(stdout),
    stderrLines: countLines(stderr),
  };
}
