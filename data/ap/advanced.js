export const advancedCourse = {
  id: `advanced-java`,
  title: `Advanced Java`,
  description: `This course develops practical advanced Java skills through generic programming, exception handling, collections, input and output, Unified Modeling Language, and JavaFX. It follows the lecture material closely while expressing diagrams and interfaces in clear linear text for screen-reader users.`,
  level: `Advanced`,
  chapters: [
    {
      id: `generic-programming`,
      title: `Generic Programming`,
      blocks: [
        { type: `heading`, text: `Why generic programming?` },
        { type: `text`, text: `Java's Object superclass can hold objects of many types, such as String, Integer, and Float. An ArrayList of Object therefore appears to solve the problem of storing different kinds of objects, but retrieving an object requires a cast and the compiler cannot check whether an unsuitable object was added.` },
        { type: `code`, code: `public class MyGenericList {
    private ArrayList myList;
    public MyGenericList() {
       myList = new ArrayList();
    }
    public void add(Object o) {
       myList.add(o);
    }
    public Object get(int i) {
       return myList.get(i);
    }
    public static void main(String[] args) {
      MyGenericList generic = new MyGenericList();
      generic.add("hello");
      generic.add(10);
      generic.add(10.23f);
      String str = (String) generic.get(0); // OK
      String str2 = (String) generic.get(1); // NOT OK
    }
}` },
        { type: `text`, text: `The second cast is legal to compile but fails at runtime. Checking every retrieved value with instanceof can avoid a bad cast, but is inconvenient when the list contains many types.` },
        { type: `code`, code: `if (generic.get(1) instanceof String) {
    String str = (String) generic.get(1); // OK
}` },
        { type: `text`, text: `Making one class for each element type also avoids the cast, but duplicates almost all implementation code. The following String, Integer, and TypeX lists differ only in their element type.` },
        { type: `code`, code: `public class MyStringList {
    private ArrayList myList = new ArrayList();
    public void add(String o) { myList.add(o); }
    public String get(int i) { return (String) myList.get(i); }
}
public class MyIntList {
    private ArrayList myList = new ArrayList();
    public void add(Integer o) { myList.add(o); }
    public Integer get(int i) { return (Integer) myList.get(i); }
}
public class MyTypeXList {
    private ArrayList myList = new ArrayList();
    public void add(TypeX o) { myList.add(o); }
    public TypeX get(int i) { return (TypeX) myList.get(i); }
}` },
        { type: `text`, text: `Diagram description: four pictured cups illustrate a generic container. One cup is marked Cup<T>; other cups contain or are labelled milk, tea, and coffee. T can be Coffee, Tea, Milk, Soup, or another type. The cup is the reusable container and the supplied type is its content type.` },
        { type: `heading`, text: `Parameterized classes` },
        { type: `text`, text: `A parameterized, or generic, class puts one or more type parameters in angle brackets. A client constructing the object supplies the actual type, and the class code refers to it by the parameter name. For example, E can be instantiated as String.` },
        { type: `code`, code: `public class Name<Type> {
    // ...
}

public class Name<Type1, Type2, TypeN> {
    // ...
}` },
        { type: `text`, text: `A single generic list implementation is reusable and type safe. Different instances carry their own declared element type, so an attempt to add the wrong type is caught at compilation.` },
        { type: `code`, code: `public class MyGenericList<T> {
    private ArrayList<T> myList;
    public MyGenericList() {
       myList = new ArrayList<T>();
    }
    public void add(T o) {
       myList.add(o);
    }
    public T get(int i) {
       return myList.get(i);
    }
}
public class Main {
    public static void main(String[] args) {
        MyGenericList<String> strList = new MyGenericList<String>();
        MyGenericList<Integer> intList = new MyGenericList<Integer>();
        strList.add("hello");
        intList.add(1);
    }
}` },
        { type: `heading`, text: `A generic class with two fields` },
        { type: `text`, text: `Pair<T1, T2> models two fields whose types are independently unknown: a key and a value. Both declared types must be carried through the nested generic type of the database list.` },
        { type: `code`, code: `public class Pair<T1, T2> {
    private T1 key;
    private T2 value;
    public Pair(T1 _k, T2 _v) {
       key = _k; value = _v;
    }
    public T1 getKey() { return key; }
    public T2 getValue() { return value; }
}` },
        { type: `text`, text: `Using raw Pair in MyGenericList<Pair> produces an unchecked or unsafe operations warning because the two field types are not stated for the database. Declaring the left side but using a raw generic object on the right still leaves an unchecked warning.` },
        { type: `code`, code: `MyGenericList<Pair> db = new MyGenericList<Pair>();
db.add(new Pair<String, Integer>("John", 2343));
db.add(new Pair<String, Integer>("Susane", 8908));` },
        { type: `code`, code: `MyGenericList<Pair<String, Integer>> db =
    new MyGenericList<Pair>();
db.add(new Pair<String, Integer>("John", 2343));
db.add(new Pair<String, Integer>("Susane", 8908));
Pair<String, Integer> p = db.get(0);` },
        { type: `text`, text: `The correct usage supplies Pair<String, Integer> on both sides. Generic programming aims to write code reusable for objects of many types instead of separate collection classes for String and Integer.` },
        { type: `code`, code: `MyGenericList<Pair<String, Integer>> db =
    new MyGenericList<Pair<String, Integer>>();
db.add(new Pair<String, Integer>("John", 2343));
db.add(new Pair<String, Integer>("Susane", 8908));
Pair<String, Integer> p = db.get(0);` },
        { type: `heading`, text: `Type erasure` },
        { type: `text`, text: `Generics are implemented using type erasure. The compiler erases parameter type information and inserts the necessary casts. Thus a MyGenericList<String> is compiled in a form much like a raw list taking Object, with a String cast at retrieval.` },
        { type: `code`, code: `// Source using generics
MyGenericList<String> strList = new MyGenericList<String>();
strList.add("hello");
String str = strList.get(0);

// Conceptual erased form
MyGenericList strList = new MyGenericList();
strList.add("hello");
String str = (String) strList.get(0);` },
        { type: `heading`, text: `Restrictions caused by erasure` },
        { type: `list`, items: [`A type parameter cannot be a primitive: use MyGenericList<Double>, not MyGenericList<double>.`, `A type variable cannot be instantiated with new T() because its actual type is unavailable at runtime.`, `A parameterized type cannot be used in a cast or instanceof test, such as ArrayList<Integer>.`, `A static field cannot have type T because one static field would be shared across every instantiation.`, `Generic types are invariant: Pair<Employee> is not a parent of Pair<Manager>.`, `Generic arrays cannot be created directly.`] },
        { type: `code`, code: `public class MyGenericClass<T> {
    public void doSomething() {
        T myVar = new T(); // compile-time error
    }
}` },
        { type: `code`, code: `public class MyGenericClass<T> {
    void doSomething(List<T> list) {
        if (list instanceof ArrayList<Integer>) { // compile-time error
        }
    }
}` },
        { type: `code`, code: `public class MyGenericClass<T> {
    private static T field; // compilation error
    // c1, c2, and c3 would share field:
    // MyGenericClass<Integer> c1;
    // MyGenericClass<String> c2;
    // MyGenericClass<Double> c3;
}` },
        { type: `text`, text: `Diagram description: Manager has a hollow-triangle inheritance arrow to Employee. Beside it, Pair<Employee> and Pair<Manager> each point to a note saying “no relationship.” The diagram teaches that inheritance between element types does not imply inheritance between their corresponding generic instantiations.` },
        { type: `code`, code: `public class MyGenericClass<T> {
    public void doSomething() {
        T[] myArr = new T[10]; // ERROR
    }
}
MyGenericClass<String>[] strArray =
    new MyGenericClass<String>[10]; // ERROR` },
        { type: `text`, text: `Arrays are covariant, so an Integer array can be assigned to an Object array reference. Generics are invariant, so ArrayList<Integer> cannot be assigned to List<Object>. Allowing generic arrays would undermine the generic compiler checks and could cause a runtime ClassCastException.` },
        { type: `code`, code: `Object[] array = new Integer[10]; // legal: arrays are covariant
List<Object> myList = new ArrayList<Integer>(); // compilation error

// If this illegal generic-array statement were allowed:
List<Integer>[] intList = new ArrayList<Integer>[5];
List<String> stringList = new ArrayList<String>();
stringList.add("John");
Object[] objArray = intList;
objArray[0] = stringList;
int myIntNumber = objArray[0].get(0); // ClassCastException` },
        { type: `heading`, text: `Wildcards` },
        { type: `text`, text: `A method parameter of ArrayList<Object> cannot accept ArrayList<Integer> or ArrayList<String>, even though Object is a superclass of Integer and String. A wildcard represents an unknown type and lets the method read any such list as Object.` },
        { type: `code`, code: `public static void print(ArrayList<?> list) {
    for (Object o : list)
        System.out.println(o);
}

ArrayList<Integer> integers = new ArrayList<Integer>();
integers.add(1); integers.add(2);
ArrayList<String> strings = new ArrayList<String>();
strings.add("Bob"); strings.add("Paul");
print(integers);
print(strings);` },
        { type: `text`, text: `Diagram description: the wildcard slide uses the Cup<T> picture again, reinforcing that ? stands for an as-yet-unspecified contained type.` },
        { type: `code`, code: `// Upper bounded wildcard: Car or any subclass of Car
static void printCars(ArrayList<? extends Car> list) {
    // ...
}

// Lower bounded wildcard: Integer or any supertype of Integer,
// including Number and Object
static void printIntegers(ArrayList<? super Integer> list) {
    // ...
}` },
      ],
    },
    {
      id: `exceptions`,
      title: `Exceptions`,
      blocks: [
        { type: `heading`, text: `Defensive programming` },
        { type: `text`, text: `Defensive programming is a collection of techniques that reduces the risk of runtime failure. It makes software behave predictably despite unexpected input, user actions, and internal errors. Murphy's law says anything that can go wrong does; Finagle's law adds that it happens at the worst possible moment; Sod's law states the same idea. Hope for the best and expect the worst.` },
        { type: `text`, text: `The lecture uses a traffic signal and a falling-person hazard image as analogies for defensive behavior: anticipate unsafe conditions rather than assuming that every action proceeds normally.` },
        { type: `list`, items: [`Syntax errors are compile-time errors and are generally easiest to fix.`, `Runtime errors occur while the program runs when an impossible operation is detected; exception handling supports defensive programming for these.`, `Logical errors let the program run but produce an incorrect result and are generally hardest to fix.`] },
        { type: `heading`, text: `try, catch, and finally` },
        { type: `text`, text: `Put questionable code in a try block. A try must be immediately followed by catch handling, unlike an if without else. Catch blocks are selected by exception type and a try can have several. Once an exception is handled, execution continues after the catch. An optional finally block follows the catches and executes whether or not an exception occurred.` },
        { type: `code`, code: `try {
    statements;
}
catch (TheException ex) {
    // handle ex
}
finally {
    finalStatements;
}
// Next statement` },
        { type: `text`, text: `Execution trace when no exception occurs: run the try statements, run finally, then run the next statement. If statement2 throws Exception1, later try statements are skipped, the matching catch handles it, finally runs, and then the next statement runs.` },
        { type: `heading`, text: `Input mismatch example` },
        { type: `text`, text: `This input program is correct only while the user supplies an integer. A string or other invalid input causes Scanner.nextInt() to fail.` },
        { type: `code`, code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        System.out.println("Enter Integer Input");
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
    }
}` },
        { type: `text`, text: `The defensive version repeats the prompt until InputMismatchException is not raised. Its finally block prints on every attempt.` },
        { type: `code`, code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        boolean done = false;
        while (!done) {
            System.out.println("Enter Integer Input");
            try {
                Scanner sc = new Scanner(System.in);
                int num = sc.nextInt(); // exception point
                done = true;
            }
            catch (InputMismatchException inp) {
                System.out.println("Wrong input:");
                System.out.println("Try again");
            }
            finally {
                System.out.println("Always execute");
            }
        }
    }
}` },
        { type: `heading`, text: `Multiple and nested catches` },
        { type: `text`, text: `A single try can have different catches for the different failures it can raise. In this example, index 0 and 4 cause NumberFormatException, index 2 causes NullPointerException, and indexes above 4 cause ArrayIndexOutOfBoundsException.` },
        { type: `code`, code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        String[] s = {"a", "23", null, "4", "P"};
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            try {
                sum += (s[i].length() > 0) ?
                    Integer.parseInt(s[i]) : 0;
            }
            catch (NumberFormatException e) {
                System.out.println("Not an Integer");
            }
            catch (NullPointerException e) {
                System.out.println("NULL value found");
            }
            catch (ArrayIndexOutOfBoundsException e) {
                System.out.println("Index not in range");
            }
        }
    }
}` },
        { type: `text`, text: `No ordinary statement may appear between a try and its catch. The following is a compilation error: catch without try.` },
        { type: `code`, code: `try {
    int length = s.length();
}
System.out.println("Just before catch block"); // illegal here
catch (NullPointerException e) {
    System.out.println("String was null");
}` },
        { type: `text`, text: `try/catch blocks may be nested. In the example, Andy asks Wendy for water and fires Wendy if getADrink() returns null; in that catch he asks Johny, then fires Johny if that request is also null.` },
        { type: `code`, code: `public void getWater() {
    try {
        _water = _wendy.getADrink();
        int volume = _water.getVolume();
    }
    catch (NullPointerException e) {
        this.fire(_wendy);
        System.out.println("Wendy is fired!");
        try {
            _water = johny.getADrink();
            int volume = _water.getVolume();
        }
        catch (NullPointerException e2) {
            this.fire(johny);
            System.out.println("Johny is fired!");
        }
    }
}` },
        { type: `heading`, text: `Throwing and rethrowing` },
        { type: `text`, text: `Use throw to create an appropriate exception when a precondition is unmet. An optional but meaningful message is good practice. A caught exception can be rethrown, but it must eventually be handled or the program terminates abruptly.` },
        { type: `code`, code: `public void drinkWater() {
    try {
        getWater();
    }
    catch (NullPointerException e) {
        System.out.println(e.getMessage());
    }
}
public void getWater() {
    _water = _wendy.getADrink();
    if (_water == null) {
        this.fire(_wendy);
        System.out.println("Wendy is fired!");
        throw new NullPointerException("NO Water");
    }
}` },
        { type: `code`, code: `public void getWater() {
    try {
        _water = _wendy.getADrink();
        int volume = _water.getVolume();
    }
    catch (NullPointerException e) {
        this.fire(_wendy);
        System.out.println("Wendy is fired!");
        throw new NullPointerException("NO Water");
    }
}` },
        { type: `text`, text: `For a rethrown Exception2, execution is: statement2 throws Exception2; its catch handles it and executes throw ex; finally executes; then control transfers to the caller rather than to the next statement in this method.` },
        { type: `heading`, text: `How the Java Virtual Machine handles exceptions` },
        { type: `text`, text: `Each method invocation has a stack frame on the Java stack. A caller invokes a callee. A frame stores local variables, parameters, return values, intermediate calculations, and an exception table recording the instruction offsets of try, catch, and finally blocks. When an exception is thrown, the Java Virtual Machine first searches the current frame's table. If none matches, it ends that method and searches the caller's frame. If no frame handles it, it terminates and prints a stack trace.` },
        { type: `text`, text: `The exception hierarchy begins at Throwable. Its major branches are Error and Exception. Exception includes checked exceptions such as IOException, ClassNotFoundException, and CloneNotSupportedException, and RuntimeException with unchecked examples NullPointerException, ArrayIndexOutOfBoundsException, and NumberFormatException. Error includes examples OutOfMemoryError and StackOverflowError. Do not normally try to handle Error subclasses because there is usually little to do except notify the user and terminate gracefully.` },
        { type: `heading`, text: `Checked exceptions and throws` },
        { type: `text`, text: `Checked exceptions are checked at compile time to ensure that they are handled or declared. FileReader construction, ready(), read(), and close() can all throw checked exceptions in this method.` },
        { type: `code`, code: `import java.io.FileReader;
public class Tester {
    public int countChars(String fileName)
            throws FileNotFoundException, IOException {
        FileReader r = new FileReader(fileName);
        int total = 0;
        while (r.ready()) {
            r.read();
            total++;
        }
        r.close();
        return total;
    }
}` },
        { type: `text`, text: `throws passes responsibility to the calling method. Any caller must in turn catch the exception or declare it. Catch a more specific exception before a broader superclass: catching Exception before NullPointerException makes the latter catch unreachable.` },
        { type: `code`, code: `try {
    int length = s.length();
}
catch (Exception e) {
    System.out.println("Catch block -1");
}
catch (NullPointerException e) { // unreachable
    System.out.println("Catch block -2");
}` },
        { type: `heading`, text: `Throwable methods and overriding` },
        { type: `list`, items: [`toString() returns a short description.`, `getMessage() returns the detailed description.`, `printStackTrace() prints stack-trace information to the console.`] },
        { type: `code`, code: `public void getWater() {
    try {
        _water = _wendy.getADrink(); // null
        int volume = _water.getVolume();
    }
    catch (NullPointerException e) {
        e.printStackTrace();
    }
}
// java.lang.NullPointerException
//     at Andy.getWater(Andy.java:8)
//     at Andy.drinkWater(Andy.java:3)` },
        { type: `text`, text: `If a parent method declares an exception, its override need not declare it, though declaring the same one is permitted. An override cannot add a checked exception when its parent method declares none, but it can add an unchecked RuntimeException.` },
        { type: `code`, code: `public class Cloning {
    public void createClone() throws CloneNotSupportedException {
        System.out.println("Clone created");
    }
}
public class Human extends Cloning {
    @Override public void createClone() {
        System.out.println("Cloning not allowed");
    }
}

// Illegal if the parent declares no checked exception:
// public void createClone() throws CloneNotSupportedException { }
// Legal unchecked alternative:
// public void createClone() throws RuntimeException { }` },
        { type: `heading`, text: `Custom exceptions` },
        { type: `text`, text: `Define specialized exceptions for cases not covered by predefined ones. Because NoWaterException extends Exception rather than RuntimeException, methods that throw it must declare it with throws, and direct or indirect callers must catch or declare it.` },
        { type: `code`, code: `public class NoWaterException extends Exception {
    public NoWaterException(String message) {
        super(message);
    }
}
public class Andy {
    public void drinkWater() {
        try {
            getWater();
        }
        catch (NoWaterException e) {
            System.out.println(e.getMessage());
        }
    }
    public void getWater() throws NoWaterException {
        _water = _wendy.getADrink();
        if (_water == null) {
            this.fire(_wendy);
            throw new NoWaterException("NO Water");
        }
    }
}` },
        { type: `code`, code: `public void drinkWater() throws NoWaterException {
    getWater();
}
public static void main(String[] args) throws NoWaterException {
    Andy obj = new Andy();
    obj.drinkWater();
}
// If no catch occurs and water is null:
// Exception in thread "main" NoWaterException: NO Water` },
        { type: `text`, text: `Exceptions make code cleaner, preserve return values for meaningful data, and can factor reusable error handling into one class. They require extra computation, can become messy when overused, and can hide serious errors if broad catches accidentally swallow exceptions such as NullPointerException.` },
        { type: `heading`, text: `Assertions` },
        { type: `text`, text: `An assertion is a statement with a true-or-false value. Java syntax is assert assertion; or assert assertion : detailMessage;. The assertion is a Boolean expression and the detail message can be a primitive or object value.` },
        { type: `code`, code: `public class AssertionDemo {
    public static void main(String[] args) {
        int i; int sum = 0;
        for (i = 0; i < 10; i++) {
            sum += i;
        }
        assert i == 10;
        assert sum > 10 && sum < 5 * 10 : "sum is " + sum;
    }
}` },
        { type: `text`, text: `If an executed assertion is false, Java throws AssertionError. Assertions are disabled by default because constant checks cost runtime work. Enable them with java -ea AssertionDemo or java -enableassertions AssertionDemo.` },
        { type: `code`, code: `// Deliberately fails when assertions are enabled:
assert i != 10;
// Output:
// Exception in thread "main" java.lang.AssertionError
//     at AssertionDemo.main(AssertionDemo.java:7)` },
        { type: `text`, text: `Assertions do not replace exception handling. Exception handling addresses unusual circumstances and robustness; assertions reaffirm assumptions and address correctness. Both are checked at runtime, but assertions can be switched on or off for the entire execution.` },
      ],
    },
    {
      id: `collections`,
      title: `Collections`,
      blocks: [
        { type: `heading`, text: `The Java Collection Framework` },
        { type: `text`, text: `Arrays have fixed length, can waste memory, are awkward to grow or delete from, and raise questions about comparison and assignment. The Java Collection Framework, in java.util, is a unified architecture for representing and manipulating collections: objects that group multiple elements as one unit for storing, retrieving, manipulating, and transmitting data.` },
        { type: `list`, items: [`The framework consists of interfaces.`, `It includes implementations of those interfaces.`, `It supplies algorithms that operate on collections.`] },
        { type: `text`, text: `Diagram description: Iterable is at the top of the hierarchy; Collection extends it. Collection branches to List, Queue, and Set. List has implementations ArrayList, LinkedList, and Vector, with Stack extending Vector. Queue leads to PriorityQueue and Deque; Deque leads to ArrayDeque and is also implemented by LinkedList. Set has HashSet and LinkedHashSet, and extends to SortedSet, which has TreeSet. Solid arrows mean extends; dashed arrows mean implements.` },
        { type: `heading`, text: `Iterable and Iterator` },
        { type: `text`, text: `An interface may extend another interface. Flyable extends Moveable, so an Airplane implementing Flyable must provide moveLeft, moveRight, flyUp, and flyDown; a Car implementing Moveable supplies the movement methods only.` },
        { type: `code`, code: `public interface Moveable {
    public void moveLeft();
    public void moveRight();
}
public interface Flyable extends Moveable {
    public void flyUp();
    public void flyDown();
}
public class Airplane implements Flyable {
    public void moveLeft() { }
    public void moveRight() { }
    public void flyUp() { }
    public void flyDown() { }
}` },
        { type: `text`, text: `Iterable has one method, Iterator<E> iterator(). Objects whose classes implement it can be targets of foreach. An Iterator traverses a collection and can remove an element while traversing it.` },
        { type: `code`, code: `package java.lang;
public interface Iterable<E> {
    Iterator<E> iterator();
}` },
        { type: `list`, items: [`next() reads and returns the next element.`, `hasNext() says whether another element is available.`, `remove() removes the current element.`, `An iterator knows its position in the collection.`] },
        { type: `text`, text: `Diagram description: five element boxes are arranged left to right. The iterator cursor is between the first and second boxes, and a large curved arrow moves it forward past the second box. An arrow labels that second box as the returned element, showing that next() returns an element and advances the cursor.` },
        { type: `code`, code: `package java.util;
public interface Collection<E> extends Iterable<E> {
    int size();
    boolean isEmpty();
    boolean contains(Object o);
    boolean add(E e);
    boolean remove(Object o);
    boolean equals(Object o);
}` },
        { type: `code`, code: `public class SimpleCollection {
    public static void main(String[] args) {
        Collection c = new ArrayList();
        for (int i = 0; i < 10; i++) {
            c.add(i);
        }
        Iterator iter = c.iterator();
        while (iter.hasNext())
            System.out.println(iter.next());
    }
}` },
        { type: `heading`, text: `Lists` },
        { type: `text`, text: `Arrays cannot add, remove, or insert elements; lists are resizable-array-like structures that can. List<E> extends Collection<E>. It has both iterator() and listIterator().` },
        { type: `code`, code: `public interface List<E> extends Collection<E> {
    E get(int index);
    E set(int index, E element);
    void add(int index, E element);
    E remove(int index);
    ListIterator<E> listIterator();
}` },
        { type: `text`, text: `ListIterator extends Iterator. It can add before the current position, test hasPrevious(), and retrieve previous(). Unlike Iterator it can obtain indexes and traverse forward and backward, but it works only with List.` },
        { type: `list`, items: [`ArrayList has low-cost random access because it is backed by an array, but inserts and deletes are costly because elements may move.`, `LinkedList has inexpensive sequential traversal, insertion, and deletion, but random index access is costly because nodes must be traversed.`] },
        { type: `text`, text: `ArrayList has constant-time positional access. Its constructors are ArrayList() for an empty list with initial size 10, ArrayList(Collection c) initialized from c, and ArrayList(int initialCapacity). get, set, indexed add, and indexed remove may throw IndexOutOfBoundsException; ensureCapacity can resize in one operation; duplicates are allowed.` },
        { type: `code`, code: `public boolean add(E e) {
    ensureCapacity(size + 1);
    elementData[size++] = e;
    return true;
}
public void ensureCapacity(int minCapacity) {
    int oldCapacity = elementData.length;
    if (minCapacity > oldCapacity) {
        int newCapacity = /* calculate a larger capacity */;
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
}` },
        { type: `text`, text: `LinkedList stores each value in a node linked to both its next and previous nodes. Link updates make insertion and removal inexpensive. Its constructors are LinkedList() and LinkedList(Collection c); an initial-capacity constructor would not make sense because it is not array-backed. It also offers addFirst, addLast, getFirst, getLast, removeFirst, and removeLast.` },
        { type: `code`, code: `import java.util.*;
public class Book {
    private String name;
    private int pages;
    public Book(int p, String s) { /* ... */ }
    @Override public String toString() { return name; }
    public static void main(String[] args) {
        List<Book> list = new LinkedList<Book>();
        list.add(new Book(100, "ABC"));
        list.add(new Book(200, "DEF"));
        list.add(new Book(300, "GHI"));
        for (Book b : list) {
            System.out.println(b);
        }
    }
}` },
        { type: `heading`, text: `Sets` },
        { type: `text`, text: `Sets keep only unique elements. HashSet uses a hash table, with elements randomly ordered according to hash code. TreeSet uses a red-black ordered search tree and keeps elements in increasing order. Set has Collection's methods but a no-duplicates contract and does not guarantee order in its basic interface.` },
        { type: `text`, text: `HashSet finds and adds values quickly using hashing: hashCode() selects an index in an array of linked lists. TreeSet can receive elements in any order but stores them in natural order; user-defined elements must implement Comparable and provide compareTo.` },
        { type: `code`, code: `import java.util.*;
public class Book implements Comparable<Book> {
    private String name;
    private int pages;
    public Book(int p, String s) { /* ... */ }
    public int compareTo(Book b) {
        if (this.pages > b.pages) return 1;
        else if (this.pages < b.pages) return -1;
        else return 0;
    }
    public static void main(String[] args) {
        Set<Book> set = new TreeSet<Book>();
        set.add(new Book(100, "ABC"));
        set.add(new Book(200, "DEF"));
        for (Book b : set) System.out.println(b);
    }
}` },
        { type: `heading`, text: `Maps` },
        { type: `text`, text: `Maps store unique key-value pairs. A key occurs once and maps to one value; values need not be unique. HashMap stores pairs in a hash table with random hash-code order. TreeMap uses a red-black ordered search tree and orders entries incrementally by key.` },
        { type: `code`, code: `import java.util.*;
public class Book {
    private String name;
    private int pages;
    public Book(int p, String s) { /* ... */ }
    @Override public String toString() { return name; }
    public static void main(String[] args) {
        Map<Integer, Book> map = new HashMap<Integer, Book>();
        map.put(1, new Book(100, "ABC"));
        map.put(2, new Book(200, "DEF"));
        for (Map.Entry<Integer, Book> e : map.entrySet()) {
            System.out.println(e.getKey() + ":" + e.getValue());
        }
    }
}` },
      ],
    },
    {
      id: `streams-and-input-output`,
      title: `Streams and Input/Output`,
      blocks: [
        { type: `heading`, text: `Input and output streams` },
        { type: `text`, text: `A stream is a sequence of data, like flowing water, moving into or out of a program from a file, network, console, or other external source. An input stream reads data from a source one item at a time; an output stream writes data to a destination one item at a time.` },
        { type: `text`, text: `Diagram description: a data source connects by a flowing input stream into a Java program; arrows point toward the program. A second flowing output stream leads from the program to a data sink; arrows point away. The labels say the program reads from the input stream and/or writes to the output stream.` },
        { type: `text`, text: `A stream is continuous and does not permit moving back and forth as a file does. It lets the same streaming code work regardless of data location, such as a disk or network.` },
        { type: `heading`, text: `Byte and character streams` },
        { type: `list`, items: [`Byte streams operate on 8-bit bytes.`, `Character streams operate on 16-bit Unicode characters. Unicode consistently and uniquely encodes written-language characters and uses hexadecimal notation. This helps the Java Virtual Machine remain platform independent.`] },
        { type: `text`, text: `Diagram description: inside the Java program, character streams are Reader/Writer and handle 16-bit char data; byte streams are InputStream/OutputStream and handle 8-bit byte data. An input pipe points from an input source such as keyboard, file, network, or program to Java, while an output pipe points from Java to a console, file, network, or program. Internal formats include text Unicode UCS-2 and primitive values; external formats include encoded text and raw binary bytes.` },
        { type: `text`, text: `The java.io reading pattern is open a stream, repeatedly read while information remains, then close it. The writing pattern is open, repeatedly write, then close.` },
        { type: `text`, text: `OutputStream is the abstract parent of byte-output classes; it accepts output bytes and sends them to a sink. InputStream is the abstract parent of byte-input classes.` },
        { type: `code`, code: `public final class System {
    public static final InputStream in;
    public static final PrintStream out;
    public static final PrintStream err;
}
public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    while (in.hasNext()) {
        System.out.println(in.next());
    }
    in.close();
}` },
        { type: `text`, text: `Java automatically provides System.in for standard input, System.out for standard output, and System.err for standard error, all attached to the console. Scanner implements iterator behavior in the example: open, loop while more information exists, read or write, then close.` },
        { type: `heading`, text: `Byte-stream and character-stream examples` },
        { type: `text`, text: `InputStream.read() reads the next byte; OutputStream.write(int) writes one byte. Byte streams suit low-level input and output such as binary files.` },
        { type: `code`, code: `public static void main(String[] args) throws IOException {
    FileInputStream in = null;
    FileOutputStream out = null;
    try {
        in = new FileInputStream("input.txt");
        out = new FileOutputStream("output.txt");
        int c;
        while ((c = in.read()) != -1) {
            out.write(c);
        }
    }
    finally {
        if (in != null) in.close();
        if (out != null) out.close();
    }
}` },
        { type: `text`, text: `All character-stream classes descend from Reader and Writer and process text character by character. FileReader and FileWriter make the code nearly identical. The int holds a byte in its lowest 8 bits for the byte example and a character value in its lowest 16 bits for the character example.` },
        { type: `code`, code: `public static void main(String[] args) throws IOException {
    FileReader in = null;
    FileWriter out = null;
    try {
        in = new FileReader("input.txt");
        out = new FileWriter("output.txt");
        int c;
        while ((c = in.read()) != -1) {
            out.write(c);
        }
    }
    finally {
        if (in != null) in.close();
        if (out != null) out.close();
    }
}` },
        { type: `heading`, text: `Buffered and data streams` },
        { type: `text`, text: `Stream chains combine classes for advanced operations. Character-at-a-time disk reading is slow; reading a larger block then iterating is faster. BufferedReader reads lines. Unlike BufferedWriter, PrintWriter swallows exceptions and provides conveniences such as println().` },
        { type: `code`, code: `public static void main(String[] args) throws IOException {
    BufferedReader in = null;
    PrintWriter out = null;
    try {
        in = new BufferedReader(new FileReader("input.txt"));
        out = new PrintWriter(new FileWriter("output.txt"));
        String line;
        while ((line = in.readLine()) != null) {
            out.println(line);
        }
    }
    finally {
        if (in != null) in.close();
        if (out != null) out.close();
    }
}` },
        { type: `text`, text: `A Scanner around BufferedReader around FileReader parses each line into whitespace-separated tokens.` },
        { type: `code`, code: `Scanner in = new Scanner(
    new BufferedReader(new FileReader("input.txt")));
PrintWriter out = new PrintWriter(new FileWriter("output.txt"));
while (in.hasNext()) {
    out.println(in.next());
}` },
        { type: `text`, text: `Data streams support binary input and output of primitive values. Output is not human-readable but reading it back is faster than parsing text. DataOutputStream implements DataOutput and DataInputStream implements DataInput. End of file is detected by catching EOFException rather than testing an invalid return.` },
        { type: `code`, code: `int[] empid = {1, 2, 3};
String[] name = {"John", "Joe", "Amy"};
DataOutputStream out = null;
try {
    out = new DataOutputStream(new BufferedOutputStream(
        new FileOutputStream("output.txt")));
    for (int i = 0; i < empid.length; i++) {
        out.writeInt(empid[i]);
        out.writeUTF(name[i]);
    }
}
catch (EOFException e) {
    // do nothing
}
finally {
    out.close();
}` },
        { type: `heading`, text: `Directories` },
        { type: `text`, text: `File can create directories and list their contents: mkdir() makes one directory, mkdirs() makes an entire directory structure, and list() lists names under a directory.` },
        { type: `code`, code: `public static void main(String[] args) {
    String dirname = "/tmp/vivek"; // works on Windows too
    File f = new File(dirname);
    f.mkdirs();
    String[] paths = (new File("/tmp")).list();
    for (String path : paths) {
        System.out.println(path);
    }
}` },
        { type: `heading`, text: `Serialization and deserialization` },
        { type: `text`, text: `Serialization writes the state of an object, not its class file, into a byte stream. Deserialization reverses it. Uses include storing live objects in a file, hibernating applications, and moving object state across a network, also called marshaling. Diagram description: an Object circle and a Stream circle have two large curved arrows in opposite directions, representing serialization to a stream and deserialization back to an object.` },
        { type: `text`, text: `java.io.Serializable is an empty marker, or tag, interface. A serializable class must implement it; the marker is a hint to the Java Virtual Machine, like Cloneable.` },
        { type: `code`, code: `import java.io.*;
class Manager implements Serializable {
    private String name;
    public Manager(String n) { /* ... */ }
}
public class Main {
    public static void serialize() throws IOException {
        Manager s1 = new Manager("Amy");
        ObjectOutputStream out = null;
        try {
            out = new ObjectOutputStream(new FileOutputStream("out.txt"));
            out.writeObject(s1);
        }
        finally { out.close(); }
    }
    public static void deserialize()
            throws IOException, ClassNotFoundException {
        ObjectInputStream in = null;
        try {
            in = new ObjectInputStream(new FileInputStream("out.txt"));
            Manager s1 = (Manager) in.readObject();
        }
        finally { in.close(); }
    }
    public static void main(String[] args)
            throws IOException, ClassNotFoundException {
        serialize();
        deserialize();
    }
}` },
        { type: `text`, text: `A client that only deserializes still needs Manager.class on its classpath; otherwise readObject at the cast raises ClassNotFoundException.` },
        { type: `heading`, text: `Serialization rules` },
        { type: `text`, text: `Every Manager field must be primitive or serializable. The following compiles but throws NotSerializableException unless Address implements Serializable.` },
        { type: `code`, code: `class Address {
    private String city;
    public Address(String c) { /* ... */ }
}
class Manager implements Serializable {
    private String name;
    private Address addr;
    public Manager(String n, String city) { /* ... */ }
}` },
        { type: `text`, text: `If a serializable Manager extends a nonserializable Employee, deserialization needs Employee to have a default constructor. Alternatively, and more safely, make Employee implement Serializable; then subclasses do not need to state it again.` },
        { type: `code`, code: `class Employee {
    private String address;
    public Employee(String a) { /* ... */ }
}
class Manager extends Employee implements Serializable {
    private String name;
    public Manager(String n, String city) { /* ... */ }
}` },
        { type: `text`, text: `Static fields describe class state rather than an object's state, so serializing them has no point. Mark a field transient when it must not be serialized.` },
        { type: `text`, text: `The compiler can warn that a serializable class lacks serialVersionUID. The Java Virtual Machine generates one, but declaring your own static final long value is advisable. It verifies compatibility with the class at deserialization; a changed class, such as one with added fields, can otherwise cause InvalidClassException.` },
        { type: `code`, code: `private static final long serialVersionUID = 42L;` },
      ],
    },
    {
      id: `uml-modelling-classes-and-relationships`,
      title: `UML: Modelling Classes and Relationships`,
      blocks: [
        { type: `heading`, text: `Purpose of Unified Modeling Language` },
        { type: `text`, text: `Unified Modeling Language, or UML, is a widely used software-engineering modeling language for analyzing, designing, and implementing software-based systems. It uses diagrams to give a project its big picture, help create efficient, effective, correct object-oriented designs, and communicate clearly with stakeholders such as developers and customers.` },
        { type: `text`, text: `Diagram description: a development flow reads Analysis, then Design, then Implementation, then Testing, each connected by a downward arrow. Analysis asks what to do, including corner cases and exact functionality; design defines classes, attributes, methods, objects, and relationships; implementation is programming; testing seeks a program free of errors.` },
        { type: `text`, text: `The lecture covers class diagrams, use-case diagrams, and sequence diagrams. A class diagram represents static structure. A use-case diagram shows actions a system performs to yield an observable result for an actor. A sequence diagram shows how object groups interact in behavior.` },
        { type: `heading`, text: `Class diagrams` },
        { type: `text`, text: `A class diagram is better called a static-structure diagram: it does not describe time and does not represent individual objects, only the overall structure. Object diagrams use boxes for instances but are rare and not covered here.` },
        { type: `text`, text: `A UML class is a rectangle with three compartments: class name; attributes or data members; and operations or methods. Private is -, public is +, protected is #, static members are underlined, and abstract class or method names are italic.` },
        { type: `list`, items: [`Employee class name.`, `Attributes: -Name: String, +ID: long, and #Salary: double.`, `Operations: +getName: String, +setName(), and -calcInternalStuff(in x: byte, in y: decimal).`] },
        { type: `text`, text: `Diagram description: three alternative class boxes show increasing detail. The first contains only Window. The second adds size: Area and visibility: Boolean, followed by display() and hide(). The third adds Window metadata: abstract, author=Joe, status=(tested); public size and visibility; protected defaultsize and maximum-size; private xptr; and operations +display(), +hide(), +create(), and -attachWindow(xwin: Xwindow). Use the appropriate level of detail for the project.` },
        { type: `heading`, text: `Relationships and multiplicity` },
        { type: `text`, text: `Class diagrams can express association, composition, dependency, and inheritance. A binary association is two-way: both entities know about each other. Example class A has private myB: B and public doSomething(); class B has private myA: A and public service().` },
        { type: `list`, items: [`0..1 means zero or one instance.`, `0..* or * means any number, including none.`, `1 means exactly one.`, `1..* means at least one.`, `n..m means from n through m instances.`] },
        { type: `text`, text: `Links on associations add relationship detail and should correspond to the implementation. Diagram description: Company has name: String and employees: List; it worksFor Employee. The association says one Company employs 1..* Employees, while each Employee has one employer. Employee has name, employeeNumber, salary, and manager. Manager and Contractor inherit from Employee; Manager has manages: List and a supervises association to 1..* Employees. The slide notes that a list of Managers in Employee and a list of Companies are missing.` },
        { type: `text`, text: `Exceptions can be modeled as classes. Diagram description: MyException has a hollow-triangle generalization arrow upward to java.lang.Exception. MyClass has a dashed dependency arrow labelled <<throws>> pointing to MyException.` },
        { type: `text`, text: `Interfaces are distinguished from classes by the <<interface>> stereotype and realization notation. Diagram description: <<interface>> Owner declares +acquire(property) and +dispose(property). Person and Corporation have dashed lines with hollow triangular heads pointing to Owner, meaning they realize the interface. Person lists private real, tangible, and intangible fields; Corporation lists private current, fixed, longTerm, and intangible fields.` },
        { type: `heading`, text: `Use cases` },
        { type: `text`, text: `Use cases capture requirements early in analysis, provide a high-level system overview, and are usually created before class diagrams. They document interactions between users and the system. An actor is outside the system, though it may itself be another system. Use cases emphasize what the system does, not how.` },
        { type: `text`, text: `An actor is a human, peripheral device, external system or subsystem, or time-based event that seeks value from interaction. Label it with a descriptive noun or phrase and draw it as a stick figure.` },
        { type: `text`, text: `For the scenario where a patient calls a clinic for a yearly-checkup appointment and a receptionist finds the nearest empty slot, the actor is Patient and the use case is Make Appointment. Diagram description: a Patient stick figure at left connects by a plain communication line to an oval labelled Make Appointment at right.` },
        { type: `text`, text: `A use-case diagram collects actors, use cases, and communications. Actors are stick figures; use cases are ovals labelled with a descriptive verb-noun phrase; communication is a line between them; a boundary rectangle encloses the system and indicates how actors communicate with it.` },
        { type: `text`, text: `Diagram description: an Appointment System rectangle contains the ovals Make appointment, Produce schedule information, and Record availability. Patient outside at right connects to Make appointment, with * multiplicities at both ends. Management outside at left connects to Produce schedule information, and Doctor connects to Record availability. This shows actors and all use cases inside the boundary.` },
        { type: `heading`, text: `Use-case relationships` },
        { type: `list`, items: [`Association connects an actor to a use case using a solid line without arrowhead; it says the actor can use system functionality and can show multiplicity.`, `Generalization can be between two actors or two use cases. A solid line with a hollow triangular arrow goes from child to parent.`, `<<extend>> exists only between use cases and represents an optional or seldom-invoked variation with much shared behavior; a dashed arrow points toward the extended use case.`, `<<include>> exists only between use cases and factors out behavior that is not necessarily optional; a dashed arrow points toward the included use case.`] },
        { type: `text`, text: `Diagram description: Caller communicates with Place Call and Callee communicates with Place Call. Place Conference Call has a dashed <<extend>> arrow to Place Call. Show Caller Identity also has a dashed <<extend>> arrow to Place Call. Callee communicates with Place Conference Call and with Show Caller Identity. Both optional variations point toward the base Place Call use case.` },
        { type: `text`, text: `Diagram description: Registration and Get help on registration are ovals. A dashed arrow labelled <<extend>> points from Get help on registration to Registration, showing optional help extending registration.` },
        { type: `text`, text: `Diagram description: Checkout has dashed <<include>> arrows to Scan Item, Calculate Total and Tax, and Payment. This means each named behavior is factored out and included by Checkout. A second example has Deposit Funds and Withdraw Cash each including Customer Authentication.` },
        { type: `text`, text: `Diagram description: a complete Checkout subsystem boundary contains Help, Checkout, Payment, and Manage Users. Customer associates with Checkout at multiplicity 1..* and Clerk associates with Checkout. Help has a dashed <<extend>> arrow to Checkout; Checkout has a dashed <<include>> arrow to Payment. Payment connects to an external Payment Service with 0..* at Payment and 1 at the service. Administrator associates with Manage Users. Star Customer generalizes to Customer using a hollow triangle pointing to Customer.` },
      ],
    },
    {
      id: `javafx-and-event-driven-programming`,
      title: `JavaFX and Event-Driven Programming`,
      blocks: [
        { type: `heading`, text: `Graphical user interfaces and JavaFX` },
        { type: `text`, text: `A graphical user interface, or GUI, provides user-friendly human interaction. Java GUI programming has included the Abstract Window Toolkit, Swing, JavaFX Script, and the JavaFX library. GUI examples include windows, controls, games, and dialogs; their visual appearance is not required to understand the programming model.` },
        { type: `text`, text: `A GUI loops and responds to events. Diagram description: a flowchart starts with Construct GUI Components, then Render GUI, then Check to see if any input, then Respond to user input, and returns to Render GUI. A framework supplies ready-made visible, interactive, customizable components so developers do not need to implement windows themselves.` },
        { type: `text`, text: `JavaFX simplifies complex graphically rich client applications and provides application programming interfaces for graphics, media, web content, and user-interface controls.` },
        { type: `text`, text: `Diagram description: JavaFX Public APIs and Scene Graph are the top layer. Quantum Toolkit is immediately beneath. Below it are Prism, Glass Windowing Toolkit, Media Engine, and Web Engine. Prism rests on Java 2D, OpenGL, and D3D. All rest on the Java Virtual Machine. Glass provides native operating services such as windows and timers; Prism is a graphics pipeline using hardware or software renderers; Quantum joins Prism and Glass for the JavaFX APIs.` },
        { type: `heading`, text: `Stage, scene, parent, and node` },
        { type: `text`, text: `Stage is JavaFX's top-level container. Scene contains all scene-graph content. Application is the abstract entry point: it executes the application and processes input events; the programmer overrides start. Components can be added programmatically through a Parent and Node.` },
        { type: `code`, code: `Parent p;
Node n;
p.getChildren().add(n);` },
        { type: `text`, text: `Diagram description: nested rectangles label the outermost container Stage, inside it Scene, then Parent such as a Pane or Control, and inside the parent individual Nodes. This is the containment order of a scene graph.` },
        { type: `heading`, text: `Hello World and lifecycle` },
        { type: `text`, text: `A JavaFX main class extends javafx.application.Application. launch(args) starts the runtime, and start(Stage) is the required application entry method.` },
        { type: `code`, code: `public class HelloWorld extends Application {
    public static void main(String[] args) {
        launch(args);
    }
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("MyJavaFX");
        Button btn = new Button("Hello World");
        Scene scene = new Scene(btn, 200, 250);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}` },
        { type: `text`, text: `The runtime constructs the specified Application, calls its concrete init(), calls the overridden start(javafx.stage.Stage), waits for the application to finish, then calls concrete stop(). Diagram description: the Hello World result is a window titled MyJavaFX containing the text Hello World.` },
        { type: `heading`, text: `Putting a button in a pane` },
        { type: `code`, code: `public class ButtonInPane extends Application {
    public static void main(String[] args) {
        launch(args);
    }
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Button in a Pane");
        Button btn = new Button("OK");
        StackPane pane = new StackPane();
        pane.getChildren().add(btn);
        Scene scene = new Scene(pane, 200, 50);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
}` },
        { type: `text`, text: `Diagram description: the resulting small window titled Button in a Pane has one centered button labelled OK. A scene-graph diagram places that button node inside the parent pane, inside the scene, inside the stage.` },
        { type: `heading`, text: `Scene Builder and FXML` },
        { type: `text`, text: `Scene Builder is a graphical interface for designing interfaces, placing components, and changing many properties. It saves a layout as an FXML file, which Java can read to create the GUI. Diagram description: its window presents a component library at left, a hierarchy tree below, a central design canvas with an AnchorPane and button, and an Inspector panel at right with properties, layout, code, and style controls.` },
        { type: `text`, text: `JavaFX is a pure Java API, but FXML lets layout be specified separately from controlling code. The following two examples both make a circle.` },
        { type: `code`, code: `public class JavaFXTest extends Application {
    @Override public void start(Stage stage) {
        stage.setTitle("FXML Example");
        Group root = new Group();
        Circle c1 = new Circle(50.0f, 50.0f, 50.0f, Color.RED);
        root.getChildren().add(c1);
        stage.setScene(new Scene(root, 100, 100));
        stage.show();
    }
    public static void main(String[] args) {
        launch(args);
    }
}` },
        { type: `code`, code: `<BorderPane>
  <center>
    <Circle radius="50" centerX="50" centerY="50"/>
  </center>
</BorderPane>

public class JavaFXTest extends Application {
    @Override public void start(Stage stage) {
        stage.setTitle("FXML Example");
        Parent root = FXMLLoader.load(getClass().getResource("example.fxml"),
            ResourceBundle.getBundle("r.fxml_example"));
        stage.setScene(new Scene(root));
        stage.show();
    }
    public static void main(String[] args) {
        launch(args);
    }
}` },
        { type: `text`, text: `The circle example renders a window containing one large solid red circle. This screenshot is represented by that complete textual description.` },
        { type: `heading`, text: `JavaFX controls` },
        { type: `text`, text: `Diagram description: the control inheritance tree starts at Node, then Parent, then Control. Control branches to Labeled, TextInputControl, ListView, and ComboBoxBase. Labeled leads to ButtonBase and Label; ButtonBase leads to Button, CheckBox, and ToggleButton, while RadioButton extends ToggleButton. TextInputControl leads to TextArea and TextField, and PasswordField extends TextField. ComboBox extends ComboBoxBase. Other shown Parent children are ImageView and MediaView; other Controls shown include ScrollBar and Slider.` },
        { type: `text`, text: `The controls gallery illustrates examples including Accordion, Check Boxes, Color Button, Graphic Button, Hyperlink, Radio Buttons, Toggle Button, Choice Box, Horizontal List View, Simple List View, Progress Bar, Progress Indicator, Scroll Bar, Table, Tab, Label, Text Field, Tool Bar, and Tree View.` },
        { type: `heading`, text: `Event-driven programming` },
        { type: `text`, text: `Procedural programming executes in statement order. Event-driven programming executes code when events are activated. Operating systems continually monitor events such as keystrokes and mouse clicks, sort them, and report them to the appropriate program.` },
        { type: `list`, items: [`For each control, define an event handler.`, `Construct an event-handler instance.`, `Tell the control which handler it has.`, `An event handler, also called an event listener, is code responding to an event.`] },
        { type: `text`, text: `An event source is a GUI control such as a Button or ChoiceBox. Sources can detect different event types and register different listener types. When a user interacts with a source, JavaFX constructs an event object containing information such as mouse location and source, sends it to registered listeners, and the listener responds as defined.` },
        { type: `code`, code: `public class HelloWorld extends Application {
    public static void main(String[] args) { launch(args); }
    @Override public void start(Stage primaryStage) {
        primaryStage.setTitle("Hello World!");
        Button btn = new Button("Say Hello World");
        btn.setOnAction(new HelloEvent());
        StackPane pane = new StackPane();
        pane.getChildren().add(btn);
        primaryStage.setScene(new Scene(pane, 200, 50));
        primaryStage.show();
    }
}
class HelloEvent implements EventHandler<ActionEvent> {
    @Override public void handle(ActionEvent event) {
        System.out.println("Hello World!");
    }
}` },
        { type: `text`, text: `Diagram description: a button is the event source object; clicking it fires an action event, represented by an event object; an arrow then reaches the handler, the event-handler object that processes the event. A listener is defined by the application programmer, implements the appropriate interface, and supplies all required response methods through inheritance and polymorphism.` },
        { type: `heading`, text: `Making handlers more concise` },
        { type: `text`, text: `An inner class is defined in another class's scope and can directly access every member of the enclosing class, including private members. It supports logical grouping, encapsulation, readability, and maintainability.` },
        { type: `code`, code: `public class HelloWorld extends Application {
    @Override public void start(Stage primaryStage) {
        Button btn = new Button("Say Hello World");
        btn.setOnAction(new HelloEvent());
        // create pane, scene, and show stage
    }
    class HelloEvent implements EventHandler<ActionEvent> {
        @Override public void handle(ActionEvent event) {
            System.out.println("Hello World!");
        }
    }
}` },
        { type: `text`, text: `An anonymous inner class declares and instantiates a class in one step. It must extend a superclass or implement an interface, but has no explicit extends or implements clause; it implements all required abstract methods and uses the superclass no-argument constructor.` },
        { type: `code`, code: `Button btn = new Button("Say Hello World");
btn.setOnAction(new EventHandler<ActionEvent>() {
    @Override
    public void handle(ActionEvent event) {
        System.out.println("Hello World!");
    }
});` },
        { type: `text`, text: `A Java 8 lambda is a concise anonymous method. It represents the statements for one method, so the target interface must contain exactly one method for the compiler to infer the intended method.` },
        { type: `code`, code: `Button btn = new Button("Say Hello World");
btn.setOnAction(e -> {
    System.out.println("Hello World!");
});` },
        { type: `heading`, text: `Lambdas with collections` },
        { type: `text`, text: `Before Java 8, iterating a map required an explicit entry loop. Java 8 forEach plus a lambda makes this compact, permits additional statements, and may explicitly declare parameter types.` },
        { type: `code`, code: `public class Test {
    Map<String, Integer> items = new HashMap<String, Integer>();
    public void print() {
        for (Map.Entry<String, Integer> entry : items.entrySet()) {
            System.out.println(entry.getKey() + ", " + entry.getValue());
        }
    }
}` },
        { type: `code`, code: `items.forEach((k, v) -> {
    System.out.println(k + ", " + v);
});

items.forEach((String k, Integer v) -> {
    if ("ABC".equals(k)) {
        System.out.println("Hello ABC!");
    }
    System.out.println(k + ", " + v);
});` },
      ],
    },
  ],
};
