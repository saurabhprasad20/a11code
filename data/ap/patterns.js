export const patternsCourse = {
  id: `design-patterns-in-java`,
  title: `Design Patterns in Java`,
  description: `This advanced course introduces sixteen Gang of Four design patterns through Java examples, including the concurrency recap that leads into the topic. It explains the problem, structure, implementation, and appropriate use of each pattern in clear linear language designed for screen-reader study.`,
  level: `Advanced`,
  chapters: [
    {
      id: `design-patterns-part-1`,
      title: `Design Patterns, Part 1`,
      blocks: [
        { type: `heading`, text: `Deadlocks recap` },
        { type: `text`, text: `A critical section is a block of code that accesses shared, modifiable data or a shared resource and should be operated on by only one thread at a time. Mutual exclusion is the property that ensures that only one thread executes a critical section at a time. Each object has a monitor, a token which determines which application thread controls that object instance. Producer-consumer transactions need synchronization.` },
        { type: `text`, text: `Diagram description: a producer thread and a consumer thread share one lock object. The consumer enters synchronized(lock), calls lock.wait(), and later consumes the resource. The producer enters synchronized(lock), produces the resource, and calls lock.notify(). The consumer then reacquires the lock and returns from wait. The diagram illustrates the ordered handoff through the same monitor.` },
        { type: `text`, text: `A deadlock occurs when multiple threads need the same set of locks but obtain them in different orders. The deadlock image is decorative, but the bank-account example below shows the actual circular wait.` },
        { type: `heading`, text: `A bank-transfer deadlock` },
        { type: `code`, code: `public class BankAccount {
    private volatile float balance;
    public synchronized void deposit(float amount) {
        balance += amount;
    }
    public synchronized void withdraw(float amount) {
        balance -= amount;
    }
    public synchronized void transfer(float amount,
                BankAccount target) {
        withdraw(amount);
        target.deposit(amount);
    }
}
public class MoneyTransfer implements Runnable {
    private BankAccount source, target;
    private float amount;
    public MoneyTransfer(BankAccount from,
                      BankAccount to, float amount) {
        this.source = from;
        this.target = to;
        this.amount = amount;
    }
    public void run() {
        source.transfer(amount, target);
    }
}
BankAccount aliceAccount = new BankAccount();
BankAccount bobAccount = new BankAccount();
...
// At one place
Runnable transaction1 = new MoneyTransfer(aliceAccount, bobAccount, 1200);
Thread t1 = new Thread(transaction1);
t1.start();
// At another place
Runnable transaction2 = new MoneyTransfer(bobAccount, aliceAccount, 700);
Thread t2 = new Thread(transaction2);
t2.start();` },
        { type: `text`, text: `Diagram description: thread t1 transfers from aliceAccount to bobAccount and first obtains Alice's monitor to withdraw, then needs Bob's monitor to deposit. At the same time, t2 transfers from Bob to Alice and first obtains Bob's monitor, then needs Alice's monitor. Each waits for the other, so neither can continue.` },
        { type: `heading`, text: `Avoiding deadlocks with lock ordering` },
        { type: `list`, items: [`Lock ordering: ensure every thread takes a given set of locks in the same order.`, `Lock timeout: put a timeout on lock attempts. Monitor locks cannot do this; use java.util.concurrent.ReentrantLock when lock timeouts are needed.`, `Deadlock avoidance is not easy and remains an active research area.`] },
        { type: `code`, code: `public class BankAccount {
    private volatile float balance;
    final int account_id;
    public BankAccount(int i) { account_id = i; }
    public synchronized void deposit(float amount) {
        balance += amount;
    }
    public synchronized void withdraw(float amount) {
        balance -= amount;
    }
    public synchronized void transfer(float amount,
                BankAccount target) {
        withdraw(amount);
        target.deposit(amount);
    }
}
BankAccount aliceAccount = new BankAccount(1); // account_id = 1;
BankAccount bobAccount = new BankAccount(2);   // account_id = 2;
...
// At one place
Runnable transaction1 = new MoneyTransfer(aliceAccount, bobAccount, 1200);
Thread t1 = new Thread(transaction1);
t1.start();
// At another place
Runnable transaction2 = new MoneyTransfer(bobAccount, aliceAccount, 700);
Thread t2 = new Thread(transaction2);
t2.start();
public class MoneyTransfer implements Runnable {
    private BankAccount source, target;
    private float amount;
    public MoneyTransfer(BankAccount from,
                      BankAccount to, float amount) {
        this.source = from;
        this.target = to;
        this.amount = amount;
    }
    public void run() {
        Object obj1 = null, obj2 = null;
        if(source.account_id > target.account_id) {
            obj1=target; obj2=source;
        }
        else { obj1=source; obj2=target; }
        synchronized(obj1) { synchronized(obj2) {
                source.transfer(amount, target);
        } }
    }
}` },
        { type: `text`, text: `This solution takes BankAccount locks in ascending account_id order in run(), regardless of transfer direction. Monitor locks are reentrant, so transfer can enter its synchronized methods after those outer locks have been acquired.` },
        { type: `heading`, text: `What is a design pattern?` },
        { type: `text`, text: `A design pattern is a solution to a repeatable software-design problem. It is not a complete design that can be directly transformed into code; it is a description or template that can be applied in many situations.` },
        { type: `list`, items: [`Patterns reuse tried and proven solutions, provide a head start, avoid later surprises, and avoid reinventing the wheel.`, `They establish common terminology: it is easier to say “We could use Strategy here.”`, `They provide a higher-level perspective and free us from dealing with details too early.`] },
        { type: `text`, text: `The Gang of Four, Gamma, Helm, Johnson, and Vlissides, catalogued patterns in the 1990 book Design Patterns: Elements of Reusable Object-Oriented Software. Creational patterns abstract instantiation: Factory Method, Abstract Factory, Singleton, Builder, Prototype. Structural patterns combine objects or classes: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy. Behavioral patterns communicate between objects: Command, Interpreter, Iterator, Mediator, Observer, State, Strategy, Chain of Responsibility, Visitor, Template Method.` },
        { type: `heading`, text: `Iterator pattern` },
        { type: `text`, text: `Problem: how can client code loop over every object in any collection without changing when the collection representation changes?` },
        { type: `text`, text: `Structure and solution: every data structure supplies a standard iterator object. Its implementation knows the collection representation, performs traversal and bookkeeping, and communicates results through a standard iterator interface. The client depends on that common interface rather than the collection internals.` },
        { type: `text`, text: `Use Iterator when client code must traverse heterogeneous collection implementations using the same operations. A consequence is that collection details can change without changing traversal code.` },
        { type: `heading`, text: `Singleton pattern` },
        { type: `text`, text: `Problem: sometimes exactly one instance of a class is needed and creating another must be illegal. The Singleton pattern ensures at most one instance and provides global access to it.` },
        { type: `text`, text: `Diagram description: a Singleton Class contains one static “My Object”, has a private constructor, and exposes a static method. Client objects C1, C2, and C3 cannot call the private constructor; arrows from all clients lead instead to the static method and the one shared object. A second diagram shows several clients sending requests to one Singleton Service Instance, which accesses a database.` },
        { type: `list`, items: [`Make the constructor private so clients cannot call it from outside.`, `Declare one private static instance field.`, `Write getInstance(), or a similar method, for access.`, `Ensure getInstance() is thread-safe when multiple threads can call it.`] },
        { type: `code`, code: `public class RandomGenerator {
    private static RandomGenerator gen = null;
    public static RandomGenerator getInstance()
    {
        if (gen == null) {
            gen = new RandomGenerator();
        }
        return gen;
    }
    private RandomGenerator() {}
    ...
}` },
        { type: `text`, text: `This is lazy initialization: the random generator is created only when a client asks. Clients call getInstance rather than the constructor and share the generator. In multithreaded use, the null check and creation must be made thread-safe.` },
        { type: `code`, code: `public class LengthComparator
        implements Comparator<String> {
    private static LengthComparator comp = null;
    public static LengthComparator getInstance()
    {
        if (comp == null) {
            comp = new LengthComparator();
        }
        return comp;
    }
    private LengthComparator() {}
    public int compare(String s1, String s2) {
        return s1.length() - s2.length();
    }
}` },
        { type: `text`, text: `Comparators with no state are good singletons: the shared comparator saves memory because more than one object cannot be created.` },
        { type: `heading`, text: `Flyweight pattern` },
        { type: `text`, text: `Problem: redundant objects can bog down a system when many objects have the same state. For example, repeatedly constructing new File("chatlog.txt") objects or new Date(4, 18) objects creates equivalent values.` },
        { type: `text`, text: `Solution and structure: Flyweight assures that no more than one instance has identical state by caching identical instances. It resembles Singleton, but has one instance for each unique state rather than one instance for the entire class. A factory-style getInstance(key) checks a map, creates the object only when absent, and returns the cached object.` },
        { type: `code`, code: `public class Flyweighted {
    private static Map<KeyType, Flyweighted> instances
             = new HashMap<KeyType, Flyweighted>();
    private Flyweighted(...) { ... }
    public static Flyweighted getInstance(KeyType key) {
        if (!instances.contains(key)) {
            instances.put(key, new Flyweighted(key));
        }
        return instances.get(key);
    }
}` },
        { type: `code`, code: `public class Point {
    private int x, y;
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    public int getX() { return x; }
    public int getY() { return y; }
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}

public class Point {
    private static Map<String, Point> instances =
        new HashMap<String, Point>();
    public static Point getInstance(int x, int y)
    {
        String key = x + ", " + y;
        if (!instances.containsKey(key)) {
            instances.put(key, new Point(x, y));
        }
        return instances.get(key);
    }
    private final int x, y;  // immutable
    private Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    public int getX() { return x; }
    public int getY() { return y; }
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}` },
        { type: `text`, text: `The first Point design permits duplicate points. The flyweighted version makes x and y immutable, makes its constructor private, and caches points by the coordinate-string key. Use Flyweight when there are many instances but many are equivalent.` },
        { type: `text`, text: `The Java Virtual Machine automatically flyweights String objects whenever possible using the string constant pool. The pool starts empty and is filled during the Java Virtual Machine lifecycle. Two variables pointing to the same literal, or literal concatenation that matches a literal, can share one String.` },
        { type: `code`, code: `String a = "neat";
String b = "neat";
String c = "n" + "eat";` },
      ],
    },
    {
      id: `design-patterns-part-2`,
      title: `Design Patterns, Part 2`,
      blocks: [
        { type: `heading`, text: `Adapter pattern` },
        { type: `text`, text: `Problem: an object contains functionality that is needed, but not in the interface the client expects. The Adapter pattern creates an object that bridges the provided functionality and the desired interface.` },
        { type: `text`, text: `Diagram description: without an adapter, the client system’s connector does not fit the vendor class’s connector. With an Adapter inserted between them, the existing system connects to the adapter and the adapter connects to the vendor class. In the Java UML, Movable declares move(); Car and Bike implement Movable. Flyable declares fly(); Airplane and Drone implement Flyable. FlyableAdapter implements Movable, contains a Flyable field, and adapts move() by calling that field’s fly().` },
        { type: `code`, code: `public class Vehicle {
  public static void main(String[] args) {
    List<Movable> mylist = new ArrayList<Movable>();
    mylist.add(new Car());
    mylist.add(new Bike());
    for(Movable obj: mylist) {
        obj.move();
    }
  }
}
public interface Movable {
    public void move();
}
public class Car implements Movable {
    public void move() {
       System.out.println("Car is moving");
    }
}
public class Bike implements Movable {
    public void move() {
       System.out.println("Bike is moving");
    }
}
public interface Flyable {
   public void fly();
}
public class Airplane implements Flyable {
   public void fly() {
      System.out.println("Airplane is flying");
   }
}
public class Drone implements Flyable {
   public void fly() {
      System.out.println("Drone is flying");
   }
}` },
        { type: `text`, text: `Here Vehicle understands only Movable and uses a List<Movable>. Flyable is the adaptee interface: fly() is similar in purpose to move(), but it is not the method Vehicle expects. The problem is adding Flyable objects to the Movable list without changing the existing client or adaptee.` },
        { type: `code`, code: `public class Vehicle {
  public static void main(String[] args) {
    List<Movable> mylist = new ArrayList<Movable>();
    mylist.add(new Car());
    mylist.add(new Bike());
    mylist.add(new FlyableAdapter(new Airplane()));
    mylist.add(new FlyableAdapter(new Drone()));
    for(Movable obj: mylist) {
        obj.move();
    }
  }
}
public class FlyableAdapter implements Movable {
    Flyable type;
    public FlyableAdapter(Flyable type) {
        this.type = type;
    }
    public void move() {
        type.fly();
    }
}
public interface Movable {
    public void move();
}
public class Car implements Movable {
    public void move() {
       System.out.println("Car is moving");
    }
}
public class Bike implements Movable {
    public void move() {
       System.out.println("Bike is moving");
    }
}
public interface Flyable {
   public void fly();
}
public class Airplane implements Flyable {
   public void fly() {
      System.out.println("Airplane is flying");
   }
}
public class Drone implements Flyable {
   public void fly() {
      System.out.println("Drone is flying");
   }
}` },
        { type: `text`, text: `Use Adapter when code must reuse an existing class whose interface does not match the client’s required interface. The adapter lets the client remain programmed to its expected supertype.` },
        { type: `heading`, text: `Strategy pattern` },
        { type: `text`, text: `Strategy holds different algorithms for solving a problem. It is a behavioral pattern: a context object changes behavior at run time according to the strategy object it holds.` },
        { type: `heading`, text: `Duck simulator: inheritance-first design` },
        { type: `text`, text: `The simulator revisits inheritance, interfaces, and polymorphism. Wood ducks and dabbling ducks quack, swim, and fly, but Wood ducks live in trees and dabblers live on the ground.` },
        { type: `code`, code: `public abstract class Duck {
    private String name;
    public Duck(String n) { this.name = n; }
    public void type() {
        System.out.println("I am "+ name+" Duck");
    }
    public void speak() {
        System.out.println("I can quack");
    }
    public void swim() {
        System.out.println("I can swim");
    }
    public void fly() {
        System.out.println("I can fly");
    }
    public abstract void home();
    public void display() {
        this.type();
        this.speak();
        this.swim();
        this.fly();
        this.home();
    }
}
public class Dabbler extends Duck {
    public Dabbler() { super("Dabbler"); }
    public void home() {
        System.out.println("My home is on ground");
    }
}
public class Wood extends Duck {
    public Wood() { super("Wood"); }
    public void home() {
        System.out.println("My home is on trees");
    }
}` },
        { type: `text`, text: `Calling display on Wood prints that it is a Wood duck, can quack, swim, and fly, and lives in trees. Calling display on Dabbler changes the name and home to Dabbler and ground. The inherited implementation assumes every duck flies and quacks.` },
        { type: `text`, text: `A Rubber duck exposes the failure in that assumption: it squeaks, swims, does not fly, and says “Your home is my home.” A new non-flying Domestic duck would require the same fly override. Other ducks may have many speech behaviors: a Decoy duck cannot speak and a Whistling duck whistles. Repeated overrides create maintenance problems and duplicate code.` },
        { type: `code`, code: `public class Rubber extends Duck {
    public Rubber() { super("Rubber"); }
    @Override
    public void speak() {
        System.out.println("I can Squeak");
    }
    @Override
    public void fly() {
        System.out.println("I don't Fly");
    }
    public void home() {
        System.out.println("Your home is my home");
    }
}` },
        { type: `text`, text: `A Flyable interface alone does not solve the issue, because every duck class would have to implement it and duplicate the flying behavior. The design principles are: program to a supertype rather than an implementation, and identify aspects that differ and separate them from what stays the same.` },
        { type: `heading`, text: `Strategy-based duck design` },
        { type: `list`, items: [`Keep Flyable, but implement it in only two behavior classes.`, `Give Duck a Flyable field.`, `Each duck subclass chooses the right flying behavior in its constructor.`, `Duck uses polymorphism through that field when displaying its flying behavior.`] },
        { type: `text`, text: `Diagram description: Duck is the context. It has a name and a Flyable flyStatus. Dabbler and Rubber extend Duck. Flyable is the strategy interface with fly(); CanFly and CannotFly implement it. Duck delegates tryFlying() to flyStatus.fly(), so subclasses select behavior by composition instead of overriding Duck.fly().` },
        { type: `code`, code: `public abstract class Duck {
    private String name;
    private Flyable flyStatus;
    public Duck(String n, Flyable f) {
        this.name = n;
        this.flyStatus = f;
    }
    ........
    ........
    public void tryFlying() {
        flyStatus.fly();
    }
    public void display() {
        this.type();
        this.speak();
        this.swim();
        this.tryFlying();
        this.home();
    }
}
public class Rubber extends Duck {
    public Rubber() {
        super("Rubber", new CannotFly());
    }
    @Override
    public void speak() {
        System.out.println("I can Squeak");
    }
    public void home() {
        System.out.println("Your home is my home");
    }
}
public class Dabbler extends Duck {
    public Dabbler() {
        super("Dabbler", new CanFly());
    }
    ........
}
public interface Flyable {
    public void fly();
}
public class CanFly implements Flyable {
    public void fly() {
        System.out.println("I can Fly");
    }
}
public class CannotFly implements Flyable {
    public void fly() {
        System.out.println("I don't Fly");
    }
}` },
        { type: `text`, text: `Use Strategy when a class behavior or algorithm must vary at run time. Create objects representing the available strategies and let the context’s behavior vary according to the selected object.` },
      ],
    },
    {
      id: `design-patterns-part-3`,
      title: `Design Patterns, Part 3`,
      blocks: [
        { type: `text`, text: `This lecture continues the design-pattern catalog with Facade, Template Method, Prototype, Factory, and Abstract Factory. It also recaps that Adapter bridges a provided and desired interface, while Strategy changes a context algorithm at run time through a strategy object.` },
        { type: `heading`, text: `Facade pattern` },
        { type: `text`, text: `Facade is a structural pattern that identifies a simple way to realize relationships between entities. It provides one unified interface to interfaces in a subsystem: a higher-level interface that makes the subsystem easier to use. The architectural facade image is an analogy: a building’s facade is its simple visible face.` },
        { type: `text`, text: `Problem: a call center tries to have one employee directly handle network, billing, roaming, account, and other issues. This overloads the employee and harms customer satisfaction.` },
        { type: `code`, code: `class CallCenter {
    public void handleNetwork() { /* Some code */ }
    public void handleBilling() { /* Some code */ }
    public void handleRoaming() { /* Some code */ }
    public void handleAccount() { /* Some code */ }
    ......
}
public class Client {
    public static void main(String[] args) {
        CallCenter c = new CallCenter();
        c.handleNetwork();
        c.handleBilling();
        c.handleRoaming();
        c.handleAccount();
    }
}` },
        { type: `text`, text: `Solution: hide the complexities of the large body of code behind a simplified interface. The client calls handleCalls(1) rather than knowing each specialist operation.` },
        { type: `code`, code: `public class Client {
    public static void main(String[] args) {
        CallCenter c = new CallCenter();
        c.handleCalls(1);
        ......
    }
}
class CallCenter {
    NetworkTeam net;
    BillingTeam bill;
    RoamingTeam roam;
    AccountTeam account;
    public CallCenter() { /* initializations */ }
    public void handleCalls(int option) {
        switch(option) {
            case 1:
                net.handleNetwork();
                break;
            case 2:
                bill.handleBilling();
                break;
            .......
        }
    }
}` },
        { type: `text`, text: `Structure: CallCenter is the facade and has NetworkTeam, BillingTeam, RoamingTeam, and AccountTeam. It selects and delegates to a subsystem team. Clients depend only on the facade. Use it when clients need a simple entry point to a complex subsystem.` },
        { type: `heading`, text: `Template Method pattern` },
        { type: `text`, text: `Template Method defines the skeleton of an algorithm in an operation, deferring selected steps to subclasses. It lets subclasses redefine certain steps without changing the algorithm’s structure.` },
        { type: `text`, text: `A café simulator shows the repeated recipe. Coffee: boil water, brew coffee in boiling water, pour into a cup, then add sugar and milk. Tea: boil water, steep tea in boiling water, pour into a cup, then add sugar and lemon.` },
        { type: `code`, code: `public abstract class Cafe {
    public void boilWater() {
        System.out.println("Boil Water");
    }
    public void pourInCup() {
        System.out.println("Pour in Cup");
    }
    public abstract void prepare();
}
public class Coffee extends Cafe {
    public void prepare() {
        boilWater();
        brewCoffee();
        pourInCup();
        addSugarAndMilk();
    }
    private void brewCoffee() {
        System.out.println("Brew Coffee");
    }
    private void addSugarAndMilk() {
        System.out.println("Add Sugar and Milk");
    }
}
public class Tea extends Cafe {
    public void prepare() {
        boilWater();
        steepTeaBag();
        pourInCup();
        addSugarAndLemon();
    }
    private void steepTeaBag() {
        System.out.println("Steep Tea Bag");
    }
    private void addSugarAndLemon() {
        System.out.println("Add Sugar and Lemon");
    }
}` },
        { type: `text`, text: `The prepare methods have nearly identical algorithms. Replace brewCoffee and steepTeaBag with brew, and replace addSugarAndMilk and addSugarAndLemon with addCondiments.` },
        { type: `text`, text: `Structure: Cafe is the abstract superclass. It implements shared boilWater and pourInCup methods and owns final prepare(), the template method. Coffee and Tea extend Cafe and implement the variable brew and addCondiments operations. final prevents a beverage subclass from changing the recipe order.` },
        { type: `code`, code: `public abstract class Cafe {
    public void boilWater() {
        System.out.println("Boil Water");
    }
    public void pourInCup() {
        System.out.println("Pour in Cup");
    }
    // "final" ensures that the person preparing
    // the beverage sticks to the recipe of this
    // Café instead of generating his own
    public final void prepare() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }
    public abstract void brew();
    public abstract void addCondiments();
}
public class Coffee extends Cafe {
    private void brew() {
        System.out.println("Brew Coffee");
    }
    private void addCondiments() {
        System.out.println("Add Sugar and Milk");
    }
}
public class Tea extends Cafe {
    private void brew() {
        System.out.println("Steep Tea Bag");
    }
    private void addCondiments() {
        System.out.println("Add Sugar and Lemon");
    }
}` },
        { type: `text`, text: `Use Template Method when an algorithm must have a fixed overall order, with shared concrete steps in the superclass and selected abstract steps supplied by subclasses.` },
        { type: `heading`, text: `Prototype pattern` },
        { type: `text`, text: `Prototype uses an object as the basis for creating others. The nesting-doll image is an analogy: a new object is based on an existing prototype.` },
        { type: `text`, text: `In the cloning-laboratory simulator, Sheep is an Animal and has wool; Chicken is an Animal and lays eggs. The initial design uses inheritance and object cloning, but has a separate lab for each animal type.` },
        { type: `code`, code: `public class Animal {
    private String name;
    public Animal(String n) { name=n; }
    public void sayHello() {
        System.out.println("I am a " + name);
    }
}
public class Sheep extends Animal implements Cloneable {
    private String wool;
    public Sheep() { super("Sheep"); wool ="10KG"; }
    public void sayHello() {
        super.sayHello();
        System.out.println("I have "+wool+" wool");
    }
    public Sheep clone() throws CloneNotSupportedException {
        return (Sheep) super.clone();
    }
}
public class Chicken extends Animal implements Cloneable {
    private int eggs;
    public Chicken() { super("Chicken"); eggs=3; }
    public void sayHello() {
        super.sayHello();
        System.out.println("I have "+eggs+" eggs");
    }
   public Chicken clone() throws CloneNotSupportedException{
        return (Chicken) super.clone();
    }
}
public class Lab1 {
    public static Sheep getClone(Sheep s)
           thrown CloneNotSupportedException {
        return s.clone();
    }
}
public class Lab2 {
    public static Chicken getClone(Chicken s)
           thrown CloneNotSupportedException {
        return s.clone();
    }
}
public class Client {
  public static void main(String[] args) throws CloneNotSupportedException{
        Sheep s1 = new Sheep(); Chicken c1 = new Chicken();
        Sheep s2 = Lab1.getClone(s1);
        Chicken c2 = Lab2.getClone(c2);
    }
}` },
        { type: `text`, text: `Issues: there should be one lab for all Animal types, but the design creates animal-specific laboratories, does not use polymorphism, makes the client choose the matching lab, and duplicates code. The problem grows as Cow, Dog, and other animals are added.` },
        { type: `text`, text: `Problem statement: a client wants an object similar to an existing object but does not care about the details of that object’s state; direct construction may be time-consuming or complex. Prototype decouples product creation from system behavior and avoids subclasses of an object creator in client code.` },
        { type: `code`, code: `public class Animal implements Cloneable {
    private String name;
    public Animal(String n) { name=n; }
    public void sayHello() {
        System.out.println("I am a " + name);
    }
    public Animal clone() throws CloneNotSupportedException {
        return (Animal) super.clone();
    }
}
public class Lab {
    public static Animal getClone(Animal s) {
        return s.clone();
    }
}
public class Sheep extends Animal {
    private String wool;
    public Sheep() { super("Sheep"); wool ="10KG"; }
    public void sayHello() {
        super.sayHello();
        System.out.println("I have "+wool+" wool");
    }
    public Sheep clone() throws CloneNotSupportedException {
        return (Sheep) super.clone();
    }
}
public class Chicken extends Animal {
    private int eggs;
    public Chicken() { super("Chicken"); eggs=3; }
    public void sayHello() {
        super.sayHello();
        System.out.println("I have "+eggs+" eggs");
    }
   public Chicken clone() throws CloneNotSupportedException{
        return (Chicken) super.clone();
    }
}
public class Client {
  public static void main(String[] args) throws CloneNotSupportedException{
        Animal s1 = new Sheep(); Animal c1 = new Chicken();
        Animal s2 = Lab.getClone(s1);
        Animal c2 = Lab.getClone(c2);
    }
}` },
        { type: `text`, text: `Animal now implements Cloneable and exposes clone, while Lab receives and returns Animal, so polymorphism chooses the concrete clone. Sheep and Chicken still require clone implementations when deep copying is needed. Prototype’s drawback is that clone() can be complicated because of shallow versus deep copy.` },
        { type: `heading`, text: `Factory pattern` },
        { type: `text`, text: `Factory is a method or object that creates other objects. Problem: creation is cumbersome or tightly coupled for a client, which needs the object but not the creation details. Solution: a helper method creates and returns the object.` },
        { type: `code`, code: `public class Client {
  public static void main(String[] args) throws CloneNotSupportedException{
        String need = args[0];
        Animal animal;
        if(need.equals("wool") {
            animal = new Sheep();
        }
        else if(need.equals("eggs") {
            animal = new Chicken();
        }
        else if(need.equals("milk") {
            animal = new Cow();
        }
        else System.exit(-1);
        // Our client is too greedy
        Animal[] cloned = new Animal[100];
        for(int i=0; i<cloned.length; i++) {
            cloned[i] = Lab.getClone(animal);
        }
    }
}` },
        { type: `text`, text: `This client mixes two events: choosing and creating an Animal, then cloning it. If more needs such as protection and riding add Dog and Horse, the client must be recompiled whenever the lab adds or removes an animal. Several related classes are a sign that future change is likely.` },
        { type: `code`, code: `public class AnimalFactory {
    public Animal createAnimal(String need) {
        if(need.equals("wool") {
            return new Sheep();
        }
        else if(need.equals("eggs") {
            return new Chicken();
        }
        .......
    }
}
public class Client {
  public static void main(String[] args) throws CloneNotSupportedException{
        String need = args[0];
        AnimalFactory factory = new AnimalFactory();
        Animal animal = factory.createAnimal(need);
        // Our client is too greedy
        Animal[] cloned = new Animal[100];
        for(int i=0; i<cloned.length; i++) {
            cloned[i] = Lab.getClone(animal);
        }
    }
}` },
        { type: `list`, items: [`Encapsulation means the client need not be recompiled when laboratory animal support changes.`, `The factory is easy to serve to other client classes.`, `The factory centralizes consistent object initialization.`] },
        { type: `heading`, text: `Abstract Factory pattern` },
        { type: `text`, text: `A single AnimalFactory can become a bottleneck as it supports many animals. Abstract Factory is a superclass factory extended by different subfactories with different features. Use it for multiple families of object components, such as a cat family and a dog family.` },
        { type: `text`, text: `Structure: abstract AnimalFactory declares createAnimal(String need). CatFactory and DogFactory extend it. A cat client holds an AnimalFactory reference initialized to CatFactory; a dog client holds the same supertype initialized to DogFactory. Each client requests an Animal through the common factory interface, then can clone it through Lab.` },
        { type: `code`, code: `public abstract class AnimalFactory {
    public abstract Animal createAnimal(String need);
}
public class ClientForCats {
  public static void main(String[] args) throws CloneNotSupportedException{
        String need = args[0];
        AnimalFactory factory = new CatFactory();
        Animal animal = factory.createAnimal(need);
        // Our client is too greedy
        Animal[] cloned = new Animal[100];
        for(int i=0; i<cloned.length; i++) {
            cloned[i] = Lab.getClone(animal);
        }
    }
}
public class CatFactory extends AnimalFactory {
    public Animal createAnimal(String need) {
        if(need.equals("pet") {
            return new HouseCat();
        }
        else if(need.equals("zoo") {
            return new Lion();
        }
    }
}
public class DogFactory extends AnimalFactory {
    public Animal createAnimal(String need) {
        if(need.equals("kids") {
            return new Poodle();
        }
        else if(need.equals("hunting") {
            return new Greyhound();
        }
    }
}
public class ClientForDogs {
  public static void main(String[] args) throws CloneNotSupportedException{
        String need = args[0];
        AnimalFactory factory = new DogFactory();
        Animal animal = factory.createAnimal(need);
        // Our client is too greedy
        Animal[] cloned = new Animal[100];
        for(int i=0; i<cloned.length; i++) {
            cloned[i] = Lab.getClone(animal);
        }
    }
}` },
      ],
    },
    {
      id: `design-patterns-part-4`,
      title: `Design Patterns, Part 4`,
      blocks: [
        { type: `text`, text: `This final patterns lecture covers Decorator, Composite, Proxy, Chain of Responsibility, Observer, and State. It also recaps Template, Prototype, Factory and Abstract Factory, and Facade.` },
        { type: `heading`, text: `Decorator pattern` },
        { type: `text`, text: `Decorator consists of objects that wrap other objects to add useful features. A decorator modifies behavior or adds features to another object without disrupting the interface that client code expects from the simple object.` },
        { type: `text`, text: `Java input/output streams demonstrate it. FileReader normally exposes read() to read one letter at a time. BufferedReader and Scanner add functionality that makes reading easier, and can be nested around FileReader.` },
        { type: `code`, code: `public static void main(String args[])
        throws IOException
{
    Scanner in = null;
    PrintWriter out = null;
    try {
        in = new Scanner( new BufferedReader( new
            FileReader("input.txt")));
        out = new PrintWriter( new
            FileWriter("output.txt"));
        while (in.hasNext()) {
            out.println(in.next());
        }
    } finally {
        if (in != null)
            in.close();
        if (out != null)
            out.close();
        }
}` },
        { type: `text`, text: `Structure in this example: Scanner wraps BufferedReader, which wraps FileReader. Each wrapper adds an interface or feature while allowing the client to use the outer object.` },
        { type: `heading`, text: `Vehicle paint-shop decorator` },
        { type: `text`, text: `Diagram description: Vehicle is an interface declaring paint(). Bike and Car implement Vehicle. Abstract VehicleDecorator also implements Vehicle and has one decoratedVehicle reference of type Vehicle. BlueVehicleDecorator extends VehicleDecorator. The decorator delegates paint() to the wrapped vehicle and then adds blue-paint behavior. The client can treat both plain and decorated vehicles as Vehicle.` },
        { type: `code`, code: `interface Vehicle {
    public void paint();
}
class Bike implements Vehicle {
    public void paint() {
        System.out.println("White color Bike");
    }
}
class Car implements Vehicle {
    public void paint() {
        System.out.println("White color Car");
    }
}
//Abstract to disallow clients to instantiate it
abstract class VehicleDecorator implements Vehicle {
    private Vehicle decoratedVehicle;
    public VehicleDecorator(Vehicle v) {
        this.decoratedVehicle = v;
    }
    public void paint() {
        decoratedVehicle.paint();
    }
}
public class Client {
    public static void main(String[] args) {
        Vehicle c1 = new Car();
        c1.paint(); // default white paint
        Vehicle c2 = new BlueVehicleDecorator(new Car));
        c2.paint(); // painted in blue color
        ......
    }
}
class BlueVehicleDecorator extends VehicleDecorator {
    public BlueVehicleDecorator(Vehicle v) {
        super(v);
    }
    public void paint() {
        super.paint();
        System.out.println("Now painted in Blue color");
    }
}` },
        { type: `text`, text: `Use Decorator to add optional responsibilities dynamically while preserving the client-facing interface.` },
        { type: `heading`, text: `Composite pattern` },
        { type: `text`, text: `Composite consists of objects that can contain their own type. An object can be one individual item or a collection of many items; collections can contain individual items or other composites. This is a recursive definition: an object can hold itself.` },
        { type: `text`, text: `Composite lets a client ignore the distinction between individual objects and composite objects, treating every object in the structure uniformly.` },
        { type: `text`, text: `Diagram description: an employee tree has General Manager at the root. The General Manager has a Developer child and a Manager child. That Manager has two Developer children. Each node is treated as Employee, even though the manager nodes contain further employees.` },
        { type: `code`, code: `interface Employee {
    public void print();
}
class Manager implements Employee {
    List<Employee> emp = new ArrayList<Employee>();
    public void add(Employee e) { emp.add(e); };
    public void remove(Employee e) { emp.remove(e); }
    public void print() {
        System.out.println("Manager");
        for(Employee e : emp) {
            e.print();
        }
    }
}
class Developer implements Employee {
    public void print() {
        System.out.println("Employee");
    }
}
public class Client {
    public static void main(String[] args) {
       Employee gm = new Manager();
       Employee emp1 = new Developer();
       Employee manager = new Manager();
       Employee emp2 = new Developer();
       Employee emp3 = new Developer();
       gm.add(emp1); gm.add(manager);
       manager.add(emp2); manager.add(emp3);
       gm.print(); // print all nodes in tree above
    }
}` },
        { type: `text`, text: `Manager is the composite because it holds List<Employee>, recursively calls print on its children, and exposes add and remove. Developer is the leaf. Use Composite for part-whole hierarchies where leaves and groups should share one interface.` },
        { type: `heading`, text: `Proxy pattern` },
        { type: `text`, text: `Proxy controls and manages access to objects it protects. It supplies a surrogate or placeholder for another object to control access. A cheque or credit card is a proxy for bank-account cash. When a real subject is unavailable, a proxy can emulate simple operations; a database proxy can permit queries while prohibiting modifications.` },
        { type: `text`, text: `A network diagram shows computers and a phone reaching a Proxy, then a Firewall, then the Internet. The proxy guards access before the protected resource is used.` },
        { type: `text`, text: `Problem: users seeking company-intranet login must authenticate with a proxy firewall first.` },
        { type: `text`, text: `Structure: IntranetAccess defines getAccess(String name). Intranet is the real subject and implements it. ProxyFirewall also implements IntranetAccess, has a static authorized-name database, checks it, and only then constructs and delegates to Intranet. Client holds an IntranetAccess reference to ProxyFirewall.` },
        { type: `code`, code: `interface IntranetAccess {
    public void getAccess(String name);
}
class Intranet implements IntranetAccess {
    public void getAccess(String name) {
        System.out.println("Unrestricted access
                                    granted to "+ name);
    }
}
public class Client {
    public static void main(String [] args) {
        String name = args[0];
        IntranetAccess proxy = new ProxyFirewall();
        proxy.getAccess(name);
    }
}
import java.util.*;
class ProxyFirewall implements IntranetAccess {
    private static List<String> db = new ArrayList<String>();
    public void getAccess(String name) {
        if(db.contains(name)) {
            (new Intranet()).getAccess(name);
        }
        else {
            System.out.println("Access denied to "+ name);
        }
    }
    public void add(String name) {
        db.add(name);
    }
    // Some more code that is elided
}` },
        { type: `text`, text: `Use Proxy when access to a real object must be controlled, delayed, authenticated, emulated, or restricted.` },
        { type: `heading`, text: `Chain of Responsibility pattern` },
        { type: `text`, text: `Chain of Responsibility gives more than one object an opportunity to handle a request by linking receivers. It avoids coupling sender and receiver: pass the request along the chain until an object handles it.` },
        { type: `text`, text: `Diagram description: Client sends a request to handler 1; handler 1 can pass the request to handler 2; handler 2 can pass it through zero or more further handlers until handler n. The client does not name the final handler.` },
        { type: `list`, items: [`Use it when more than one object may handle a request and the handler is not known ahead of time.`, `Use it when issuing a request to one of several objects without explicitly specifying its receiver.`, `A car-manufacturing assembly pipeline is an example.`] },
        { type: `text`, text: `An automated teller machine contains fixed denominations INR 2000, 500, 200, and 100. Amounts not divisible by 100 cannot be withdrawn. Amounts below INR 2000 may be assembled from 500, 200, and 100 notes.` },
        { type: `text`, text: `Structure: abstract NoteDispenser stores a denomination and next NoteDispenser. INR2000Dispenser, INR500Dispenser, INR200Dispenser, and INR100Dispenser are concrete chain links. ATMMachine builds the chain from highest to lowest denomination and calls the first link. Each link dispenses its quotient and forwards the remainder.` },
        { type: `code`, code: `abstract class NoteDispenser {
    private NoteDispenser chain;
    private int denom;
    public NoteDispenser(int d) { denom = d; }
    public void setNextChain(NoteDispenser c) {
        chain = c;
    }
    public void dispense(int amount) {
        if(amount >= denom) {
            int bills = amount / denom;
            amount = amount % denom;
            System.out.println(denom+" Bills = "+bills);
        }
        if(amount > 0) { chain.dispense(amount); }
    }
}
class INR2000Dispenser extends NoteDispenser {
    public INR2000Dispenser() { super(2000); }
}
class INR500Dispenser extends NoteDispenser {
    public INR500Dispenser() { super(500); }
}
class INR200Dispenser extends NoteDispenser {
    public INR200Dispenser() { super(200); }
}
class INR100Dispenser extends NoteDispenser {
    public INR100Dispenser() { super(100); }
}
public class ATMMachine {
    private NoteDispenser chain1;
    public ATMMachine() {
        chain1 = new INR2000Dispenser();
        NoteDispenser chain2 = new INR500Dispenser();
        NoteDispenser chain3 = new INR200Dispenser();
        NoteDispenser chain4 = new INR100Dispenser();
        chain1.setNextChain(chain2);
        chain2.setNextChain(chain3);
        chain3.setNextChain(chain4);
    }
    public void withdraw(int amount) {
        chain1.dispense(amount);
    }
    public static void main(String[] args) {
        ATMMachine atm = new ATMMachine();
        int amount = Integer.parseInt(args[0]);
        if(amount % 100 == 0) { atm.withdraw(amount); }
    }
}` },
        { type: `heading`, text: `Observer pattern` },
        { type: `text`, text: `Observer consists of objects that listen for updates to another object’s state. It defines a one-to-many dependency: when one object changes state, all dependents are notified and updated automatically. It is also called a dependence mechanism, publish-subscribe, broadcast, or change-update.` },
        { type: `text`, text: `The Subject is the object whose state changes frequently and on which others depend. An Observer depends on a Subject and updates according to that subject’s state. Diagram description: Observer 1 and Observer 2 each register with Subject independently. When the subject changes, it sends a notification arrow to each observer; the observers need not know of one another.` },
        { type: `text`, text: `A polling example uses Marge and Simpson as both observer and subject in the earlier lecture. The Backpack example below models course polling. Consider thread safety when implementing this pattern using multithreading.` },
        { type: `text`, text: `Structure: Subject declares add, remove, announce, getUpdate, and startPoll. Observer declares update. Backpack implements Subject, owns List<Observer> and the discussion string, and broadcasts update to its list. Student implements Observer, keeps a Subject reference, asks it for getUpdate(), and prints the message. CSE201 creates one Backpack, registers five Students, then starts a poll.` },
        { type: `code`, code: `interface Subject {
    public void add(Observer o);
    public void remove(Observer o);
    public void announce();
    public String getUpdate();
    public void startPoll(String msg);
}
interface Observer {
    public void update();
}
class Backpack implements Subject {
    private List<Observer> obsvs = new ArrayList<Observer>();
    private String discussion;
    public String getUpdate() { return discussion; }
    public void add(Observer o) {
        if(!obsvs.contains(o)) obsvs.add(o);
    }
    public void remove(Observer o) { obsvs.remove(o); }
    public void startPoll(String msg) {
        discussion = msg;
        announce();
    }
    public void announce() {
        for (Observer obj : obsvs) {
            obj.update();
        }
    }
}
class Student implements Observer {
    private Subject course;
    public Student(Subject s) { course = s; }
    public void update() {
        String msg = course.getUpdate();
        System.out.println("New message: "+msg);
    }
}
public class CSE201 {
    public static void main(String[] args) {
        Subject cse201 = new Backpack();
        for(int i=0; i<5; i++) {
            Observer student = new Student(cse201);
            cse201.add(student);
        }
        cse201.startPoll("Do you want one more lab?");
    }
}` },
        { type: `text`, text: `Use Observer when changes in one object should automatically propagate to an independently managed set of dependents.` },
        { type: `heading`, text: `State pattern` },
        { type: `text`, text: `State changes behavior based on state. It allows an object to alter its behavior when its internal state changes, using polymorphism to define the behavior for each object state.` },
        { type: `text`, text: `Use State when an object can be in one of several states with different behavior in each state, or to replace large conditional operations based on state: for example, bored may call watchMovie(), sad may call goOnDrive(), and happy has another behavior.` },
        { type: `text`, text: `Structure: the Context class represents the outside-world interface. The abstract State base class defines state-machine operations. Derived State classes define the true behavior for each state. Context maintains a pointer to the current State; changing that pointer changes the machine state.` },
        { type: `text`, text: `Diagram description: Client calls doSomething() on MyMood, the context. MyMood has a state variable of type MoodState. MoodState declares doSomething(). Concrete state classes mad, angry, and happy each implement doSomething() differently. MyMood delegates its behavior through the current MoodState, and changing its state variable selects mad, angry, or happy behavior.` },
        { type: `text`, text: `The complete Gang of Four catalog groups creational patterns as Factory Method, Abstract Factory, Singleton, Builder, Prototype; structural patterns as Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy; and behavioral patterns as Command, Interpreter, Iterator, Mediator, Observer, State, Strategy, Chain of Responsibility, Visitor, and Template Method.` },
      ],
    },
  ],
};
