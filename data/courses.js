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
    id: 'java-fundamentals',
    title: 'Java Fundamentals',
    description:
      'Explore Java programming with accessible, step-by-step lessons. Learn object-oriented programming, collections, and error handling.',
    level: 'Beginner to Intermediate',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction to Java',
        content: `Java is one of the most widely used programming languages in the world. It powers Android apps, enterprise software, web applications, and much more.

Why Java?

Java follows the principle of "write once, run anywhere." This means code written in Java can run on any device that has the Java Virtual Machine (JVM) installed. Java is strongly typed, object-oriented, and has a vast ecosystem of libraries and tools.

Setting Up Java

To start programming in Java, you need to install the Java Development Kit (JDK). Download it from the official Oracle website or use an open-source alternative like OpenJDK.

After installation, verify it by opening your terminal and typing:

java --version
javac --version

The first command checks the Java runtime, and the second checks the Java compiler.

Your First Java Program

Create a file named HelloWorld.java and type the following:

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

To compile and run this program, open your terminal and type:

javac HelloWorld.java
java HelloWorld

Let us break down what each part means. The public class HelloWorld line defines a class named HelloWorld. Every Java program needs at least one class. The public static void main line defines the main method, which is the entry point of every Java program. System.out.println prints text to the console.

Variables and Data Types

Java requires you to declare the type of each variable:

String name = "Saurabh";
int age = 25;
double height = 5.8;
boolean isStudent = true;

Unlike Python, you must specify the type before the variable name.

Key Takeaways

Java is a strongly typed, object-oriented language. It runs on the JVM, making it platform-independent. Every Java program has a main method as its entry point. Variables must have their types declared explicitly.`,
      },
      {
        id: 'oop-basics',
        title: 'Object-Oriented Programming Basics',
        content: `Object-Oriented Programming (OOP) is the foundation of Java. It organizes code into objects that contain both data and behavior.

Classes and Objects

A class is a blueprint for creating objects. An object is an instance of a class:

public class Student {
    String name;
    int age;

    void introduce() {
        System.out.println("Hi, I am " + name + " and I am " + age + " years old.");
    }
}

To create and use an object:

Student student1 = new Student();
student1.name = "Saurabh";
student1.age = 25;
student1.introduce();

Constructors

A constructor is a special method that initializes an object when it is created:

public class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println("Hi, I am " + name + " and I am " + age + " years old.");
    }
}

Student student1 = new Student("Saurabh", 25);
student1.introduce();

The this keyword refers to the current object, distinguishing the object's fields from the constructor's parameters.

Encapsulation

Encapsulation means hiding the internal details of an object and exposing only what is necessary:

public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance = balance + amount;
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance = balance - amount;
        }
    }
}

The balance field is private, so it can only be accessed through the public methods.

Inheritance

Inheritance lets a class inherit fields and methods from another class:

public class Animal {
    String name;

    void speak() {
        System.out.println(name + " makes a sound.");
    }
}

public class Dog extends Animal {
    void speak() {
        System.out.println(name + " barks.");
    }
}

Dog dog = new Dog();
dog.name = "Buddy";
dog.speak();

The Dog class inherits from Animal and overrides the speak method.

Key Takeaways

Classes are blueprints and objects are instances. Constructors initialize objects when they are created. Encapsulation protects data by making fields private and providing public methods. Inheritance allows classes to share and extend behavior.`,
      },
      {
        id: 'collections',
        title: 'Collections',
        content: `Java provides a rich set of collection classes for storing and manipulating groups of objects.

ArrayList

An ArrayList is a resizable list that can grow and shrink as needed:

import java.util.ArrayList;

ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");

System.out.println(fruits.get(0));
System.out.println("Size: " + fruits.size());

You access elements by their index (starting from 0) using the get method.

Iterating Over a List

You can loop through an ArrayList using a for-each loop:

for (String fruit : fruits) {
    System.out.println(fruit);
}

Or using a traditional for loop with index:

for (int i = 0; i < fruits.size(); i++) {
    System.out.println(fruits.get(i));
}

Common ArrayList Operations

Removing an element: fruits.remove("Banana") or fruits.remove(1)

Checking if an element exists: fruits.contains("Apple") returns true or false

Finding the index of an element: fruits.indexOf("Cherry") returns the position

HashMap

A HashMap stores key-value pairs:

import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();
scores.put("Saurabh", 95);
scores.put("Priya", 88);
scores.put("Rahul", 92);

System.out.println(scores.get("Saurabh"));

Iterating Over a HashMap

You can loop through keys, values, or both:

for (String key : scores.keySet()) {
    System.out.println(key + ": " + scores.get(key));
}

HashSet

A HashSet stores unique elements with no duplicates:

import java.util.HashSet;

HashSet<String> uniqueNames = new HashSet<>();
uniqueNames.add("Saurabh");
uniqueNames.add("Priya");
uniqueNames.add("Saurabh");

System.out.println(uniqueNames.size());

The size will be 2 because HashSet does not allow duplicates.

Key Takeaways

ArrayList is a resizable list for ordered collections. HashMap stores data as key-value pairs for quick lookup. HashSet stores unique elements without duplicates. The for-each loop is the most readable way to iterate over collections.`,
      },
      {
        id: 'error-handling',
        title: 'Error Handling',
        content: `Errors are inevitable in programming. Java provides a structured way to handle them using try-catch blocks.

What Are Exceptions?

An exception is an event that disrupts the normal flow of a program. For example, dividing by zero or accessing an invalid array index.

Without error handling, these situations crash your program. With error handling, you can respond gracefully.

Try-Catch Blocks

The try block contains code that might throw an exception. The catch block handles the exception:

try {
    int result = 10 / 0;
    System.out.println(result);
} catch (ArithmeticException e) {
    System.out.println("Error: Cannot divide by zero.");
}

The program does not crash. Instead, it prints the error message and continues.

Multiple Catch Blocks

You can handle different types of exceptions separately:

try {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Error: Index is out of bounds.");
} catch (Exception e) {
    System.out.println("An unexpected error occurred: " + e.getMessage());
}

Always catch more specific exceptions before general ones.

Finally Block

The finally block runs regardless of whether an exception occurred:

try {
    int result = 10 / 2;
    System.out.println(result);
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("This always runs.");
}

The finally block is commonly used to clean up resources like closing files or database connections.

Throwing Exceptions

You can throw your own exceptions:

public static void checkAge(int age) {
    if (age < 18) {
        throw new IllegalArgumentException("Age must be 18 or older.");
    }
    System.out.println("Access granted.");
}

try {
    checkAge(15);
} catch (IllegalArgumentException e) {
    System.out.println(e.getMessage());
}

Custom Exceptions

You can create your own exception classes:

public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

This lets you create meaningful exceptions specific to your application.

Key Takeaways

Exceptions disrupt normal program flow. Try-catch blocks let you handle errors gracefully. The finally block always executes for cleanup. You can throw and create custom exceptions for specific situations.`,
      },
    ],
  },
  {
    id: 'web-accessibility-101',
    title: 'Web Accessibility 101',
    description:
      'Understand the principles of web accessibility. Learn about semantic HTML, ARIA attributes, and how to test your websites for accessibility.',
    level: 'Beginner',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction to Web Accessibility',
        content: `Web accessibility means designing websites and applications that everyone can use, including people with disabilities. This includes people who are blind, have low vision, are deaf, have motor disabilities, or have cognitive disabilities.

Why Accessibility Matters

Over one billion people worldwide have some form of disability. When websites are not accessible, these users are excluded from information, services, and opportunities that others take for granted.

Accessibility is also a legal requirement in many countries. Laws like the Americans with Disabilities Act (ADA) and the European Accessibility Act require digital content to be accessible.

The WCAG Guidelines

The Web Content Accessibility Guidelines (WCAG) are the international standard for web accessibility. They are organized around four principles, known by the acronym POUR:

Perceivable: Information must be presentable in ways that all users can perceive. This means providing text alternatives for images, captions for videos, and ensuring content can be presented in different ways.

Operable: Users must be able to interact with all interface elements. This means everything must work with a keyboard, users have enough time to read content, and navigation is consistent.

Understandable: Information and interface operation must be understandable. This means text is readable, pages behave predictably, and users get help avoiding and correcting errors.

Robust: Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies like screen readers.

Assistive Technologies

People with disabilities use various tools to access the web:

Screen readers read the content of a webpage aloud. Popular screen readers include JAWS, NVDA (free), and VoiceOver (built into macOS and iOS).

Screen magnifiers enlarge portions of the screen for people with low vision.

Alternative keyboards and switch devices allow people with motor disabilities to navigate without a standard mouse or keyboard.

Voice recognition software lets people control their computer and dictate text using their voice.

Key Takeaways

Accessibility ensures everyone can use the web, regardless of ability. WCAG provides the standard framework with four principles: Perceivable, Operable, Understandable, and Robust. Assistive technologies bridge the gap between users and digital content. Accessibility benefits everyone, not just people with disabilities.`,
      },
      {
        id: 'semantic-html',
        title: 'Semantic HTML',
        content: `Semantic HTML uses elements that clearly describe their meaning to both the browser and assistive technologies. It is the foundation of web accessibility.

Why Semantic HTML Matters

Screen readers rely on HTML structure to understand and present content to users. When you use semantic elements, screen readers can announce what type of content they are reading, allow users to navigate by headings, skip to the main content, and understand the relationships between elements.

Document Structure

Every page should have a clear structure using landmark elements:

The header element contains the site title, logo, and main navigation. The nav element wraps navigation links. The main element contains the primary content of the page. The aside element contains supplementary content like sidebars. The footer element contains copyright information and secondary links.

These landmarks allow screen reader users to jump directly to different sections of the page.

Headings

Headings create an outline of your page. They must follow a logical hierarchy:

h1 is the page title. There should be only one h1 per page.
h2 elements are major sections.
h3 elements are subsections within h2 sections.

Never skip heading levels. Do not jump from h1 to h3 without an h2 in between.

Screen reader users often navigate by headings, so a well-structured heading hierarchy is critical.

Lists

Use list elements for groups of related items:

Unordered lists (ul with li elements) for items with no specific order.
Ordered lists (ol with li elements) for sequential items.
Description lists (dl with dt and dd elements) for term-definition pairs.

Screen readers announce the number of items in a list, helping users understand the content structure.

Links and Buttons

Links (a elements) navigate to another page or location.
Buttons (button elements) perform an action on the current page.

Never use a div or span as a clickable element. These are not keyboard accessible and are not announced correctly by screen readers.

Link text should be descriptive. Avoid generic text like "click here" or "read more." Instead, write "Read our Python course overview" so users know where the link goes without needing surrounding context.

Tables

Tables should only be used for tabular data, never for layout. A well-structured table includes:

A caption element describing the table.
The th element for header cells with a scope attribute indicating whether they are row or column headers.
The td element for data cells.

Forms

Form fields need labels. Every input must have an associated label element:

The label element is linked to its input using the for attribute matching the input's id.

Group related form fields using the fieldset element with a legend.

Key Takeaways

Semantic HTML provides structure that assistive technologies rely on. Use landmark elements to define page regions. Maintain a logical heading hierarchy. Use appropriate elements for their intended purpose. Link text must be descriptive and form fields must have labels.`,
      },
      {
        id: 'aria-attributes',
        title: 'ARIA Attributes',
        content: `ARIA stands for Accessible Rich Internet Applications. It is a set of attributes that enhance HTML to make dynamic web content more accessible.

The First Rule of ARIA

Do not use ARIA if a native HTML element can achieve the same result. For example, use a button element instead of adding role="button" to a div. Native elements have built-in keyboard handling and screen reader support.

ARIA should supplement HTML, not replace it.

Common ARIA Roles

Roles define what an element is. Some common roles:

role="navigation" identifies a navigation region (though using the nav element is preferred).
role="alert" announces important messages to screen readers immediately.
role="dialog" identifies a dialog or modal window.
role="tab", role="tabpanel", and role="tablist" create accessible tab interfaces.

ARIA States and Properties

aria-label provides an accessible name when visible text is not available. For example, a search button that only shows an icon needs an aria-label="Search" attribute.

aria-labelledby points to another element that provides the label. This is useful when the label text already exists on the page.

aria-describedby links an element to a longer description.

aria-expanded indicates whether a collapsible section is open (true) or closed (false). This is important for dropdown menus and accordions.

aria-hidden="true" hides an element from screen readers. Use this for decorative elements that add no information.

aria-live regions announce dynamic content changes. Use aria-live="polite" for non-urgent updates and aria-live="assertive" for critical alerts.

aria-current="page" indicates the current page in a navigation menu.

Building an Accessible Dropdown Menu

Here is how ARIA attributes work together in a dropdown:

The trigger button has aria-expanded="false" initially. When opened, it changes to aria-expanded="true". The button also has aria-haspopup="true" to indicate it opens a menu. The dropdown container has role="menu" and each item has role="menuitem".

Building an Accessible Accordion

For an accordion, each trigger button has aria-expanded to indicate its state and aria-controls pointing to the content panel it controls. The content panel has role="region" and aria-labelledby pointing back to the trigger.

Common Mistakes

Adding ARIA to elements that already have native semantics. For example, adding role="button" to a button element is redundant.

Using aria-label on elements that already have visible text. This can create confusion for screen reader users.

Forgetting to update aria-expanded when toggling interactive elements.

Key Takeaways

Use native HTML elements before reaching for ARIA. ARIA roles define what an element is. ARIA states like aria-expanded communicate dynamic changes. ARIA labels provide accessible names for elements without visible text. Always keep ARIA states synchronized with the visual state.`,
      },
      {
        id: 'testing-tools',
        title: 'Testing for Accessibility',
        content: `Testing is essential to ensure your website is truly accessible. No single tool catches every issue, so use a combination of automated and manual testing.

Automated Testing Tools

Automated tools can quickly identify many common accessibility issues:

axe DevTools is a browser extension that scans your page and reports accessibility violations. It categorizes issues by severity and provides clear descriptions and fix suggestions.

Lighthouse is built into Google Chrome DevTools. It includes an accessibility audit that scores your page and highlights issues. Access it through the Chrome DevTools Audits panel.

WAVE (Web Accessibility Evaluation Tool) is a browser extension that adds visual indicators to your page showing accessibility issues, features, and structural elements.

These tools typically catch 30 to 50 percent of accessibility issues. Manual testing is required for the rest.

Keyboard Testing

Navigate your entire website using only the keyboard:

Use Tab to move forward through interactive elements. Use Shift plus Tab to move backward. Use Enter or Space to activate buttons and links. Use Arrow keys to navigate within components like menus or tabs. Use Escape to close dialogs and dropdowns.

Check that every interactive element is reachable. Verify that focus is visible at all times. Ensure the tab order follows a logical sequence.

Screen Reader Testing

Test with at least one screen reader:

NVDA is a free screen reader for Windows. VoiceOver is built into macOS (activate with Command plus F5) and iOS. TalkBack is built into Android devices.

When testing with a screen reader, verify that all images have appropriate alternative text. Check that headings are announced with their level. Ensure form fields have clear labels. Verify that dynamic content changes are announced. Test that custom widgets (tabs, accordions, modals) are usable.

Color Contrast Testing

Text must have sufficient contrast against its background. WCAG requires a contrast ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text.

Tools like the WebAIM Contrast Checker let you input foreground and background colors to verify they meet the requirements.

Creating an Accessibility Testing Checklist

For each page, verify the following:

All images have alt text (or are marked as decorative). Heading hierarchy is logical with no skipped levels. All interactive elements are keyboard accessible. Focus is visible on all interactive elements. Form fields have associated labels. Color is not the only way information is conveyed. Text has sufficient contrast. Dynamic content changes are announced to screen readers. The page has a descriptive title. The language of the page is specified in the html element.

Key Takeaways

Use a combination of automated tools and manual testing. Keyboard testing reveals navigation and focus issues. Screen reader testing verifies the experience for blind users. Color contrast testing ensures readability for low-vision users. No single tool catches all issues, so test thoroughly.`,
      },
    ],
  },
];
