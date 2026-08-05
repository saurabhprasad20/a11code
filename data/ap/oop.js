export const oopCourse = {
  id: `object-oriented-programming-java`,
  title: `Object-Oriented Programming in Java`,
  description: `This intermediate Java course develops object-oriented programming from objects and encapsulation through relationships, interfaces, inheritance, and the Object class. It faithfully presents the Advanced Programming lecture concepts and examples in a linear format for screen-reader users.`,
  level: `Intermediate`,
  chapters: [
    {
      id: `introduction-to-oop`,
      title: `Introduction to Object-Oriented Programming`,
      blocks: [
        { type: `text`, text: `Object-oriented programming, or OOP, is a paradigm based on objects. An object has data, called fields or attributes, and code, called procedures or methods. A diagram has an OBJECT box branching to PROPERTY, labelled attribute or state, and METHOD, labelled do something: function and procedure. A car class example has fuel and maxspeed plus reFuel(), getFuel(), setSpeed(), and getSpeed().` },
        { type: `list`, items: [`OOP supports code reuse and recycling.`, `Planning object designs improves design and reduces flaws.`, `Maintenance can incorporate changes into legacy code, such as new hardware.`, `Key features are abstraction, encapsulation, method overloading, inheritance, method overriding, and polymorphism.`] },
        { type: `text`, text: `Abstraction hides how a car engine works so a driver focuses on how to drive. Encapsulation treats an object as a black box: the client uses interface methods while the object manages instance data. One diagram labelled no encapsulation connects the rest of the program directly to int data, String name, OtherClass thing, and methods. The encapsulated version connects the rest of the program only through an interface-methods strip.` },
        { type: `text`, text: `Visibility modifiers control whether members serve clients, support the class, enforce encapsulation, or violate it. An accessor returns a variable value; a mutator changes it. Getters and setters normally use getX and setX. A setter permits controlled modification, for example accepting only a safe maximum-speed range.` },
        { type: `text`, text: `A comparison drawing presents procedural programming as global data feeding separate functions with local data, and OOP as objects that each group data and procedures and communicate. The dice problem asks for the number of snake eyes after throwing two dice with varying side counts a given number of times.` },
        { type: `code`, code: `static Random rand = new Random();
static int roll(int numFaces) { return 1 + rand.nextInt(numFaces); }
static int numSnakeEyes(int sides1, int sides2, int numThrows) {
    int count = 0;
    for (int i = 0; i < numThrows; i++) {
        int face1 = roll(sides1), face2 = roll(sides2);
        if (face1 == 1 && face2 == 1) count++;
    }
    return count;
}` },
        { type: `text`, text: `The OOP approach first identifies Dice as the main actors and defines a Dice class whose separate instances maintain their own state.` },
        { type: `code`, code: `public class Dice {
    private final int numFaces;
    private int faceValue;
    public Dice(int _numFaces) { numFaces = _numFaces; roll(); }
    public void roll() { faceValue = 1 + rand.nextInt(numFaces); }
    public void setFaceValue(int value) { if (value <= numFaces) faceValue = value; }
    public int getFaceValue() { return faceValue; }
    public int getNumFaces() { return numFaces; }
    public String toString() {
        return "number of Faces " + numFaces + "current face value " + faceValue;
    }
}` },
        { type: `code`, code: `static int numSnakeEyes(int sides1, int sides2, int numThrows) {
    Die die1 = new Die(sides1), die2 = new Die(sides2);
    int count = 0;
    for (int i = 0; i < numThrows; i++) {
        die1.roll(); die2.roll();
        if (die1.getFaceValue == 1 && die2.getFaceValue == 1) count++;
    }
    return count;
}` },
        { type: `text`, text: `A memory drawing shows dice1 pointing to a Dice with faceValue 5 and numFaces 6, while dice2 points to another Dice with faceValue 2 and numFaces 9. toString returns an object representation and is automatically used by concatenation or println.` },
        { type: `code`, code: `public class Coin {
    private final int HEADS = 0, TAILS = 1;
    private int face;
    public Coin() { flip(); }
    public void flip() { face = (int) (Math.random() * 2); }
    public boolean isHeads() { return face == HEADS; }
    public String toString() { return face == HEADS ? "Heads" : "Tails"; }
}
public static void main(String[] args) {
    final int GOAL = 3; int count1 = 0, count2 = 0;
    Coin coin1 = new Coin(), coin2 = new Coin();
    while (count1 < GOAL && count2 < GOAL) {
        coin1.flip(); coin2.flip();
        System.out.println("Coin 1: " + coin1 + "   Coin 2: " + coin2);
        count1 = coin1.isHeads() ? count1 + 1 : 0;
        count2 = coin2.isHeads() ? count2 + 1 : 0;
    }
    if (count1 < GOAL) System.out.println("Coin 2 Wins!");
    else if (count2 < GOAL) System.out.println("Coin 1 Wins!");
    else System.out.println("It's a TIE!");
}` },
        { type: `heading`, text: `What is OOP?` },
        { type: `text`, text: `OOP represents a program as cooperating objects. Each object combines state, held in fields, with behavior, supplied by methods. This organization aims to reflect entities in the problem domain.` },
        { type: `heading`, text: `Object diagram in words` },
        { type: `text`, text: `The object diagram places OBJECT at the top. Two connector lines descend to PROPERTY on the left, described as attribute or state, and METHOD on the right, described as doing something through a function or procedure.` },
        { type: `heading`, text: `Car class example` },
        { type: `text`, text: `The car illustration treats fuel and maxspeed as properties. It treats reFuel, getFuel, setSpeed, and getSpeed as services the car supplies.` },
        { type: `heading`, text: `Advantages of OOP` },
        { type: `text`, text: `Objects can be reused. Extensive design planning can reduce flaws, and localized object responsibilities make maintenance and legacy changes easier.` },
        { type: `heading`, text: `Abstraction` },
        { type: `text`, text: `Abstraction hides engine mechanics from the person driving a car. The driver needs the driving controls and observable behavior, not the details of combustion or transmission operation.` },
        { type: `heading`, text: `Encapsulation` },
        { type: `text`, text: `Encapsulation hides an object's inner workings from its client. The client invokes the object's interface methods, and the object itself manages its instance data.` },
        { type: `heading`, text: `No-encapsulation figure` },
        { type: `text`, text: `The no-encapsulation diagram has blue lines from the rest of the program directly to a class's int data, String name, OtherClass thing, doSomething(), and getSomething(). It illustrates uncontrolled direct access.` },
        { type: `heading`, text: `Encapsulation figure` },
        { type: `text`, text: `The encapsulation figure places a strip labelled interface methods between MyClass and the rest of the program. Lines from the program reach only this strip, so clients request operations rather than touch fields.` },
        { type: `heading`, text: `Accessors and mutators` },
        { type: `text`, text: `An accessor returns a current value. A mutator changes a value. Their conventional names are getX and setX. Controlled setters can validate their arguments before changing state.` },
        { type: `heading`, text: `Procedural comparison figure` },
        { type: `text`, text: `The procedural side has global data branching to several functions, each with local data. The OOP side has separate objects, each containing data and procedures, with arrows labelled communication between objects.` },
        { type: `heading`, text: `Dice class rationale` },
        { type: `text`, text: `The Dice class keeps numFaces private and final, so a player cannot directly alter the number of faces. faceValue is also private and may be changed only through a validated mutator or roll.` },
        { type: `heading`, text: `Using Dice objects` },
        { type: `text`, text: `Two Dice objects may be built with different face counts, rolled independently, printed through toString, and queried through getFaceValue. numSnakeEyes belongs outside Dice because it needs two dice.` },
        { type: `heading`, text: `Coin race goal` },
        { type: `text`, text: `The Coin program creates two independent coins, flips both until one has three consecutive heads, resets a counter after tails, and then prints the winner or tie.` }
      ]
    },
    {
      id: `classes-and-objects`,
      title: `Classes and Objects`,
      blocks: [
        { type: `text`, text: `Development moves through analysis, design, implementation, and testing. Analysis decides what to do and edge cases; design defines classes, attributes, methods, objects, and relationships; implementation is actual programming; testing seeks freedom from errors.` },
        { type: `text`, text: `Find candidate classes by looking for nouns in a use case, including actors and information-bearing events. Find responsibilities from verbs and actions. Limit each analysis class to a clear purpose; use consistent noun names; keep early classes simple; and do not assume every noun becomes a class.` },
        { type: `text`, text: `In the email-login requirement, Customer clicks Login on HomePage, HomePage displays LoginPage, Customer enters credentials and clicks OK, and EmailAccount validates them and grants access. Candidate classes are Customer, HomePage, LoginPage, and EmailAccount; candidate methods are clickLogin, display, enterCredentials, clickOK, and validate.` },
        { type: `text`, text: `The sequence diagram has four left-to-right lifelines: Customer, HomePage, LoginPage, EmailAccount. Solid arrows show Customer to HomePage clickLogin, HomePage to LoginPage display, Customer to LoginPage enterCredentials and clickOK, and LoginPage to EmailAccount validate. Dashed return arrows go back. Narrow activation rectangles represent execution. Methods should be cohesive: enterCredentials and clickOK suit LoginPage, but validate does not.` },
        { type: `code`, code: `public class Dog {
    public Dog() { /* constructor */ }
    public void bark(int numTimes) { /* code */ }
    public void eat() { /* code */ }
    public void wagTail() { /* code */ }
}
public class Dog {
    private String name; private int breed_id, rego_id;
    private static int rego_counter;
    { rego_id = ++rego_counter; }
    public Dog(int _breed) { breed_id = _breed; }
    public Dog(String _name) { this(20); name = _name; }
}` },
        { type: `text`, text: `Instantiation builds an object from a class blueprint: new Robot() creates an instance and calls its constructor. Constructors have no return type and exactly match the class name. For new Dog("Djangho"), the initialization block runs, this(20) invokes the int constructor, then the String constructor sets name.` },
        { type: `text`, text: `Dog django = new Dog() assigns an object reference. A variable stores either a primitive value, such as favoriteNumber holding 9, or a fixed-size reference to an object elsewhere. A memory diagram shows the django arrow reaching a Dog object.` },
        { type: `code`, code: `public class PetShop {
    public PetShop() { this.testGroomer(); }
    public void testGroomer() {
        Dog django = new Dog();
        DogGroomer groomer = new DogGroomer();
        groomer.groom(django);
        django = new Dog(); // reassign django
        groomer.groom(django);
    }
}
public class DogGroomer {
    public void groom(Dog shaggyDog) { /* groom shaggyDog */ }
}` },
        { type: `text`, text: `The parameter drawing shows django and shaggyDog referencing the same Dog while groom executes. The parameter is a local name. Reassigning django makes it point to a second Dog; the first is eligible for garbage collection when unreachable.` },
        { type: `text`, text: `Local variables and parameters exist only in their method. Accessing django from another PetShop method gives cannot find symbol. An instance variable is declared in the class, represents a property of every object, and is accessible throughout that class.` },
        { type: `code`, code: `public class PetShop {
    private DogGroomer _groomer;
    public PetShop() {
        _groomer = new DogGroomer();
        this.testGroomer();
    }
    public void testGroomer() {
        Dog django = new Dog();
        _groomer.groom(django);
    }
}` },
        { type: `text`, text: `The declaration-and-assignment figure labels private DogGroomer _groomer as a declaration and _groomer = new DogGroomer() as assignment. An uninitialized object field defaults to null. Calling a method through null causes NullPointerException, so constructors should initialize every instance variable.` },
        { type: `heading`, text: `Development lifecycle` },
        { type: `text`, text: `Analysis asks what the system must do, including corner cases. Design identifies object-oriented structures. Implementation turns the design into code, and testing checks behavior and errors.` },
        { type: `heading`, text: `Analysis nouns` },
        { type: `text`, text: `In a product requirement, product, name, product number, bar code, error, message window, error log, summary report, and transaction are candidate nouns. Not all must survive as classes.` },
        { type: `heading`, text: `Analysis verbs` },
        { type: `text`, text: `Actions such as specify, match, generate, enter, validate, and grant access suggest responsibilities. A responsibility may directly become a method or require supporting responsibilities.` },
        { type: `heading`, text: `Email exercise classes` },
        { type: `text`, text: `The login scenario suggests Customer, HomePage, LoginPage, and EmailAccount. It also contains nouns such as login button, user ID, password, and credentials that require design judgment.` },
        { type: `heading`, text: `Email exercise methods` },
        { type: `text`, text: `The scenario's verbs produce clickLogin, display, enterCredentials, clickOK, validate, and grant access. Assign each to the class with the most coherent responsibility.` },
        { type: `heading`, text: `Sequence diagrams` },
        { type: `text`, text: `A sequence diagram is an interaction diagram. It records messages between objects to show how operations are carried out and to trace object method calls.` },
        { type: `heading`, text: `Sequence-diagram notation` },
        { type: `text`, text: `The login diagram uses object names at the top, dashed vertical lifelines, solid horizontal call arrows, dashed reply arrows, and narrow activation bars showing periods of execution.` },
        { type: `heading`, text: `Instantiation` },
        { type: `text`, text: `Instantiation means building an object from a class blueprint. new Robot() creates a Robot instance and invokes the Robot constructor.` },
        { type: `heading`, text: `Constructor rules` },
        { type: `text`, text: `A constructor has no declared return type and exactly the class name. It initializes an object's state when the object is created.` },
        { type: `heading`, text: `Variables as boxes` },
        { type: `text`, text: `A primitive variable stores its value directly. A variable of arbitrary object type stores a reference, represented by an arrow, because objects can vary in size while references have a fixed size.` },
        { type: `heading`, text: `Memory slots` },
        { type: `text`, text: `System memory is hardware that stores temporary and permanent information, distinct from disk and peripheral devices. Think of it as slots that may hold local primitive values or object references.` },
        { type: `heading`, text: `Variable reassignment` },
        { type: `text`, text: `After django is reassigned, its arrow moves from the first Dog to the second Dog. If no remaining reference reaches the first Dog, the first Dog is eligible for garbage collection.` },
        { type: `heading`, text: `Scope and lifetime` },
        { type: `text`, text: `A local variable exists only in its declaring method. An instance variable exists for as long as its object and can be reached anywhere in the class.` },
        { type: `heading`, text: `Null defaults` },
        { type: `text`, text: `An uninitialized int instance variable defaults to zero. An uninitialized object reference defaults to null, which means it refers to no object; sending null a message causes NullPointerException.` }
      ]
    },
    {
      id: `class-relationships`,
      title: `Class Relationships`,
      blocks: [
        { type: `text`, text: `Unified Modeling Language, or UML, class diagrams use a box with name, attributes, and operations sections, plus connecting lines. The four common relationships are composition: A contains B; association: A knows about B; dependency: A depends on B; and inheritance: HarleyDavidson is a Bike.` },
        { type: `text`, text: `Composition means A instantiates B, so A can call B methods, but not automatically vice versa. It has a lifetime or death relationship: if A is garbage collected, its component B is also eligible. UML uses a solid line with a diamond at the containing end.` },
        { type: `code`, code: `class Project { private String name; public boolean status() { return false; } }
class Manager {
    private Project project;
    public Manager() { project = new Project("ABC"); }
    public boolean projectCompleted() { return project.status(); }
}
public class PetShop {
    private DogGroomer _groomer;
    public PetShop() { _groomer = new DogGroomer(); }
}` },
        { type: `text`, text: `Association means A holds a class-level reference to B but B is not A's component; the objects have independent lifetimes. UML uses a solid directed arrow from the holder to the known class.` },
        { type: `code`, code: `class Contractor {
    private Project currentProject;
    public Contractor(Project proj) { currentProject = proj; }
    public void setProject(Project proj) { currentProject = proj; }
}
public class DogGroomer {
    private PetShop _petShop;
    public DogGroomer(PetShop myPetShop) { _petShop = myPetShop; }
    public void groom(Dog shaggyDog) { shaggyDog.setHairLength(1); }
}` },
        { type: `text`, text: `The association memory sequence shows new PetShop creating a PetShop, then new DogGroomer(this). myPetShop points to that PetShop. Assigning _petShop = myPetShop retains the reference after the constructor, allowing DogGroomer methods to use getClosingTime or setNumCustomers.` },
        { type: `code`, code: `public class Professor {
    private TA _ta1, _ta2, _ta3, _ta4;
    public Professor(TA firstTA, TA secondTA, TA thirdTA, TA fourthTA) {
        _ta1 = firstTA; _ta2 = secondTA; _ta3 = thirdTA; _ta4 = fourthTA;
    }
}
public class TA {
    private Professor _professor;
    public void setProf(Professor prof) { _professor = prof; }
}` },
        { type: `text`, text: `Course first creates four TAs and passes them to a Professor. To make the reverse association after Professor exists, Course calls setProf on each TA. Without that call, the TA's Professor reference is null and it cannot call Professor methods through it.` },
        { type: `text`, text: `Dependency is one-way: A requests B's service but neither stores the other or contains it. UML uses a dashed arrow from dependent to dependency.` },
        { type: `code`, code: `class Die { public void roll() { } }
class Player { public void takeTurn(Die die) { die.roll(); } }
class Product { public double getPrice() { return 0; } }
class Cart { private double cartPrice; public void addProduct(Product p) { cartPrice += p.getPrice(); } }
class Course { public String getName() { return ""; } }
class CourseSchedule { private int total; private String[] courses;
    public void addCourse(Course c) { courses[total++] = c.getName(); } }` },
        { type: `heading`, text: `UML overview` },
        { type: `text`, text: `Unified Modeling Language, abbreviated UML, gives a more detailed notation than a sequence diagram for relationships among classes and objects.` },
        { type: `heading`, text: `UML class box` },
        { type: `text`, text: `A UML class box has compartments for the class name, attributes or data, and operations or methods. Connecting lines encode the relationship type.` },
        { type: `heading`, text: `Big-picture design` },
        { type: `text`, text: `OOP code models real-world objects to promote readability and maintenance. Real-world objects have relationships, so design must consider how classes fit together.` },
        { type: `heading`, text: `Composition direction` },
        { type: `text`, text: `When A composes B, A knows about and can call B. B does not automatically know about A; composition is not symmetric.` },
        { type: `heading`, text: `Project and manager` },
        { type: `text`, text: `A Manager creates a Project named ABC and delegates projectCompleted to project.status. The lecture treats the fixed manager-project relationship as composition.` },
        { type: `heading`, text: `PetShop composition` },
        { type: `text`, text: `PetShop creates DogGroomer with new DogGroomer and stores it in _groomer. Its methods can therefore send grooming messages through that component reference.` },
        { type: `heading`, text: `Association direction` },
        { type: `text`, text: `In an association, A stores a class-level reference to B and can use B's methods, but B need not know A. A and B can exist independently.` },
        { type: `heading`, text: `Contractor association` },
        { type: `text`, text: `Contractor receives a Project from outside, stores it as currentProject, and can replace it through setProject. It did not create the Project, so this is association rather than composition.` },
        { type: `heading`, text: `Groomer association` },
        { type: `text`, text: `DogGroomer accepts the PetShop that created it as a constructor parameter. Storing that reference lets the groomer request shop information such as closing time.` },
        { type: `heading`, text: `Professor and TAs` },
        { type: `text`, text: `Professor receives four pre-existing TA objects and stores one reference for each. They are peer objects rather than components because neither creates the other.` },
        { type: `heading`, text: `Bidirectional association` },
        { type: `text`, text: `Course cannot pass a Professor to new TA before Professor exists. It first constructs TAs, constructs Professor with them, then uses setProf on every TA to establish the reverse link.` },
        { type: `heading`, text: `Dependency definition` },
        { type: `text`, text: `A depends on B when A cannot perform its work without a service from B, but neither holds a lasting association or composition relationship.` },
        { type: `heading`, text: `Dependency examples` },
        { type: `text`, text: `Player depends on Die by calling roll on a parameter. Cart depends on Product through getPrice. CourseSchedule depends on Course while obtaining a course name.` },
        { type: `heading`, text: `Dependency UML` },
        { type: `text`, text: `A dashed arrow starts at the dependent class and points to the dependency. The direction shows who requests the service.` }
      ]
    },
    {
      id: `interfaces`,
      title: `Interfaces`,
      blocks: [
        { type: `text`, text: `A method declaration gives scope, return type, name, and parameters; its definition provides the body. The race example initially uses App containing Race, Race containing CarRacer and BikeRacer, and racers containing Car or Bike. Car drives and Bike pedals.` },
        { type: `code`, code: `public class Car { public void drive() { /* code */ } }
public class Bike { public void pedal() { /* code */ } }
public class CarRacer { private Car _car = new Car(); public void useCar() { _car.drive(); } }
public class BikeRacer { private Bike _bike = new Bike(); public void useBike() { _bike.pedal(); } }
public class Race {
    private CarRacer _dan = new CarRacer();
    private BikeRacer _sophia = new BikeRacer();
    public void startRace() { _dan.useCar(); _sophia.useBike(); }
}` },
        { type: `text`, text: `This design requires a useType method for every new transport type. Cars and bikes both move but in different ways. An interface groups such shared broad capabilities and models an acts-as relationship.` },
        { type: `code`, code: `public interface Transporter {
    public void move();
}
public class Car implements Transporter {
    public void drive() { /* code */ }
    @Override public void move() { this.drive(); this.brake(); this.drive(); }
}
public class Bike implements Transporter {
    public void pedal() { /* code */ }
    @Override public void move() { this.pedal(); }
}` },
        { type: `text`, text: `Interfaces are contracts. A class that implements one must define every declared method or the compiler reports that the class does not override an abstract method. Interfaces declare methods with semicolons, do not define them in this lecture model, and cannot be instantiated. @Override is an annotation that checks the intended implementation or override but does not alter runtime behavior.` },
        { type: `code`, code: `public interface Colorable {
    public void setColor(Color c);
    public Color getColor();
}
public class Car implements Transporter, Colorable {
    public void drive() { }
    public void move() { }
    public void setColor(Color c) { }
    public Color getColor() { return null; }
}` },
        { type: `text`, text: `A class may implement multiple interfaces but must satisfy every method in each. A method implementing Clickable.click must exactly be public void click(); click(double), clickIt(), and double click are not matching implementations.` },
        { type: `heading`, text: `Method declaration` },
        { type: `text`, text: `A method declaration specifies its access, return type, name, and parameter list. A definition includes the implementation body that performs the work.` },
        { type: `heading`, text: `Race-design diagram` },
        { type: `text`, text: `The class diagram is arranged top to bottom as App, Race, then CarRacer and BikeRacer, then Car below CarRacer and Bike below BikeRacer. It represents containment in the original design.` },
        { type: `heading`, text: `Transportation classes` },
        { type: `text`, text: `Bike needs pedal and Car needs drive. Their movement behaviors differ even though both transport a racer.` },
        { type: `heading`, text: `Racer duplication` },
        { type: `text`, text: `CarRacer needs a Car field and useCar; BikeRacer needs a Bike field and useBike. Creating one special racer class per vehicle repeats nearly identical structure.` },
        { type: `heading`, text: `Race execution` },
        { type: `text`, text: `App constructs Race. Race constructs its racers. Each racer constructs its transportation. startRace calls useCar and useBike, which call drive and pedal.` },
        { type: `heading`, text: `Scaling drawback` },
        { type: `text`, text: `With hoverboards, horses, scooters, motorcycles, and pogo sticks, one Racer would accumulate useHoverboard, useHorse, useScooter, and many more near-duplicate methods.` },
        { type: `heading`, text: `Car and bike similarities` },
        { type: `text`, text: `The comparison lists move as their common capability. Car-specific capabilities include radio, headlights, turn signals, and door locks; Bike-specific capabilities include kickstand and gear changes.` },
        { type: `heading`, text: `Interface purpose` },
        { type: `text`, text: `An interface gathers capabilities shared by otherwise different classes. It models an acts-as relationship and does not prescribe how each class performs a capability.` },
        { type: `heading`, text: `Transporter declaration` },
        { type: `text`, text: `Transporter declares move. Every class that signs this contract must provide a matching move definition, even though a Car may drive and a Bike may pedal.` },
        { type: `heading`, text: `Interface method syntax` },
        { type: `text`, text: `A method in an interface declaration ends in a semicolon rather than a body. In this course's model, interfaces are contracts rather than constructible classes.` },
        { type: `heading`, text: `Compiler enforcement` },
        { type: `text`, text: `Car implements Transporter but lacks move does not compile. Defining drive alone is insufficient because the contractual method name and signature are move().` },
        { type: `heading`, text: `Override annotation` },
        { type: `text`, text: `Place @Override immediately before the implementing method. The compiler can then check that the intended interface declaration really exists.` },
        { type: `heading`, text: `Multiple interfaces` },
        { type: `text`, text: `A class can implement Transporter and Colorable simultaneously, analogous to one person signing distinct renter and employment agreements. It must implement every method from both.` },
        { type: `heading`, text: `Interface summary` },
        { type: `text`, text: `Interfaces give formal consistency: code can trust that every Transporter can move. They also reveal an intentional relationship between otherwise different classes.` }
      ]
    },
    {
      id: `polymorphism`,
      title: `Polymorphism`,
      blocks: [
        { type: `text`, text: `Polymorphism means many forms and enables generic code. Cars and bikes can be referenced as Transporter objects, phones and cameras as Chargeable objects, and cars and phones as RadioPlayer objects.` },
        { type: `code`, code: `public class Racer {
    public void useTransportation(Transporter transportation) {
        transportation.move();
    }
}
Transporter dansCar = new Car();
Transporter sophiasBike = new Bike();` },
        { type: `text`, text: `Transporter is the declared type; Car or Bike is the actual type. The declared type limits calls to methods in Transporter, so transportation.playRadio() is invalid unless playRadio is declared there. The actual type determines which move implementation runs.` },
        { type: `text`, text: `Transporter is the lowest common denominator. Car may additionally playRadio and Bike may dropKickstand, but Racer cares only about move. This sacrifices access to specialization for generality. A Radio cannot be assigned to Transporter or passed to useTransportation unless it implements Transporter.` },
        { type: `text`, text: `When Race calls _sophia.useTransportation(new Bike()), the parameter's actual type is Bike, so transportation.move() runs Bike.move and pedals. With new Car it runs Car.move and drives. This runtime method selection is dynamic binding; static binding resolves at compile time.` },
        { type: `code`, code: `public class Race {
    private Racer _dan = new Racer(), _sophia = new Racer();
    public void startRace() {
        _dan.useTransportation(new Car());
        _sophia.useTransportation(new Bike());
    }
}
public interface Transporter { public void move(); }` },
        { type: `text`, text: `A Laptop that implements Typeable and Clickable may be referenced through either interface, but each reference exposes only its declared contract. Use polymorphism when only interface methods are needed; use a specialized class reference when specialized methods are required. Adding another Transporter requires no Racer change.` },
        { type: `heading`, text: `Back to the race` },
        { type: `text`, text: `By making Car and Bike implement Transporter, their move methods become the shared operation Racer needs. Car.move delegates to drive; Bike.move delegates to pedal.` },
        { type: `heading`, text: `Leveraging contracts` },
        { type: `text`, text: `Because every Transporter promises move, Racer can replace separate useCar and useBike operations with one useTransportation method.` },
        { type: `heading`, text: `Meaning of polymorphism` },
        { type: `text`, text: `Poly means many and morph means forms. Polymorphism lets code refer to related actual objects through a generic type that captures their shared capability.` },
        { type: `heading`, text: `Other polymorphic groups` },
        { type: `text`, text: `Phones and cameras may be treated as Chargeable if both implement that interface. Cars and mobile phones may be RadioPlayer objects if each supports the declared radio operation.` },
        { type: `heading`, text: `Declared type` },
        { type: `text`, text: `In Transporter transportation = new Car(), Transporter is the declared type. It controls the methods Java permits the caller to invoke through that variable.` },
        { type: `heading`, text: `Actual type` },
        { type: `text`, text: `Car is the actual type in that assignment. Java looks in the actual class at runtime to find the method implementation to execute.` },
        { type: `heading`, text: `Illegal specialization` },
        { type: `text`, text: `Even if Car defines playRadio, transportation.playRadio is illegal through a Transporter variable unless playRadio appears in Transporter. The declared type intentionally restricts the API.` },
        { type: `heading`, text: `Lowest common denominator` },
        { type: `text`, text: `Transporter is the lowest common denominator of Car and Bike: both guarantee move. Car's playRadio and Bike's dropKickstand remain outside generic Racer code.` },
        { type: `heading`, text: `Parameter implication` },
        { type: `text`, text: `A parameter declared Transporter accepts any object whose class implements Transporter. Inside the method, it can call only methods declared by Transporter.` },
        { type: `heading`, text: `Legal and illegal arguments` },
        { type: `text`, text: `new Bike and new Car are valid Transporter arguments. new Radio is invalid unless Radio implements Transporter; possessing unrelated behavior does not satisfy the contract.` },
        { type: `heading`, text: `Dynamic binding` },
        { type: `text`, text: `The source line transportation.move is dynamically bound. Java waits until runtime, examines the actual object, and executes Bike.move or Car.move as appropriate.` },
        { type: `heading`, text: `Static binding contrast` },
        { type: `text`, text: `Static binding chooses a method at compile time. Dynamic binding allows the same generic line to execute different implementation code on different invocations.` },
        { type: `heading`, text: `Declared and actual diagram` },
        { type: `text`, text: `The Car illustration labels the interface-facing view as declared and the Car-specific implementation as actual. The Bike illustration makes the same distinction for Bike.` },
        { type: `heading`, text: `When to use polymorphism` },
        { type: `text`, text: `Use polymorphism when code needs only interface functionality. Use a specific implementing-class type when specialized methods are necessary.` },
        { type: `heading`, text: `Extensibility` },
        { type: `text`, text: `After Racer depends only on Transporter, add a new transportation mode by implementing Transporter. Existing Racer code remains unchanged.` }
      ]
    },
    {
      id: `inheritance-part-1`,
      title: `Inheritance, Part 1`,
      blocks: [
        { type: `text`, text: `Inheritance models closely related is-a relationships: a sedan is a car, a dog is a mammal. A Poodle is a Dog and transitively a Mammal, but not every Dog is a Poodle. A superclass or parent is inherited from; a subclass or child inherits. Java permits one superclass, though it permits multiple implemented interfaces.` },
        { type: `text`, text: `A superclass factors out commonality; a subclass specializes by adding methods, overriding methods, or defining abstract methods. Subclasses inherit public and protected capabilities, creating code reuse. They cannot directly access superclass private fields or methods.` },
        { type: `code`, code: `public class Car {
    private Engine _engine;
    public Car() { _engine = new Engine(); }
    public void turnOnEngine() { _engine.start(); }
    public void turnOffEngine() { _engine.shutOff(); }
    protected void cleanEngine() { _engine.steamClean(); }
    public void drive() { /* code */ }
}
public class Convertible extends Car {
    public void putTopDown() { /* code */ }
}
public class Sedan extends Car { }
public class Van extends Car { }` },
        { type: `text`, text: `extends means is a subclass of or inherits from. Sedan cannot use Convertible.putTopDown. Convertible cannot use private _engine directly, but it can call inherited cleanEngine.` },
        { type: `code`, code: `public class Convertible extends Car {
    public void cleanCar() { this.cleanEngine(); }
}
public class Car {
    public void drive() { this.goFortyMPH(); }
    public void goFortyMPH() { }
}
public class Convertible extends Car {
    @Override public void drive() { this.goSixtyMPH(); }
    public void goSixtyMPH() { }
}` },
        { type: `text`, text: `@Override marks a replacement for an inherited method. The signature must match exactly or the method is an overload, not an override. super.drive() calls the original parent version and is useful for partial overriding; this.drive() inside drive would recursively call the override.` },
        { type: `code`, code: `public class Racer {
    public void useTransportation(Car myCar) { myCar.drive(); }
}
Car convertible = new Convertible();
Car sedan = new Sedan();
// Car bike = new Bike(); // illegal: Bike is not a Car` },
        { type: `text`, text: `The Car parameter accepts Car and all subclasses. Its declared type guarantees drive while the actual subclass supplies the runtime implementation. Method lookup walks from the subclass upward until it finds the method.` },
        { type: `heading`, text: `Convertible and sedan` },
        { type: `text`, text: `Convertibles and sedans share driving, braking, radio, doors, and engine controls. A convertible adds a retractable top; a sedan has a fixed roof and may park in compact spaces.` },
        { type: `heading`, text: `Interface limitation` },
        { type: `text`, text: `A Car interface could declare shared methods, but each class would still duplicate the same drive implementation. Inheritance instead shares working code.` },
        { type: `heading`, text: `Is-a versus acts-as` },
        { type: `text`, text: `Inheritance models is-a: Sedan is a Car and Dog is a Mammal. Interfaces model acts-as: Car acts as a Transporter.` },
        { type: `heading`, text: `Inheritance diagram` },
        { type: `text`, text: `The hierarchy diagram puts Animal above Cat, Dog, and Horse. Dog has Beagle, Labrador, and Poodle below it. Upward arrows mean each lower class is-a the higher class.` },
        { type: `heading`, text: `Relationship direction` },
        { type: `text`, text: `Inheritance is not bidirectional. Poodle is a Dog, but Dog is not necessarily a Poodle because it may be a Labrador or another subclass.` },
        { type: `heading`, text: `Terminology` },
        { type: `text`, text: `Superclass, parent, and base describe the inherited-from class. Subclass, child, and derived describe the inheriting class. Dog can be both a Mammal subclass and a Poodle superclass.` },
        { type: `heading`, text: `One parent class` },
        { type: `text`, text: `Java allows one direct superclass. Convertible cannot extend Car, FourWheeledTransportation, and GasFueledTransportation at the same time.` },
        { type: `heading`, text: `Inherited capabilities` },
        { type: `text`, text: `A Convertible inherits Car public and protected methods without rewriting them. It therefore drives the Car way unless it explicitly overrides drive.` },
        { type: `heading`, text: `Specialization` },
        { type: `text`, text: `A subclass differentiates itself by adding methods, overriding inherited behavior, or later providing concrete definitions for abstract methods.` },
        { type: `heading`, text: `New-method scope` },
        { type: `text`, text: `putTopDown belongs to Convertible. Sedan cannot call it because it is neither defined by Sedan nor inherited from Car.` },
        { type: `heading`, text: `Private-field caveat` },
        { type: `text`, text: `Convertible cannot directly access Car's private _engine. It can ask Car to do the work through a protected or public method such as cleanEngine.` },
        { type: `heading`, text: `Overriding signature` },
        { type: `text`, text: `For a true override, the method name and parameters must exactly match the superclass declaration. A mismatch creates another method instead of a replacement.` },
        { type: `heading`, text: `Partial override` },
        { type: `text`, text: `Sedan.drive may call turnOnEngine, super.drive, and addPinToMap. super is the deliberate way to reach the parent implementation from an override.` },
        { type: `heading`, text: `Hierarchy method lookup` },
        { type: `text`, text: `When Porsche receives drive, Java finds Porsche's version first. For topDown, it proceeds upward to Convertible. A missing method after the hierarchy is searched is a compile-time error.` },
        { type: `heading`, text: `Inheritance polymorphism` },
        { type: `text`, text: `A Car parameter accepts a Convertible or Sedan because each is-a Car, but not a Bike. Calling drive uses the actual subclass's override when there is one.` }
      ]
    },
    {
      id: `inheritance-part-2`,
      title: `Inheritance, Part 2`,
      blocks: [
        { type: `text`, text: `Private fields are not directly inherited. A superclass may offer protected accessors and mutators when subclasses need controlled access. Chaining this.getRadio().setFavorite first obtains the radio then sends setFavorite to it.` },
        { type: `code`, code: `public class Car {
    private Radio _myRadio;
    public Car() { _myRadio = new Radio(); }
    protected Radio getRadio() { return _myRadio; }
    protected void setRadio(Radio radio) { _myRadio = radio; }
}
public class Convertible extends Car {
    public void setRadioPresets() {
        this.getRadio().setFavorite(1, 95.5);
        this.getRadio().setFavorite(2, 92.3);
    }
}` },
        { type: `text`, text: `If Car never initializes _myRadio, getRadio returns null and setRadioPresets causes NullPointerException. A Convertible constructor must also ensure Car fields are initialized.` },
        { type: `code`, code: `public class Convertible extends Car {
    private ConvertibleTop _top;
    public Convertible() {
        super();
        _top = new ConvertibleTop();
        this.setRadioPresets();
    }
}
public class Car {
    private Racer _driver;
    public Car(Racer driver) { _driver = driver; }
}
public class Convertible extends Car {
    public Convertible(Racer driver) { super(driver); }
}` },
        { type: `text`, text: `super() explicitly invokes a superclass default constructor. It can occur once and must be the subclass constructor's first statement. If omitted, Java inserts no-argument super(). When the superclass requires a parameter, use super(driver); otherwise compilation fails because a no-argument Car constructor does not exist.` },
        { type: `heading`, text: `Protected access` },
        { type: `text`, text: `Car keeps _myRadio private but defines protected getRadio and setRadio. This preserves representation control while granting subclasses a deliberate access path.` },
        { type: `heading`, text: `Double-dot call` },
        { type: `text`, text: `this.getRadio().setFavorite has two calls. getRadio returns the Radio object; setFavorite is then invoked on that returned object.` },
        { type: `heading`, text: `Initialization failure` },
        { type: `text`, text: `If the Car constructor did not construct a Radio, _myRadio remains null. getRadio returns null, and calling setFavorite on it triggers NullPointerException.` },
        { type: `heading`, text: `Constructor responsibility` },
        { type: `text`, text: `Convertible can initialize its own ConvertibleTop, but only Car knows all Car fields and should initialize them in the Car constructor.` },
        { type: `heading`, text: `Default super call` },
        { type: `text`, text: `When a superclass has a default constructor, Java invokes it automatically during subclass construction. Writing super() makes this sequence explicit.` },
        { type: `heading`, text: `First-statement rule` },
        { type: `text`, text: `super may occur only once and must be the first statement of a subclass constructor. No field setup or method call may precede it.` },
        { type: `heading`, text: `Parameterized super call` },
        { type: `text`, text: `If Car takes Racer driver, Convertible must take or obtain a Racer and call super(driver). This initializes the parent _driver field.` },
        { type: `heading`, text: `Missing super` },
        { type: `text`, text: `When the subclass does not explicitly call super, Java inserts super() with no arguments. That is invalid if the parent has only a parameterized constructor.` },
        { type: `heading`, text: `Constructor tree` },
        { type: `text`, text: `Construction proceeds from the top of the inheritance tree downward: the parent constructor first initializes parent state, then the child constructor initializes child state.` },
        { type: `heading`, text: `Accessor design choice` },
        { type: `text`, text: `Protected accessors and mutators should be chosen carefully. Expose only properties subclasses genuinely need, because broader access weakens encapsulation.` },
        { type: `heading`, text: `Inherited methods` },
        { type: `text`, text: `Convertible automatically inherits protected getRadio and setRadio. It can use them even though it cannot name the private _myRadio field directly.` },
        { type: `heading`, text: `Why this matters` },
        { type: `text`, text: `Calling inherited behavior through a controlled method maintains the superclass abstraction and lets the superclass change its internal representation later.` }
      ]
    },
    {
      id: `inheritance-part-3`,
      title: `Inheritance, Part 3`,
      blocks: [
        { type: `text`, text: `Convertible, Sedan, and Van must load passengers differently. When subclasses cannot reuse a superclass implementation, declare an abstract method in the superclass and let concrete subclasses provide it.` },
        { type: `code`, code: `public abstract class Car {
    private Racer _driver;
    public Car(Racer driver) { _driver = driver; }
    public abstract void loadPassengers();
}
public class Convertible extends Car {
    @Override public void loadPassengers() {
        Passenger p1 = new Passenger(); p1.sit();
    }
}
public class Sedan extends Car {
    @Override public void loadPassengers() {
        Passenger p1 = new Passenger(); p1.sit();
        Passenger p3 = new Passenger(); p3.sit();
    }
}` },
        { type: `text`, text: `A class with an abstract method must be abstract. Abstract methods end with semicolons, not bodies. Abstract classes cannot be instantiated, but subclass construction still calls their constructor with super. An abstract class can have fields and mixed concrete and abstract methods; an interface in this lecture model has neither fields nor concrete methods, and a class may implement several interfaces.` },
        { type: `text`, text: `An immutable object cannot change after construction. To make a class immutable, provide no modifying methods, keep fields private and final, prevent mutable representation exposure, and prevent extension.` },
        { type: `code`, code: `public final class Mechanics {
    private final String oilType;
    private final int numCylinders;
    public Mechanics(String oil, int cylinders) {
        oilType = oil; numCylinders = cylinders;
    }
    public String getOilType() { return oilType; }
    public int getNumCylinders() { return numCylinders; }
}` },
        { type: `text`, text: `A final mutable reference is not enough: if Mechanics exposes a Tire by a public field or getTire(), a client can call setSize(20) on that Tire. A subclass could override getters to report Rocket Fuel and 18 cylinders. final on Mechanics prevents such subclassing; defensive copying prevents mutable-reference exposure.` },
        { type: `heading`, text: `Passenger problem` },
        { type: `text`, text: `Sedan, Convertible, and Van all need to load passengers but have different capacities. They therefore need different loadPassengers implementations.` },
        { type: `heading`, text: `Constructor alternative` },
        { type: `text`, text: `One approach gives every subclass a constructor with exactly the passenger parameters it needs, while calling super(driver) first to initialize shared Car state.` },
        { type: `heading`, text: `Interface alternative` },
        { type: `text`, text: `An interface Passengers with loadPassenger could be implemented by every Car subclass. This creates an additional interface and repeats an implements clause in every subclass.` },
        { type: `heading`, text: `Abstract-method rationale` },
        { type: `text`, text: `Declare a method abstract when all subclasses require the capability but no superclass implementation is reusable. The superclass supplies the promise; descendants supply the work.` },
        { type: `heading`, text: `Abstract class rule` },
        { type: `text`, text: `If even one method is abstract, its containing class must be declared abstract. A class may also be declared abstract simply to prevent direct construction.` },
        { type: `heading`, text: `Concrete subclasses` },
        { type: `text`, text: `A concrete Convertible, Sedan, or Van must override loadPassengers with the exact signature and an executable body. @Override documents that fulfillment.` },
        { type: `heading`, text: `No generic car instance` },
        { type: `text`, text: `abstract Car cannot be instantiated because it lacks code for loadPassengers. Instantiate a concrete subclass instead.` },
        { type: `heading`, text: `Superclass constructor` },
        { type: `text`, text: `An abstract class still has a constructor. Every concrete child invokes it with super because parent fields must be initialized by the parent.` },
        { type: `heading`, text: `Abstract versus interface` },
        { type: `text`, text: `An abstract class can keep instance fields and mix working methods with abstract methods. A class inherits one class but can implement several interfaces.` },
        { type: `heading`, text: `Immutable class motivation` },
        { type: `text`, text: `A Mechanics object should retain the oil type and cylinder count assigned at construction, even when clients attempt to alter surrounding vehicle components.` },
        { type: `heading`, text: `Private final fields` },
        { type: `text`, text: `Private prevents direct client access; final prevents reassignment after construction. Neither by itself protects an object reachable through a mutable reference.` },
        { type: `heading`, text: `Mutable representation exposure` },
        { type: `text`, text: `If Tire is mutable, public final Tire tire still permits mechanics.tire.setSize(20). A getter that returns the same Tire permits mechanics.getTire().setSize(20) too.` },
        { type: `heading`, text: `Exclusive access` },
        { type: `text`, text: `An immutable class must not give clients a reference to a mutable internal field. Return a copy, store a copy, or use an immutable component instead.` },
        { type: `heading`, text: `Prevent extension` },
        { type: `text`, text: `A subclass could override Mechanics getters and report Rocket Fuel or eighteen cylinders. Marking Mechanics final prevents this change of observable state.` },
        { type: `heading`, text: `Immutable-class checklist` },
        { type: `text`, text: `Provide no state-changing methods; use private final fields; prevent mutable representation exposure; and prevent inheritance that could introduce changed behavior.` }
      ]
    },
    {
      id: `the-object-class`,
      title: `The Object Class`,
      blocks: [
        { type: `text`, text: `Cat, Universe, and Furniture look unrelated but every Java class implicitly extends Object, the root of the inheritance tree. Object gives every class clone, equals, finalize, getClass, hashCode, toString, notify, notifyAll, and wait. Object references can hold any object, but expose Object methods rather than Cat-only speak.` },
        { type: `code`, code: `Object o1 = new Cat("Meau", "Indian Cat");
Object o2 = "hello there";
public void example(Object o) {
    if (o != null) System.out.println("o is " + o.toString());
}
Object[] a = new Object[5];
a[0] = "hello"; a[1] = new Cat();
List<Object> list = new ArrayList<Object>();` },
        { type: `text`, text: `For Point p1 = new Point(5,3), p2 = new Point(5,3), and p3 = p2, == tests references: p1 == p2 is false but p2 == p3 is true. Object.equals initially returns this == o. To compare state, override equals(Object), not equals(Point), which only overloads it.` },
        { type: `code`, code: `public class Point {
    private int x, y;
    @Override public boolean equals(Object o1) {
        if (o1 != null && getClass() == o1.getClass()) {
            Point o = (Point) o1;
            return x == o.x && y == o.y;
        }
        return false;
    }
}` },
        { type: `text`, text: `Blindly casting Object to Point can throw ClassCastException. instanceof avoids that but can make equality asymmetric with Point3D. getClass is stricter and ensures exact same type; test null first. Equality must be reflexive, symmetric, transitive, and false for null.` },
        { type: `text`, text: `Operators less-than and greater-than do not work for objects. Comparable<T>.compareTo returns negative if this comes before another, positive if after, and zero if equal in its ordering. A class has one compareTo ordering; Comparator<T> is an external object that supplies multiple ordering styles.` },
        { type: `code`, code: `public class Rectangle implements Comparable<Rectangle> {
    private int sideA, sideB, area;
    @Override public int compareTo(Rectangle o) {
        if (area == o.area) return 0;
        return area < o.area ? -1 : 1;
    }
}
public class RectangleAreaComparator implements Comparator<Rectangle> {
    @Override public int compare(Rectangle r1, Rectangle r2) {
        return r1.getArea() - r2.getArea();
    }
}
public class RectangleSidesComparator implements Comparator<Rectangle> {
    @Override public int compare(Rectangle r1, Rectangle r2) {
        return r1.getSideA() != r2.getSideA()
            ? r1.getSideA() - r2.getSideA()
            : r1.getSideB() - r2.getSideB();
    }
}
Collections.sort(list, new RectangleAreaComparator());
Collections.sort(list, new RectangleSidesComparator());` },
        { type: `text`, text: `Rectangles 2 by 32 and 4 by 16 have equal area and can compareTo as zero while equals remains false because sides differ. A copy constructor can copy fields, but Object.clone offers another mechanism.` },
        { type: `code`, code: `public class Point implements Cloneable {
    private int x, y;
    @Override public Point clone() {
        try { return (Point) super.clone(); }
        catch (CloneNotSupportedException e) { return null; }
    }
}
public class Point3D extends Point {
    int z;
    @Override public Point3D clone() { return (Point3D) super.clone(); }
}` },
        { type: `text`, text: `Cloneable is a marker interface with no methods. Calling super.clone preserves the runtime type, unlike constructing a new Point from Point.clone, which would make a Point3D clone into a Point. Each subclass reimplements clone and calls super.clone; only the topmost class catches CloneNotSupportedException.` },
        { type: `code`, code: `public class BankAccount implements Cloneable {
    private String name;
    private List<String> transactions;
    @Override public BankAccount clone() {
        try {
            BankAccount copy = (BankAccount) super.clone();
            copy.transactions = new ArrayList<String>(transactions);
            return copy;
        } catch (CloneNotSupportedException e) { return null; }
    }
}` },
        { type: `text`, text: `super.clone alone is a shallow copy: it shares the mutable transactions list. A deep copy duplicates the referenced mutable objects too. Copying transactions as a new ArrayList makes the cloned BankAccount independent.` },
        { type: `heading`, text: `Object root` },
        { type: `text`, text: `Object is the root superclass of every Java class. Cat, Universe, and Furniture inherit Object even though they have no domain relationship.` },
        { type: `heading`, text: `Object methods` },
        { type: `text`, text: `Important Object methods include clone, equals, finalize, getClass, hashCode, and toString. notify, notifyAll, and wait support locking and concurrency.` },
        { type: `heading`, text: `Object variables` },
        { type: `text`, text: `An Object variable can store a Cat or a String. A method accepting Object can accept any reference object, and Object arrays or lists can mix object types.` },
        { type: `heading`, text: `Object reference limit` },
        { type: `text`, text: `Through Object o1 = new Cat, o1.toString is legal because Object declares it. o1.speak is not legal if speak exists only in Cat.` },
        { type: `heading`, text: `Reference equality` },
        { type: `text`, text: `The == operator compares references. It returns true only when both operands refer to the same object, not merely objects with matching field values.` },
        { type: `heading`, text: `Default equals` },
        { type: `text`, text: `Object.equals returns this == o. Subclasses override it when their notion of equal state is more meaningful than identity.` },
        { type: `heading`, text: `Equals signature` },
        { type: `text`, text: `public boolean equals(Point o) is an overload, not an override, because Object declares equals(Object). @Override exposes this signature error to the compiler.` },
        { type: `heading`, text: `Casting issue` },
        { type: `text`, text: `With equals(Object), the parameter must be cast before Point fields are read. Casting a String or unrelated object to Point throws ClassCastException.` },
        { type: `heading`, text: `Instanceof behavior` },
        { type: `text`, text: `variable instanceof Type asks whether a reference names an object of the specified class or subclass. null instanceof any type is false because null is a reference, not an object.` },
        { type: `heading`, text: `Subclass equality flaw` },
        { type: `text`, text: `instanceof Point accepts Point3D too. Two Point3D values differing in z may compare equal as Points, and Point versus Point3D can violate the required symmetry rule.` },
        { type: `heading`, text: `Equality contract` },
        { type: `text`, text: `Equality is reflexive: a equals a. It is symmetric: a equals b exactly when b equals a. It is transitive, and no non-null object equals null.` },
        { type: `heading`, text: `getClass check` },
        { type: `text`, text: `getClass() == o.getClass() requires exactly equal runtime classes, excluding subclasses. Check o for null before calling its getClass method.` },
        { type: `heading`, text: `Comparable contract` },
        { type: `text`, text: `compareTo returns a value less than zero for before, greater than zero for after, or zero for equal in its selected ordering. Less-than and greater-than operators cannot compare objects.` },
        { type: `heading`, text: `Natural ordering` },
        { type: `text`, text: `Rectangle.compareTo can compare area. Two different side pairs may have equal area and return zero from compareTo while equals remains false.` },
        { type: `heading`, text: `Comparator purpose` },
        { type: `text`, text: `Comparator is a separate object with compare(first, second). It gives multiple comparison styles, such as Rectangle area versus side dimensions, and Collections.sort accepts one.` },
        { type: `heading`, text: `Copy constructor` },
        { type: `text`, text: `A copy constructor such as new Point(p1) creates a new instance whose x and y are copied from the blueprint Point.` },
        { type: `heading`, text: `Clone intent` },
        { type: `text`, text: `Object.clone generally creates an object that is not the original, equals the original, and has the same class. These are intentions, not absolute requirements.` },
        { type: `heading`, text: `Cloneable marker` },
        { type: `text`, text: `Cloneable declares no methods; it marks a class as permitted to clone. Without it, Object.clone throws CloneNotSupportedException.` },
        { type: `heading`, text: `Runtime clone type` },
        { type: `text`, text: `Constructing new Point in Point.clone produces a Point even when inherited by Point3D. super.clone preserves the original runtime class; each subclass should reimplement clone.` },
        { type: `heading`, text: `Shallow and deep copying` },
        { type: `text`, text: `A shallow BankAccount clone shares the transactions list. A deep clone creates a new ArrayList from transactions so later list changes are independent.` }
      ]
    }
  ]
};
