export const pythonAdvancedChaptersB = [
  {
    id: 'lists', title: 'Lists', blocks: [
      { type: 'text', text: `Lists are mutable sequences: ordered collections whose elements can be changed. They let us keep a variable number of related values together.` },
      { type: 'text', text: `You will read, slice, change, and combine lists. Strings and lists share sequence operations, but only lists support changing an item.` },
      { type: 'heading', text: `Lists are sequences` },
      { type: 'text', text: `Write a list with square brackets and commas. Indexing begins at zero, and a slice stops before its ending index.` },
      { type: 'code', code: `x = [5, 6, 5, 9, 15, 23]\nx[0]       # 5\nx[0:2]     # [5, 6]\nx[3:]      # [9, 15, 23]` },
      { type: 'text', text: `The first item is at index 0. x[6] is an error here because 5 is the final valid index. The slice x[0:2] includes indices 0 and 1, not 2.` },
      { type: 'list', items: [`index(value) returns the first position and errors if the value is absent.`, `count(value) counts occurrences; len(sequence) gives length.`, `Negative indices count from the end: x[-2] is 15.`, `Use + to concatenate, * to repeat, and in to test membership.`] },
      { type: 'code', code: `x = [5, 6, 9, 6, 15, 5]\ns = 'slithy'\nx.index(5)\nx.count(6)\nx + [1, 2]\nx * 2\n15 in x\ns[1:3]\ns + ' toves'` },
      { type: 'text', text: `These operations work for both sequence types. Notice that length is the built-in function len(x), not x.len().` },
      { type: 'heading', text: `Lists hold values and references` },
      { type: 'text', text: `Think of x = [5, 7, 4, -2] as x pointing to one list object with slots 0 through 3. A list can also store references to objects, so x[1].y selects the second Point3 and then its y attribute.` },
      { type: 'code', code: `list_of_integers = [5, 7, 4, -2]\nlist_of_strings = ['h', 'i', '', 'there!']\np1 = Point3(1, 2, 3)\np2 = Point3(4, 5, 6)\np3 = Point3(7, 8, 9)\nx = [p1, p2, p3]\nx[1].y` },
      { type: 'text', text: `The last expression reaches p2's y value. Lists are flexible because their slots can contain basic values or object references.` },
      { type: 'heading', text: `Mutation and list methods` },
      { type: 'code', code: `x = [5, 6, 5, 9, 10]\nx[3] = -1\nx.insert(1, 2)\n# x is [5, 2, 6, 5, -1, 10]\n# x[4] is -1` },
      { type: 'text', text: `Item assignment replaces a slot. insert makes room and shifts later elements right; append adds at the end, and sort changes a list in place.` },
      { type: 'code', code: `def swap(b, h, k):\n    \"\"\"Swap b[h] and b[k] in mutable list b.\"\"\"\n    temp = b[h]\n    b[h] = b[k]\n    b[k] = temp\n\nx = [5, 4, 7, 6, 5]\nswap(x, 3, 4)\nprint(x[3])` },
      { type: 'text', text: `This prints 5. b and x refer to the same list object, so changing b's slots changes x's object; swapping local parameter names alone would not change global names.` },
      { type: 'heading', text: `Copies, aliases, expressions, and text` },
      { type: 'code', code: `x = [5, 6, 5, 9, 10]\ny = x[1:]\ny[0] = 7\n# x[1] is still 6\ny = x\ny[1] = 7\n# x[1] is now 7` },
      { type: 'text', text: `A slice creates a new list folder, while plain assignment creates an alias to the same folder. This distinction prevents mutation surprises.` },
      { type: 'code', code: `a = 5\nb = 7\nx = [a, b, a+b]\ntext = 'A sentence is just\\n a list of words'\nwords = text.split()\nlines = text.split('\\n')\nhyphenated = '-'.join(words)` },
      { type: 'text', text: `Expressions inside brackets are evaluated, so x is [5, 7, 12]. split turns text into a list; join combines a list of strings with a separator.` },
      { type: 'text', text: `Recap: index one item, slice a new shallow list, and use item assignment or methods when you intentionally mutate a list.` }
    ]
  },
  {
    id: 'iteration', title: 'Iteration', blocks: [
      { type: 'text', text: `Iteration lets one small piece of code process every item, whether a sequence has zero items, three, or millions.` },
      { type: 'text', text: `You will use for loops, accumulators, range, map, filter, and safe list mutation.` },
      { type: 'heading', text: `The for-loop` },
      { type: 'code', code: `for x in grades:\n    print(x)` },
      { type: 'text', text: `grades is the loop sequence, x the loop variable, and print(x) the body. The flow diagram says: if another element exists, assign it to x, run the body, and repeat; otherwise stop.` },
      { type: 'code', code: `def sum(the_list):\n    \"\"\"Return the sum of all numeric elements in the_list.\"\"\"\n    result = 0\n    for x in the_list:\n        result = result + x\n    return result` },
      { type: 'text', text: `result is an accumulator. It begins at 0 and receives each element, so sum([1]) is 1, sum([1, 7, 2]) is 10, and sum([]) is 0.` },
      { type: 'code', code: `def num_zeroes(the_list):\n    count = 0\n    for x in the_list:\n        if x == 0:\n            count = count + 1\n    return count` },
      { type: 'text', text: `This accumulator counts only zeroes. A loop that instead adds one on every pass counts elements.` },
      { type: 'heading', text: `Counting with range` },
      { type: 'code', code: `print(range(6))\nfirst_six = list(range(6))\nsecond_six = list(range(6, 13))\nfor num in range(1, 6):\n    print(str(num))\nprint('Once I caught a fish alive.')` },
      { type: 'text', text: `range produces a range object, not a list. It counts from the inclusive start to the exclusive stop, and is ideal when a loop has a stated number of repetitions.` },
      { type: 'code', code: `def inflate_grades(grades):\n    \"\"\"Add 1 to every numeric grade in grades.\"\"\"\n    for k in range(len(grades)):\n        grades[k] = grades[k] + 1\n\nlab_scores = [8, 9, 10, 5, 9, 10]\ninflate_grades(lab_scores)` },
      { type: 'text', text: `When you must replace list items, iterate over indices. This changes lab_scores itself to [9, 10, 11, 6, 10, 11].` },
      { type: 'heading', text: `Two important loop mistakes` },
      { type: 'code', code: `def add_one(the_list):\n    for x in the_list:\n        x = x + 1\n\na = [5, 4, 7]\nadd_one(a)\nprint(a)` },
      { type: 'text', text: `This prints [5, 4, 7]. Rebinding x changes only the loop variable; it does not replace a list slot. Use grades[k] assignment when mutation is intended.` },
      { type: 'code', code: `b = [1, 2, 3]\nfor a in b:\n    b.append(a)` },
      { type: 'text', text: `Never change the loop sequence while walking through it. Each appended item becomes another item to visit and append, producing an infinite growth loop until memory runs out.` },
      { type: 'heading', text: `map and filter` },
      { type: 'code', code: `len_list = list(map(len, ['a', 'bc', 'defg']))\n# [1, 2, 4]\n# filter(predicate, items) retains items for which predicate returns True` },
      { type: 'text', text: `map applies a one-parameter function to each item. filter uses a one-parameter Boolean function. Both return iterable objects in modern Python, so list(...) makes their results into lists.` },
      { type: 'text', text: `Recap: choose a for loop for a sequence, initialize accumulators correctly, and update list slots by index rather than rebinding a loop variable.` }
    ]
  },  {
    id: 'nested-lists', title: 'Nested Lists', blocks: [
      { type: 'text', text: `Lists can hold any objects, including lists. Nested lists represent tables, images, and other row-and-column data.` },
      { type: 'text', text: `This chapter also introduces tuples and dictionaries, compact structures for fixed results and key-value data.` },
      { type: 'heading', text: `Lists inside lists` },
      { type: 'code', code: `x = [1, [2, 1], [1, 4, [3, 1]], 5]\nx[0]\nx[1][1]\nx[2][2][0]\na = [2, 1]\nb = [3, 1]\nc = [1, 4, b]\nx = [1, a, c, 5]` },
      { type: 'text', text: `Each bracket pair accesses one level. The memory diagram has x pointing to an outer list, whose slots point to a and c, while c points to b. Following those references explains x[2][2][0].` },
      { type: 'heading', text: `Two-dimensional lists` },
      { type: 'code', code: `d = [[5, 4, 7, 3], [4, 8, 9, 7], [5, 1, 2, 3], [4, 1, 2, 9]]\nd[3][2] = 8\nlen(d)\nlen(d[2])` },
      { type: 'text', text: `This is row-major order: the outer list holds rows, and each inner list holds columns. d[3][2] selects row 3 and column 2. Tables can hold one value per cell; an image can hold an RGB value per cell.` },
      { type: 'text', text: `A storage diagram for [[9, 6, 4], [5, 7, 7]] shows an outer two-slot list pointing to two separate row lists. Rows may differ in length, so [[17, 13, 19], [28, 95]] is valid.` },
      { type: 'heading', text: `Nested slices are shallow` },
      { type: 'code', code: `b = [[9, 6], [4, 5], [7, 7]]\nx = b[:2]\nx[1].append(10)\n# x: [[9, 6], [4, 5, 10]]\n# b: [[9, 6], [4, 5, 10], [7, 7]]` },
      { type: 'text', text: `The slice makes a new outer list only. Both outer lists reference the same first two row objects, so changing x[1] also changes b[1].` },
      { type: 'heading', text: `Transposing a table` },
      { type: 'text', text: `Transpose swaps rows and columns. Four rows [1,2], [3,4], [5,6], [7,8] become two rows [1,3,5,7] and [2,4,6,8]: first elements form the first new row and second elements form the second.` },
      { type: 'code', code: `def transpose(table):\n    \"\"\"Return non-ragged table with rows and columns swapped.\"\"\"\n    n_rows = len(table)\n    n_cols = len(table[0])\n    new_table = []\n    for c in range(n_cols):\n        row = []\n        for r in range(n_rows):\n            row.append(table[r][c])\n        new_table.append(row)\n    return new_table\n\ntranspose([[1, 2], [3, 4], [5, 6]])` },
      { type: 'text', text: `The outer loop chooses a former column; the inner loop takes that column from every former row. The result is [[1, 3, 5], [2, 4, 6]].` },
      { type: 'heading', text: `Tuples and dictionaries` },
      { type: 'code', code: `INCHES_PER_FOOT = 12\ndef to_feet_and_inches(height_in_inches):\n    feet = height_in_inches // INCHES_PER_FOOT\n    inches = height_in_inches % INCHES_PER_FOOT\n    return (feet, inches)\n\nft, ins = to_feet_and_inches(68)` },
      { type: 'text', text: `A tuple is an immutable sequence of any objects, often written with commas. It suits short, heterogeneous, fixed-length values. This call returns (5, 8), which unpacking places in ft and ins.` },
      { type: 'code', code: `d = {'ec1': 'Ezra', 'ec2': 'Ezra', 'tm55': 'Toni'}\nd['ec1']\nd['ec1'] = 'Ellis'\nd['psb26'] = 'Pearl'\ndel d['tm55']` },
      { type: 'text', text: `A dict maps unique immutable keys to values. Access uses a key, not an index: d[0] raises KeyError and slicing is not meaningful. Assignment replaces a value or adds a key; del removes its key and value.` },
      { type: 'text', text: `Recap: nested lists model references and rows, tuples package fixed results, and dictionaries retrieve values by unique keys.` }
    ]
  },
  {
    id: 'while-loops', title: 'While Loops', blocks: [
      { type: 'text', text: `A while loop repeats until a condition changes. It is especially useful when the needed number of repetitions is unknown.` },
      { type: 'heading', text: `The while-loop contract` },
      { type: 'code', code: `while <condition>:\n    statement_1\n    # ...\n    statement_n` },
      { type: 'text', text: `Python tests the condition before each iteration. True runs the body and returns to the test; false exits. You must initialize and update the state that will make the condition false.` },
      { type: 'code', code: `import random\nnum = random.randint(0, 10)\nguessed_it = False\nprint('I am thinking of a number.')\nwhile not guessed_it:\n    guess = int(input('Guess it: '))\n    guessed_it = (num == guess)\nprint('Well done!')` },
      { type: 'text', text: `The user may need any number of guesses. Each iteration updates guessed_it; the loop ends only when it becomes True.` },
      { type: 'code', code: `a = 0\nwhile a < 2:\n    a = a + 1\nprint(a)  # 2\n\na = 8\nb = 12\nwhile a != b:\n    if a > b:\n        a -= b\n    else:\n        b -= a\nprint(a)  # 4` },
      { type: 'text', text: `The first loop runs twice. The second is Euclid's greatest-common-factor algorithm: repeatedly subtracting the smaller positive value preserves common factors until both values are 4.` },
      { type: 'heading', text: `For versus while` },
      { type: 'code', code: `for k in range(n):\n    # do something\n\nk = 0\nwhile k < n:\n    # do something\n    k = k + 1` },
      { type: 'text', text: `Either form repeats n times, but for makes a known count clear and avoids forgetting the increment.` },
      { type: 'code', code: `seq = []\nk = 0\nwhile k*k < N:\n    seq.append(k*k)\n    k += 1\n\nwhile 3 in nums:\n    nums.remove(3)\n\nfib = [1, 1]\nwhile len(fib) < n:\n    fib.append(fib[-1] + fib[-2])` },
      { type: 'text', text: `These loops stop at a mathematical limit, remove values while length changes, and collect Fibonacci numbers without needing an index. Such stopping conditions are often clearer with while.` },
      { type: 'list', items: [`Use for for a sequence or known count.`, `Use while for changing data, convergence, deletion, or unknown counts.`, `Always verify initialization, progress, and eventual termination.`] },
      { type: 'text', text: `Recap: while is flexible because you manage the condition, which also makes a mistaken condition or missing update dangerous.` }
    ]
  },
  {
    id: 'loop-invariants', title: 'Loop Invariants', blocks: [
      { type: 'text', text: `Loop invariants state what stays true before and after every loop body. They make a loop's design and correctness understandable.` },
      { type: 'heading', text: `Assertions and invariants` },
      { type: 'list', items: [`An assertion is a true-or-false claim at a program point.`, `A precondition is assumed before a segment; a postcondition must hold afterward.`, `A loop invariant holds before and after each iteration.`] },
      { type: 'code', code: `k = 0\n# INV: n_forks == number of forks needed with k more guests\nwhile k < n_more_guests:\n    n_forks += 2\n    k += 1` },
      { type: 'text', text: `The invariant starts true and is restored by adding two forks for the next guest. n_forks >= 0 would be true but does not explain the relationship that matters.` },
      { type: 'heading', text: `Summing squares` },
      { type: 'code', code: `total = 0\nk = 2\n# INV: total is sum of squares of 2..k-1\nwhile k <= 5:\n    total = total + k*k\n    k += 1\n# POST: total is sum of squares of 2..5` },
      { type: 'text', text: `Initially 2..1 is empty, so total is 0. After four iterations totals are 4, 13, 29, 54 and k is 6. Since the invariant is true at the final false test, it gives the postcondition.` },
      { type: 'text', text: `The flow diagram places the invariant immediately before the condition and loops back after the body. It visually emphasizes that truth is preserved at every test, including termination.` },
      { type: 'heading', text: `Adjacent equal pairs` },
      { type: 'code', code: `def count_adjacent_equal_pairs(s):\n    n_pair = 0\n    k = 1\n    # INV: n_pair is number of adjacent equal pairs in s[0..k-1]\n    while k < len(s):\n        if s[k-1] == s[k]:\n            n_pair += 1\n        k += 1\n    return n_pair` },
      { type: 'text', text: `k is the second character of the pair being examined, so it begins at 1. For 'ebeee', this detects the two adjacent equal pairs among the trailing e characters.` },
      { type: 'code', code: `def largest(int_list):\n    \"\"\"Return largest item; precondition: list is nonempty.\"\"\"\n    k = 1\n    big = int_list[0]\n    # INV: big is largest in int_list[0..k-1]\n    while k < len(int_list):\n        big = max(big, int_list[k])\n        k += 1\n    return big` },
      { type: 'text', text: `Start at k=1 so the processed range has a real first item and a maximum. Each iteration compares one new item and restores the invariant.` },
      { type: 'list', items: [`State a postcondition.`, `Describe processed items with an invariant.`, `Initialize to make it true, make progress, and restore it each body execution.`] },
      { type: 'text', text: `Recap: combine an invariant with the false loop condition to derive the desired postcondition.` }
    ]
  },
  {
    id: 'recursion', title: 'Recursion', blocks: [
      { type: 'text', text: `Recursion solves a task by calling the same function on a smaller version. It needs a simple base case and a recursive case that progresses toward it.` },
      { type: 'heading', text: `Simple and recursive cases` },
      { type: 'code', code: `def open_doll(d):\n    print('My name is ' + d.name)\n    if d.hasSeam:\n        open_doll(d.innerDoll)\n    else:\n        print(\"That's it!\")` },
      { type: 'text', text: `Russian dolls illustrate recursion: a doll without a seam is the base case; otherwise opening the inner doll is the smaller recursive case.` },
      { type: 'code', code: `def blast_off(n):\n    \"\"\"Print n down to BLAST OFF; n is a nonnegative int.\"\"\"\n    if n == 0:\n        print('BLAST OFF!')\n    else:\n        print(n)\n        blast_off(n - 1)` },
      { type: 'text', text: `blast_off(5) prints 5 through 1, then BLAST OFF. n == 0 is the base case and every other call reduces n.` },
      { type: 'heading', text: `Towers of Hanoi` },
      { type: 'text', text: `Three pegs hold disks initially on the left, smallest on top; never put a larger disk on a smaller one. One disk moves directly. For three disks: move 1 left-right, 2 left-middle, 1 right-middle, 3 left-right, 1 middle-left, 2 middle-right, 1 left-right.` },
      { type: 'text', text: `The Hanoi diagram for four disks shows the recursive plan: move the top three left-to-middle, move disk 4 left-to-right, then move the three middle-to-right. The simpler solution is used twice.` },
      { type: 'code', code: `def solve_hanoi(n, start, goal, temp):\n    if n == 1:\n        print('move from ' + start + ' to ' + goal)\n    else:\n        solve_hanoi(n - 1, start, temp, goal)\n        print('move from ' + start + ' to ' + goal)\n        solve_hanoi(n - 1, temp, goal, start)` },
      { type: 'text', text: `The first call uncovers the largest disk, the direct print moves it, and the second call covers it. Only the peg roles change.` },
      { type: 'heading', text: `Divide and conquer` },
      { type: 'list', items: [`Choose simple cases.`, `Break the problem into simpler problems.`, `Combine their answers.`] },
      { type: 'text', text: `Recursion and iteration can compute the same things. Recursion is particularly clear when the task naturally contains smaller copies of itself.` }
    ]
  },
  {
    id: 'more-recursion', title: 'More Recursion', blocks: [
      { type: 'text', text: `Each recursive call has its own call frame. Following those frames explains both the descent to a base case and the return of answers.` },
      { type: 'heading', text: `Factorial` },
      { type: 'code', code: `def factorial(n):\n    \"\"\"Return n factorial; precondition: n is an int >= 0.\"\"\"\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)` },
      { type: 'text', text: `0! is 1; for positive n, n! is n times (n-1)!. factorial(3) creates frames for 3, 2, 1, 0. The 0 frame returns 1; the waiting frames return 1, 2, and finally 6.` },
      { type: 'heading', text: `Reversing a string` },
      { type: 'code', code: `def reverse(s):\n    if len(s) <= 1:\n        return s\n    left = reverse(s[0])\n    right = reverse(s[1:])\n    return right + left\n\ndef reverse_halves(s):\n    if len(s) <= 1:\n        return s\n    half = len(s) // 2\n    return reverse_halves(s[half:]) + reverse_halves(s[:half])` },
      { type: 'text', text: `For Hello!, the first form keeps H as left and reverses ello! as right, then returns right + left. The alternate diagram splits Hello! into Hel and lo!, then to one-character leaves, and combines right pieces before left pieces to make !olleH.` },
      { type: 'heading', text: `Palindromes` },
      { type: 'code', code: `def ispalindrome(s):\n    if len(s) < 2:\n        return True\n    return s[0] == s[-1] and ispalindrome(s[1:-1])` },
      { type: 'text', text: `A short string is already a palindrome. Otherwise its ends must match and its middle must be a palindrome; AMANAPLANACANALPANAMA repeatedly removes matching ends.` },
      { type: 'heading', text: `Recursion through objects` },
      { type: 'code', code: `def num_ancestors(p):\n    parent1s = 0 if p.parent1 is None else 1 + num_ancestors(p.parent1)\n    parent2s = 0 if p.parent2 is None else 1 + num_ancestors(p.parent2)\n    return parent1s + parent2s` },
      { type: 'text', text: `A Person has name and two Person-or-None parent attributes. The family-tree diagram branches through known parents; each contributes itself plus its known ancestors, while None contributes zero.` },
      { type: 'text', text: `Recap: draw the smaller input and the return path when a recursive trace feels confusing.` }
    ]
  },
  {
    id: 'classes', title: 'Classes', blocks: [
      { type: 'text', text: `Classes define new Python types with related data and operations, such as Student, Point, Time, Rectangle, or Card.` },
      { type: 'heading', text: `Instances and initializers` },
      { type: 'code', code: `class Student():\n    \"\"\"A student with netID, courses, and major.\"\"\"\n    def __init__(self, netID, courses, major):\n        self.netID = netID\n        self.courses = courses\n        self.major = major\n\ncourses = [('CS 1110', 4), ('MATH 1920', 3)]\ns = Student('abc123', courses, 'Music')` },
      { type: 'text', text: `Calling Student creates an object, runs __init__, and returns the new identity. In the folder model, self is that object and receives its instance attributes.` },
      { type: 'heading', text: `Invariants, defaults, and class attributes` },
      { type: 'code', code: `assert type(netID) == str\nassert netID[0].isalpha()\nassert netID[-1].isdigit()\n\nclass Student():\n    max_credit = 22\n    def __init__(self, netID, courses=None, major=None):\n        self.netID = netID\n        self.courses = [] if courses is None else courses\n        self.major = major\n        self.n_credit = sum(n for name, n in self.courses)\n        assert self.n_credit <= Student.max_credit` },
      { type: 'text', text: `Invariants describe valid objects, such as valid types or a credit limit. None represents an undeclared major. max_credit is one class attribute shared by all Student objects, while each object has separate enrollment data.` },
      { type: 'heading', text: `Methods and encapsulation` },
      { type: 'code', code: `def enroll(self, name, n):\n    if self.n_credit + n > Student.max_credit:\n        print('Sorry your schedule is full!')\n    else:\n        self.courses.append((name, n))\n        self.n_credit += n\n\ndef getMajor(self):\n    return '' if self._major is None else self._major\ndef setMajor(self, m):\n    self._major = m` },
      { type: 'text', text: `s.enroll(...) passes s as self automatically. Getters and setters support encapsulation; a leading underscore conventionally marks an internal attribute that outside code should not access directly.` },
      { type: 'heading', text: `Name resolution and special methods` },
      { type: 'code', code: `Student.max_credit = 23\ns.max_credit = 24\n\nclass Point2():\n    def __init__(self, x=0, y=0):\n        self.x = x\n        self.y = y\n    def __str__(self):\n        return '(' + str(self.x) + ', ' + str(self.y) + ')'\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y` },
      { type: 'text', text: `Reading s.max_credit checks the object then its class. Assigning s.max_credit creates a shadowing instance attribute, whereas Student.max_credit changes the shared value. __str__ supplies str(), and __eq__ supplies ==.` },
      { type: 'text', text: `Recap: define valid values and invariants first, then implement the operations that preserve them.` }
    ]
  },
  {
    id: 'inheritance', title: 'Inheritance', blocks: [
      { type: 'text', text: `Inheritance shares behavior among related types. Put common code in a parent class and add only specialized behavior in children.` },
      { type: 'heading', text: `Shape and Circle` },
      { type: 'code', code: `class Shape():\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nclass Circle(Shape):\n    def __init__(self, x, y, radius):\n        self.radius = radius\n        super().__init__(x, y)` },
      { type: 'text', text: `Circle is a subclass or child of Shape; Shape is its superclass or parent, and the hierarchy ultimately reaches object. super().__init__ reuses location initialization. A Circle(1,2,4.0) has x, y, and radius attributes.` },
      { type: 'heading', text: `Overriding` },
      { type: 'code', code: `class Shape():\n    def __str__(self):\n        return 'Shape @ (' + str(self.x) + ', ' + str(self.y) + ')'\n    def draw(self):\n        turtle.penup()\n        turtle.setx(self.x)\n        turtle.sety(self.y)\n        turtle.pendown()\n\nclass Circle(Shape):\n    def __str__(self):\n        return 'Circle: Radius=' + str(self.radius) + ' ' + super().__str__()\n    def draw(self):\n        super().draw()\n        turtle.circle(self.radius)` },
      { type: 'text', text: `A child method with the same name overrides a parent method. Circle.draw first performs shared pen movement, then draws its distinctive circle.` },
      { type: 'heading', text: `Bottom-up lookup` },
      { type: 'code', code: `class A():\n    def f(self): return self.g()\n    def g(self): return 10\nclass B(A):\n    def g(self): return 14\n    def h(self): return 18\n\na = A()\nb = B()\n# a.f() is 10; b.f() is 14` },
      { type: 'text', text: `Lookup checks the instance, then its class, then each parent through object. Thus inherited A.f calls B.g when self is b. The hierarchy diagram depicts exactly this upward path.` },
      { type: 'code', code: `class A():\n    x = 3\n    y = 5\nclass B(A):\n    y = 4\n    z = 42\n\nc1 = Circle(1, 2, 4.0)\nisinstance(c1, Circle)\nisinstance(c1, Shape)\nisinstance(c1, object)\nisinstance(c1, str)` },
      { type: 'text', text: `B inherits x but shadows y. isinstance recognizes parent relationships: the first three checks are True and the str check is False. A Rectangle is not an instance of its child Square.` },
      { type: 'text', text: `Recap: reuse parent code with super and remember lookup begins at the most specific object.` }
    ]
  },
  {
    id: 'subclasses', title: 'Subclasses', blocks: [
      { type: 'text', text: `Subclass design asks what behavior is common and what behavior truly differs. A zoo model makes those choices concrete.` },
      { type: 'heading', text: `Animal design` },
      { type: 'code', code: `class Animal():\n    NUM_ANIMALS = 0\n    DEFAULT_WEIGHT = 1\n    CAN_SPEAK = False\n    def __init__(self, name, tag, weight=DEFAULT_WEIGHT):\n        self.name = name\n        self.tag = tag\n        self.weight = weight\n        Animal.NUM_ANIMALS += 1\n    def speak(self, words):\n        if self.CAN_SPEAK:\n            print(words)\n    def eat(self):\n        print('NOM NOM NOM')\n        self.weight += 1` },
      { type: 'text', text: `The animal count is a class attribute incremented by the constructor; name, tag, and weight belong to each instance. A default weight makes object creation convenient.` },
      { type: 'heading', text: `Specialized behavior` },
      { type: 'code', code: `class Bird(Animal):\n    def eat(self):\n        print('peck peck')\n        self.weight += 1\nclass Fish(Animal):\n    def eat(self):\n        self.weight += 1\nclass Penguin(Bird):\n    pass\nclass Parrot(Bird):\n    CAN_SPEAK = True` },
      { type: 'text', text: `Only Parrot needs different speak behavior because the inherited method already consults CAN_SPEAK. Bird and Fish override eat for their sounds, while Penguin inherits Bird's version. Do not copy a method just because a subclass exists.` },
      { type: 'list', items: [`Sketch the hierarchy first.`, `Separate class attributes, instance attributes, and constants.`, `Use inherited methods when correct; override only changed meaning.`, `Copy-and-paste among related classes suggests missing shared parent code.`] },
      { type: 'text', text: `Recap: a good subclass is an is-a specialization, not merely a class with similar-looking code.` }
    ]
  },
  {
    id: 'sequence-algorithms', title: 'Sequence Algorithms', blocks: [
      { type: 'text', text: `Box notation makes the processed and unprocessed portions of a sequence precise, which makes algorithm design easier.` },
      { type: 'heading', text: `Half-open segments` },
      { type: 'text', text: `b[h..k-1] starts at h and stops immediately before k, so its length is k-h. b[h..h-1] is empty; b[h..h+1] has two values. Indices label boxes, not gaps.` },
      { type: 'text', text: `A box invariant can say b[0..k-1] is sorted and all its values are no greater than b[k..len(b)-1]. It describes a completed left region and remaining right region.` },
      { type: 'code', code: `k = 1\nbig = s[0]\n# INV: big is maximum of s[0..k-1]\nwhile k < len(s):\n    big = max(big, s[k])\n    k += 1` },
      { type: 'text', text: `The left processed box grows by one item each iteration while big remains its maximum.` },
      { type: 'heading', text: `Separating signs` },
      { type: 'code', code: `def separate_negatives(s):\n    k = 0\n    j = len(s)\n    while k < j:\n        if s[k] < 0:\n            k += 1\n        elif s[j-1] >= 0:\n            j -= 1\n        else:\n            s[k], s[j-1] = s[j-1], s[k]\n            k += 1\n            j -= 1\n    return k` },
      { type: 'text', text: `The invariant is negatives in s[0..k-1], unknown values in s[k..j-1], and nonnegatives in s[j..n-1]. The diagram traces swaps through [-7,5,2,2,-1,8,-3,-9,3] until the unknown middle vanishes.` },
      { type: 'text', text: `Recap: specify precondition and postcondition, choose a moving invariant, then check initialization, termination, progress, and preservation.` }
    ]
  },
  {
    id: 'searching', title: 'Searching', blocks: [
      { type: 'text', text: `Searching finds a target in a sequence. Linear search needs no order; binary search trades a sorted precondition for much faster repeated searching.` },
      { type: 'heading', text: `Linear search` },
      { type: 'code', code: `def linear_search(b, v, h, k):\n    \"\"\"Return first occurrence of v in b[h..k-1], or -1.\"\"\"\n    i = h\n    # INV: v is not in b[h..i-1]\n    while i < k and b[i] != v:\n        i += 1\n    return i if i < k else -1` },
      { type: 'text', text: `Every failed comparison proves the target absent from one more position. At exit, i names the first target or reaches k. Searching n elements can require n checks, so doubling size can double time.` },
      { type: 'heading', text: `Binary search` },
      { type: 'text', text: `A sorted list permits discarding half the candidates after comparing its middle. The halving diagram goes from 16 to 8, 4, 2, and 1 candidates: about four checks; 32 needs only about five.` },
      { type: 'code', code: `def bsearch(b, v):\n    i = 0\n    j = len(b)\n    while i < j:\n        mid = (i + j) // 2\n        if b[mid] < v:\n            i = mid + 1\n        else:\n            j = mid\n    return i if i < len(b) and b[i] == v else -1` },
      { type: 'text', text: `Its invariant says values before i are below v, values i through j-1 are unknown, and values at or after j are at least v. Each test halves the unknown section; the final equality check distinguishes absence from an insertion position.` },
      { type: 'code', code: `def rbsearch(b, v):\n    return rbsearch_helper(b, v, 0, len(b))\ndef rbsearch_helper(b, v, i, j):\n    if i >= j:\n        return i if i < len(b) and b[i] == v else -1\n    mid = (i + j) // 2\n    if b[mid] < v:\n        return rbsearch_helper(b, v, mid + 1, j)\n    return rbsearch_helper(b, v, i, mid)` },
      { type: 'text', text: `The helper carries the changing boundaries needed by recursive calls. Recap: use linear search for arbitrary data and binary search for sorted data searched often.` }
    ]
  },
  {
    id: 'sorting', title: 'Sorting', blocks: [
      { type: 'text', text: `Sorting arranges values in ascending order and is worthwhile when it enables many efficient later searches.` },
      { type: 'heading', text: `Insertion sort` },
      { type: 'code', code: `def swap(b, h, k):\n    b[h], b[k] = b[k], b[h]\ndef push_down(b, k):\n    while k > 0:\n        if b[k-1] > b[k]:\n            swap(b, k-1, k)\n        k -= 1\ndef insertion_sort(b):\n    for k in range(len(b)):\n        push_down(b, k)` },
      { type: 'text', text: `The invariant is that b[0..k-1] is sorted. In [2,4,4,6,6,7,5], pushing 5 left swaps it past 7 and two 6 values, yielding [2,4,4,5,6,6,7]. The nested work can take n squared operations.` },
      { type: 'heading', text: `Partition and quicksort` },
      { type: 'code', code: `def partition(b, h, k):\n    i = h\n    j = k + 1\n    x = b[h]\n    while i < j - 1:\n        if b[i+1] >= x:\n            swap(b, i+1, j-1)\n            j -= 1\n        else:\n            swap(b, i, i+1)\n            i += 1\n    return i\ndef quick_sort(b, h, k):\n    if k <= h:\n        return\n    i = partition(b, h, k)\n    quick_sort(b, h, i-1)\n    quick_sort(b, i+1, k)` },
      { type: 'text', text: `Partition places values below a pivot left and values at least it right, leaving the pivot correctly positioned. Quicksort recursively sorts both sides. Balanced partitions give about n log n work; a chain that removes one item each time gives n squared. The diagram contrasts these trees.` },
      { type: 'text', text: `Recap: insertion sort is simple but quadratic; quicksort uses partition and divide-and-conquer for strong typical performance.` }
    ]
  },
  {
    id: 'numpy-plotting', title: 'NumPy and Plotting', blocks: [
      { type: 'text', text: `NumPy arrays and plotting let a program compute and communicate facts about data. The running question is how daylight hours vary by day, month, and city.` },
      { type: 'heading', text: `Daylight data` },
      { type: 'text', text: `A Daylight object stores City, Lat, Long, and length-365 RiseTime and SetTime NumPy arrays. Sun Up is sunset minus sunrise. A city file has 33 lines: name, encoded longitude/latitude, then daily rise-set pairs.` },
      { type: 'code', code: `def LongLat(s):\n    Long = float(s[1:4]) + float(s[4:6])/60\n    if s[0] == 'E': Long = -Long\n    Lat = float(s[7:9]) + float(s[9:11])/60\n    if s[6] == 'S': Lat = -Lat\n    return (Lat, Long)\ndef ConvertTime(s):\n    return float(s[:2]) + float(s[2:])/60` },
      { type: 'text', text: `W08140N4129 is parsed into degrees and minutes. '0736' becomes 7.6 hours. The monthly comparison table shows northern cities have long June days and short December days, while southern cities reverse that pattern.` },
      { type: 'code', code: `from numpy import *\nfrom pylab import *\ndef SunUp(self):\n    return self.SetTime - self.RiseTime\nA = Daylight('Ithaca')\nD = A.SunUp()\nplot(D)\ntitle('%s  Lat = %6.2f  Long = %6.2f' % (A.City, A.Lat, A.Long))\nylabel('Hours of Sunlight')\nxlim(0, 364)\nylim(5, 20)\nshow()` },
      { type: 'text', text: `Array subtraction computes every daily duration at once. The Ithaca plot has daylight near 9 hours in January, rises smoothly to about 15.2 in late June, and returns near 9 in December; its axes and grid make that trend readable.` },
      { type: 'code', code: `def MonthAves(self):\n    x = zeros((12, 1))\n    D = self.SunUp()\n    start = [0,31,59,90,120,151,181,212,243,273,304,334]\n    finish = [30,58,89,119,150,180,211,242,272,303,333,364]\n    for k in range(12):\n        z = D[start[k]:finish[k]]\n        x[k] = sum(z)/len(z)\n    return x\nbar(range(12), A.MonthAves(), facecolor='magenta')\nylabel('Average Hours of Sunlight')\nshow()` },
      { type: 'text', text: `The bar plot has twelve month bars, about 9.4 January hours, a June peak near 15.2, and about 9.0 in December. Its magenta color is decorative; the labeled values and seasonal rise and fall carry the meaning.` },
      { type: 'heading', text: `Array arithmetic and plots` },
      { type: 'code', code: `x = array([1, 2, 3])\ny = array([1, 2, 3], dtype='int')\na = array([10, 20, 30])\nb = array([5, 4, 15])\na + b\na - b\na / b\na * b\nabs(array([-10.3, 12.6, -89.7]))\n\nx = linspace(0, 2*pi, 9)\ny = sin(x)\nplot(x, y)\nshow()` },
      { type: 'text', text: `Array operations apply entry by entry; arrays must have compatible sizes. linspace gives evenly spaced coordinates. plot(x,y) connects corresponding points: a 200-point sine plot is a smooth wave from 0 up to 1, through 0, down to -1, then back to 0.` },
      { type: 'code', code: `for k in range(6, 20):\n    plot(array([0, 365]), array([k, k]), color='red', linestyle=':')\n\nsubplot(2, 1, 1)\n# first plot\nsubplot(2, 1, 2)\n# second plot\nshow()` },
      { type: 'text', text: `Each line call connects two points into one horizontal grid line. subplot(2,1,1) and subplot(2,1,2) select upper and lower panels in one window; the diagram labels those panels 1 and 2.` },
      { type: 'text', text: `Recap: use NumPy for vectorized numeric work and labeled plots to turn arrays into evidence.` }
    ]
  }
];
