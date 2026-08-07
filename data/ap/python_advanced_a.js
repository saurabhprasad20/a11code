export const pythonAdvancedChaptersA = [
  {
    id: 'introduction-and-data-types',
    title: 'Introduction and Data Types',
    blocks: [
      { type: 'text', text: `Welcome to Advanced Python Programming. Programming is a way to express an exact, ordered method for solving a problem. In this chapter you will connect everyday computation to Python expressions, identify the main built-in data types, and understand why a value's type matters.` },
      { type: 'text', text: `A computer is powerful because it follows precise instructions, not because it fills in ambiguous intentions. Python is deliberately friendly for experimenting, but it still requires that we say exactly what we mean.` },
      { type: 'heading', text: `Computing, tools, and algorithms` },
      { type: 'text', text: `Computing is more fundamental than computers. A calculator, an abacus, paper and pencil, a ruler and compass, and a computer are all tools for carrying out computations. Each tool supplies primitive operations: its basic actions.` },
      { type: 'list', items: [`For a ruler, primitives include specifying lengths and drawing lines; for a compass, drawing arcs and circles.`, `An algorithm is an explicit ordered combination of a tool's primitives that solves a problem.`, `Programs are algorithms translated into the primitives of a programming language.`] },
      { type: 'text', text: `Here is the geometric example from the introductory material. Given square ABCD with side length a, draw diagonal AC, then construct a new square CAEF using AC as a side. Since AC has length square-root-of-2 times a, the new square has area 2a²: twice the original area.` },
      { type: 'text', text: `The accompanying construction diagram labels the original square A, B, C, D and the new square C, A, E, F joined along diagonal AC. It is an example of refinement: a larger algorithm can rely on smaller algorithms, such as constructing a square on a given segment and constructing a perpendicular through a point.` },
      { type: 'heading', text: `Programming-language primitives` },
      { type: 'text', text: `A programming language gives us primitive expressions and data, ways to combine them into statements, and ways to abstract a group of expressions or data under one name. Functions, modules, and classes are important abstraction mechanisms you will meet throughout this course.` },
      { type: 'list', items: [`Primitive data includes numbers, characters or text, and truth values.`, `Primitive operations include arithmetic, Boolean operations, and string operations.`, `A naming mechanism lets us reuse a quantity without repeating its definition.`] },
      { type: 'heading', text: `Expressions and values` },
      { type: 'text', text: `An expression represents something. Python evaluates it, turning it into a value, much as a calculator evaluates an arithmetic entry. A literal is an expression that evaluates to itself.` },
      { type: 'code', code: `2.3
(3 * 7 + 2) * 0.1
type(2)
type("apple")` },
      { type: 'text', text: `The first expression is already a value. The second combines four literals and operators. The type function reports the type of a value; in current Python, type(2) displays <class 'int'>.` },
      { type: 'heading', text: `Types: values and operations` },
      { type: 'text', text: `Memorize this useful definition: a type is a set of values and the operations defined on those values. The symbols plus, minus, slash, and star do not have one universal meaning; their meaning depends on the operand types.` },
      { type: 'list', items: [`int values are integers such as -3, 0, 45, and 43028030. Operators include +, -, *, **, /, //, %, and unary -.`, `float values approximate real numbers, such as 2.0, 2.3, 0.00001, or -22.51e6. Operators include +, -, *, /, **, and unary -.`, `bool values are exactly True and False. Operators are not, and, and or.`, `str values are sequences of characters written in quotes. String + means concatenation.`] },
      { type: 'text', text: `Accessible description of the data illustration: separate labeled boxes show numeric values 42, 3.0 times 10 to the eighth power, 0.00001, and 14850; quoted text such as "apple", "Tower Road", and "awb93"; and the Boolean values True and False. A landscape photograph and an MP3-file icon emphasize that computers also store richer data.` },
      { type: 'heading', text: `Integers and floating-point numbers` },
      { type: 'text', text: `Integers have no decimal point. In Python 3, slash performs floating-point division, double slash performs floor division, and percent gives a remainder. Exponentiation uses two stars. Float exponent notation writes a number times a power of ten: 22.51e-6 means 0.00002251.` },
      { type: 'code', code: `7 / 2
7 // 2
7 % 2
2 ** 3
-22.51e6` },
      { type: 'text', text: `These expressions evaluate respectively to 3.5, 3, 1, 8, and -22510000. Parentheses are always the clearest way to state a desired order of evaluation.` },
      { type: 'heading', text: `Why floats are approximate` },
      { type: 'text', text: `Computers store a float as an integer mantissa times a power of two. For example, 1.25 is exactly 5 times 2 to the power -2. Many real numbers cannot be written exactly in that form, just as one third cannot be written exactly as a finite decimal; Python stores the closest available binary fraction.` },
      { type: 'code', code: `0.1 + 0.2
6.3125
0.1` },
      { type: 'text', text: `The first expression may display 0.30000000000000004. This is representation error, not a failure of arithmetic. The binary floating-point example normalizes 6.3125 as 1.1001001 times 2 to the power 2. The binary expansion of decimal 0.1 repeats, so a fixed-size mantissa must round it.` },
      { type: 'text', text: `At the machine level, integers are commonly represented with two's complement and floating-point numbers use sign, mantissa, exponent, and base. IEEE single precision has one sign bit, eight exponent bits, and 23 stored mantissa bits with an implicit leading one for normalized values. It also represents zero, denormalized values, infinity, and NaN, meaning Not a Number.` },
      { type: 'heading', text: `Booleans and strings` },
      { type: 'text', text: `Boolean comparisons such as i < j, i == j, and i != j produce True or False. Equality uses two equals signs; one equals sign is reserved for assignment. Python or is inclusive: A or B is true when either or both are true. Python also requires complete Boolean expressions: write cold and snowy, not an incomplete English-style shortcut.` },
      { type: 'code', code: `3 < 5
not False
True and False
True or False
"ab" + "cd"` },
      { type: 'text', text: `The first four expressions show comparison and Boolean operations. The last evaluates to "abcd". In contrast, "ab" + 2 is an error because concatenation requires two strings.` },
      { type: 'text', text: `You can now distinguish values, expressions, and types. Keep the central habit: before applying an operation, ask what types its operands have and what value the expression should produce.` },
    ],
  },
  {
    id: 'variables-and-assignment',
    title: 'Variables and Assignment',
    blocks: [
      { type: 'text', text: `Expressions let Python compute values; variables let a program remember and reuse them. This chapter explains conversion, precedence, and the precise two-step mental model for assignment.` },
      { type: 'text', text: `Think of a variable as a named place that currently refers to a value. The variable itself does not have a permanently fixed type in Python; the value does.` },
      { type: 'heading', text: `Converting values` },
      { type: 'text', text: `Calling a type name such as int, float, bool, or str converts a value where that conversion is defined. This is often called casting. Do not confuse float(2), which converts a value, with type(2), which reports a type.` },
      { type: 'code', code: `float(2)
int(2.6)
type(2)
1 / 2.6` },
      { type: 'text', text: `These evaluate to 2.0, 2, <class 'int'>, and approximately 0.384615. Converting a float to int discards its fractional part toward zero, so it can lose information.` },
      { type: 'heading', text: `Widening and narrowing` },
      { type: 'text', text: `Python automatically widens an int to a float when an operation needs it: 1 / 2.0 becomes 0.5. It also treats True as 1 and False as 0 in numeric contexts. It never silently narrows a float to an int, and it does not automatically convert strings to numbers.` },
      { type: 'code', code: `1 / 2.0
True + 1
1 / int(2.6)
2 + "ab"` },
      { type: 'text', text: `The first three results are 0.5, 2, and 0.5. The final expression raises TypeError. Choose types deliberately: a postal code may need to be text to preserve a leading zero, while a grade or interest measurement needs a type that matches its intended meaning.` },
      { type: 'heading', text: `Operator precedence` },
      { type: 'text', text: `Python has a fixed precedence order when parentheses are absent. Parentheses have the highest practical priority and are the best way to make an expression clear.` },
      { type: 'list', items: [`From higher to lower precedence: **; unary + and -; *, /, //, and %; + and -; comparisons; == and !=; not; and; or.`, `Operators at the same precedence normally group left to right; exponentiation is the important exception.`, `Thus 1 / 2 * 3 means (1 / 2) * 3.`] },
      { type: 'code', code: `2 * (1 + 3)
2 * 1 + 3
False + 1 + 3.0 / 3` },
      { type: 'text', text: `The results are 8, 5, and 2.0. For the last expression, division happens first, False widens to integer 0, then integer-plus-float produces a float.` },
      { type: 'heading', text: `Assignment is not equality` },
      { type: 'text', text: `An assignment statement evaluates the expression on its right, then stores that resulting value under the name on its left. Read x = 5 as “assign 5 to x,” never as a mathematical claim that x equals 5 forever.` },
      { type: 'code', code: `x = 5
x
x = 3.0 ** 2 + 4 - 1
x = 2 + x` },
      { type: 'text', text: `Assignment is a statement, so the interactive prompt normally displays no value after x = 5. Entering x is an expression and displays the current value. Later assignments replace the old binding with the newly computed value.` },
      { type: 'text', text: `Accessible description of the assignment diagram: after typing x = 5, the prompt appears quiet, but a small box labeled x contains 5. Arrows label x as the memory location or name and 5 as the stored value. This picture is a teaching model for the visible effect of assignment.` },
      { type: 'heading', text: `Executing assignments step by step` },
      { type: 'code', code: `x = 5
x = x + 2
x = 3.0 * x + 1.0
rate = 4
rate = x / rate
rat = x + rate` },
      { type: 'text', text: `For x = x + 2, first retrieve the old x, add 2, then replace x with the result. Starting at 5 gives 7. The next assignment gives 22.0; rate then becomes 5.5; and rat, a different spelling and therefore a different variable, becomes 27.5.` },
      { type: 'heading', text: `Dynamic typing and checking types` },
      { type: 'text', text: `Python is dynamically typed: a name can later refer to a value of another type. Languages such as Java and C usually restrict each variable to one declared type.` },
      { type: 'code', code: `x = 1
x = x / 2.0
type(x)
type(2) == int` },
      { type: 'text', text: `After the division, x refers to 0.5, a float. The final comparison is True. Use type checks sparingly in normal code, but they are useful when learning and when enforcing documented requirements.` },
      { type: 'text', text: `Recap: evaluate right to left in assignment, use parentheses to communicate order, and remember that names can be reassigned while values retain their own types.` },
    ],
  },
  {
    id: 'code-blocks-and-variable-scope',
    title: 'Code Blocks and Variable Scope',
    blocks: [
      { type: 'text', text: `Assignment creates individual statements; blocks tell Python which statements belong together. Scope then answers an equally important question: where is each name visible?` },
      { type: 'heading', text: `Code blocks and indentation` },
      { type: 'text', text: `A code block is a group of statements treated as one logical unit. Python marks a block with consistent indentation, unlike C, C++, and Java, which commonly use curly braces. Blocks can nest inside one another.` },
      { type: 'code', code: `from math import sqrt

def blockDemo(x):
    n = x
    n = int(n) + 1
    for a in range(1, n):
        for b in range(a, n):
            c_square = a**2 + b**2
            c = int(sqrt(c_square))
            if c_square - c**2 == 0:
                print(a, b, c)
    y = a + x` },
      { type: 'text', text: `This nested example searches for integer right triangles. The function body is indented once; the first loop is nested in it, the second loop is nested again, and the if body is deepest. The final y assignment is back at the function-body indentation, so it runs after the loops finish.` },
      { type: 'text', text: `Accessible description of the block figure: the code is displayed in a staircase. Each deeper construct begins farther to the right: function, first for loop, second for loop, then if statement and print. The visual staircase is Python's syntax, not decoration.` },
      { type: 'heading', text: `Visibility and scope` },
      { type: 'text', text: `Scope is the part of a program that can see a variable. In nested blocks, names from an outer block can be read in inner blocks. A local variable is created in a function and is available in that function and its nested blocks while the call runs.` },
      { type: 'list', items: [`Global variables are defined outside functions and live in global space.`, `Local variables are names associated with a particular function call.`, `Avoid reusing the same name for a local and a global variable; it makes code harder to reason about.`] },
      { type: 'code', code: `RATE = 0.05

def price_with_tax(price):
    tax = price * RATE
    return price + tax` },
      { type: 'text', text: `Here RATE is global and can be read by price_with_tax. price and tax are local to a call of that function. In modern Python, loop and if blocks do not create a separate local scope; function definitions, classes, and modules do.` },
      { type: 'text', text: `Keep indentation exact and keep scopes small. These habits make the later topics of functions, control flow, and memory diagrams much easier to follow.` },
    ],
  },
  {
    id: 'functions-and-modules',
    title: 'Functions and Modules',
    blocks: [
      { type: 'text', text: `Functions package a computation so it can be named and reused. Modules package related functions and variables in a file. Together they are the first major tools for abstraction in Python.` },
      { type: 'heading', text: `Calling built-in and module functions` },
      { type: 'code', code: `x = 5
y = 4
bigger = max(x, y)
a = round(3.14159265)

import math
p = math.ceil(3.14159265)
math.pi` },
      { type: 'text', text: `Function calls have the form name(arguments). Arguments can themselves be expressions. The code stores 5 in bigger, 3 in a, 4 in p, and accesses the module variable math.pi.` },
      { type: 'text', text: `Built-in functions include int, float, bool, str, type, print, and exit. Modules are libraries of functions and variables. After import math, the dot means “look inside the math module”; help(math) asks Python for documentation about it.` },
      { type: 'heading', text: `Useful modules and documentation` },
      { type: 'list', items: [`math supplies mathematical constants and functions such as ceil and sqrt.`, `io supports input and output, including files; random generates random values; string supplies string-related tools; sys provides interpreter and operating-system information.`, `When reading documentation, identify the module name, function name, permitted arguments, and returned value. A specification tells how to use a function, not how it is implemented.`] },
      { type: 'heading', text: `Creating and importing a module` },
      { type: 'code', code: `# my_module.py
"""This is a simple module.
It shows how modules work"""

x = 1 + 2
x = 3 * x` },
      { type: 'text', text: `A hash begins a single-line comment. Triple-quoted text at the start is a module docstring. When Python imports this file, it skips the comment and docstring, executes the two assignments, and leaves x with value 9 inside the module.` },
      { type: 'code', code: `>>> import my_module
>>> my_module.x
9
>>> x
NameError: name 'x' is not defined` },
      { type: 'text', text: `The module must be importable from Python's working environment, and its import name is its filename without .py. Qualifying x with my_module keeps module names from colliding with your own names.` },
      { type: 'text', text: `Accessible description of the import diagram: the left side lists the comment, docstring, and two assignments in my_module.py. Arrows say the first two are not executed and the assignments are executed. On the right, a box named my_module contains x with its final value 9; x remains inside that box.` },
      { type: 'heading', text: `Import styles and namespace safety` },
      { type: 'code', code: `from math import pi
pi

from math import *
ceil(pi)

e = 12345
import math
math.e
e` },
      { type: 'text', text: `from math import pi makes just pi directly available. Star import makes every public name directly available, but can overwrite a name such as e. Importing the module and using math.e avoids that collision and is usually clearer.` },
      { type: 'heading', text: `Interactive shell, modules, and scripts` },
      { type: 'text', text: `In the interactive shell, Python executes each command typed after the >>> prompt and displays an expression's value. A module is written in an editor and normally loaded through import. A script is run at the command line with python filename.py.` },
      { type: 'code', code: `# script.py
"""This is a simple script.
It shows why we use print"""

x = 1 + 2
x = 3 * x
print(x)

# command line:
# python script.py` },
      { type: 'text', text: `Running this script prints 9. Simply writing x in a script does not display it; use print. A module and a script can look identical as files: the distinction is how you use the file. When a script ends, its process memory, including x, is gone.` },
      { type: 'text', text: `You now have a clean organization strategy: put reusable definitions in modules, import with a qualified module name where practical, and make scripts print the results a user needs to observe.` },
    ],
  },
  {
    id: 'more-on-functions',
    title: 'More on Functions',
    blocks: [
      { type: 'text', text: `Now that you can import code, it is time to write functions of your own and trace exactly what happens during a call. This chapter also sharpens the difference between returning a value and printing one.` },
      { type: 'heading', text: `Anatomy of a definition` },
      { type: 'code', code: `def increment(n):
    """Returns: the value of n + 1"""
    return n + 1` },
      { type: 'text', text: `The header starts with def, gives the function name, and lists parameters. The indented body runs only when the function is called. The docstring states the specification. return evaluates an expression and sends its value to the caller; statements after a return cannot run.` },
      { type: 'text', text: `A parameter is the name in the definition; an argument is the value or expression supplied at a call. Thus increment(2) binds argument 2 to parameter n. If execution reaches the end without return, Python returns the special value None.` },
      { type: 'heading', text: `Call frames and local variables` },
      { type: 'code', code: `INCHES_PER_FT = 12

def get_feet(ht_in_inches):
    feet = ht_in_inches // INCHES_PER_FT
    return feet

get_feet(68)` },
      { type: 'text', text: `Calling get_feet(68) creates a call frame. It binds ht_in_inches to 68, creates local feet with 5, returns 5, and then discards the whole frame. The global constant remains available; local names do not survive the call.` },
      { type: 'text', text: `Accessible description of the call-frame diagram: a rectangle titled get_feet has a box ht_in_inches containing 68 and an instruction marker pointing to the return line. The next diagrams add a return value 5 and then erase the rectangle. This is the sequence: create frame, execute, return, remove frame.` },
      { type: 'heading', text: `Tracing a call` },
      { type: 'code', code: `def foo(a, b):
    x = a
    y = b
    return x * y + y

foo(3, 4)` },
      { type: 'text', text: `The frame begins with a equal to 3 and b equal to 4. It then adds x equal to 3 and y equal to 4. The return expression is 3 times 4 plus 4, so the call evaluates to 16 and the frame is removed.` },
      { type: 'heading', text: `Globals are visible, but local assignment is local` },
      { type: 'text', text: `A function can read a name in global space when no local name shadows it. However, assigning to a name inside a function normally creates or updates a local name, not the global one. Treat global values as “look, but do not touch” unless you have a strong reason and explicitly use global.` },
      { type: 'code', code: `INCHES_PER_FT = 12
feet = "plural of foot"

def get_feet(ht_in_inches):
    feet = ht_in_inches // INCHES_PER_FT
    return feet` },
      { type: 'text', text: `The local feet is 5 during a call and does not change the global string feet. Choosing distinct names is clearer than depending on this shadowing rule.` },
      { type: 'heading', text: `Print versus return` },
      { type: 'code', code: `def print_plus(n):
    print(n + 1)

def return_plus(n):
    return n + 1

x1 = print_plus(2)
x2 = return_plus(2)
print(x1)
print(x2)` },
      { type: 'text', text: `print_plus displays 3 but returns None, so x1 is None. return_plus sends 3 back, so x2 is 3. In interactive mode, Python also echoes the returned value of a top-level expression, which can make the two functions look deceptively similar.` },
      { type: 'code', code: `def hybrid_plus(n):
    print(n)
    return n + 1

hybrid_plus(2)` },
      { type: 'text', text: `This displays 2 because of print and then evaluates to 3 because of return. Return values support later calculations; print is primarily for communicating with a person or for temporary debugging.` },
      { type: 'text', text: `Recap: define before calling, bind arguments to parameters in a new frame, use local variables for intermediate work, and return results that callers need to use.` },
    ],
  },
  {
    id: 'strings',
    title: 'Strings',
    blocks: [
      { type: 'text', text: `Strings are Python values for text, but they are also ordered sequences that you can inspect and slice. You will use functions, indexing, and string methods to transform text safely.` },
      { type: 'heading', text: `Indexing and slicing` },
      { type: 'code', code: `s = 'abc d'
s[0]
s[4]
s[0:2]
s[2:]

t = 'Hello all'
t[3:6]
t[:3]` },
      { type: 'text', text: `Indexes start at 0. For s, index 0 is 'a', index 4 is 'd', and index 5 raises an error. A slice includes its start but excludes its end: s[0:2] is 'ab'. The answers are t[3:6] equal to 'lo ' and t[:3] equal to 'Hel'.` },
      { type: 'text', text: `Accessible description of the indexing diagram: characters in 'abc d' are placed in five adjacent cells numbered 0 through 4. Characters in 'Hello all' are placed in nine cells numbered 0 through 8. This left-to-right numbering explains why the endpoint 6 is excluded from t[3:6].` },
      { type: 'heading', text: `Membership and length` },
      { type: 'code', code: `s = 'abracadabra'
'a' in s
'cad' in s
'foo' in s
len(s)
len(s[1:5])
s[1:len(s)-1]` },
      { type: 'text', text: `in asks whether one string is a substring of another and returns a Boolean. len returns an integer character count. Here the results include True, True, False, 11, 4, and 'bracadabr'.` },
      { type: 'heading', text: `Designing a string function` },
      { type: 'text', text: `A reliable design process is: work one instance yourself, write the exact steps, generalize them, test the steps, translate them to code, test the program, and debug if necessary. Let the specification determine the parameters, result, and preconditions.` },
      { type: 'code', code: `def middle(text):
    """Returns: middle third of text.

    Parameter text: a string whose length is divisible by 3.
    """
    size = len(text)
    start2 = size // 3
    start3 = (2 * size) // 3
    middle_third = text[start2:start3]
    return middle_third` },
      { type: 'text', text: `middle('abc') returns 'b', middle('aabbcc') returns 'bb', and middle('aaabbbccc') returns 'bbb'. Its precondition matters: the author promises correct behavior only for lengths divisible by 3.` },
      { type: 'heading', text: `String methods` },
      { type: 'code', code: `s = 'Hello World'
s.upper()
s[1:5].upper()
'scream'.upper()

s = 'abracadabra'
s.index('a')
s.index('rac')
s.count('a')
s.count('b')
s.count('x')
'  a b '.strip()` },
      { type: 'text', text: `A method call puts a string before the dot. upper returns a new uppercase string; it does not change s. index returns the first starting position and raises an error if absent. count counts non-overlapping occurrences. strip returns a copy with leading and trailing whitespace removed.` },
      { type: 'heading', text: `Extracting text between delimiters` },
      { type: 'code', code: `def firstparens(text):
    """Returns: substring inside the first pair of parentheses.

    Parameter text: a string containing parentheses.
    """
    start = text.index('(')
    substr = text[start + 1:]
    end = substr.index(')')
    inside = substr[:end]
    return inside` },
      { type: 'text', text: `firstparens('One (Two) Three') returns 'Two', and firstparens('(A) B (C) D') returns 'A'. Finding the closing parenthesis in the tail after the opening parenthesis avoids accidentally matching a closing parenthesis that came before the relevant opening one.` },
      { type: 'code', code: `def second(thelist):
    """Returns the trimmed second word in a comma-separated list."""
    start = thelist.index(',')
    tail = thelist[start + 1:]
    end = tail.index(',')
    result = tail[:end].strip()
    return result` },
      { type: 'text', text: `The final strip is the robust repair for input such as 'cat, dog, mouse, lion' or 'apple,pear , banana'. Moving a fixed number of characters would fail when there are zero, one, or many spaces.` },
      { type: 'heading', text: `Quotes and escape characters` },
      { type: 'code', code: `single = "It's valid"
double = 'She said "hello"'
line = 'first\\nsecond'
tabbed = 'left\\tright'
path_piece = '\\\\'` },
      { type: 'text', text: `Use the other quote character to include a quote easily. An escape begins with backslash: backslash-single-quote, backslash-double-quote, backslash-n for newline, backslash-t for tab, and two backslashes for one literal backslash.` },
      { type: 'text', text: `You can now treat text as structured data: use indexes and slices for positions, methods for common transformations, and specifications to state the input form your extraction functions require.` },
    ],
  },
  {
    id: 'specifications-and-testing',
    title: 'Specifications and Testing',
    blocks: [
      { type: 'text', text: `A program is trustworthy only when its behavior is clearly stated and deliberately checked. Specifications tell users what a function promises; testing looks for gaps between that promise and the implementation.` },
      { type: 'heading', text: `Writing a specification` },
      { type: 'code', code: `def get_campus_num(phone_num):
    """Returns the on-campus version of a 10-digit phone number.

    Returns: a str of form 'X-XXXX'
    Parameter phone_num: number with area code
    Precondition: phone_num is a 10-digit string containing only numbers.
    """
    return phone_num[5] + '-' + phone_num[6:10]` },
      { type: 'text', text: `A useful docstring begins with a short description, can add details, describes each parameter and return value, and states preconditions. It describes how to use the function, not its internal algorithm.` },
      { type: 'heading', text: `Preconditions are contracts` },
      { type: 'code', code: `get_campus_num('6072554444')
get_campus_num('6072531234')
get_campus_num(6072531234)
get_campus_num('607-255-4444')` },
      { type: 'text', text: `The first two valid calls produce '5-4444' and '3-1234'. Passing an int raises TypeError because an int is not subscriptable. The hyphenated string violates the precondition but can silently produce the wrong-looking '5-5-44', which is often more dangerous than a visible error.` },
      { type: 'text', text: `An image of NASA's Mars Climate Orbiter accompanies this lesson. It shows a spacecraft with large solar panels against a star field and states that the 1999 mission was lost after one team used English units and another used metric units. The lesson is that explicit expectations prevent costly misunderstandings.` },
      { type: 'heading', text: `Test cases and representative inputs` },
      { type: 'text', text: `A bug is an error in a program; debugging finds and removes bugs. Testing analyzes and runs a program to find bugs. A test case is input together with its expected output. Write tests from the specification even before implementation.` },
      { type: 'code', code: `def vowel_count(word):
    """Returns: number of vowels in word.

    Parameter word: a string with at least one letter and only letters.
    """
    pass

# Examples:
# vowel_count('Bob')    # expect 1
# vowel_count('Aeiuo')  # expect 5
# vowel_count('Grrr')   # expect 0` },
      { type: 'text', text: `Questions such as whether y counts as a vowel reveal that tests can uncover an unclear specification as well as a coding error.` },
      { type: 'list', items: [`Use common cases: typical inputs people will supply.`, `Use edge cases: first, middle, and last positions; sizes 0, 1, 2, and many; negative, zero, and positive values; and different input orders or types where relevant.`, `You cannot test infinitely many inputs, so choose representative cases: each should exercise a meaningfully different situation.`] },
      { type: 'heading', text: `Testing and repairing a name formatter` },
      { type: 'code', code: `def last_name_first(full_name):
    """Returns full_name as '<last-name>, <first-name>'.

    Precondition: full_name has first and last names with one or more blanks between them.
    """
    end_first = full_name.find(' ')
    first = full_name[:end_first]
    last = full_name[end_first + 1:].strip()
    return last + ', ' + first` },
      { type: 'text', text: `The strip on last is essential. Without it, 'Maya      Angelou' would return leading spaces before Angelou. Good representative tests include both one separating blank and many separating blanks.` },
      { type: 'heading', text: `Unit tests` },
      { type: 'code', code: `import name
import introcs

def test_last_name_first():
    """Calls all tests for last_name_first."""
    print('Testing function last_name_first')
    result = name.last_name_first('Maya Angelou')
    introcs.assert_equals('Angelou, Maya', result)
    result = name.last_name_first('Maya                Angelou')
    introcs.assert_equals('Angelou, Maya', result)

test_last_name_first()
print('All tests of the function last_name_first passed')` },
      { type: 'text', text: `A unit test is a script that imports the module under test and checks expected versus received results. The final success message prints only if no assertion halted the program. Grouping a function's cases in one test function keeps a growing test suite organized.` },
      { type: 'heading', text: `Debug what the code does` },
      { type: 'text', text: `Replace “Why does my code not do what I want?” with “What is my code doing?” Step through the code with a memory trace or add temporary print statements that show the values of key variables.` },
      { type: 'code', code: `def last_name_first(full_name):
    print('full_name = ' + full_name)
    space_index = full_name.find(' ')
    print('space_index = ' + str(space_index))
    first = full_name[:space_index]
    print('first = ' + first)
    last = full_name[space_index + 1:]
    print('last = ' + last)
    return last + ', ' + first` },
      { type: 'text', text: `These prints expose the intermediate state, but remove or replace them after debugging so they do not clutter production output. Specifications, representative tests, and careful observation form a repeatable debugging discipline.` },
    ],
  },
  {
    id: 'conditionals',
    title: 'Conditionals',
    blocks: [
      { type: 'text', text: `Conditionals control which statements Python executes next. Unlike assignment, which changes data, control flow chooses a path through a program based on a Boolean expression.` },
      { type: 'heading', text: `The if statement` },
      { type: 'code', code: `# Is there a new high score?
if curr_score > high_score:
    high_score = curr_score
    print('New high score!')` },
      { type: 'text', text: `Python evaluates the condition. If it is True, it executes all statements indented directly under if, stopping when indentation returns to the surrounding level. If it is False, it skips that indented block.` },
      { type: 'code', code: `a = 0
if a == 0:
    a = a + 1
if a == 0:
    a = a + 2
a = a + 1
print(a)` },
      { type: 'text', text: `This prints 2: the first condition is true and makes a equal to 1; the second is false; the final assignment makes it 2. Conditions can use Boolean variables, comparisons, or combinations such as is_student and is_senior.` },
      { type: 'heading', text: `if-else and flow diagrams` },
      { type: 'code', code: `if score1 > score2:
    winner = 'Player 1'
else:
    winner = 'Player 2'` },
      { type: 'text', text: `With else, exactly one of the two blocks runs. The flow diagram has a diamond decision labeled b. In the if-only version, a true path executes s1 and then reaches s3, while a false path goes directly to s3. In the if-else version, true executes s1 and false executes s2; both paths then meet at s3.` },
      { type: 'heading', text: `Tracing conditional execution` },
      { type: 'code', code: `def write_valentine(in_love):
    if not in_love:
        print("Let's be friends!")
    print("Happy Valentine's Day.")

name = input('Recipient Name: ')
write_valentine(name == 'Kilian')` },
      { type: 'text', text: `For input Bob, name == 'Kilian' is False, so the function prints both messages. For input Kilian it is True, so the indented first message is skipped and the second message still prints. A call frame holds parameter in_love while this happens.` },
      { type: 'heading', text: `Variables and branches` },
      { type: 'code', code: `def zero_or_one(a):
    if a == 1:
        b = 1
    else:
        b = 0
    print(b)

def broken_max(x, y):
    if x > y:
        bigger = x
    return bigger` },
      { type: 'text', text: `A name created inside an if remains in the surrounding function scope after the if, but only if execution actually reached its assignment. zero_or_one creates b on every path. broken_max(3, 0) returns 3, but broken_max(0, 3) raises an error because bigger was never created.` },
      { type: 'heading', text: `Traces and watches` },
      { type: 'code', code: `print('before if')
if x > y:
    print('inside if x > y')
    z = x
    print('z = ' + str(z))
else:
    print('inside else (x <= y)')
    z = y
    print('z = ' + str(z))
print('after if')` },
      { type: 'text', text: `A trace tells you which block is executing; put it at a block that might be skipped. A watch tells you a variable's value; put it after an assignment. These are practical tools for diagnosing control flow.` },
      { type: 'heading', text: `if-elif-else and nesting` },
      { type: 'code', code: `if score1 > score2:
    winner = 'Player 1'
elif score2 > score1:
    winner = 'Player 2'
else:
    winner = 'Players 1 and 2'

def what_to_wear(raining, freezing):
    if raining:
        if freezing:
            print('Wear a waterproof coat.')
        else:
            print('Bring an umbrella.')
    else:
        if freezing:
            print('Wear a warm coat!')
        else:
            print('A jacket will suffice.')` },
      { type: 'text', text: `Python tests if and then each elif in order. Once it finds a true condition, it executes that block and skips the rest; else covers the case where all tested conditions are false. Any number of elif clauses is allowed, but else is optional.` },
      { type: 'code', code: `a = 2
if a == 2:
    a = 3
elif a == 3:
    a = 4
print(a)` },
      { type: 'text', text: `This prints 3, not 4, because the successful if branch ends the chain. If the second condition were a separate if instead of elif, it would see the changed a and print 4.` },
      { type: 'text', text: `Recap: every conditional makes a choice based on a Boolean value. Indentation defines the branches, so initialize or assign needed variables on every possible path.` },
    ],
  },
  {
    id: 'python-memory-model',
    title: 'The Python Memory Model',
    blocks: [
      { type: 'text', text: `A memory model is a disciplined picture of where names, objects, and function calls live. It helps you predict effects instead of guessing, especially once functions and objects interact.` },
      { type: 'heading', text: `Global space, heap space, and call frames` },
      { type: 'text', text: `Global space contains global variables, modules, and functions and lasts until the Python process ends. Heap space stores objects, represented in the lectures as folders that must be accessed indirectly. A function call creates a call frame for parameters and local variables; that frame lasts until the function returns.` },
      { type: 'code', code: `x = 4
p = shape.Point2(1, 2)
q = shape.Point2(10, 7)` },
      { type: 'text', text: `In the teaching diagram, global x contains 4. Global p and q contain object identifiers, not the objects themselves. Heap space holds one Point2 folder with x 1 and y 2, and another with x 10 and y 7.` },
      { type: 'heading', text: `A function call can change an object` },
      { type: 'code', code: `def adjust_x_coord(pt, n):
    pt.x = pt.x + n

x = 4
p = shape.Point2(1, 2)
adjust_x_coord(p, x)` },
      { type: 'text', text: `The call frame binds pt to the same object identifier held by p and n to 4. Updating pt.x therefore changes that shared Point2 object's x from 1 to 5. The function returns None and its frame disappears, but the heap object remains changed.` },
      { type: 'text', text: `Accessible description of the memory diagram: global space has x containing 4 and p containing id1. Heap space has the id1 Point2 folder with fields x and y; x is crossed out as 1 and replaced with 5, while y remains 2. The adjust_x_coord call frame contains pt with id1 and n with 4, then shows return None.` },
      { type: 'heading', text: `Remove duplication with helper functions` },
      { type: 'code', code: `def get_coord(name):
    x = input(name + ': ')
    return int(x)

def configure(pt, role):
    print('Where does the line ' + role + '?')
    pt.x = get_coord('x')
    pt.y = get_coord('y')
    print('The line ' + role + 's at (' + str(pt.x) + ',' + str(pt.y) + ').')

start = shape.Point2(0, 0)
stop = shape.Point2(0, 0)
configure(start, 'start')
configure(stop, 'stop')` },
      { type: 'text', text: `The helper get_coord performs one conceptual subtask and returns an integer. This removes repeated input-and-conversion code, so a correction is made in one place rather than several. The lecture also highlights a realistic bug: using x and y directly in configure after those names exist only in get_coord; using pt.x and pt.y fixes it.` },
      { type: 'heading', text: `Frames form a call stack` },
      { type: 'text', text: `When configure calls get_coord, configure's frame remains while a new get_coord frame sits above it. Frames are stacked: Python cannot remove a lower frame while a higher one still needs it. Excessively deep calls can exhaust available stack memory, producing a stack overflow or recursion-depth error.` },
      { type: 'code', code: `def f3():
    print('f3')

def f2():
    print('f2')
    f3()
    f3()
    f3()

def f1():
    print('f1')
    f2()

f1()` },
      { type: 'text', text: `At the instant f3 is running, the active stack from bottom to top is f1, f2, f3. Earlier f3 calls have already returned, so their frames are not still present.` },
      { type: 'heading', text: `Tracebacks and modules` },
      { type: 'code', code: `def get_coord(name):
    x = input(name + ': ')
    return int(x1)

def configure(pt, role):
    pt.x = get_coord('x')` },
      { type: 'text', text: `If get_coord reaches x1, Python reports NameError and prints a traceback from the outer call through configure to the failing line in get_coord. Read the traceback as the active call path, with the final listed frame showing where the exception occurred.` },
      { type: 'text', text: `Importing a module also creates a global name for the module and a module object on the heap. For example, math names a module folder containing pi, e, and functions. A module and an ordinary object both organize attributes; a module comes from importing a file, while an object comes from a class constructor.` },
      { type: 'text', text: `Keep this complete model in mind: globals and active frames hold names; heap space holds objects; calls add frames; returns remove them. It will explain aliasing, mutation, and errors in the chapters ahead.` },
    ],
  },
  {
    id: 'immutability',
    title: 'Immutability',
    blocks: [
      { type: 'text', text: `The memory model distinguishes a name from an object. Immutability adds the next question: after an object is created, can its contents change? This property determines what assignment and function calls can do.` },
      { type: 'heading', text: `Mutable versus immutable objects` },
      { type: 'text', text: `Mutable means possible to change; immutable means not possible to change. Mutability is a property of an object's type, not of the variable name that happens to refer to it.` },
      { type: 'list', items: [`Immutable built-in types include bool, int, float, str, tuple, and frozenset.`, `Mutable built-in types include list, set, and dict.`, `Instances of user-defined classes are normally mutable unless their class deliberately prevents changes.`] },
      { type: 'text', text: `Accessible description of the classification table: rows list bool as Boolean value, int as arbitrary-magnitude integer, float as floating-point number, list as mutable sequence, tuple as immutable sequence, str as character string, set as unordered distinct objects, frozenset as immutable set, and dict as associative mapping. Check marks in the final column appear for bool, int, float, tuple, str, and frozenset; list, set, and dict have no check mark.` },
      { type: 'heading', text: `Rebinding is not mutation` },
      { type: 'code', code: `s = 'abc'
first_id = id(s)
s = 'xyz'
second_id = id(s)

pets = ['cat', 'dog']
pets.append('fish')` },
      { type: 'text', text: `Strings are immutable, so s = 'xyz' cannot change the old 'abc' object. It rebinds s to a different string object; the two id values therefore normally differ. A list is mutable, so append changes the existing list object to include 'fish'.` },
      { type: 'heading', text: `Why this distinction matters` },
      { type: 'text', text: `A variable can always be assigned a new value. That does not mean the old object changed. For an immutable integer or string, an apparent “change” makes or chooses a new value and rebinds the name. For a mutable list, set, dictionary, or object, an operation may alter the shared object seen through every alias.` },
      { type: 'code', code: `a = 10
b = a
a = a + 1

left = ['cat', 'dog']
right = left
right.append('fish')` },
      { type: 'text', text: `After the first group, b is still 10 and a is 11 because integers are immutable. After the second group, both left and right observe ['cat', 'dog', 'fish'] because they name the same mutable list. This is the bridge to the object model and aliasing.` },
      { type: 'text', text: `Recap: ask two separate questions whenever code “changes” something: did a name get rebound, or did a mutable object get mutated? The answer makes program behavior predictable.` },
    ],
  },
  {
    id: 'objects-and-object-model',
    title: 'Objects and the Object Model',
    blocks: [
      { type: 'text', text: `Built-in types are useful, but programs often need values with several related pieces of data. Objects group those pieces into one meaningful unit, and classes define the type of such objects.` },
      { type: 'heading', text: `Objects, attributes, and classes` },
      { type: 'text', text: `A three-dimensional point needs x, y, and z coordinates. Managing x0, y0, z0, then x1, y1, z1 quickly becomes messy. An object is like a folder containing attribute variables; its class is the user-defined type of that folder.` },
      { type: 'text', text: `The object diagram shows a Point3 folder with a unique id tab and attributes x equal to 2, y equal to 3, and z equal to 5. The id only identifies the object; it has no application meaning and cannot change. Attributes can change.` },
      { type: 'heading', text: `Constructors make objects` },
      { type: 'code', code: `import shapes

p = shapes.Point3(0, 0, 0)
id(p)` },
      { type: 'text', text: `A constructor has the form ClassName(arguments). shapes.Point3 creates a new Point3 object and returns its object reference, which p stores. Unlike ints and strings, objects do not have simple literals; constructors instantiate them.` },
      { type: 'heading', text: `Accessing and updating attributes` },
      { type: 'code', code: `p = shapes.Point3(1, 2, 3)
p.x = p.x + 3
p.x` },
      { type: 'text', text: `Dot notation accesses an attribute. To evaluate p.x, Python follows the reference in p to its Point3 object and obtains x. The assignment mutates that object's x attribute from 1 to 4.` },
      { type: 'heading', text: `Object variables hold references` },
      { type: 'code', code: `p1 = shapes.Point3(0, 0, 0)
p2 = p1
p1.x = 5
p2.x = 7
p1.x` },
      { type: 'text', text: `p2 = p1 copies the reference, not the folder. Both names identify the same Point3, so the last expression is 7. This is aliasing and is a common source of surprises.` },
      { type: 'text', text: `Accessible description of the alias diagram: global p1 and p2 each contain the same identifier, id2. Heap space contains exactly one Point3 folder tagged id2 with x, y, and z fields. The two names are separate, but their arrows conceptually lead to the one shared folder.` },
      { type: 'heading', text: `Objects passed to functions` },
      { type: 'code', code: `def incr_x(q):
    q.x = q.x + 1

p = shapes.Point3(1, 2, 3)
incr_x(p)` },
      { type: 'text', text: `The parameter q receives the same reference as p. Mutating q.x therefore changes the shared object, and p.x becomes 2 after the call. The local q name disappears when the frame returns, but the object remains.` },
      { type: 'heading', text: `Distinct objects and swapping attributes` },
      { type: 'code', code: `p = shapes.Point3(1, 2, 3)
q = shapes.Point3(3, 4, 5)

def swap_x(p, q):
    t = p.x
    p.x = q.x
    q.x = t

swap_x(p, q)` },
      { type: 'text', text: `The two constructor calls make two separate Point3 folders. swap_x exchanges their x attributes, so p.x becomes 3 and q.x becomes 1. It works because it mutates the objects' fields.` },
      { type: 'code', code: `def swap(p, q):
    t = p
    p = q
    q = t` },
      { type: 'text', text: `This different swap only rebinds local parameter names. It does not change the caller's global p and q references, so it cannot swap the caller's variables.` },
      { type: 'heading', text: `Methods` },
      { type: 'code', code: `p = shapes.Point3(1, 2, 3)
p.greet()

s = 'Hello World'
s.upper()
s.strip()
s.index('World')
s.count('l')` },
      { type: 'text', text: `A method is a function tied to a class and is called with an object before the dot. You have already used string methods. Classes can provide methods such as Point3.greet as well as attributes.` },
      { type: 'text', text: `Built-in-type instances are commonly called values and created with literals; class instances are commonly called objects and created with constructors. Both are Python objects in the broad sense, but the folder model is particularly helpful for user-defined instances.` },
    ],
  },
  {
    id: 'assertions-and-errors',
    title: 'Assertions and Errors',
    blocks: [
      { type: 'text', text: `Specifications state preconditions; assertions actively enforce them at the point where a function receives data. They turn a confusing downstream failure into an immediate, specific diagnostic.` },
      { type: 'heading', text: `A late and confusing error` },
      { type: 'code', code: `def print_mailing_label(num, st, city, state, zip):
    """Prints an address in standard mailing format."""
    print('Ship to:')
    print(str(num) + ' ' + st)
    print(city + ', ' + state + ' ' + zip)

print_mailing_label(100, 'Main Street', 'Ithaca', 'NY', 14850)` },
      { type: 'text', text: `This prints the first two lines and then raises TypeError because zip is an int and concatenation requires a string. The caller violated an unstated requirement, but the failure points at an implementation detail rather than clearly explaining the bad argument.` },
      { type: 'heading', text: `Assert statements` },
      { type: 'text', text: `assert condition raises AssertionError if condition is false. The form assert condition, message attaches an explanation. Use assertions to check preconditions: they make contracts executable while developing and testing.` },
      { type: 'code', code: `def print_mailing_label(num, st, city, state, zip):
    assert type(num) == int, 'street number must be an int'
    assert type(st) == str, 'street name must be a str'
    assert type(city) == str, 'city must be a str'
    assert type(state) == str, 'state must be a str'
    assert len(state) == 2, 'state must be 2 characters'
    assert type(zip) == str, 'zip code must be a str'
    print('Ship to:')
    print(str(num) + ' ' + st)
    print(city + ', ' + state + ' ' + zip)` },
      { type: 'text', text: `With integer 14850 for zip, this version immediately raises AssertionError: zip code must be a str. That is much more helpful because it identifies the caller's contract violation before partial output or a low-level TypeError.` },
      { type: 'heading', text: `Checking richer requirements` },
      { type: 'code', code: `def good_state(state):
    return type(state) == str and len(state) == 2 and state == 'NY'  # etc.

def print_mailing_label(num, st, city, state, zip):
    assert good_state(state), 'state is ill-formatted'
    # remaining work goes here` },
      { type: 'text', text: `A helper predicate can state a complicated condition more clearly. A production version would check membership in a complete set of valid state abbreviations rather than the abbreviated example above.` },
      { type: 'heading', text: `Invariants move repeated checks to an object` },
      { type: 'text', text: `If several postal functions need the same address requirements, checking them separately is redundant. An Address object can enforce invariants when it is created, so later functions can rely on every Address having a well-formed number, street, city, state, and zip.` },
      { type: 'code', code: `def print_european_mailing_label(addr):
    """Prints an address in European format.

    Precondition: addr is an Address.
    """
    print('An:')
    print(addr.st + ' ' + str(addr.num))
    print(addr.zip + ' ' + addr.city)` },
      { type: 'text', text: `The object diagram shows a global name a1 pointing to one Address object whose attributes include num 100, street, city Ithaca, state NY, and zip '14850'. This one validated object can be safely passed to several formatting functions.` },
      { type: 'heading', text: `Reading a traceback` },
      { type: 'code', code: `def function_1(x, y):
    return function_2(x, y)

def function_2(x, y):
    return function_3(x, y)

def function_3(x, y):
    return x / y

function_1(1, 0)` },
      { type: 'text', text: `This ends in ZeroDivisionError. The traceback lists the top-level call, then function_1, then function_2, then the failing division in function_3. The final traceback location identifies where the exception was raised, while the preceding lines explain how execution got there.` },
      { type: 'text', text: `Accessible description of the error illustration: code line numbers 1 through 12 appear beside three nested function definitions. A neighboring traceback repeats line 12, then lines 4, 7, and 10 in call order, ending with “ZeroDivisionError: division by zero.”` },
      { type: 'text', text: `Use assertions to enforce documented assumptions, but remember that a traceback alone cannot tell you whether the bug is in a caller, a precondition, or an implementation. Read the specification too.` },
    ],
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    blocks: [
      { type: 'text', text: `Assertions expose violated contracts. Exception handling lets a program respond deliberately to failures that can happen at runtime, rather than always ending abruptly.` },
      { type: 'heading', text: `Syntax errors and runtime exceptions` },
      { type: 'code', code: `# SyntaxError: a colon and indented suite are required
# if x > 5 print('x is greater than 5')

10 * (1 / 0)
4 + x * 3
'2' + 2` },
      { type: 'text', text: `Syntax or parsing errors prevent Python from understanding the program. Runtime errors are exceptions: syntactically valid code begins running and then encounters a problem. The three expressions respectively demonstrate ZeroDivisionError, NameError when x is undefined, and TypeError for incompatible operands.` },
      { type: 'text', text: `Other built-in exception types include AssertionError, ModuleNotFoundError, and ImportError. Each exception class conveys useful information about what failed.` },
      { type: 'heading', text: `try and except` },
      { type: 'code', code: `try:
    print(x)
except NameError:
    print('Variable x is not defined')

try:
    a = 10 * (1 / 0)
except ZeroDivisionError:
    print('Cannot divide by 0')` },
      { type: 'text', text: `Put potentially failing code in try. If the named exception occurs, Python skips the rest of that try suite and runs the matching except suite. This can give a useful message, recover, or record the failure.` },
      { type: 'code', code: `values = [4, 'a', 0, 2]
for item in values:
    try:
        reciprocal = 1 / int(item)
    except (ValueError, ZeroDivisionError):
        print('Cannot compute a reciprocal for', item)` },
      { type: 'text', text: `An except can name a tuple of exception types when the same recovery makes sense. The original lecture's string input raises ValueError in current Python when int('a') is attempted; catching ValueError is therefore necessary alongside ZeroDivisionError.` },
      { type: 'heading', text: `Catch narrowly and order handlers carefully` },
      { type: 'code', code: `try:
    # operations that may fail
    pass
except ZeroDivisionError:
    print('division by zero')
except Exception:
    print('unknown or unexpected exception')` },
      { type: 'text', text: `A bare except catches almost everything, so use it sparingly and place it after specific handlers. A broad Exception handler is generally clearer than a completely bare one. Match specific errors first so they are not swallowed by a general handler.` },
      { type: 'heading', text: `else and finally` },
      { type: 'code', code: `try:
    result = x / y
except ZeroDivisionError:
    print('division by zero')
else:
    print('result is', result)
finally:
    print('This gets executed anyway')` },
      { type: 'text', text: `else runs only when the try suite succeeds, so it keeps normal follow-up code out of the region whose exceptions are being caught. finally runs whether try succeeds or fails and is the right place for cleanup such as closing a file. If an exception occurs in an except or else suite, it is re-raised after finally runs.` },
      { type: 'heading', text: `Raising and re-raising` },
      { type: 'code', code: `try:
    raise NameError('some unknown variable is used')
except NameError as err:
    log.error(err)
    raise` },
      { type: 'text', text: `raise ExceptionType(message) deliberately creates an exception. A bare raise inside an except re-raises the exception currently being handled and preserves its traceback, which is useful after logging or adding local cleanup.` },
      { type: 'heading', text: `User-defined exceptions` },
      { type: 'code', code: `class Error(Exception):
    """Base class for related application exceptions."""
    pass

class ValueTooSmallError(Error):
    """Raised when the input value is too small."""
    pass

class ValueTooLargeError(Error):
    """Raised when the input value is too large."""
    pass` },
      { type: 'text', text: `Custom exception classes inherit from Exception, directly or indirectly. Keeping their names and hierarchy meaningful makes a program's error cases easier to understand.` },
      { type: 'code', code: `number = 10
while True:
    try:
        i_num = int(input('Enter a number: '))
        if i_num < number:
            raise ValueTooSmallError
        elif i_num > number:
            raise ValueTooLargeError
        break
    except ValueTooSmallError:
        print('This value is too small, try again!')
    except ValueTooLargeError:
        print('This value is too large, try again!')
print('Congratulations! You guessed it correctly.')` },
      { type: 'text', text: `The loop communicates a precise recovery for each custom exception and exits only when the guessed number is correct.` },
      { type: 'heading', text: `Exception inheritance and handler order` },
      { type: 'code', code: `class B(Exception):
    pass
class C(B):
    pass
class D(C):
    pass

for cls in [B, C, D]:
    try:
        raise cls()
    except D:
        print('D')
    except C:
        print('C')
    except B:
        print('B')` },
      { type: 'text', text: `This prints B, C, D. A handler matches an exception of its own class or a subclass, and Python chooses the first matching except. If except B were placed first, it would catch B, C, and D, printing B three times. Put the most specific handlers before their base classes.` },
    ],
  },
  {
    id: 'file-handling',
    title: 'File Handling',
    blocks: [
      { type: 'text', text: `Programs become much more useful when data can outlive one run. Files store related information on secondary storage, and Python file objects provide controlled operations for reading, writing, and positioning within that data.` },
      { type: 'heading', text: `Files and operations` },
      { type: 'text', text: `A file may be text, comma-separated values, a document, an image, or an archive; its extension often suggests its format, such as .txt, .csv, .docx, .png, or .zip. Common operations are create, read, write, append, and delete.` },
      { type: 'heading', text: `Opening modes` },
      { type: 'list', items: [`r opens for reading and is the default; it fails if the file does not exist.`, `w opens for writing and truncates an existing file; x creates exclusively and fails if the path already exists; a writes at the end.`, `b selects binary mode, t selects text mode and is the default, and + permits updating, meaning both reading and writing.`] },
      { type: 'code', code: `f = open('demo.txt', 'r')
f = open('demo.dat', 'wb')
f = open('demo.dat', 'r+b')
f = open('demo.txt', 'rt')
f = open('demo.txt')` },
      { type: 'text', text: `The last two lines are equivalent. Be particularly careful with w: opening an existing file in that mode discards its previous contents before you write.` },
      { type: 'heading', text: `Reading files` },
      { type: 'code', code: `f = open('demo.txt', 'rt')
str_data = f.read()

line = f.readline()
for line in f:
    print(line)

all_lines_1 = list(f)
all_lines_2 = f.readlines()
first_five = f.read(5)` },
      { type: 'text', text: `read with no argument reads the remaining contents as one string. readline reads one line. Iterating over a file reads lines one at a time, which is usually more memory-friendly for large text files. list(f) and readlines return the remaining lines as a list. read(5) reads five characters in text mode or five bytes in binary mode.` },
      { type: 'heading', text: `Writing files` },
      { type: 'code', code: `f = open('demo.txt', 'w')
written = f.write('This is a test\\n')
f.close()` },
      { type: 'text', text: `write needs a string for a text file and bytes for a binary file. It returns the number of characters written; this example returns 15 because the newline counts as one character.` },
      { type: 'heading', text: `The current position: tell and seek` },
      { type: 'code', code: `f.read(5)
f.tell()      # 5
f.read(6)
f.tell()      # 11

f = open('workfile', 'rb+')
f.write(b'0123456789abcdef')
f.seek(5)
f.read(1)
f.seek(-3, 2)
f.read(1)` },
      { type: 'text', text: `tell returns the current position: bytes from the beginning in binary mode and characters from the beginning in text mode. seek(offset, whence) moves it. In the binary example, seek(5) moves to the sixth byte and reads b'5'; seek(-3, 2) moves three bytes before the end and reads b'd'.` },
      { type: 'text', text: `Accessible description of the seek reference table: whence 0 means the beginning of the file, whence 1 means the current position, and whence 2 means the end. The offset is added to that chosen reference point.` },
      { type: 'heading', text: `Always close files` },
      { type: 'code', code: `with open('demo.txt', 'rt') as file:
    data = file.read()

# After the with suite, file is closed.

f = open('demo.txt')
f.close()
is_closed = f.closed` },
      { type: 'text', text: `Prefer with because Python closes the file automatically even if an exception occurs in the suite. Calling close manually is possible but easier to forget. The closed attribute reports whether a file object is closed.` },
      { type: 'heading', text: `Deleting a file` },
      { type: 'code', code: `import os

if os.path.exists('demo.txt'):
    os.remove('demo.txt')
else:
    print('The file does not exist')` },
      { type: 'text', text: `os.remove deletes the named file. Checking existence first lets the program handle a missing path gracefully. Deletion is permanent in many environments, so verify the filename before calling it.` },
      { type: 'heading', text: `Practice design` },
      { type: 'text', text: `A useful exercise is a student-record file with one space-separated student per line: first name, last name, roll number, quiz-one marks, and quiz-two marks. Read each line, create an object for each student, then compute the class average for both quizzes. This combines parsing, objects, numeric conversion, iteration, and file cleanup.` },
      { type: 'text', text: `Recap: choose an opening mode deliberately, read and write the form your file requires, manage the current position only when needed, and use with so every file closes reliably.` },
    ],
  },
];
