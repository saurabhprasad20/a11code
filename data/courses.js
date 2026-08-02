export const courses = [
  {
    id: 'python-for-beginners',
    title: 'Python for Beginners',
    description:
      'A hands-on, screen-reader-friendly introduction to Python built from a course taught to visually impaired learners. You will set up Python, work in the command prompt and interpreter, and gradually build your logical thinking through worked programs. Covers printing and comments, operators and input, strings, lists and tuples, dictionaries and sets, conditional statements, loops, and functions. More topics such as interactive games, exception handling, file handling, and object-oriented programming are on the way.',
    level: 'Beginner',
    chapters: [
      {
        id: 'introduction',
        title: 'Getting Started with Python',
        blocks: [
          { type: 'text', text: `Welcome to Python with Accessibility. This course gives you hands-on practice with coding in Python and gradually builds your logical thinking for programming. There are no mandatory prerequisites except your motivation to engage with the material and learn it.` },

          { type: 'heading', text: `Downloading and installing Python` },
          { type: 'text', text: `Open the official Python website at https://www.python.org/downloads/ and choose the latest stable version for your operating system. The site usually highlights the recommended download button for you.` },
          { type: 'text', text: `On Windows, once the installer has downloaded, install it with these keystrokes:` },
          { type: 'list', items: [
            `Press Enter on the downloaded file to run the installer.`,
            `Press Tab twice and press Space to check the "Add Python to PATH" option. This step matters, because it lets you run Python from any folder.`,
            `Press Tab three times and activate the "Install Now" button.`,
          ] },

          { type: 'heading', text: `What is programming and a programming language?` },
          { type: 'text', text: `Programming refers to the tasks and activities that different software programs perform on a computer, and how a human directs them. A programming language is what lets humans and computers communicate with each other. Python is one of the many programming languages.` },

          { type: 'heading', text: `Why Python?` },
          { type: 'list', items: [
            `Python is an easy language to learn.`,
            `You can build software with it.`,
            `It is used for web development.`,
            `You can design games.`,
            `You can even create NVDA add-ons.`,
          ] },

          { type: 'heading', text: `An IDE or the command prompt?` },
          { type: 'text', text: `Initially we will not use any IDE (integrated development environment) to write our code. Once you are comfortable with a few important concepts, we will move on to IDEs. For now, we will use Notepad and the command prompt to write and run our code.` },

          { type: 'heading', text: `Two environments: interpreter and compiler` },
          { type: 'text', text: `An interpreter reads every line of code and executes it immediately, one line at a time. A compiler first reads the whole program file and then executes it.` },

          { type: 'heading', text: `Getting started` },
          { type: 'text', text: `Create a folder on your Desktop named learn_python. Then open the command prompt (you can do this by typing cmd in the Run dialog). When the command prompt opens, your cursor sits in the "This PC" directory. Move into the Desktop and then into your folder:` },
          { type: 'code', code: `cd desktop
cd learn_python` },
          { type: 'text', text: `Tip: you can press the Tab key to autocomplete file and folder names.` },

          { type: 'heading', text: `The interpreter as a calculator` },
          { type: 'text', text: `Before writing our first program, let us get familiar with the Python interpreter. Type python at the command prompt and press Enter. You will find a prompt that looks like this: three greater-than signs, >>>. This is the Python interpreter, and it can perform all of Python's functionality. Let us use it as a calculator for a while. Try any calculations you like:` },
          { type: 'code', code: `>>> 4 + 3
>>> 46 * 9
>>> 10 - 3` },
          { type: 'text', text: `To review the previous commands and their output with a screen reader, hold your NVDA or Insert key and press the Up or Down arrow. You can move character by character with the Left and Right arrows. To close the interpreter and return to the command prompt, type exit(). exit() is a Python function that closes the interpreter.` },

          { type: 'heading', text: `Your first program: print` },
          { type: 'text', text: `Let us write our first program. To create and open a file, type the command below. This creates a new file named hello, where .py is the extension for Python files. Confirm "Yes" when asked to create it, then write the code that follows:` },
          { type: 'code', code: `notepad hello.py` },
          { type: 'code', code: `print("Hello Programmer!")` },
          { type: 'text', text: `Save the file with Control plus S and close it with Alt plus F4. Now run the file by typing:` },
          { type: 'code', code: `python hello.py` },
          { type: 'text', text: `You can read the output the same way you did in the interpreter: hold the NVDA key and use the Up and Down arrows. print() is a function that takes the values you give it and prints them. Whatever you write inside the double quotes is what gets printed to the output console.` },

          { type: 'heading', text: `Printing on multiple lines` },
          { type: 'text', text: `If you want to print output across several lines, you can use \\n to mark a new line. For example, create a file called intro.py and write your introduction:` },
          { type: 'code', code: `notepad intro.py` },
          { type: 'code', code: `print("Hi programmer! \\n I am a user. \\n I am learning Python.")` },
          { type: 'text', text: `Save the file, close it, and run it with python intro.py. The output prints on multiple lines. If you have a long passage and would rather not scatter \\n everywhere, you can use a triple-quote block instead:` },
          { type: 'code', code: `print("""
Hi programmer!
I am a user.
I am learning Python.
""")` },
          { type: 'text', text: `Run this program and observe the output.` },

          { type: 'heading', text: `Comments` },
          { type: 'text', text: `Comments let you leave messages or instructions alongside your code for yourself or other developers. The interpreter simply ignores commented lines and does not execute them. We use the hash symbol, #, to mark a comment. Open intro.py again and add a comment:` },
          { type: 'code', code: `# this is a comment
print("""
Hi programmer!
I am a user.
I am learning Python.
""")` },
          { type: 'text', text: `Save, close, and run it. You will notice no change in the output, because the commented line is not executed.` },

          { type: 'heading', text: `Multi-line comments` },
          { type: 'text', text: `For a comment that spans several lines, use a triple-quote block:` },
          { type: 'code', code: `# this is a comment
"""
this is a multi-line comment.
Printing a few details.
Having fun.
"""
print("""
Hi programmer!
I am a user.
I am learning Python.
""")` },
          { type: 'text', text: `Note: if you use a triple-quote block inside the print function, the text is printed to the console. If you use it anywhere outside print, the text is treated as a comment.` },

          { type: 'heading', text: `Variables and data types` },
          { type: 'text', text: `A variable is a container for a value. We use variables to store values and reuse them in our program. For example:` },
          { type: 'code', code: `x = 2
y = 5
z = x + y
print(z)` },
          { type: 'text', text: `Here x, y, and z are variables that hold values. The kind of value a variable holds is called its data type. In Python we have five basic data types: int, float, string, bool, and None.` },
          { type: 'list', items: [
            `int represents whole numbers such as 1, 2, 432, -1, and -3.`,
            `float represents decimal values such as 4.22, 3.543, and -2.5.`,
            `string represents text enclosed in single or double quotes, such as 'book' or "sbi@co.in".`,
            `bool can hold only True or False. For example, x = 3 > 5 makes x a boolean with the value False.`,
            `None is a special value we will study later.`,
          ] },

          { type: 'heading', text: `Checking the type of a value` },
          { type: 'text', text: `To check the data type of any value or variable, use the type() function. Open the interpreter and try:` },
          { type: 'code', code: `>>> type(4)
<class 'int'>
>>> type(4.33)
<class 'float'>
>>> type("Some text")
<class 'str'>
>>> type(True)
<class 'bool'>` },
          { type: 'text', text: `Note: when writing True or False, make sure the first letter is capitalised. Otherwise you will get an error.` },

          { type: 'heading', text: `Rules for naming variables` },
          { type: 'list', items: [
            `A variable name may contain only letters, digits, and the underscore. It must not contain special characters such as @, #, or $, and it must not start with a digit.`,
            `A variable name must not contain spaces.`,
            `A variable name must not be a keyword. Keywords are words reserved by Python, such as if, for, and def.`,
            `Variable names are case sensitive: uppercase and lowercase letters are different.`,
          ] },
          { type: 'text', text: `For example, the following two lines create two different variables:` },
          { type: 'code', code: `A = 3
a = 2` },
        ],
      },
      {
        id: 'operators-and-input',
        title: 'Operators and User Input',
        blocks: [
          { type: 'text', text: `Operators are symbols we use to perform an operation such as addition or subtraction. For example, when we add two numbers, the operation is addition and the operator is the + symbol.` },

          { type: 'heading', text: `Types of operators` },
          { type: 'text', text: `There are mainly four types of operators:` },
          { type: 'list', items: [
            `Arithmetic operators: +, -, *, /, %`,
            `Assignment operators: +=, -=, *=, /=, %=`,
            `Comparison operators: ==, !=, <, >, <=, >=`,
            `Logical operators: and, or, not`,
          ] },
          { type: 'text', text: `Let us look at each of them. Open your Python interpreter and try them one by one.` },

          { type: 'heading', text: `Arithmetic operators` },
          { type: 'text', text: `The + symbol adds two values, - subtracts, * multiplies, and / divides the first value by the second. The % symbol (called modulo) returns the remainder after division. For example, 10 % 3 returns 1, because the quotient is 3 and the remainder is 1.` },
          { type: 'code', code: `>>> 10 + 2
12
>>> 10 - 3
7
>>> 10 * 4
40
>>> 50 / 10
5.0
>>> 50 % 6
2` },
          { type: 'text', text: `Note: in Python, division with / always returns a float. If you want an integer result, use // for floor division.` },
          { type: 'code', code: `>>> 15 / 5
3.0
>>> 15 // 5
3` },

          { type: 'heading', text: `Assignment operators` },
          { type: 'text', text: `Assignment operators perform a calculation on an existing variable and update its value. Read the examples below carefully.` },
          { type: 'code', code: `>>> x = 10      # 10 is assigned to x. Now x = 10
>>> x += 2      # expands to x = x + 2, so x becomes 12
>>> x
12
>>> x -= 3      # expands to x = x - 3, so x becomes 9
>>> x
9
>>> x *= 4      # expands to x = x * 4, so x becomes 36
>>> x
36
>>> x /= 6      # expands to x = x / 6, so x becomes 6.0
>>> x
6.0` },

          { type: 'heading', text: `Comparison operators` },
          { type: 'text', text: `Comparison operators compare two values and return True or False depending on the condition. The operators are ==, != (not equal), <, >, <=, and >=.` },
          { type: 'code', code: `>>> 4 == 4      # 4 is equal to 4, so True
True
>>> 4 != 4      # 4 is equal to 4 but we asked "not equal", so False
False
>>> 3 > 5       # 3 is not greater than 5, so False
False
>>> 3 < 5       # 3 is less than 5, so True
True
>>> 5 <= 10     # 5 is less than or equal to 10, so True
True
>>> 5 <= 5      # 5 equals 5, so True
True
>>> 5 >= 10     # 5 is not greater than or equal to 10, so False
False` },

          { type: 'heading', text: `Logical operators` },
          { type: 'text', text: `Logical operators take boolean values as input and produce a boolean result. There are three: and, or, and not.` },
          { type: 'list', items: [
            `and returns True if all inputs are True; otherwise it returns False.`,
            `or returns True if at least one input is True; it returns False only if none are True.`,
            `not flips the input: it returns True when the input is False, and False when the input is True.`,
          ] },
          { type: 'code', code: `>>> True and True
True
>>> True and False
False
>>> False and False
False
>>> True or True
True
>>> True or False
True
>>> False or False
False
>>> not True
False
>>> not False
True` },

          { type: 'heading', text: `Taking input from the user` },
          { type: 'text', text: `To take input from the user, we use the input() function. Whatever the user types always comes in as a string. So if we want an integer or a float, we must convert the input from a string to the type we need. This conversion is called type conversion. Below is a program that takes two integers from the user and prints their sum:` },
          { type: 'code', code: `# add.py
x = input("Please enter the first number: ")
x = int(x)
y = input("Please enter the second number: ")
y = int(y)
total = x + y
print("The sum is:", total)` },
          { type: 'text', text: `Create a file called add.py and test this code. Now write the same program for subtraction, multiplication, and division. You can create separate files such as subtract.py, multiply.py, and divide.py.` },
        ],
      },
      {
        id: 'strings',
        title: 'Type Conversion and Strings',
        blocks: [
          { type: 'heading', text: `Type conversion` },
          { type: 'text', text: `Whenever a variable's data type is converted into another data type, we call the process type conversion. For example:` },
          { type: 'code', code: `>>> x = 5           # x is an int
>>> x = float(x)    # now x is a float
>>> x
5.0` },
          { type: 'text', text: `Conversion can happen in two ways: automatically by Python, or explicitly by you. When Python does it automatically, we call it implicit type conversion. When you do it yourself, it is explicit type conversion.` },
          { type: 'code', code: `# implicit conversion
>>> x = 10          # int
>>> y = 20          # int
>>> z = y / x       # z is a float, decided automatically by Python
>>> z
2.0

# explicit conversion
>>> x = 4.5         # float
>>> x = int(x)      # now x is an int, so x = 4
>>> x
4` },

          { type: 'heading', text: `Strings` },
          { type: 'text', text: `A string is a sequence of characters enclosed in single or double quotes. For example:` },
          { type: 'code', code: `>>> s = "apple"
>>> p = 'peanuts'` },

          { type: 'heading', text: `String concatenation` },
          { type: 'text', text: `Concatenation means combining two or more strings using the plus (+) operator. For example:` },
          { type: 'code', code: `>>> first = "greetings"
>>> last = "programmer"
>>> result = first + last
>>> result
'greetingsprogrammer'` },
          { type: 'text', text: `We forgot to include a space in between. Let us fix that:` },
          { type: 'code', code: `>>> first = "greetings"
>>> last = "programmer"
>>> space = " "
>>> result = first + space + last
>>> result
'greetings programmer'` },

          { type: 'heading', text: `Length of a string` },
          { type: 'text', text: `To find the length of a string, use the len() function.` },
          { type: 'code', code: `>>> s = "SomeString"
>>> len(s)
10` },

          { type: 'heading', text: `String indexing` },
          { type: 'text', text: `Every character in a string is numbered from 0 to length minus 1, from left to right. We call these numbers indexes. For example, in the string "mango" the characters are numbered m is 0, a is 1, n is 2, g is 3, and o is 4. In general, if a string has length n, its indexes run from 0 to n minus 1. You can read a character by its index using square brackets:` },
          { type: 'code', code: `>>> s = "banana"
>>> s[0]        # the character at index 0
'b'
>>> s[3]        # the character at index 3
'a'
>>> s[6]        # index 6 does not exist, so this raises an error` },
          { type: 'text', text: `Note: indexes can also be counted from right to left. In that case they run as -1, -2, -3, and so on, up to minus the length.` },
          { type: 'code', code: `>>> s = "good boy"
>>> s[-1]       # the last character
'y'
>>> s[-2]
'o'` },

          { type: 'heading', text: `String slicing` },
          { type: 'text', text: `Slicing means taking a piece out of a string. Suppose we want to extract "hello" from "hello world". We take the starting index (h is 0) and go one past the last character we want (o is at index 4, so we pass 5):` },
          { type: 'code', code: `>>> s = "hello world"
>>> s[0:5]
'hello'
>>> s[6:9]      # 'wor' from the middle
'wor'
>>> s[6:11]     # 'world'; the 'd' is at index 10, so we pass 11
'world'` },
          { type: 'text', text: `When slicing to the end of a string, you can leave out the last index. Likewise, when slicing from the beginning, you can leave out the first index.` },
          { type: 'code', code: `>>> s[6:]       # from index 6 to the end
'world'
>>> s[:5]       # from the start up to index 4
'hello'` },

          { type: 'heading', text: `String methods` },
          { type: 'text', text: `Here are a few important string methods.` },
          { type: 'text', text: `startswith() checks whether a string starts with a given substring and returns True or False:` },
          { type: 'code', code: `>>> phone = "9812321321"
>>> phone.startswith("98")
True` },
          { type: 'text', text: `endswith() checks whether a string ends with a given substring:` },
          { type: 'code', code: `>>> email = "programmers@gmail.com"
>>> email.endswith(".com")
True` },
          { type: 'text', text: `count() counts how many times a substring appears in the string:` },
          { type: 'code', code: `>>> phone = "98213214549"
>>> phone.count("9")
2
>>> phone.count("821")
1
>>> phone.count("0")
0` },
          { type: 'text', text: `find() returns the index of the first occurrence of a character or substring, or -1 if it is not present:` },
          { type: 'code', code: `>>> phone = "987654321"
>>> phone.find("7")
2
>>> phone.find("0")
-1` },
          { type: 'text', text: `replace() takes two strings and replaces the first with the second inside the original string:` },
          { type: 'code', code: `>>> story = "Once upon a time there was a turtle"
>>> story = story.replace("turtle", "crow")
>>> story
'Once upon a time there was a crow'` },
          { type: 'text', text: `To reverse a string, use slicing with a step of -1:` },
          { type: 'code', code: `>>> name = "sita"
>>> name = name[::-1]
>>> name
'atis'` },

          { type: 'heading', text: `Putting it together` },
          { type: 'text', text: `This program takes the user's name and a date and fills them into a report-card template:` },
          { type: 'code', code: `username = input("Please enter your name: ")
userdate = input("Please enter the date: ")
letter = """
Dear name
We are happy to tell you that you have successfully passed the course.
date
"""
letter = letter.replace("name", username)
letter = letter.replace("date", userdate)
print("Please collect your report card:", letter)` },
        ],
      },
      {
        id: 'lists-and-tuples',
        title: 'Lists and Tuples',
        blocks: [
          { type: 'heading', text: `Lists` },
          { type: 'text', text: `A list is a container of one or more items. A single list can hold items of more than one data type. To create a list, use square brackets and separate the values with commas.` },
          { type: 'code', code: `>>> l = [1, 4.5, "apple", True]
>>> l
[1, 4.5, 'apple', True]
>>> type(l)
<class 'list'>` },

          { type: 'heading', text: `Indexing in a list` },
          { type: 'text', text: `As with strings, list indexes run from 0 to length minus 1. You can read a value by its index, and find the length with len().` },
          { type: 'code', code: `>>> l = ["Subhash", "Ajit", "Durgesh", "Divakar", "Tanu", "Laxman"]
>>> l[0]
'Subhash'
>>> l[2]
'Durgesh'` },

          { type: 'heading', text: `Updating values in a list` },
          { type: 'text', text: `To update a value, point to it by its index and assign a new value.` },
          { type: 'code', code: `>>> l[1] = "Saurabh"
>>> l
['Subhash', 'Saurabh', 'Durgesh', 'Divakar', 'Tanu', 'Laxman']` },

          { type: 'heading', text: `Slicing a list` },
          { type: 'text', text: `Slicing uses the start index up to one past the end index, just as with strings.` },
          { type: 'code', code: `>>> l = ["Subhash", "Ajit", "Durgesh", "Divakar", "Tanu", "Laxman"]
>>> l[1:3]
['Ajit', 'Durgesh']
>>> l[3:]       # from index 3 to the end
['Divakar', 'Tanu', 'Laxman']
>>> l[:3]       # from the start up to index 2
['Subhash', 'Ajit', 'Durgesh']` },

          { type: 'heading', text: `List methods` },
          { type: 'text', text: `Here are the most frequently used list methods. You can explore the rest in the Python documentation.` },
          { type: 'text', text: `append() adds a single item to the end of the list:` },
          { type: 'code', code: `>>> l = [1, 3, 5]
>>> l.append(7)
>>> l
[1, 3, 5, 7]` },
          { type: 'text', text: `insert() adds a value at a specific index. It takes the index and the value. Existing items shift one place to the right; nothing is overwritten.` },
          { type: 'code', code: `>>> l.insert(1, "sky")
>>> l
[1, 'sky', 3, 5, 7]` },
          { type: 'text', text: `pop() removes the item at a given index, or the last item if no index is given:` },
          { type: 'code', code: `>>> l = [1, "sky", 3, 5, 7]
>>> l.pop()
7
>>> l.pop(1)
'sky'
>>> l
[1, 3, 5]` },
          { type: 'text', text: `remove() deletes a given value from the list, and raises an error if the value is not present:` },
          { type: 'code', code: `>>> l = [1, 3, 5, 7]
>>> l.remove(3)
>>> l
[1, 5, 7]` },
          { type: 'text', text: `count() returns how many times a value appears:` },
          { type: 'code', code: `>>> l = [1, 3, 5, 1, 1]
>>> l.count(1)
3` },
          { type: 'text', text: `sum(), max(), and min() add up, find the largest, and find the smallest value. sum() does not work if any item is a string.` },
          { type: 'code', code: `>>> l = [12, 8, 10, 8, 6, 6]
>>> sum(l)
50
>>> max(l)
12
>>> min(l)
6` },
          { type: 'text', text: `sort() arranges the items in ascending order, reverse() reverses them, and clear() empties the list:` },
          { type: 'code', code: `>>> l = [12, 8, 10, 8, 6, 6]
>>> l.sort()
>>> l
[6, 6, 8, 8, 10, 12]
>>> l.reverse()
>>> l
[12, 10, 8, 8, 6, 6]
>>> l.clear()
>>> l
[]` },

          { type: 'heading', text: `Tuples` },
          { type: 'text', text: `A tuple is like a list, but you create it with parentheses instead of square brackets.` },
          { type: 'code', code: `>>> t = (2, 4, 6, 8, 10)
>>> t
(2, 4, 6, 8, 10)
>>> type(t)
<class 'tuple'>` },
          { type: 'text', text: `A tuple is immutable, which means you cannot update, delete, or modify its existing values. Trying to change an item raises an error. You can, however, delete the whole tuple with the del keyword.` },
          { type: 'code', code: `>>> t[0] = "sky"    # not allowed; this raises an error
>>> del t           # deletes the entire tuple` },
        ],
      },
      {
        id: 'dictionaries-and-sets',
        title: 'Dictionaries and Sets',
        blocks: [
          { type: 'heading', text: `Dictionaries` },
          { type: 'text', text: `Think of a dictionary as a collection of word-and-meaning pairs. In Python, a dictionary is a collection of key-value pairs. To create one, use braces, separate each key from its value with a colon, and separate items with commas.` },
          { type: 'code', code: `>>> myDict = {1: "book", 2: "instrument", 3: "bottle"}
>>> myDict
{1: 'book', 2: 'instrument', 3: 'bottle'}
>>> type(myDict)
<class 'dict'>` },
          { type: 'text', text: `You access a value through its key:` },
          { type: 'code', code: `>>> myDict[1]
'book'
>>> myDict[3]
'bottle'` },
          { type: 'text', text: `A key can be a string, integer, float, or boolean. A value can be any of those, or a list, a tuple, or even another dictionary.` },

          { type: 'heading', text: `Properties of a dictionary` },
          { type: 'list', items: [
            `Each key is unique. No two keys can have the same name.`,
            `Dictionaries are unordered, so you cannot access values by position. You must use the key.`,
          ] },

          { type: 'heading', text: `Dictionary methods` },
          { type: 'text', text: `Let us create a dictionary that maps a first letter to a full name.` },
          { type: 'code', code: `>>> names = {"d": "Divakar", "a": "Ajit", "t": "Tanu"}` },
          { type: 'text', text: `keys(), values(), and items() return the keys, the values, and the key-value pairs:` },
          { type: 'code', code: `>>> names.keys()
dict_keys(['d', 'a', 't'])
>>> names.values()
dict_values(['Divakar', 'Ajit', 'Tanu'])
>>> names.items()
dict_items([('d', 'Divakar'), ('a', 'Ajit'), ('t', 'Tanu')])` },
          { type: 'text', text: `update() adds more items to the dictionary. If you update an existing key, its value is overwritten, because keys must stay unique.` },
          { type: 'code', code: `>>> names.update({"s": "Subhash", "l": "Laxman"})
>>> names.update({"d": "Durgesh"})   # 'd' already exists, so its value changes
>>> names
{'d': 'Durgesh', 'a': 'Ajit', 't': 'Tanu', 's': 'Subhash', 'l': 'Laxman'}` },
          { type: 'text', text: `Remember that keys are case sensitive, so "d" and "D" are two different keys.` },
          { type: 'text', text: `get() takes a key and returns its value, or None if the key does not exist. It is safer than square brackets, which raise an error for a missing key.` },
          { type: 'code', code: `>>> names.get("s")
'Subhash'
>>> print(names.get("f"))
None` },
          { type: 'text', text: `pop() takes a key and removes that key-value pair:` },
          { type: 'code', code: `>>> names.pop("a")
'Ajit'` },

          { type: 'heading', text: `Sets` },
          { type: 'text', text: `A set is a collection of unique values, so no value can appear more than once. You create a set with braces, but each item is just a value, not a key-value pair.` },
          { type: 'code', code: `>>> s = {1, 2, 4, 6, 9}
>>> s
{1, 2, 4, 6, 9}` },
          { type: 'text', text: `add() adds a value, but has no effect if the value is already present. remove() deletes a value. pop() takes no argument and removes an item.` },
          { type: 'code', code: `>>> s = {2, 4, 6, 8}
>>> s.add(9)
>>> s.add(2)        # already present, so nothing changes
>>> s
{2, 4, 6, 8, 9}
>>> s.remove(8)
>>> s
{2, 4, 6, 9}` },

          { type: 'heading', text: `Practice` },
          { type: 'text', text: `Write a program that takes eight integers from the user and prints only the unique values. A set makes this easy, because it automatically drops duplicates.` },
          { type: 'code', code: `x1 = int(input("Enter the first number: "))
x2 = int(input("Enter the second number: "))
x3 = int(input("Enter the third number: "))
x4 = int(input("Enter the fourth number: "))
x5 = int(input("Enter the fifth number: "))
x6 = int(input("Enter the sixth number: "))
x7 = int(input("Enter the seventh number: "))
x8 = int(input("Enter the eighth number: "))
mySet = {x1, x2, x3, x4, x5, x6, x7, x8}
print("Unique values are:", mySet)` },
        ],
      },
      {
        id: 'conditional-statements',
        title: 'Conditional Statements',
        blocks: [
          { type: 'text', text: `Conditional statements let a program take different actions depending on a condition. We use the if, else, and elif statements to apply conditions. In plain English, the idea looks like this:` },
          { type: 'code', code: `if the switch is on:
    turn on the light
else:
    turn it off` },

          { type: 'heading', text: `The if and else blocks` },
          { type: 'text', text: `We define an if or else block using indentation. The lines that follow the colon and are indented belong to that block. When the if condition is True, the if block runs; otherwise the else block runs. The general syntax is:` },
          { type: 'code', code: `if condition:
    action to perform      # this line is indented
else:
    action to perform      # this line is indented` },

          { type: 'heading', text: `Problem 1: voting eligibility` },
          { type: 'text', text: `Take the user's age and check whether they are eligible to vote. A person must be at least 18 years old.` },
          { type: 'code', code: `age = int(input("Please enter your age: "))
if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote.")` },

          { type: 'heading', text: `Problem 2: pass or fail` },
          { type: 'text', text: `Take the user's marks and check whether they pass. A learner passes with at least 33 marks.` },
          { type: 'code', code: `marks = int(input("Please enter your marks: "))
if marks >= 33:
    print("Well done, you passed.")
else:
    print("Sorry, you failed.")` },

          { type: 'heading', text: `Multiple conditions with elif` },
          { type: 'text', text: `When there are several possible conditions, we use elif (short for "else if"). The syntax reads like a staircase: as soon as one condition is found to be True, the rest are skipped.` },
          { type: 'text', text: `Suppose we want to assign grades: 90 or above is A, 70 or above is B, 50 or above is C, 33 or above is D, and below 33 is a fail.` },
          { type: 'code', code: `print("Welcome to the marks-to-grade program")
marks = int(input("Please enter your marks: "))
if marks >= 90:
    print("A")
elif marks >= 70:
    print("B")
elif marks >= 50:
    print("C")
elif marks >= 33:
    print("D")
else:
    print("Invalid input. Please enter marks between 0 and 100.")` },

          { type: 'heading', text: `Problem 4: even or odd` },
          { type: 'text', text: `Take an integer and check whether it is even or odd by looking at the remainder after dividing by 2.` },
          { type: 'code', code: `num = int(input("Please enter an integer: "))
if num % 2 == 0:
    print("Even number")
else:
    print("Odd number")` },

          { type: 'heading', text: `Combining conditions with logical operators` },
          { type: 'text', text: `We can join two or more conditions with the logical operators and and or. This program checks whether a number lies between 100 and 1000:` },
          { type: 'code', code: `num = int(input("Enter an integer: "))
if num >= 100 and num <= 1000:
    print("The number lies in the range.")
else:
    print("The number does not lie in the range.")` },
          { type: 'text', text: `And this one checks whether a number is a multiple of 5 or a multiple of 7:` },
          { type: 'code', code: `num = int(input("Enter an integer: "))
if num % 5 == 0 or num % 7 == 0:
    print("Multiple of 5 or 7")
else:
    print("Not a multiple of 5 or 7")` },

          { type: 'heading', text: `The in operator` },
          { type: 'text', text: `The in operator checks whether a value exists in a list, or whether a substring exists in a string. This spam detector checks whether a message contains any known spam phrase:` },
          { type: 'code', code: `spam_phrases = ["you have won", "click here", "subscribe now", "make money", "bumper gifts"]
message = input("Please enter a text message: ")
is_spam = False
for phrase in spam_phrases:
    if phrase in message:
        is_spam = True
if is_spam:
    print("Spam message!")
else:
    print("Not a spam message.")` },
        ],
      },
      {
        id: 'loops',
        title: 'Loops',
        blocks: [
          { type: 'text', text: `Loops come into the picture when we need to run a block of statements many times. They reduce repetition and let us do complex tasks in a few lines. For example, if we want to print "Namaste" a hundred times, we certainly do not write print a hundred times! Python has two main kinds of loops: the while loop and the for loop.` },

          { type: 'heading', text: `The while loop` },
          { type: 'text', text: `A while loop runs a block of statements repeatedly until its condition becomes False. A while loop usually has four parts: initialising a counter variable, the condition, the body, and updating the counter so it eventually reaches the stopping point.` },
          { type: 'code', code: `i = 0
while i <= 10:
    print(i)
    i = i + 1` },
          { type: 'text', text: `Here i starts at 0. On every pass, its value is printed and then increased by 1. The loop stops when i becomes 11 and the condition i <= 10 becomes False. This prints the numbers 0 through 10.` },
          { type: 'text', text: `Problem: using a while loop, print the numbers from 50 down to 1.` },
          { type: 'code', code: `i = 50
while i >= 1:
    print(i)
    i = i - 1` },
          { type: 'text', text: `Problem: using a while loop, print the contents of a list.` },
          { type: 'code', code: `cars = ["Tesla", "Sedan", "Convertible", "BMW"]
i = 0
while i < len(cars):
    print(cars[i])
    i = i + 1` },

          { type: 'heading', text: `The for loop` },
          { type: 'text', text: `The for loop is simpler to use. It iterates through all the items of a list, tuple, set, or dictionary, and it can also walk through the characters of a string.` },
          { type: 'code', code: `cars = ["Tesla", "Sedan", "Convertible", "BMW"]
for car in cars:
    print(car)` },

          { type: 'heading', text: `The for loop with range()` },
          { type: 'text', text: `The range() function creates a sequence of numbers to iterate over. range(5) produces the numbers 0 through 4.` },
          { type: 'code', code: `for i in range(5):
    print(i)` },
          { type: 'text', text: `With two arguments, range() takes a start and a stop value. range(2, 10) produces 2 through 9.` },
          { type: 'code', code: `for i in range(2, 10):
    print(i)` },
          { type: 'text', text: `With three arguments, the third is the step size. range(5, 20, 3) produces 5, 8, 11, 14, 17.` },
          { type: 'code', code: `for i in range(10, 101, 15):
    print(i)      # prints 10, 25, 40, 55, 70, 85, 100` },

          { type: 'heading', text: `break and continue` },
          { type: 'text', text: `A loop normally runs until its condition becomes False, but sometimes we need to stop early. The break statement ends the loop immediately and leaves the block.` },
          { type: 'code', code: `for i in range(10):
    print(i)
    if i == 4:
        break
# prints 0, 1, 2, 3, 4 and then stops` },
          { type: 'text', text: `The continue statement skips just the current pass and jumps to the next one, without ending the loop.` },
          { type: 'code', code: `for i in range(5):
    if i == 3:
        continue
    print(i)
# prints 0, 1, 2, 4` },

          { type: 'heading', text: `Worked problems` },
          { type: 'text', text: `Print the multiplication table of a number the user enters:` },
          { type: 'code', code: `num = int(input("Please enter a number: "))
for i in range(1, 11):
    print(num, "*", i, "=", num * i)` },
          { type: 'text', text: `Take an integer and check whether it is a prime number. A prime number is only divisible by 1 and itself, so if we find any divisor between 2 and num minus 1, it is not prime.` },
          { type: 'code', code: `num = int(input("Enter a number: "))
is_prime = True
for i in range(2, num):
    if num % i == 0:
        is_prime = False
        break
if num > 1 and is_prime:
    print("Prime number!")
else:
    print("Not a prime number.")` },
          { type: 'text', text: `Find the sum of the first n natural numbers:` },
          { type: 'code', code: `n = int(input("Please enter an integer: "))
total = 0
for i in range(1, n + 1):
    total = total + i
print("The sum is:", total)` },
          { type: 'text', text: `Find the factorial of n. The factorial of n is n times (n minus 1) times (n minus 2), all the way down to 1. For example, the factorial of 4 is 4 * 3 * 2 * 1, which is 24.` },
          { type: 'code', code: `n = int(input("Please enter an integer: "))
product = 1
for i in range(n, 0, -1):
    product = product * i
print("The factorial is:", product)` },
        ],
      },
      {
        id: 'functions',
        title: 'Functions',
        blocks: [
          { type: 'heading', text: `What is a function?` },
          { type: 'text', text: `A function is a group of related statements that performs a specific task. When code grows long, it becomes hard to keep track of what each part does. Functions help by keeping code organised and reusable.` },
          { type: 'list', items: [
            `They make code modular and clean.`,
            `They reduce repetition.`,
            `A function is reusable and can be called as many times as you want.`,
            `They keep a program manageable even as it grows larger.`,
          ] },

          { type: 'heading', text: `Two kinds of functions` },
          { type: 'list', items: [
            `User-defined functions, which you write to perform a specific task.`,
            `Built-in functions, which Python provides ready to use, such as sum(), min(), max(), range(), and print().`,
          ] },

          { type: 'heading', text: `Creating a function` },
          { type: 'text', text: `To create a function, use the def keyword followed by a name and parentheses. Then write the body, and optionally a return statement. As soon as return runs, the function ends and hands a value back to the caller.` },
          { type: 'code', code: `def function_name(parameters):
    body                   # perform the task
    return value           # return the result` },
          { type: 'text', text: `To call a function, write its name followed by parentheses and any arguments.` },

          { type: 'heading', text: `Example 1: greeting` },
          { type: 'text', text: `This function takes a name and greets the person:` },
          { type: 'code', code: `def greet(name):
    print("Hi", name)

greet("Laxman")
# output: Hi Laxman` },

          { type: 'heading', text: `Example 2: percentage` },
          { type: 'text', text: `This function takes the marks of five subjects and returns the percentage:` },
          { type: 'code', code: `def percentage(s1, s2, s3, s4, s5):
    total = s1 + s2 + s3 + s4 + s5
    return total * 100 / 500

p = percentage(92, 81, 44, 50, 12)
print(p)
# output: 55.8` },
          { type: 'text', text: `Note: if a function does not return anything, its returned value is None.` },

          { type: 'heading', text: `Example 3: reducing repetition` },
          { type: 'text', text: `This function prints all the vowels in a string. Writing it once and calling it three times avoids repeating the same loop.` },
          { type: 'code', code: `def print_vowels(s):
    vowels = "aeiouAEIOU"
    for ch in s:
        if ch in vowels:
            print(ch)

s1 = input("Enter the first string: ")
print("Vowels of the first string:")
print_vowels(s1)

s2 = input("Enter the second string: ")
print("Vowels of the second string:")
print_vowels(s2)

print("Vowels of the two strings joined:")
print_vowels(s1 + s2)` },

          { type: 'heading', text: `Example 4: an interactive calculator` },
          { type: 'text', text: `This example shows a modular program where separate functions perform their tasks on demand. It keeps running until the user chooses to quit.` },
          { type: 'code', code: `def add(x, y):
    print(x + y)

def subtract(x, y):
    print(x - y)

def multiply(x, y):
    print(x * y)

def divide(x, y):
    print(x / y)

def take_input():
    x = int(input("Enter the first number: "))
    y = int(input("Enter the second number: "))
    return [x, y]

print("Welcome to our interactive calculator")
while True:
    numbers = take_input()
    choice = input("Press a to add, s to subtract, m to multiply, d to divide, or any other key to quit: ")
    if choice == "a" or choice == "A":
        add(numbers[0], numbers[1])
    elif choice == "s" or choice == "S":
        subtract(numbers[0], numbers[1])
    elif choice == "m" or choice == "M":
        multiply(numbers[0], numbers[1])
    elif choice == "d" or choice == "D":
        divide(numbers[0], numbers[1])
    else:
        print("Thanks for using our calculator. Quitting the program.")
        break` },

          { type: 'heading', text: `Local and global variables` },
          { type: 'text', text: `A local variable is defined inside a function and can be used only within that function. A global variable is defined outside every function and can be used anywhere in the program. Trying to read a local variable outside its function raises a "name is not defined" error.` },
          { type: 'code', code: `def func():
    a = 10          # local variable
    print(a)

func()              # prints 10
print(a)            # error: name 'a' is not defined` },
          { type: 'text', text: `A global variable, by contrast, is accessible everywhere, including inside functions:` },
          { type: 'code', code: `a = 10              # global variable

def func():
    print("Inside the function:", a)

func()
print("Outside the function:", a)
# output:
# Inside the function: 10
# Outside the function: 10` },
        ],
      },
    ],
  },
  {
    id: 'html',
    title: 'HTML: Structure of the Web',
    description:
      'Build the skeleton of every web page. This hands-on course starts from your very first tag and works up to complete, semantic documents: headings and text, lists, links and images, tables, forms, and the semantic landmarks that make pages accessible. Written for screen-reader users, with every example ready to type and run.',
    level: 'Beginner',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction to HTML',
        blocks: [
          { type: 'text', text: `HTML stands for HyperText Markup Language. It is the basic building block of the web, the skeleton of every web page. "HyperText" means pages linked to one another, and a "markup language" uses tags and annotations to describe how content should be displayed. Your browser reads the HTML and renders the page you see.` },
          { type: 'text', text: `HTML, CSS, and JavaScript together make a full web application: HTML provides the structure, CSS the styling, and JavaScript the behaviour. In this course we focus on the structure.` },

          { type: 'heading', text: `Tags and elements` },
          { type: 'text', text: `A tag is an annotation that tells the browser how to render a piece of content. Most elements have four parts: an opening tag, some content, a closing tag, and, taken together, the whole thing is called an element.` },
          { type: 'code', code: `<p>This is my first step to web development</p>` },
          { type: 'text', text: `Here <p> is the opening tag, </p> is the closing tag, the text between them is the content, and the entire line is a paragraph element. Some tags are self-closing (also called empty tags) and have no content, such as <br>, <img>, and <input>.` },

          { type: 'heading', text: `Your first page` },
          { type: 'text', text: `Create a file named index.html, type the following, and open it in a browser:` },
          { type: 'code', code: `<!DOCTYPE html>
<html>
  <body>
    <h1>Namaste Duniya</h1>
    <p>This is my first step to web development</p>
    <!-- This is a comment and the browser ignores it -->
  </body>
</html>` },
          { type: 'text', text: `Anything written between <!-- and --> is a comment. The browser ignores comments, so you can use them to leave notes for yourself.` },

          { type: 'heading', text: `The structure of a document` },
          { type: 'text', text: `The <!DOCTYPE html> line tells the browser that this is an HTML5 page. The <html> element contains just two children: the <head> and the <body>. The <body> holds the visible content of the page, while the <head> holds metadata, which is data about the page itself.` },
          { type: 'text', text: `Metadata includes things like the character set, the page description and SEO keywords, the author's name, the page title, and the viewport settings. The viewport is the visible area of the page; a typical setting is content="width=device-width, initial-scale=1.0". A more complete starting template looks like this:` },
          { type: 'code', code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page Title</title>
  </head>
  <body>
    <p>This is a paragraph</p>
  </body>
</html>` },

          { type: 'heading', text: `Block and inline elements` },
          { type: 'text', text: `There are two broad kinds of elements. Block elements are used to lay out chunks of content and each starts on a new line: headings, paragraphs, lists, articles, and sections. Inline elements sit within a line of content and are used to highlight part of it: emphasis, strong, and links are inline.` },

          { type: 'heading', text: `Attributes` },
          { type: 'text', text: `Attributes are properties of elements, written inside the opening tag. Almost every HTML tag can take attributes. For example, the lang attribute on the <html> element states the page language, which screen readers use to choose the right pronunciation:` },
          { type: 'code', code: `<html lang="en">` },
        ],
      },
      {
        id: 'text-and-lists',
        title: 'Text, Formatting, and Lists',
        blocks: [
          { type: 'heading', text: `Headings and paragraphs` },
          { type: 'text', text: `HTML gives you six levels of heading, from <h1> (the most important) down to <h6> (the least). A page should have exactly one <h1>, and heading levels should not skip, so that the document has a clear outline. Paragraphs go in <p> elements.` },
          { type: 'code', code: `<h1>heading 1</h1>
<h2>heading 2</h2>
<h3>heading 3</h3>
<p>This is a paragraph</p>` },

          { type: 'heading', text: `Line breaks, rules, and preformatted text` },
          { type: 'text', text: `<br> inserts a line break, and <hr> draws a horizontal rule between sections. Both are self-closing. The <pre> element preserves the exact spacing and line breaks you type, which is handy for laying out text or code.` },
          { type: 'code', code: `<p>Good guy <br> is Amit</p>
<hr>
<pre>
    Yaar tera
    super star
</pre>` },

          { type: 'heading', text: `Formatting text` },
          { type: 'text', text: `Several inline elements change how text looks or reads. Use them to mark meaning, not just appearance.` },
          { type: 'code', code: `<b>this is bold</b>
<i>this is italic</i>
<small>this is small</small>
<del>this is deleted</del>
<mark>this is marked (highlighted)</mark>
<u>this is underlined</u>` },
          { type: 'text', text: `The <sup> element raises text (a superscript) and <sub> lowers it (a subscript). They are perfect for mathematics and chemistry:` },
          { type: 'code', code: `(a+b)<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> + 2ab
H<sub>2</sub>O` },

          { type: 'heading', text: `Unordered and ordered lists` },
          { type: 'text', text: `An unordered list, <ul>, shows a bulleted set of items where order does not matter. An ordered list, <ol>, numbers its items. Each item goes in an <li> element.` },
          { type: 'code', code: `<h2>Food items</h2>
<ul>
  <li>Aloo</li>
  <li>Tamatar</li>
  <li>Namak</li>
</ul>

<h2>Favourite cuisines</h2>
<ol>
  <li>Tofu</li>
  <li>Tako</li>
  <li>Pizza</li>
</ol>` },

          { type: 'heading', text: `Description lists` },
          { type: 'text', text: `A description list, <dl>, pairs terms with their descriptions. Each term goes in a <dt> element and its description in a <dd> element. It is ideal for glossaries and name-value pairs.` },
          { type: 'code', code: `<dl>
  <dt>Tofu</dt>
  <dd>A soft food made from soya beans.</dd>
  <dt>HTML</dt>
  <dd>The markup language used to structure web pages.</dd>
</dl>` },
        ],
      },
      {
        id: 'links-images-media',
        title: 'Links, Images, and Media',
        blocks: [
          { type: 'heading', text: `The anchor element` },
          { type: 'text', text: `Links are what make the web a web. You create one with the anchor element, <a>, and its href attribute holds the destination. The text between the tags is what the reader activates.` },
          { type: 'code', code: `<a href="https://codingaccess.web.app">Know more</a>` },
          { type: 'text', text: `By default a link opens in the same tab. Add target="_blank" to open it in a new tab. When you do, it is good practice to tell the reader, because a new tab can be disorienting for screen-reader users.` },
          { type: 'code', code: `<a href="https://codingaccess.web.app" target="_blank">
  Know more <em>(opens in a new tab)</em>
</a>` },

          { type: 'heading', text: `Different kinds of links` },
          { type: 'text', text: `The href attribute can do more than point to another page. It can start a phone call, open the user's email app, or jump to a section within the same page.` },
          { type: 'code', code: `<a href="tel:+918979515501">Call me</a>
<a href="mailto:saurabhprasad20@gmail.com">Mail us</a>
<a href="#resources">Jump to resources</a>` },
          { type: 'text', text: `A link that starts with a # points to an element on the same page that has a matching id attribute, for example a section with id="resources".` },

          { type: 'heading', text: `Images` },
          { type: 'text', text: `The <img> element embeds an image. It is self-closing. The src attribute gives the file or URL, and the alt attribute gives a text description. The alt text is essential: screen readers read it aloud, and it appears if the image fails to load. Give every meaningful image an accurate alt description.` },
          { type: 'code', code: `<img src="paneer.jpg" alt="A bowl of shahi paneer" width="120" height="120">` },

          { type: 'heading', text: `Figures and captions` },
          { type: 'text', text: `When an image needs a caption, wrap it in a <figure> element and add a <figcaption>. This ties the caption to the image in a way assistive technology understands.` },
          { type: 'code', code: `<figure>
  <img src="linus.jpeg" alt="A photograph of Linus Torvalds">
  <figcaption>Linus Torvalds, creator of Linux.</figcaption>
</figure>` },

          { type: 'heading', text: `Favicons` },
          { type: 'text', text: `A favicon is the small icon shown in the browser tab. You add it in the <head> with a <link> element.` },
          { type: 'code', code: `<link rel="icon" type="image/x-icon" href="favicon.svg">` },
        ],
      },
      {
        id: 'tables-and-forms',
        title: 'Tables and Forms',
        blocks: [
          { type: 'heading', text: `Building a table` },
          { type: 'text', text: `A table presents data in rows and columns. The <table> element wraps everything. Inside it, <tr> defines a row, <th> a header cell, and <td> a data cell. Group the parts with <thead>, <tbody>, and <tfoot>, and describe the whole table with a <caption>. This structure lets screen-reader users understand which header a cell belongs to.` },
          { type: 'code', code: `<table>
  <caption>Grade Sheet</caption>
  <thead>
    <tr>
      <th scope="col">Subject</th>
      <th scope="col">Marks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>English</td>
      <td>91</td>
    </tr>
    <tr>
      <td>Maths</td>
      <td>98</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Grade</td>
      <td>A</td>
    </tr>
  </tfoot>
</table>` },
          { type: 'text', text: `The scope attribute on a header cell tells assistive technology whether the header applies to a column (scope="col") or a row (scope="row"). To make a cell stretch across several columns or rows, use the colspan and rowspan attributes.` },

          { type: 'heading', text: `Forms` },
          { type: 'text', text: `A form collects input from the user. The <form> element wraps the controls, and its action attribute says where the data should be sent when the form is submitted.` },
          { type: 'code', code: `<form action="https://codingaccess.web.app">
  <label for="username">User Name</label>
  <input type="text" id="username">

  <label for="password">Password</label>
  <input type="password" id="password">

  <input type="submit" value="Submit">
</form>` },

          { type: 'heading', text: `Labels make forms accessible` },
          { type: 'text', text: `Every input should have a <label>. The label's for attribute must match the input's id. This link means that when a screen-reader user reaches the field, the label is announced, and clicking the label moves focus to the field. A form without labels is very hard to use without sight.` },

          { type: 'heading', text: `Common input types` },
          { type: 'list', items: [
            `type="text" for a single line of text.`,
            `type="password" to hide the characters as they are typed.`,
            `type="email" for an email address, with basic validation.`,
            `type="number" for numeric input.`,
            `type="checkbox" and type="radio" for choices.`,
            `type="submit" for the button that sends the form.`,
          ] },
        ],
      },
      {
        id: 'semantic-html',
        title: 'Semantic HTML',
        blocks: [
          { type: 'text', text: `Semantic HTML means choosing elements that describe the meaning of their content, not just its appearance. A <div> is a generic box with no meaning, but a <nav> clearly marks navigation. Semantic elements give the page a structure that browsers, search engines, and especially screen readers can understand.` },

          { type: 'heading', text: `The landmark elements` },
          { type: 'list', items: [
            `<header> holds the top of the page or a section: a title, logo, or intro.`,
            `<nav> wraps a set of navigation links.`,
            `<main> contains the primary content, and there should be only one per page.`,
            `<section> groups related content, usually with its own heading.`,
            `<article> is a self-contained piece, like a blog post or news item.`,
            `<aside> holds related but secondary content, like a sidebar.`,
            `<footer> holds the bottom of the page or section: copyright, secondary links.`,
          ] },
          { type: 'text', text: `Screen-reader users can jump directly between these landmarks, so using them well makes a page far quicker to navigate.` },

          { type: 'heading', text: `A semantic page in practice` },
          { type: 'text', text: `Here is the shape of a well-structured page. Notice how the meaning is clear even before you add any styling.` },
          { type: 'code', code: `<body>
  <header>
    <h1>Linus Torvalds</h1>
    <p>The creator of Linux</p>
  </header>

  <main>
    <nav>
      <a href="#bio">Biography</a>
      <a href="#achievements">Achievements</a>
    </nav>

    <section>
      <h2 id="bio">Biography</h2>
      <p>Linus Torvalds created the Linux kernel and the Git version-control system.</p>
    </section>

    <aside>
      <figure>
        <img src="linus.jpeg" alt="A photograph of Linus Torvalds">
        <figcaption>Linus Torvalds</figcaption>
      </figure>
    </aside>
  </main>

  <footer>
    <p>&copy; Coding Access</p>
  </footer>
</body>` },

          { type: 'heading', text: `Quotes and citations` },
          { type: 'text', text: `For a longer quotation, use <blockquote>, and name the source with <cite>. This is more meaningful than simply indenting text with CSS.` },
          { type: 'code', code: `<blockquote cite="https://example.com">
  <p>One of the most influential people in the world.</p>
  <cite>Time Magazine</cite>
</blockquote>` },

          { type: 'heading', text: `Why it matters` },
          { type: 'text', text: `A page built from <div> elements alone may look fine, but it is a wall of undifferentiated boxes to a screen reader. The same page built with header, nav, main, section, and footer becomes a set of clear landmarks with a logical heading outline. Semantic HTML is the foundation of an accessible web.` },
        ],
      },
    ],
  },
  {
    id: 'css',
    title: 'CSS: Styling the Web',
    description:
      'Turn plain HTML into a designed page. This course covers CSS from the ground up: how to attach styles, how selectors and specificity decide what wins, the box model, colors and units, gradients and shadows, positioning and transforms, and the two great layout systems, Flexbox and Grid, finishing with responsive design. Every concept comes with a small example you can try.',
    level: 'Beginner to Intermediate',
    chapters: [
      {
        id: 'fundamentals',
        title: 'CSS Fundamentals and Selectors',
        blocks: [
          { type: 'text', text: `CSS stands for Cascading Style Sheets. Where HTML gives a page its structure, CSS gives it appearance: colours, spacing, fonts, and layout. A CSS rule has two parts, a selector that picks which elements to style, and a block of declarations that say how to style them.` },
          { type: 'code', code: `h1 {
  color: blue;
  font-size: 2rem;
}` },
          { type: 'text', text: `Here h1 is the selector, and each line inside the braces is a declaration made of a property (color) and a value (blue).` },

          { type: 'heading', text: `Three ways to apply CSS` },
          { type: 'text', text: `There are three ways to attach CSS to a page. Inline CSS uses the style attribute directly on an element. Internal CSS goes in a <style> block inside the <head>. External CSS lives in a separate .css file that you link to. External CSS is the best choice for real projects, because one stylesheet can style your whole site.` },
          { type: 'code', code: `<!-- inline -->
<h3 style="color: brown;">Inline styling</h3>

<!-- internal: inside <head> -->
<style>
  h3 { color: violet; }
</style>

<!-- external: link a separate file -->
<link rel="stylesheet" href="styles.css">` },

          { type: 'heading', text: `The three basic selectors` },
          { type: 'text', text: `The element selector targets every element of a given type. The class selector, written with a dot, targets every element that has that class. The id selector, written with a hash, targets the single element with that id. Remember: a class can be shared by many elements, but an id must be unique on the page.` },
          { type: 'code', code: `/* element selector: every paragraph */
p { color: yellow; }

/* class selector: any element with class="largered" */
.largered { color: red; font-size: large; }

/* id selector: the one element with id="tb" */
#tb { color: green; }` },

          { type: 'heading', text: `Pseudo-classes` },
          { type: 'text', text: `A pseudo-class is a keyword that styles an element in a particular state. The :hover pseudo-class, for example, applies while the pointer is over an element.` },
          { type: 'code', code: `button:hover {
  color: black;
  font-size: large;
}
a:hover {
  color: yellowgreen;
}` },

          { type: 'heading', text: `Grouping and the universal selector` },
          { type: 'text', text: `To give several selectors the same styles, list them separated by commas. The universal selector, *, matches every element and is often used to reset default spacing.` },
          { type: 'code', code: `/* grouping */
table, tr, td {
  border: 1px solid black;
  border-collapse: collapse;
}

/* universal selector */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}` },
        ],
      },
      {
        id: 'specificity-colors-units',
        title: 'Specificity, Colors, and Units',
        blocks: [
          { type: 'heading', text: `Specificity: which rule wins?` },
          { type: 'text', text: `When several rules target the same element, which one wins? CSS decides using specificity. From lowest to highest priority: the element selector is weakest, then the class selector, then the id selector, and an inline style attribute is strongest of all. If two rules have equal specificity, the one written later wins.` },
          { type: 'code', code: `h1 { color: red; }        /* weakest */
.classh1 { color: green; }
#idh1 { color: yellow; }

<!-- inline style beats all of the above -->
<h1 style="color: blue;" id="idh1" class="classh1">Hello</h1>` },
          { type: 'text', text: `In that example the heading ends up blue, because the inline style has the highest specificity.` },

          { type: 'heading', text: `Colors` },
          { type: 'text', text: `There are three common ways to write a colour in CSS. Hexadecimal uses a hash followed by six hex digits (0 to f). The rgb() function takes three values from 0 to 255 for red, green, and blue. And CSS has about 140 predefined colour names.` },
          { type: 'code', code: `/* hexadecimal */
color: #ffffff;   /* white */
color: #ff0000;   /* red */

/* rgb function */
color: rgb(255, 255, 255);   /* white */
color: rgb(0, 0, 255);       /* blue */

/* predefined names */
color: red;
color: rebeccapurple;` },
          { type: 'text', text: `The rgba() function adds a fourth value, the alpha, for transparency. 0 is fully transparent and 1 is fully opaque.` },
          { type: 'code', code: `background-color: rgba(186, 170, 28, 0.25);` },

          { type: 'heading', text: `Units` },
          { type: 'text', text: `The px unit is an absolute unit; one pixel is 1/96 of an inch, and it behaves the same on every device. Percentages are relative to the parent element. The em unit is relative to the font size of the parent, while rem is relative to the font size of the root (the <html> element).` },
          { type: 'code', code: `.parent { font-size: 18px; }
.child  { font-size: 2em; }   /* 2 x 18px = 36px */
.any    { font-size: 3rem; }  /* 3 x the root font size */` },
          { type: 'text', text: `The viewport units are relative to the visible area of the screen: vw is 1/100 of the viewport width and vh is 1/100 of the viewport height. They are useful for elements that should scale with the window.` },
          { type: 'code', code: `#hero {
  width: 50vw;    /* half the viewport width */
  height: 50vh;   /* half the viewport height */
}` },
        ],
      },
      {
        id: 'box-model',
        title: 'The Box Model',
        blocks: [
          { type: 'text', text: `Every element on a page is a rectangular box. The box model describes the layers of that box, from the inside out: the content, then the padding, then the border, then the margin.` },
          { type: 'list', items: [
            `content is the text, image, or other content itself, sized by width and height.`,
            `padding is the space between the content and the border.`,
            `border is the line that encloses the padding and content.`,
            `margin is the space outside the border, separating this box from its neighbours.`,
          ] },

          { type: 'heading', text: `Setting the layers` },
          { type: 'text', text: `By default, padding and margin apply to all four sides, but you can set each side on its own with properties like margin-top and padding-left.` },
          { type: 'code', code: `.box {
  width: 200px;
  height: 100px;
  border: 5px solid black;
  padding: 25px;
  margin: 10px;
}` },

          { type: 'heading', text: `box-sizing` },
          { type: 'text', text: `By default, width and height set the size of the content only, so padding and border are added on top, making the box larger than you might expect. Setting box-sizing: border-box makes width and height include the padding and border, which is far easier to reason about. Many developers apply it to every element.` },
          { type: 'code', code: `* {
  box-sizing: border-box;
}` },

          { type: 'heading', text: `Overflow` },
          { type: 'text', text: `When content is too big for its box, the overflow property decides what happens. visible (the default) lets it spill out, hidden clips it, and scroll adds scrollbars so the content can be scrolled within the box.` },
          { type: 'code', code: `.panel {
  max-width: 200px;
  max-height: 200px;
  overflow: scroll;
}` },

          { type: 'heading', text: `Minimum and maximum sizes` },
          { type: 'text', text: `You can constrain a box with min-width, max-width, min-height, and max-height. These are especially useful for responsive layouts, where you want an element to grow or shrink but only within limits.` },
          { type: 'code', code: `.card {
  min-width: 20px;
  max-width: 200px;
}` },
        ],
      },
      {
        id: 'gradients-and-shadows',
        title: 'Backgrounds, Gradients, and Shadows',
        blocks: [
          { type: 'heading', text: `Linear gradients` },
          { type: 'text', text: `A gradient is a smooth blend between colours, set as a background image. A linear gradient runs in a straight line. By default it goes from top to bottom, but you can give it a direction or an angle. Zero degrees points up, 90 degrees points right, 180 degrees points down.` },
          { type: 'code', code: `background-image: linear-gradient(red, blue);            /* top to bottom */
background-image: linear-gradient(to right, red, blue);
background-image: linear-gradient(180deg, red, yellow);

/* a rainbow */
background-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);` },

          { type: 'heading', text: `Radial and conic gradients` },
          { type: 'text', text: `A radial gradient spreads out from a centre point; by default its shape is an ellipse, but you can make it a circle. A conic gradient sweeps around a centre point like the face of a clock.` },
          { type: 'code', code: `background-image: radial-gradient(red, yellow, green);
background-image: radial-gradient(circle, red, yellow, green);
background-image: conic-gradient(red, yellow, green);` },

          { type: 'heading', text: `Text shadows` },
          { type: 'text', text: `The text-shadow property adds a shadow behind text. Its values are the horizontal offset, the vertical offset, the blur radius, and the colour. You can add several shadows separated by commas.` },
          { type: 'code', code: `h1 {
  text-shadow: 2px 2px 5px red;
}` },

          { type: 'heading', text: `Box shadows and cards` },
          { type: 'text', text: `The box-shadow property does the same for the whole box, and it is the classic way to make an element look like a raised card. The values are horizontal offset, vertical offset, blur, and colour.` },
          { type: 'code', code: `.card {
  width: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
}` },
        ],
      },
      {
        id: 'positioning-and-transforms',
        title: 'Positioning and Transforms',
        blocks: [
          { type: 'text', text: `The position property controls how an element is placed on the page. There are five values, and each changes the meaning of the offset properties top, right, bottom, and left.` },

          { type: 'heading', text: `The five position values` },
          { type: 'list', items: [
            `static is the default: elements sit in normal document order and ignore top/left.`,
            `relative places an element relative to where it would normally sit, so you can nudge it with top/left.`,
            `absolute places an element relative to its nearest positioned ancestor (one that is not static); if there is none, it is placed relative to the page.`,
            `fixed places an element relative to the browser window, so it stays put even as you scroll.`,
            `sticky toggles between relative and fixed depending on the scroll position, which is how sticky headers work.`,
          ] },
          { type: 'code', code: `#relative {
  position: relative;
  left: 20px;      /* nudged 20px to the right */
}

#fixed {
  position: fixed;
  top: 0;          /* stays at the top while scrolling */
}` },

          { type: 'heading', text: `2D transforms` },
          { type: 'text', text: `The transform property lets you move, rotate, scale, or skew an element without affecting the layout around it. These are 2D transforms.` },
          { type: 'code', code: `.rotated { transform: rotate(30deg); }
.bigger  { transform: scale(1.5); }
.moved   { transform: translate(20px, 10px); }` },

          { type: 'heading', text: `3D transforms` },
          { type: 'text', text: `Adding a perspective and using the Z axis creates a sense of depth. perspective() sets how strong the 3D effect is, and functions like rotateX, rotateY, and translateZ move the element in three dimensions.` },
          { type: 'code', code: `.tilted {
  transform: perspective(400px) rotateX(45deg) rotateY(45deg);
}` },
        ],
      },
      {
        id: 'flexbox',
        title: 'Flexbox',
        blocks: [
          { type: 'text', text: `Flexbox is a layout system for arranging items in a single direction, a row or a column. You turn an element into a flex container by setting display: flex; its direct children then become flex items that you can align and distribute with ease.` },
          { type: 'code', code: `.flex-container {
  display: flex;
}` },

          { type: 'heading', text: `Aligning items` },
          { type: 'text', text: `justify-content distributes items along the main axis (the direction the container flows). align-items aligns them on the cross axis (across the flow). Common values include center, space-between, space-around, flex-start, and flex-end.` },
          { type: 'code', code: `.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}` },

          { type: 'heading', text: `Order` },
          { type: 'text', text: `A flex item need not appear in the same order as it is written in the HTML. The order property controls its position; the default is 0, and lower numbers come first.` },
          { type: 'code', code: `<div class="flex-container">
  <div style="order: 3;">1</div>
  <div style="order: 1;">2</div>
  <div style="order: 2;">3</div>
</div>` },

          { type: 'heading', text: `Grow, shrink, and basis` },
          { type: 'text', text: `flex-grow decides how much an item grows to fill spare space relative to its siblings. flex-shrink decides how much it shrinks when space is tight; a value of 0 stops it shrinking at all. flex-basis sets an item's initial size before growing or shrinking.` },
          { type: 'code', code: `/* the third item grows 8 times as much as the others */
<div style="flex-grow: 8">3</div>

/* the third item refuses to shrink */
<div style="flex-shrink: 0">3</div>

/* the third item starts at 200px */
<div style="flex-basis: 200px">3</div>` },
          { type: 'text', text: `The flex property is a shorthand for all three, in the order grow, shrink, basis. This item will not grow, will not shrink, and starts at 200 pixels:` },
          { type: 'code', code: `<div style="flex: 0 0 200px">3</div>` },

          { type: 'heading', text: `Aligning a single item` },
          { type: 'text', text: `The align-self property aligns one chosen item on the cross axis, overriding the container's align-items for that item.` },
          { type: 'code', code: `<div class="flex-container">
  <div>1</div>
  <div style="align-self: flex-start">2</div>
  <div style="align-self: flex-end">3</div>
</div>` },
        ],
      },
      {
        id: 'grid',
        title: 'CSS Grid',
        blocks: [
          { type: 'text', text: `Where Flexbox lays out items in one direction, CSS Grid lays them out in two: rows and columns at the same time. You create a grid by setting display: grid on a container and then describing its rows and columns.` },
          { type: 'code', code: `.container {
  display: grid;
  grid-template-rows: 30px 1fr 30px;
  grid-template-columns: 100px 400px;
  grid-gap: 4px;
}` },
          { type: 'text', text: `The fr unit means a fraction of the leftover space, so 1fr fills whatever room remains after the fixed tracks are placed. grid-gap sets the spacing between the cells.` },

          { type: 'heading', text: `Grid template areas` },
          { type: 'text', text: `A powerful feature of Grid is naming regions of the layout and drawing them as a picture. You name each area with grid-area, then arrange them visually with grid-template-areas.` },
          { type: 'code', code: `.container {
  display: grid;
  grid-template-rows: 30px 1fr 30px;
  grid-template-columns: 100px 400px;
  grid-template-areas:
    "hd hd"
    "side main"
    "ft ft";
}

#header  { grid-area: hd; }
#sidebar { grid-area: side; }
#content { grid-area: main; }
#footer  { grid-area: ft; }` },
          { type: 'text', text: `Reading the template, the header spans both columns of the top row, the sidebar and main content share the middle row, and the footer spans the bottom. The layout is described in a way you can almost see by reading it aloud.` },
        ],
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design with Media Queries',
        blocks: [
          { type: 'text', text: `A responsive page adapts to the size of the screen it is viewed on, from a wide monitor to a narrow phone. The main tool for this is the media query, which applies a block of CSS only when a condition about the screen is true.` },

          { type: 'heading', text: `Writing a media query` },
          { type: 'text', text: `A media query starts with @media, followed by a condition such as a maximum width. The rules inside apply only when the condition holds. Here, when the screen is 350 pixels wide or less, a two-column grid collapses into a single column.` },
          { type: 'code', code: `@media (max-width: 350px) {
  .container {
    grid-template-rows: 30px 1fr 1fr 30px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "hd"
      "side"
      "main"
      "ft";
  }
}` },

          { type: 'heading', text: `Breakpoints` },
          { type: 'text', text: `The screen widths at which your layout changes are called breakpoints. You choose them where the design starts to look cramped, not for any specific device. A common approach is to design for small screens first and then add media queries that enhance the layout as more space becomes available.` },

          { type: 'heading', text: `The viewport meta tag` },
          { type: 'text', text: `Responsive CSS only works if the page tells the browser to use the device's real width. That is the job of the viewport meta tag, which belongs in the <head> of every page.` },
          { type: 'code', code: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` },
          { type: 'text', text: `With that tag in place and a few well-chosen media queries, a single page can serve every screen size well.` },
        ],
      },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript: Bringing Pages to Life',
    description:
      'Make your pages interactive. This course takes you from the language basics through objects and memory, functions and scope, the DOM and events, performance and the event loop, and modern asynchronous JavaScript with promises, async/await, and fetch. It ends by building two small apps. Written from real class notes, with runnable examples throughout.',
    level: 'Beginner to Intermediate',
    chapters: [
      {
        id: 'basics',
        title: 'Variables, Data Types, and Operators',
        blocks: [
          { type: 'text', text: `JavaScript is the language that makes web pages interactive. Before we touch a page, let us learn the language itself. Two everyday tools for seeing output are console.log, which prints to the browser console, and alert, which shows a pop-up.` },
          { type: 'code', code: `console.log("Namaste Duniya");
alert("Well done!");` },

          { type: 'heading', text: `Variables: let, var, and const` },
          { type: 'text', text: `A variable stores a value. You can declare one with let, var, or const. let is block scoped and can be reassigned. const is also block scoped but cannot be reassigned. var is the old way; it is function or globally scoped and is best avoided in new code. JavaScript is dynamically typed, which means it works out a value's type at runtime, so you do not declare the type yourself.` },
          { type: 'code', code: `let a = 5;         // block scoped, can change
const num = 5;     // block scoped, cannot be reassigned
var b = 10;        // function or global scoped (older style)` },

          { type: 'heading', text: `Primitive data types` },
          { type: 'text', text: `The primitive types hold a single simple value. The common ones are string for text, number for any number, and boolean for true or false.` },
          { type: 'code', code: `let name = "KK";       // string
let age = 25;          // number
let isActive = true;   // boolean` },

          { type: 'heading', text: `Objects and arrays` },
          { type: 'text', text: `An object groups related values as key-value pairs. You read a property with dot notation or bracket notation. An array is an ordered list of values, and arrays are mutable, meaning you can change them.` },
          { type: 'code', code: `let person = { name: "KK", age: 25 };
console.log(person.age);       // dot notation
console.log(person["name"]);   // bracket notation

let colors = ["red", "blue", "green"];` },

          { type: 'heading', text: `Conditional statements` },
          { type: 'text', text: `An if-else if-else chain runs different code depending on a condition. When you are comparing one value against many fixed options, a switch statement can be clearer.` },
          { type: 'code', code: `let hour = 10;
if (hour < 12) {
  console.log("Good morning");
} else if (hour < 17) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}

let role = "admin";
switch (role) {
  case "admin":
    console.log("Admin user");
    break;
  case "guest":
    console.log("Guest user");
    break;
  default:
    console.log("Unknown user");
}` },

          { type: 'heading', text: `Loops` },
          { type: 'text', text: `Loops repeat work. The for loop is the workhorse. while runs as long as a condition holds, and do-while runs its body at least once before checking. To walk through data, use for...in to iterate over an object's keys and for...of to iterate over the values of an array.` },
          { type: 'code', code: `for (let i = 0; i < 5; i++) {
  console.log("Hello", i);
}

let person1 = { name: "KK", age: 25 };
for (let key in person1) {
  console.log(key, person1[key]);
}

let colors1 = ["red", "blue", "green"];
for (let color of colors1) {
  console.log(color);
}` },
        ],
      },
      {
        id: 'objects-and-memory',
        title: 'Objects, Cloning, and Memory',
        blocks: [
          { type: 'heading', text: `Objects with methods` },
          { type: 'text', text: `An object can hold functions as well as data. A function stored on an object is called a method. Inside a method, the keyword this refers to the object itself.` },
          { type: 'code', code: `const rectangle = {
  width: 10,
  height: 20,
  area: function () {
    return this.width * this.height;
  }
};
console.log(rectangle.area());   // 200` },

          { type: 'heading', text: `Factory and constructor functions` },
          { type: 'text', text: `When you need to create many similar objects, a factory function builds and returns a new object each time it is called. A constructor function does the same job with the new keyword, and by convention its name is written in PascalCase.` },
          { type: 'code', code: `// factory function
function createRectangle(width, height) {
  return {
    width,
    height,
    area: function () { return this.width * this.height; }
  };
}
let r1 = createRectangle(10, 20);

// constructor function
function Product(name, price, description) {
  this.name = name;
  this.price = price;
  this.displayInfo = function () {
    console.log(\`\${this.name}: $\${this.price}\`);
  };
}
const p1 = new Product("Laptop", 1200, "A fast laptop");` },

          { type: 'heading', text: `Primitives versus references` },
          { type: 'text', text: `This is one of the most important ideas in JavaScript. Primitive values are copied by value: each variable gets its own copy. Objects are copied by reference: two variables can point to the same object in memory, so a change through one is seen through the other.` },
          { type: 'code', code: `// primitives are copied by value
let x = 10;
let y = x;
x++;
console.log(x, y);   // 11 10

// objects are copied by reference
let a = { value: 10 };
let b = a;
a.value++;
console.log(a.value, b.value);   // 11 11  (same object!)` },

          { type: 'heading', text: `Call by value versus call by reference` },
          { type: 'text', text: `The same rule applies when you pass values into functions. A primitive passed to a function is a copy, so changes inside do not affect the original. An object passed to a function is the same object, so changes inside are visible outside.` },
          { type: 'code', code: `let number = 10;
function increase(n) { n++; }
increase(number);
console.log(number);   // 10, unchanged

let obj = { value: 10 };
function bump(o) { o.value++; }
bump(obj);
console.log(obj.value);   // 11, changed` },

          { type: 'heading', text: `Cloning objects` },
          { type: 'text', text: `Because objects are shared by reference, copying them needs care. A shallow copy duplicates the top-level properties but still shares any nested objects. A deep copy duplicates everything, so nothing is shared.` },
          { type: 'code', code: `const circle = { radius: 1 };

// shallow copy
const c1 = Object.assign({}, circle);

// deep copy (note: this technique does not copy functions)
const c2 = JSON.parse(JSON.stringify(circle));` },
          { type: 'text', text: `JavaScript also manages memory for you. Its garbage collector automatically frees the memory of any object that no longer has references pointing to it, so you rarely think about freeing memory yourself.` },
        ],
      },
      {
        id: 'strings-arrays-callbacks',
        title: 'Math, Strings, Arrays, and Callbacks',
        blocks: [
          { type: 'heading', text: `The Math object` },
          { type: 'text', text: `The built-in Math object holds handy numeric functions and constants.` },
          { type: 'code', code: `Math.round(4.7);    // 5
Math.ceil(4.1);     // 5
Math.floor(4.9);    // 4
Math.abs(-5);       // 5
Math.pow(2, 3);     // 8
Math.sqrt(16);      // 4
Math.max(1, 2, 3);  // 3
Math.random();      // a random number between 0 and 1` },

          { type: 'heading', text: `Strings and template literals` },
          { type: 'text', text: `Strings come with many useful methods, such as length, toUpperCase, slice, split, replace, and trim. To build a string from variables, template literals are the cleanest choice: write the text in backticks and drop values in with the dollar-brace syntax.` },
          { type: 'code', code: `let name = "John";
let age = 25;
let sentence = \`My name is \${name} and I am \${age} years old.\`;
console.log(sentence);` },

          { type: 'heading', text: `Arrow functions` },
          { type: 'text', text: `Arrow functions are a shorter way to write functions. When the body is a single expression, it is returned automatically.` },
          { type: 'code', code: `// regular function
function add(a, b) { return a + b; }

// arrow function
let addArrow = (a, b) => a + b;` },

          { type: 'heading', text: `map, filter, and find` },
          { type: 'text', text: `These array methods take a function and apply it to every element. map transforms each element into a new one, filter keeps only the elements that pass a test, and find returns the first element that passes.` },
          { type: 'code', code: `let numbers = [1, 2, 3, 4, 5];

let doubled = numbers.map(n => n * 2);        // [2, 4, 6, 8, 10]
let evens   = numbers.filter(n => n % 2 === 0); // [2, 4]
let three   = numbers.find(n => n === 3);       // 3` },
          { type: 'text', text: `Because each of these returns a value, you can chain them together. Here we keep the adults and then reshape each into a smaller object:` },
          { type: 'code', code: `const people = [
  { name: "Alice", age: 17 },
  { name: "Bob", age: 22 },
  { name: "Eve", age: 18 }
];
const adults = people
  .filter(person => person.age >= 18)
  .map(person => ({ name: person.name }));` },

          { type: 'heading', text: `Callback functions` },
          { type: 'text', text: `A callback is a function passed as an argument to another function, to be run later, often after some operation finishes. Callbacks are everywhere in JavaScript, especially in timers, event handling, and network requests.` },
          { type: 'code', code: `function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John Doe", age: 25 };
    callback(data);
  }, 2000);
}
function displayData(user) {
  console.log(\`Name: \${user.name}, Age: \${user.age}\`);
}
fetchData(displayData);   // runs displayData after 2 seconds` },
        ],
      },
      {
        id: 'advanced-functions',
        title: 'Advanced Functions, Scope, and Reduce',
        blocks: [
          { type: 'heading', text: `Declarations, expressions, and hoisting` },
          { type: 'text', text: `A function declaration is hoisted, meaning JavaScript moves it to the top of its scope, so you can call it before it appears in the code. A function stored in a variable (a function expression) is not hoisted in the same way, so it must be defined before you use it.` },
          { type: 'code', code: `run();   // works, because declarations are hoisted
function run() { console.log("running"); }

var run2 = function () { console.log("running2"); };
run2();  // must come after the assignment` },

          { type: 'heading', text: `Flexible arguments` },
          { type: 'text', text: `JavaScript functions are relaxed about arguments. Extra arguments are ignored, and missing ones become undefined. Inside a regular function, the arguments object holds everything that was passed. To collect any number of arguments into a real array, use the rest operator, three dots before the last parameter.` },
          { type: 'code', code: `function sumAll(...args) {
  let total = 0;
  for (let value of args) {
    total += value;
  }
  return total;
}
sumAll(2, 3, 4, 5);   // 14` },

          { type: 'heading', text: `Default parameters` },
          { type: 'text', text: `A parameter can have a default value, used when no argument is supplied. Once a parameter has a default, the parameters to its right should have defaults too.` },
          { type: 'code', code: `function simpleInterest(p, r, t = 1) {
  return p * r * t;
}
simpleInterest(100, 0.2, 2);   // 40
simpleInterest(100, 0.2);      // 20` },

          { type: 'heading', text: `Getters and setters` },
          { type: 'text', text: `A getter lets you read a computed property as if it were a normal one, and a setter lets you assign to it. They are handy for values derived from other properties.` },
          { type: 'code', code: `let person = {
  fName: "john",
  lName: "doe",
  get fullName() {
    return \`\${this.fName} \${this.lName}\`;
  },
  set fullName(value) {
    let parts = value.split(" ");
    this.fName = parts[0];
    this.lName = parts[1];
  }
};
console.log(person.fullName);   // "john doe"
person.fullName = "jane doe";   // sets fName and lName` },

          { type: 'heading', text: `Error handling` },
          { type: 'text', text: `Wrap risky code in a try block. If it throws an error, the catch block runs with the error. A finally block, if present, always runs afterwards, whether or not there was an error.` },
          { type: 'code', code: `try {
  throw new Error("something went wrong");
} catch (e) {
  console.log(e.message);
} finally {
  console.log("this always runs");
}` },

          { type: 'heading', text: `Scope` },
          { type: 'text', text: `Scope is where a variable can be seen. A variable declared outside every function has global scope. One declared inside a function has local scope. let and const are also block scoped, meaning they exist only inside the nearest pair of braces, while var is only function scoped.` },
          { type: 'code', code: `let x = 10;
if (true) {
  let x = 20;
  console.log(x);   // 20 (a different, block-scoped x)
}
console.log(x);     // 10` },

          { type: 'heading', text: `Reduce` },
          { type: 'text', text: `The reduce method boils an array down to a single value. It takes a function with an accumulator and the current value, plus an optional starting value for the accumulator.` },
          { type: 'code', code: `let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum);   // 10` },
        ],
      },
      {
        id: 'the-dom',
        title: 'The DOM',
        blocks: [
          { type: 'text', text: `When a browser loads your HTML, it turns the whole page into a tree of JavaScript objects called the DOM, the Document Object Model. Through the DOM, your code can read and change any part of the page. The global window object represents the browser window, and the Browser Object Model (BOM) gives access to things like location and history.` },

          { type: 'heading', text: `Selecting elements` },
          { type: 'text', text: `To change an element you first have to select it. The modern, flexible way is querySelector, which takes any CSS selector and returns the first match, and querySelectorAll, which returns all matches. The older getElementById, getElementsByClassName, and getElementsByTagName still work too.` },
          { type: 'code', code: `const heading = document.getElementById("heading");
const firstItem = document.querySelector(".container p");
const allItems = document.querySelectorAll(".container p");

allItems.forEach(item => {
  item.style.color = "green";
});` },

          { type: 'heading', text: `Changing content` },
          { type: 'text', text: `There are two main ways to change what an element contains. innerHTML sets HTML, so any tags in the string are parsed and rendered. textContent sets plain text, so tags are shown literally as characters. Prefer textContent when you are inserting text a user typed, because it avoids accidentally running HTML.` },
          { type: 'code', code: `element.innerHTML = "<p>Updated <em>italic</em> content</p>";
element.textContent = "Just plain text";` },

          { type: 'heading', text: `Creating and removing elements` },
          { type: 'text', text: `You can build new elements with createElement, set them up, and then attach them to the page with appendChild. To remove an element, call removeChild on its parent.` },
          { type: 'code', code: `const p = document.createElement("p");
p.textContent = "This is a new paragraph!";
document.body.appendChild(p);

// remove it again
p.parentElement.removeChild(p);` },

          { type: 'heading', text: `Styles, attributes, and classes` },
          { type: 'text', text: `You can change an element's inline style, its attributes, and its classes from JavaScript. For classes, the classList object is the cleanest tool: it can add, remove, toggle, and check for a class.` },
          { type: 'code', code: `heading.style.backgroundColor = "lightblue";
heading.setAttribute("id", "new-id");

heading.classList.add("active");
heading.classList.remove("old");
heading.classList.toggle("active");
heading.classList.contains("active");   // true or false` },
        ],
      },
      {
        id: 'events',
        title: 'Events',
        blocks: [
          { type: 'text', text: `Events are how a page responds to the user: clicks, key presses, form submissions, and more. You react to an event by attaching a listener with addEventListener, which takes the event name and the function to run.` },
          { type: 'code', code: `const heading = document.querySelector("h1");
function handleClick() {
  heading.style.color = "red";
  alert("The heading was clicked");
}
heading.addEventListener("click", handleClick);` },
          { type: 'text', text: `To stop listening, call removeEventListener with exactly the same element, event name, and function reference, which is one reason to give handler functions a name rather than writing them inline.` },

          { type: 'heading', text: `The event object` },
          { type: 'text', text: `Your handler receives an event object describing what happened. Its most useful member is event.target, the element that triggered the event. The method event.preventDefault() stops the browser's default behaviour, for example following a link.` },
          { type: 'code', code: `const link = document.querySelector("a");
link.addEventListener("click", function (event) {
  event.preventDefault();   // do not follow the link
  alert("The link was clicked");
});` },

          { type: 'heading', text: `Event phases` },
          { type: 'text', text: `An event travels in three phases. First it captures, moving down the DOM from the top to the target. Then it is at the target. Then it bubbles, moving back up to the top. By default listeners run during bubbling; pass true as a third argument to addEventListener to listen during capturing instead.` },

          { type: 'heading', text: `Event delegation` },
          { type: 'text', text: `Rather than adding a listener to each of many child elements, you can add a single listener to their shared parent and use event.target to work out which child was involved. This is called event delegation, and it is both faster and simpler, and it even works for elements added later.` },
          { type: 'code', code: `list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    alert(event.target.textContent);
  }
});` },
        ],
      },
      {
        id: 'performance-event-loop',
        title: 'Performance and the Event Loop',
        blocks: [
          { type: 'heading', text: `Reflow and repaint` },
          { type: 'text', text: `Changing the page has a cost. A reflow happens when the browser recalculates layout, for example when you add or remove elements. A repaint happens when it redraws pixels. Adding a hundred elements one at a time can trigger a hundred reflows, which is slow.` },

          { type: 'heading', text: `Document fragments` },
          { type: 'text', text: `A document fragment is a lightweight, in-memory container. You can build many elements inside it without triggering any reflow, then attach the whole fragment to the page in a single step, causing just one reflow.` },
          { type: 'code', code: `let fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  let p = document.createElement("p");
  p.textContent = "Paragraph " + i;
  fragment.appendChild(p);
}
document.body.appendChild(fragment);   // a single reflow` },

          { type: 'heading', text: `Single-threaded JavaScript and the call stack` },
          { type: 'text', text: `JavaScript runs on a single thread, executing one line at a time. It keeps track of function calls on the call stack: when a function is called it is pushed on, and when it returns it is popped off.` },

          { type: 'heading', text: `The event loop` },
          { type: 'text', text: `So how does JavaScript handle things that take time, like a timer, without freezing? It hands the task to the browser. When the task is ready, its callback waits in a queue. The event loop constantly checks: whenever the call stack is empty, it moves the next callback from the queue onto the stack to run. This is why the output below is not in source order.` },
          { type: 'code', code: `console.log("Hi");
setTimeout(function () {
  console.log("Inside setTimeout");
}, 3000);
console.log("Bye bye");

// Output: "Hi", "Bye bye", then after 3 seconds "Inside setTimeout"` },
        ],
      },
      {
        id: 'async-javascript',
        title: 'Asynchronous JavaScript',
        blocks: [
          { type: 'text', text: `Synchronous code runs line by line. Asynchronous code does not; it starts something that finishes later, such as a network request. Managing that "later" cleanly is what this chapter is about. An API is simply an interface that lets two programs, such as a browser and a server, talk to each other.` },

          { type: 'heading', text: `Promises` },
          { type: 'text', text: `A promise represents a task that will either succeed or fail. You handle success with .then() and failure with .catch(). A promise is created with a function that receives resolve and reject.` },
          { type: 'code', code: `const myPromise = new Promise((resolve, reject) => {
  let connected = true;
  if (connected) {
    resolve("connection established");
  } else {
    reject("connection failed");
  }
});
myPromise
  .then(message => console.log(message))
  .catch(message => console.log(message));` },

          { type: 'heading', text: `async and await` },
          { type: 'text', text: `Chaining many promises with nested .then() calls quickly gets messy. async and await let you write asynchronous code that reads like synchronous code. Marking a function async makes it return a promise, and await pauses inside it until a promise resolves.` },
          { type: 'code', code: `async function getWeather() {
  const delhi = await getDelhiWeather();
  console.log(delhi);
  const mumbai = await getMumbaiWeather();
  console.log(mumbai);
}` },
          { type: 'text', text: `Be aware of sequencing. Awaiting one task and then the next runs them one after another. If the tasks do not depend on each other, start them both first and await afterwards so they run in parallel and finish sooner.` },

          { type: 'heading', text: `The Fetch API` },
          { type: 'text', text: `fetch is the modern way to make network requests, and it returns a promise. Combined with async/await and a try-catch block for errors, it makes talking to a server straightforward.` },
          { type: 'code', code: `async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}` },

          { type: 'heading', text: `Closures` },
          { type: 'text', text: `A closure is a function that keeps access to the variables of the function that created it, even after that outer function has finished. Closures give you private state: the counter below keeps its count hidden, reachable only through the returned function.` },
          { type: 'code', code: `function createCounter() {
  let count = 0;            // private
  return function () {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter());   // 1
console.log(counter());   // 2
console.log(counter());   // 3` },
        ],
      },
      {
        id: 'mini-projects',
        title: 'Mini Projects',
        blocks: [
          { type: 'text', text: `Let us put the pieces together. These two small apps use everything from earlier chapters: creating elements, handling events, and, in the counter, a closure to hold private state. Type them out and open the page to see them work.` },

          { type: 'heading', text: `A counter app` },
          { type: 'text', text: `This counter builds its own buttons and display, then wires up click handlers to change a private count and refresh the screen.` },
          { type: 'code', code: `function createCounter() {
  let count = 0;
  const para = document.createElement("p");
  const incBtn = document.createElement("button");
  const decBtn = document.createElement("button");

  incBtn.textContent = "Increment";
  decBtn.textContent = "Decrement";

  function updateUI() {
    para.textContent = "Count: " + count;
  }
  incBtn.addEventListener("click", () => { count++; updateUI(); });
  decBtn.addEventListener("click", () => { count--; updateUI(); });

  updateUI();
  document.body.append(incBtn, para, decBtn);
}
createCounter();` },

          { type: 'heading', text: `A to-do app` },
          { type: 'text', text: `This app reads text from an input, adds it to a list when the Add button is clicked, and removes the first item when Remove is clicked. It is pure DOM manipulation.` },
          { type: 'code', code: `function todoApp() {
  const input = document.createElement("input");
  const addBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const list = document.createElement("ul");

  addBtn.textContent = "Add";
  removeBtn.textContent = "Remove";

  addBtn.addEventListener("click", function () {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.appendChild(li);
    input.value = "";
  });
  removeBtn.addEventListener("click", function () {
    const li = list.querySelector("li");
    if (li) list.removeChild(li);
  });

  document.body.append(input, addBtn, removeBtn, list);
}
todoApp();` },
          { type: 'text', text: `From here, keep building. Every larger application is made of these same ideas: select elements, respond to events, change the DOM, and fetch data from the web. You now have the whole toolkit.` },
        ],
      },
    ],
  },
];
