export const courses = [
  {
    id: 'python-for-beginners',
    title: 'Python for Beginners',
    description:
      'Learn Python from scratch with accessible examples and screen-reader-friendly exercises. Covers fundamentals, data types, control flow, and functions.',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction to Python',
        content: `Python is one of the most popular and beginner-friendly programming languages in the world. It is widely used in web development, data science, automation, artificial intelligence, and more.

Why Python?

Python's syntax reads almost like plain English, making it an excellent first language. Unlike many other languages, Python uses indentation to define code blocks rather than curly braces, which creates clean and readable code.

Setting Up Your Environment

To get started, you need to install Python on your computer. Visit the official Python website and download the latest version. Most operating systems come with a terminal or command prompt where you can run Python.

After installation, open your terminal and type:

python --version

This should display the version number, confirming that Python is installed correctly.

Your First Program

Let us write the classic first program. Open a text editor or your terminal and type:

print("Hello, World!")

When you run this, Python will display the text Hello, World! on your screen. The print function is one of the most commonly used functions in Python. It outputs text to the console.

Key Takeaways

Python is beginner-friendly with clean, readable syntax. It is versatile and used across many fields. Setting up Python is straightforward on all major operating systems. The print function displays output to the screen.`,
      },
      {
        id: 'variables-and-data-types',
        title: 'Variables and Data Types',
        content: `Variables are used to store data in your programs. Think of a variable as a labeled box where you can put a value and retrieve it later.

Creating Variables

In Python, you create a variable by giving it a name and assigning a value using the equals sign:

name = "Saurabh"
age = 25
height = 5.8
is_student = True

Python automatically determines the type of data you are storing. You do not need to declare the type explicitly.

Common Data Types

Strings are text enclosed in quotes. For example: greeting = "Hello"

Integers are whole numbers without decimal points. For example: count = 10

Floats are numbers with decimal points. For example: price = 9.99

Booleans are True or False values. For example: is_active = True

Lists are ordered collections of items. For example: fruits = ["apple", "banana", "cherry"]

Working with Variables

You can perform operations on variables. For numbers, you can add, subtract, multiply, and divide:

a = 10
b = 3
total = a + b
difference = a - b
product = a * b
quotient = a / b

For strings, you can combine them using the plus operator:

first_name = "Saurabh"
last_name = "Prasad"
full_name = first_name + " " + last_name

Type Conversion

Sometimes you need to convert between types. Python provides built-in functions for this:

number_string = "42"
number = int(number_string)

decimal_string = "3.14"
decimal = float(decimal_string)

age = 25
age_text = str(age)

Key Takeaways

Variables store data with a name. Python has several built-in data types including strings, integers, floats, booleans, and lists. You can perform operations on variables based on their type. Type conversion functions let you change data from one type to another.`,
      },
      {
        id: 'control-flow',
        title: 'Control Flow',
        content: `Control flow determines the order in which your code executes. Python provides if statements for decisions and loops for repetition.

If Statements

An if statement lets your program make decisions:

temperature = 30

if temperature > 25:
    print("It is hot outside")
elif temperature > 15:
    print("The weather is pleasant")
else:
    print("It is cold outside")

The code inside each block runs only when its condition is true. Notice the indentation. Python uses indentation (usually 4 spaces) to define which code belongs to which block.

Comparison Operators

You can compare values using these operators:

Equal to: ==
Not equal to: !=
Greater than: >
Less than: <
Greater than or equal to: >=
Less than or equal to: <=

Logical Operators

You can combine conditions using and, or, and not:

age = 20
has_license = True

if age >= 18 and has_license:
    print("You can drive")

For Loops

A for loop repeats code for each item in a sequence:

fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

You can also loop through a range of numbers:

for i in range(5):
    print(i)

This prints numbers 0 through 4.

While Loops

A while loop repeats code as long as a condition is true:

count = 0

while count < 5:
    print(count)
    count = count + 1

Be careful with while loops. If the condition never becomes false, the loop runs forever.

Break and Continue

The break statement exits a loop early:

for i in range(10):
    if i == 5:
        break
    print(i)

The continue statement skips to the next iteration:

for i in range(10):
    if i == 3:
        continue
    print(i)

Key Takeaways

If statements let your program make decisions based on conditions. For loops iterate over sequences like lists or ranges. While loops repeat as long as a condition is true. Break exits a loop and continue skips to the next iteration.`,
      },
      {
        id: 'functions',
        title: 'Functions',
        content: `Functions are reusable blocks of code that perform a specific task. They help you organize your code and avoid repetition.

Defining a Function

You define a function using the def keyword:

def greet():
    print("Hello, welcome to Python!")

greet()

When you call greet(), it executes the code inside the function.

Parameters and Arguments

Functions can accept input values called parameters:

def greet(name):
    print("Hello, " + name + "!")

greet("Saurabh")
greet("Priya")

You can have multiple parameters:

def add(a, b):
    result = a + b
    print(result)

add(5, 3)

Return Values

Functions can send back a result using the return statement:

def multiply(a, b):
    return a * b

result = multiply(4, 5)
print(result)

A function stops executing when it reaches a return statement.

Default Parameters

You can give parameters default values:

def greet(name, greeting="Hello"):
    print(greeting + ", " + name + "!")

greet("Saurabh")
greet("Saurabh", "Good morning")

If you do not provide a value for greeting, it uses the default "Hello".

Scope

Variables created inside a function are local to that function:

def my_function():
    x = 10
    print(x)

my_function()

Trying to access x outside the function would cause an error because x only exists inside my_function.

Practical Example

Here is a practical function that checks if a number is even or odd:

def check_even_odd(number):
    if number % 2 == 0:
        return "even"
    else:
        return "odd"

result = check_even_odd(7)
print("The number is " + result)

Key Takeaways

Functions are defined with the def keyword and called by name. Parameters let functions accept input values. The return statement sends a value back to the caller. Default parameters provide fallback values. Variables inside functions are local to that function.`,
      },
    ],
  },
  {
    id: 'java-fundamentals',
    title: 'Java Fundamentals',
    description:
      'Explore Java programming with accessible, step-by-step lessons. Learn object-oriented programming, collections, and error handling.',
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
