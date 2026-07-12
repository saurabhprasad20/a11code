export const resources = [
  {
    id: 'python-cheat-sheet',
    name: 'Python Accessible Cheat Sheet',
    category: 'Programming',
    description:
      'A screen-reader-friendly quick reference for Python syntax, built-in functions, and common patterns.',
    sections: [
      {
        heading: 'Printing and comments',
        paragraphs: [
          'Use print("Hello") to display text. Anything after a hash symbol on a line is a comment and is ignored when the program runs.',
          'The print function accepts several values separated by commas, and it puts a space between them: print("Age:", age).',
        ],
      },
      {
        heading: 'Variables and data types',
        paragraphs: [
          'Create a variable by writing a name, an equals sign, and a value. For example: count = 10, price = 9.99, name = "Priya", is_ready = True.',
          'The common types are string for text, int for whole numbers, float for decimals, bool for True or False, list for ordered collections, and dict for key and value pairs.',
          'Convert between types with int(value), float(value), and str(value).',
        ],
      },
      {
        heading: 'Control flow',
        paragraphs: [
          'An if statement makes a decision. Write if condition:, then indent the block by four spaces. Use elif for extra conditions and else for the fallback.',
          'A for loop repeats over a sequence: for item in my_list:. A while loop repeats while a condition stays true: while count < 5:.',
          'Use break to leave a loop early and continue to skip to the next round.',
        ],
      },
      {
        heading: 'Functions and useful built-ins',
        paragraphs: [
          'Define a function with def add(a, b): and return a result with return a + b. Call it by name: total = add(2, 3).',
          'Handy built-in functions include len(x) for length, range(n) for a sequence of numbers, sum(list) to add numbers, min and max for extremes, and sorted(list) to order items.',
        ],
      },
    ],
  },
  {
    id: 'java-cheat-sheet',
    name: 'Java Accessible Cheat Sheet',
    category: 'Programming',
    description:
      'A quick reference for Java syntax, object-oriented concepts, and common data structures in accessible text format.',
    sections: [
      {
        heading: 'Program structure',
        paragraphs: [
          'Every Java program lives inside a class. The entry point is the main method: public static void main(String[] args).',
          'Print to the console with System.out.println("Hello"). Each statement ends with a semicolon, and blocks are wrapped in curly braces.',
        ],
      },
      {
        heading: 'Variables and types',
        paragraphs: [
          'Java requires you to declare a type before the name. For example: int age = 25; double height = 5.8; boolean isStudent = true; String name = "Aman".',
          'Convert a text value to a number with Integer.parseInt(text) or Double.parseDouble(text).',
        ],
      },
      {
        heading: 'Classes and objects',
        paragraphs: [
          'A class is a blueprint. Create an object with the new keyword: Student s = new Student();.',
          'A constructor sets up an object when it is created, and the this keyword refers to the current object. Mark fields private and expose them through public getter and setter methods for encapsulation.',
        ],
      },
      {
        heading: 'Collections',
        paragraphs: [
          'ArrayList is a resizable list: add with list.add(value), read with list.get(index), and check the length with list.size().',
          'HashMap stores key and value pairs: map.put("key", value) and map.get("key"). HashSet stores unique values with no duplicates.',
        ],
      },
    ],
  },
  {
    id: 'screen-reader-setup',
    name: 'Screen Reader Setup Guide for Coding',
    category: 'Tooling',
    description:
      'Step-by-step guidance for setting up NVDA, JAWS, or VoiceOver with Visual Studio Code for programming.',
    sections: [
      {
        heading: 'Choosing a screen reader',
        paragraphs: [
          'NVDA is free and open source on Windows and works very well for coding. JAWS is a powerful commercial option on Windows. VoiceOver is built into macOS and needs no installation.',
          'Whichever you choose, spend time learning its keyboard commands for reading line by line and navigating by heading, because you will use them constantly while coding.',
        ],
      },
      {
        heading: 'Configuring Visual Studio Code',
        paragraphs: [
          'VS Code has strong built-in accessibility. Open the Command Palette with Control Shift P, or Command Shift P on macOS, and search for settings.',
          'Set the option editor.accessibilitySupport to on. This tells the editor a screen reader is active and enables clearer announcements.',
          'Turn on the setting that announces errors and warnings, and enable audio cues so you hear when a line has an error, a breakpoint, or a folded region.',
        ],
      },
      {
        heading: 'Everyday habits that help',
        paragraphs: [
          'Use the integrated terminal inside VS Code, opened with Control backtick, so your editor and command line stay in one place.',
          'Navigate code by symbols with Control Shift O to jump between functions and classes without scrolling line by line.',
          'Keep line numbers announced so you always know your position, and rely on the Problems panel to review all errors in one list.',
        ],
      },
    ],
  },
  {
    id: 'vscode-shortcuts',
    name: 'Keyboard Shortcuts Reference for VS Code',
    category: 'Tooling',
    description:
      'A reference to the keyboard shortcuts you need to navigate and write code in Visual Studio Code without a mouse.',
    sections: [
      {
        heading: 'Getting around',
        paragraphs: [
          'Command Palette: Control Shift P. Quick Open a file by name: Control P. Toggle the integrated terminal: Control backtick.',
          'Move focus between the editor, sidebar, panel, and status bar with F6, and open the accessibility help for the current view with Alt F1.',
        ],
      },
      {
        heading: 'Editing',
        paragraphs: [
          'Save: Control S. Undo: Control Z. Redo: Control Y. Comment or uncomment a line: Control forward slash.',
          'Move a line up or down: Alt Up arrow or Alt Down arrow. Copy a line up or down: Shift Alt Up or Down arrow.',
        ],
      },
      {
        heading: 'Navigating code',
        paragraphs: [
          'Go to a line number: Control G. Go to a symbol in the file: Control Shift O. Go to a definition: F12. Rename a symbol everywhere: F2.',
          'Open the Problems panel to review errors and warnings: Control Shift M. On macOS, use the Command key in place of Control for most of these shortcuts.',
        ],
      },
    ],
  },
  {
    id: 'latex-for-beginners',
    name: 'LaTeX for Beginners',
    category: 'Mathematics',
    description:
      'Learn to write mathematical expressions in LaTeX, a text-based format that screen readers can read aloud.',
    sections: [
      {
        heading: 'Why LaTeX helps',
        paragraphs: [
          'LaTeX lets you write mathematics as plain text instead of drawing symbols. Because it is text, a screen reader can read it, and you can type it with an ordinary keyboard.',
          'Mathematical expressions are written between dollar signs. For example, $x + y$ represents x plus y.',
        ],
      },
      {
        heading: 'Common notation',
        paragraphs: [
          'A fraction is written as \\frac{a}{b}, which reads as a over b. A power uses the caret: x^2 is x squared. A subscript uses the underscore: x_1 is x sub one.',
          'A square root is \\sqrt{x}. Greek letters are spelled out with a backslash, such as \\alpha, \\beta, and \\pi.',
        ],
      },
      {
        heading: 'A worked example',
        paragraphs: [
          'The quadratic formula in LaTeX is x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.',
          'Read aloud, that is x equals negative b, plus or minus the square root of b squared minus four a c, all divided by two a. Writing it as text keeps every part unambiguous for a screen reader.',
        ],
      },
    ],
  },
  {
    id: 'math-workbook',
    name: 'Accessible Mathematics Workbook (Class 8 to 10)',
    category: 'Mathematics',
    description:
      'Digitised mathematics study notes covering algebra, geometry, and trigonometry in accessible plain text.',
    sections: [
      {
        heading: 'Algebra essentials',
        paragraphs: [
          'A linear equation has the form a x plus b equals c. Solve it by moving b to the other side, then dividing by a. For example, 2x plus 3 equals 11 gives 2x equals 8, so x equals 4.',
          'To expand a x plus b times c x plus d, multiply every term in the first bracket by every term in the second, then combine like terms.',
        ],
      },
      {
        heading: 'Geometry without diagrams',
        paragraphs: [
          'The area of a triangle is one half times base times height. The area of a rectangle is length times width. The area of a circle is pi times radius squared.',
          'The angles inside any triangle add up to 180 degrees. The angles inside a quadrilateral add up to 360 degrees. Knowing these totals lets you find a missing angle by subtraction.',
        ],
      },
      {
        heading: 'Introduction to trigonometry',
        paragraphs: [
          'In a right angled triangle, sine of an angle equals the opposite side divided by the hypotenuse. Cosine equals the adjacent side divided by the hypotenuse. Tangent equals opposite divided by adjacent.',
          'A helpful memory phrase is SOH CAH TOA: Sine is Opposite over Hypotenuse, Cosine is Adjacent over Hypotenuse, Tangent is Opposite over Adjacent.',
        ],
      },
    ],
  },
  {
    id: 'science-notes',
    name: 'Science Concepts in Plain Text (Class 8 to 10)',
    category: 'Science',
    description:
      'Accessible science notes covering physics, chemistry, and biology fundamentals with described diagrams.',
    sections: [
      {
        heading: 'Physics: motion and force',
        paragraphs: [
          'Speed is the distance travelled divided by the time taken. Velocity is speed in a particular direction. Acceleration is the change in velocity divided by time.',
          "Newton's second law states that force equals mass times acceleration. So a heavier object needs more force to reach the same acceleration as a lighter one.",
        ],
      },
      {
        heading: 'Chemistry: matter and reactions',
        paragraphs: [
          'All matter is made of atoms. Atoms join to form molecules. A chemical reaction rearranges atoms, but the total number of atoms stays the same, which is why equations must balance.',
          'An acid releases hydrogen ions in water and a base releases hydroxide ions. When an acid and a base react, they neutralise each other to form salt and water.',
        ],
      },
      {
        heading: 'Biology: the living cell',
        paragraphs: [
          'The cell is the basic unit of life. Plant cells have a rigid cell wall and green chloroplasts, while animal cells do not.',
          'Photosynthesis is how plants make food: they take in carbon dioxide and water and, using energy from sunlight, produce glucose and release oxygen.',
        ],
      },
    ],
  },
  {
    id: 'wcag-quick-reference',
    name: 'WCAG 2.1 Quick Reference',
    category: 'Accessibility',
    description:
      'A simplified guide to the Web Content Accessibility Guidelines, organised around the four POUR principles.',
    sections: [
      {
        heading: 'The four principles (POUR)',
        paragraphs: [
          'Perceivable: information must be presented so people can sense it. Provide text alternatives for images and captions for audio and video.',
          'Operable: every control must work with a keyboard, users must have enough time to act, and navigation must be predictable.',
          'Understandable: text must be readable, and pages must behave in ways users expect, with helpful error messages.',
          'Robust: content must work with a wide range of browsers and assistive technologies, both now and in the future.',
        ],
      },
      {
        heading: 'Practical checks',
        paragraphs: [
          'Give every meaningful image an accurate alt description, and give decorative images an empty alt attribute so screen readers skip them.',
          'Make sure text has enough contrast against its background, and never rely on colour alone to convey meaning.',
          'Confirm that you can reach and operate every button, link, and form field using only the Tab, Enter, and arrow keys, and that the focus indicator is always visible.',
        ],
      },
    ],
  },
];

export function getResource(id) {
  return resources.find((resource) => resource.id === id);
}
