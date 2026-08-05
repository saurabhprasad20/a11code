export const concurrencyCourse = {
  id: `java-concurrency-and-multithreading`,
  title: `Java Concurrency and Multithreading`,
  description: `This advanced course introduces Java processes, threads, thread creation, executor pools, mutual exclusion, memory consistency, and producer-consumer coordination. It follows the lecture material closely, turning every important diagram and code example into linear, screen-reader-friendly content.`,
  level: `Advanced`,
  chapters: [
    {
      id: `introduction-to-multithreading`,
      title: `Introduction to Multithreading`,
      blocks: [
        { type: `heading`, text: `Event-driven programming recap` },
        { type: `text`, text: `In event-driven programming, code executes when an event is activated. A diagram shows a button as the event source: clicking it fires an action event object, and an arrow carries that event to a handler object, which processes it.` },
        { type: `code`, code: `Button btn = new Button("Say Hello World");
btn.setOnAction(new EventHandler<ActionEvent>() {
    @Override
    public void handle(ActionEvent event) {
        System.out.println("Hello World!");
    }
});` },
        { type: `code`, code: `btn.setOnAction(e -> {
    System.out.println("Hello World!");
});` },
        { type: `text`, text: `A JavaFX containment drawing has a Stage as the outer rectangle, containing a Scene, which contains a Parent such as a Pane or Control, which contains Nodes. A code screenshot shows an Application subclass: main calls launch(args); start creates a titled stage, a Say Hello World button, registers new HelloEvent(), places the button in a StackPane and Scene, sets the scene, and shows the stage. HelloEvent implements EventHandler<ActionEvent> and its handle method prints Hello World!` },
        { type: `heading`, text: `Multitasking and processes` },
        { type: `text`, text: `Multitasking allows more tasks to run than there are central processing units, abbreviated CPUs. On a single CPU, only one task is actively executing instructions at a time; the operating system schedules which task runs and when a waiting task gets a turn. Typical simultaneously open applications include a word processor, browser, development environment, and music player.` },
        { type: `text`, text: `On a multicore processor, each core can run one task. The operating system still multitasks by deciding which task runs on which core. A drawing represents the processor as a chip containing four cores.` },
        { type: `text`, text: `A process is a program in execution. An icon for a word processor is not a process until it is launched. Every process has its own address or memory space, so separate processes cannot access one another's memory; the operating system can create a communication channel when needed.` },
        { type: `list`, items: [`A process contains code: the program instructions.`, `It contains data, including global variables.`, `Its program counter, or PC, holds the address of the instruction currently executing.`, `It has CPU registers, a stack for local variables and caller-callee relationships, a heap, and files.`] },
        { type: `text`, text: `The process-structure drawing places code, data, and files along the top; registers and stack below them; the heap in the lower area; and the program counter with the register state as part of execution state.` },
        { type: `text`, text: `A process life-cycle diagram has five states. New means being created. Ready means waiting for a free processor. Running means instructions execute. Waiting means waiting for an event such as input/output. Terminated means execution is complete. Its arrows show Start to Ready, Ready to Running, Running back to Ready, Running to Wait, Wait back to Ready, and Running to Terminated.` },
        { type: `text`, text: `A context switch changes the CPU from one process to another. The operating system saves the old process state and loads the saved state of the new process. A Process Control Block, abbreviated PCB, stores information such as process state, identifier, and CPU registers. The timeline drawing first saves process 0 in PCB 0 and loads PCB 1 so process 1 runs; later it saves PCB 1 and reloads PCB 0 so process 0 runs again.` },
        { type: `heading`, text: `Threads` },
        { type: `text`, text: `Processes are heavyweight because each has personal allocated address space and process-to-process communication needs operating-system help. Threads are lightweight: sibling threads share their parent process's code, data, and files, making communication easier, but each has its own stack for local variables and caller-callee relationships. Each thread therefore has a different job. A process can have one or more threads.` },
        { type: `text`, text: `The comparison drawing has a single-threaded process on the left with shared code, data, files, one register area, one stack, and one thread. On the right, a multithreaded process shares code, data, and files while three columns each have their own registers, stack, and thread.` },
        { type: `list`, items: [`A video game can use one thread for graphics, one for user interaction, and one for networking with internet peers.`, `Parallel programming can split array summation among N threads; each handles array.length divided by N indices, produces a local sum, and local sums are combined.`, `In producer-consumer applications, a news reporter produces reports and clerks consume them to publish to Twitter, Facebook, a website, or television.`, `A client-server server can create a thread to listen to a new client.`] },
        { type: `text`, text: `Concurrency means multiple tasks make progress during overlapping time; parallelism means work executes at the same time on separate CPUs or CPU cores. The lecture illustration labels one CPU for concurrency and CPU 1 and CPU 2 for parallel execution.` },
        { type: `list`, items: [`Responsiveness: a program can continue while another part blocks or performs a long operation.`, `Economical resource sharing: threads share parent memory and resources while performing several tasks.`, `Multicore utilization: programs can scale on modern multicore processors.`] },
        { type: `heading`, text: `Thread class and life cycle` },
        { type: `text`, text: `The Thread class supports constructors Thread(), Thread(String str), Thread(Runnable r), and Thread(Runnable r, String str). A reference table says setName gives a name; getName returns it; getPriority returns priority; isAlive checks whether the thread still runs; join waits for it to end; run is its entry point; sleep suspends it for a specified time; and start starts the thread by calling run.` },
        { type: `text`, text: `The thread-state drawing begins at New Thread. Calling thread.start() moves it to Runnable; scheduling moves it to Running. While the run method's loop executes it remains running or runnable. A blocking operation or input/output call moves it to Blocked, from which it becomes runnable again. When run returns, it becomes Dead Thread.` },
        { type: `heading`, text: `Priority, application, and daemon threads` },
        { type: `list`, items: [`Every thread has a priority, or seniority. The Java Virtual Machine, abbreviated JVM, selects the highest-priority runnable thread before lower-priority runnable threads.`, `Priorities range from 1 through 10. A newly created thread inherits its creator's priority; setPriority adjusts it and getPriority obtains it.`, `Thread.MIN_PRIORITY is 1, Thread.MAX_PRIORITY is 10, and Thread.NORM_PRIORITY is 5.`, `When an application starts, the JVM creates a Thread whose task is main(), starts it at NORM_PRIORITY, executes statements in order until main returns, then the thread dies.`] },
        { type: `text`, text: `Daemon threads are background threads providing services to other threads, such as garbage collection. The JVM does not exit while non-daemon threads execute. It exits when only daemon threads execute, and daemon threads die when the JVM exits.` },
      ],
    },
    {
      id: `creating-threads`,
      title: `Creating Threads`,
      blocks: [
        { type: `heading`, text: `Ways to create a thread` },
        { type: `text`, text: `A thread is lightweight and shares code, global variables, and files in its parent process. The two ways to create a Thread object are implementing Runnable or subclassing Thread; in either case implement run().` },
        { type: `code`, code: `public class MyThread implements java.lang.Runnable { 
    ...........
    @Override
    public void run() { ..... }
}

public class MyThread extends java.lang.Thread { 
    ...........
    @Override
    public void run() { ..... }
}` },
        { type: `heading`, text: `Array summation with Runnable` },
        { type: `text`, text: `The sequential array-sum program computes a range in calculate(). As the array becomes huge, that method is the performance bottleneck and can be parallelized.` },
        { type: `code`, code: `public class ArraySum {
    int[] array;
    int sum, low, high;
    public ArraySum(int[] arr, int l, int h) {
        array=arr; sum=0; low=l; high=h;
    }
    //assume array.length%2=0
    public void calculate() {
        for(int i=low; i<high; i++) 
            sum += array[i];
    }
    public int getResult() { return sum; }
    public static void main(String[] args) {
      int size; int[] array; //allocated (size) & initialized
      ArraySum asum = new ArraySum(array, 0, size);
      asum.calculate();
      int result = asum.getResult();
    }
}` },
        { type: `text`, text: `Step 1 is to implement Runnable. Step 2 is to implement its only abstract method, public void run(). For this example, calculate is renamed run; it has return type void, so its result remains in the object for a later lecture's retrieval mechanism.` },
        { type: `code`, code: `public class ArraySum implements Runnable {
    int[] array; int sum, low, high;
    public ArraySum(int[] arr, int l, int h) {
        array=arr; sum=0; low=l; high=h;
    }
    //assume array.length%2=0
    public void run() {
        for(int i=low; i<high; i++) sum += array[i];
    }
    public int getResult() { return sum; }
}` },
        { type: `text`, text: `Step 3 creates Runnable objects for the left and right halves, then creates t1 and t2 with those objects. Step 4 calls start on both. The JVM may then execute each thread and calls the Runnable object's run implementation. Thread itself implements Runnable but has an empty run body.` },
        { type: `code`, code: `int size; int[] array; //allocated (size) & initialized
ArraySum left = new ArraySum(array, 0, size/2);
ArraySum right = new ArraySum(array, size/2, size);
Thread t1 = new Thread(left); 
Thread t2 = new Thread(right);
t1.start(); t2.start();` },
        { type: `text`, text: `Step 5 waits for both run methods with join(). join throws a checked exception, so main declares InterruptedException. Step 6 adds both partial results. Starting t1 and immediately joining it before starting t2 makes execution sequential despite having two threads; the same range-splitting approach can use more than two threads.` },
        { type: `code`, code: `public static void main(String[] args) 
                          throws InterruptedException {
  int size; int[] array; //allocated (size) & initialized
  ArraySum left = new ArraySum(array, 0, size/2);
  ArraySum right = new ArraySum(array, size/2, size);
  Thread t1 = new Thread(left); 
  Thread t2 = new Thread(right);
  t1.start(); t2.start();
  t1.join(); t2.join();
  int result = left.getResult() + right.getResult();
}` },
        { type: `heading`, text: `Array summation by subclassing Thread` },
        { type: `text`, text: `Only three changes are needed: ArraySum extends Thread rather than implements Runnable; it overrides Thread's empty run method; and each ArraySum object is itself a thread, so no separate Thread constructor call is needed.` },
        { type: `code`, code: `public class ArraySum extends Thread {
    int[] array; int sum, low, high;
    public ArraySum(int[] arr, int l, int h) {
        array=arr; sum=0; low=l; high=h;
    }
    //assume array.length%2=0
    @Override
    public void run() {
        for(int i=low; i<high; i++) sum += array[i];
    }
    public int getResult() { return sum; }
    public static void main(String[] args) throws InterruptedException {
      int size; int[] array; //allocated (size) & initialized
      ArraySum t1 = new ArraySum(array, 0, size/2);
      ArraySum t2 = new ArraySum(array, size/2, size);
      t1.start(); t2.start();
      t1.join(); t2.join();
      int result = t1.getResult() + t2.getResult();
    }
}` },
        { type: `list`, items: [`Java has no multiple inheritance. An ArraySum that extends Thread cannot extend another class, whereas an ArraySum that implements Runnable can.`, `Subclassing should add, modify, or improve Thread behavior. If it does not, prefer Runnable.`, `A Thread can start only once, but the same Runnable object can be passed to several Thread objects.`, `When only run must be supplied, extending Thread is JVM overhead.`] },
        { type: `text`, text: `Calling run directly on a Runnable or Thread is neither a compile-time nor a run-time error, but the JVM creates no thread and execution is sequential. start is mandatory. Calling start twice on the same Thread causes IllegalThreadStateException at run time, although several threads may share one Runnable object.` },
        { type: `code`, code: `MyClass1 MyClass1Object = new MyClass1();
Thread t1 = new Thread(MyClass1Object);
t1.run();
MyClass2 t2 = new MyClass2();  
t2.run();

t1.start();
t1.start();
t2.start();
t2.start();` },
        { type: `heading`, text: `Parallel Fibonacci` },
        { type: `text`, text: `The parallel Fibonacci version starts tasks for fib(n-1) and fib(n-2), joins them, and adds their results. The comparison sequential version evaluates fib(n) directly. The lecture asks whether this is efficient; Fibonacci grows approximately by the golden-ratio factor, with Fib n plus 1 divided by Fib n about 1.6.` },
        { type: `code`, code: `// Parallel Implementation of Fibonacci
public class Fibonacci implements Runnable {
    int result, n;
    public Fibonacci(int n) { this.n = n; }
    public static int fib(int n) {
        if(n<2) return n;
        else return fib(n-1) + fib(n-2);
    }
    public void run() { result = fib(n); }
    public int getResult() { return result; }
    public static void main(String[] args) throws InterruptedException {
      int n = 40;
      Fibonacci left = new Fibonacci(n-1);
      Fibonacci right = new Fibonacci(n-2);
      Thread t1 = new Thread(left); Thread t2 = new Thread(right);
      t1.start(); t2.start(); t1.join(); t2.join();
      int result = left.getResult() + right.getResult();
    }
}` },
        { type: `code`, code: `// Sequential Implementation of Fibonacci
public class Fibonacci {
    int result, n;
    public Fibonacci(int n) { this.n = n; }
    public static int fib(int n) {
        if(n<2) return n;
        else return fib(n-1) + fib(n-2);
    }
    public void calculate() { result = fib(n); }
    public int getResult() { return result; }
    public static void main(String[] args) {
      int n = 40;
      Fibonacci fib = new Fibonacci(n); 
      int result = fib.getResult();
    }
}` },
        { type: `heading`, text: `Socket server and client` },
        { type: `text`, text: `Sockets provide two-way communication between processes on networked computers. A client creates a socket and tries to connect to a server; after connection, the server creates its socket and both sides read and write. The drawing shows two client applications, each with a socket, connecting through a ServerSocket to separate socket objects in one server application.` },
        { type: `text`, text: `The first server accepts connections and invokes Handler.connect synchronously, so it is not an efficient multithreaded server. The intended multithreaded version creates new Thread(new Handler(connection)) and starts it for each client. The code as printed declares Handler.run() throws IOException, even though Runnable's run signature does not permit that checked exception.` },
        { type: `code`, code: `import java.io.*; 
import java.net.*;
public class Server {
  public static void main(String args[]) throws IOException {
    ServerSocket me = new ServerSocket(1234);
    while (true) {
      Socket connection = me.accept();
      System.out.println("Connected");
      Thread t=new Thread(new Handler(connection));
      t.start();
    }
  }
}
class Handler implements Runnable {
  Socket connection;
  Handler(Socket connection) { this.connection = connection; }
  public void run() throws IOException {
    DataOutputStream out = null;
    try {
      out=new DataOutputStream(connection.getOutputStream());
      out.writeUTF("Hello Client!!");
    } finally { out.close(); connection.close(); }
  }
}` },
        { type: `code`, code: `import java.io.*; 
import java.net.*;
public class Client {
    public static void main(String args[]) throws IOException {
        String serverName = "localhost"; //or remote IP Address
        int port = 1234; // should be same as used in server
        Socket server = new Socket(serverName, port);
        System.out.println("Just connected to " + server.getRemoteSocketAddress());
        DataInputStream in = new DataInputStream(server.getInputStream());
        System.out.println("Server says " + in.readUTF());
        in.close();
        server.close();
    }
}` },
        { type: `text`, text: `The server does not join every spawned handler because it must continue accepting connections; it can therefore serve clients in parallel. Data streams access stream data in a machine-independent way.` },
        { type: `heading`, text: `Thread utilities and scheduling` },
        { type: `list`, items: [`static Thread currentThread() returns the currently executing Thread object.`, `long getId() returns a thread identifier.`, `static void sleep(long millisec) makes the currently executing thread temporarily stop executing for the requested milliseconds.`, `Timer and TimerTask in java.util schedule a task after a delay or repeatedly at constant intervals.`] },
        { type: `text`, text: `Timer delays a task until a specified time. TimerTask is an abstract class implementing Runnable: subclass it and implement run, then use a Timer to schedule it.` },
        { type: `code`, code: `import java.util.*;
public class Reminder {
    Timer timer;
    public Reminder(int seconds) {
        timer = new Timer();
        timer.schedule(new RemindTask(), seconds*1000);
    }
    class RemindTask extends TimerTask {
        public void run() {
            System.out.println("Time's up!");
            // Terminate the timer thread
            // or set the timer as daemon
            timer.cancel(); 
        }
    }
    public static void main(String args[]) {
        new Reminder(5);
        System.out.println("Task scheduled.");
    }
}` },
        { type: `list`, items: [`Timer.schedule accepts task and time; task, time, and period; task and delay; or task, delay, and period.`, `Stop a Timer by calling cancel or by making its thread a daemon.`, `Compared with sleep, TimerTask can be cancelled at any time, makes recurring work easy and code clearer, does not generate InterruptedException like Thread.sleep, and is more precise.`, `Multithreading is harder to debug and test, can yield unpredictable race conditions, and can deadlock. A deadlock drawing shows Thread 1 holding resource A but wanting B, while Thread 2 holds B but wants A.`] },
      ],
    },
    {
      id: `thread-pools`,
      title: `Thread Pools`,
      blocks: [
        { type: `heading`, text: `Tasks and pools` },
        { type: `text`, text: `Think tasks rather than threads. A task is a logical unit of work; a thread is a mechanism that runs tasks asynchronously. In the Fibonacci computation tree, every node is a task. Tasks are lighter than threads.` },
        { type: `text`, text: `A Fibonacci tree begins at fib(4), branches to fib(3) and fib(2), then repeatedly branches to fib(n-1) and fib(n-2) until leaves fib(1) and fib(0). This exposes many independent tasks.` },
        { type: `list`, items: [`Usually there are more tasks than available threads.`, `A parallel algorithm maps tasks to threads.`, `Schedule independent tasks on separate threads, considering the computation graph.`, `Threads should interact as little as possible.`] },
        { type: `text`, text: `A thread-pool diagram shows a queue holding several task squares. Arrows lead to three fixed worker threads. Each worker removes a task; arrows from partially completed task squares show that workers are executing tasks.` },
        { type: `text`, text: `A thread pool has a fixed number of Java-runtime threads. The application creates tasks, not threads, and adds tasks to a task pool. A free worker removes and executes a task.` },
        { type: `heading`, text: `ExecutorService` },
        { type: `text`, text: `The java.util.concurrent package is a concurrent-programming framework. Its class diagram includes Executor, ExecutorService, ScheduledExecutorService, Executors, Future, FutureTask, ForkJoinTask, RecursiveAction, RecursiveTask, ForkJoinPool, ThreadPoolExecutor, and related synchronization utilities such as CountDownLatch, CyclicBarrier, Phaser, Semaphore, Exchanger, and TimeUnit. This course introduces only basic features.` },
        { type: `list`, items: [`An ExecutorService is a group of threads, each conceptually repeating get work and run it.`, `The user starts and shuts down the ExecutorService; it starts and shuts down its threads.`, `execute(Runnable) accepts a Runnable task for a pool thread.`, `shutdown() makes the pool terminate after all already submitted tasks run.`, `Executors.newFixedThreadPool(int num_threads) makes a fixed-size ExecutorService that reuses threads.`] },
        { type: `text`, text: `After shutdown, isTerminated returns true when every task has terminated. awaitTermination(long timeout, TimeUnit unit) throws InterruptedException and blocks until tasks finish after shutdown. Waiting is important before reading results.` },
        { type: `code`, code: `public class ArraySum implements Runnable {
    int[] array; int sum, low, high;
    public ArraySum(int[] arr, int l, int h) {
        array=arr; sum=0; low=l; high=h;
    }
    //assume array.length%2=0
    public void run() {
        for(int i=low; i<high; i++) sum += array[i];
    }
    public int getResult() { return sum; }
    public static void main(String[] args) throws InterruptedException {
      int size; int[] array; //allocated (size) & initialized
      ExecutorService exec = Executors.newFixedThreadPool(2);
      ArraySum left = new ArraySum(array, 0, size/2);
      ArraySum right = new ArraySum(array, size/2, size);
      exec.execute(left); exec.execute(right);
      if(!exec.isTerminated()) { //Optional
          exec.shutdown(); 
          exec.awaitTermination(5L, TimeUnit.SECONDS);
      }
      int result = left.getResult() + right.getResult();
    }
}` },
        { type: `code`, code: `import java.io.*; import java.net.*;
import java.util.concurrent.*; 
public class Server {
    public static void main(String args[]) throws IOException {
        ServerSocket me = new ServerSocket(1234);
        ExecutorService exec = Executors.newFixedThreadPool(2);
        while (true) {
           Socket connection = me.accept();
           System.out.println("Connected");
           Runnable task = new ConnectionHandler(connection);
           /* new Thread(task).start(); */
           exec.execute(task);
        }
    }
}` },
        { type: `text`, text: `Submitting a connection task rather than creating a new thread for each client prevents the server from going out of control when many clients line up.` },
        { type: `heading`, text: `ForkJoinPool Fibonacci` },
        { type: `text`, text: `Creating only two Fibonacci tasks misses much available parallelism: every computation-tree node can run in parallel. ForkJoinPool supports recursive divide and conquer. Below a cutoff, compute sequentially; above it, create a task per subproblem. The pool manages threads and methods such as fork and invokeAll submit subtasks and wait for them.` },
        { type: `text`, text: `Step 1 extends RecursiveAction, a task with no returned result. Step 2 implements public void compute(), the analogue of run. The lecture's constructor is shown with two parameters even though later task constructions show one parameter.` },
        { type: `code`, code: `import java.util.concurrent.*;
public class Fibonacci extends RecursiveAction {
    int n, result;
    public Fibonacci(int _n, int _r) { n=_n; result=_r; }
    public void compute() {
        if(n<2) {
            this.result = n;
            return;
        }
        Fibonacci left = new Fibonacci(this.n-1);
        Fibonacci right = new Fibonacci(this.n-2);
        left.fork();
        right.compute();
        left.join();
        this.result = left.result + right.result;
    }
}` },
        { type: `list`, items: [`Step 3 calls left.fork(). Like start it begins asynchronous work, but it does not create a thread; it adds a task to the pool, like ExecutorService.execute.`, `Step 4 calls right.compute on the current thread. Forking right too is allowed, but direct computation reuses the current thread.`, `Step 5 calls left.join(), which blocks until the task terminates, then combines partial results. It joins a task rather than a thread.`, `Step 6 creates ForkJoinPool(2), creates root Fibonacci(40), invokes it, and reads task.result. invoke blocks until all tasks terminate.`] },
        { type: `code`, code: `public static void main(String[] args) {
    ForkJoinPool pool = new ForkJoinPool(2);
    Fibonacci task = new Fibonacci(40);
    pool.invoke(task);
    int result = task.result;
}` },
        { type: `text`, text: `RecursiveTask<T> suits tasks that return results of one type. Its compute returns Integer directly, and pool.invoke returns the root result.` },
        { type: `code`, code: `import java.util.concurrent.*;
public class Fibonacci extends RecursiveTask<Integer> {
    int n;
    public Fibonacci(int _n) { n=_n; }
    public Integer compute() {
        if(n<2) return n; 
        Fibonacci left = new Fibonacci(this.n-1);
        Fibonacci right = new Fibonacci(this.n-2);
        left.fork();
        return right.compute() + left.join();
    }
    public static void main(String[] args) {
        ForkJoinPool pool = new ForkJoinPool(2);
        Fibonacci task = new Fibonacci(40);
        int result = pool.invoke(task);
    }
}` },
        { type: `text`, text: `A four-core performance bar chart shows execution time decreasing as ForkJoinPool thread count rises: about 3.5 seconds with one thread, 1.8 with two, 1.5 with three, and 1.2 with four.` },
        { type: `text`, text: `Too many lightweight tasks still harm performance. Use a cutoff: when work becomes sufficiently small, stop creating tasks. This Fibonacci version computes sequentially below threshold 10, and is significantly faster even with one thread than the earlier unbounded-task version.` },
        { type: `code`, code: `import java.util.concurrent.*;
public class Fibonacci extends RecursiveTask<Integer> {
    int n;
    static int threshold = 10;
    public Fibonacci(int _n) { n=_n; }
    private int sequential(int n) {
        if(n<2) return n;
        else return sequential(n-1) + sequential(n-2);
    }
    public Integer compute() {
        if(n<threshold) return sequential(n); 
        Fibonacci left = new Fibonacci(this.n-1);
        Fibonacci right = new Fibonacci(this.n-2);
        left.fork();
        return right.compute() + left.join();
    }
}` },
        { type: `heading`, text: `Stopping and measuring parallel work` },
        { type: `text`, text: `Speculative parallelism, such as searching a huge array, may stop work as soon as a goal is found. shutdownNow stops new, running, and previously submitted tasks and cancellation throws unchecked CancellationException.` },
        { type: `code`, code: `public class Search extends RecursiveAction<...> {
    ......
    public void compute() {
        if(this.searchItemIsFound()) {
            pool.shutdownNow(); 
        }
        Search left = new Search(...);
        Search right = new Search(...);
        left.fork();
        return right.compute() + left.join();
    }
    public static void main(String[] args) {
        ForkJoinPool pool = new ForkJoinPool(2);
        Search task = new Search(..., pool);
        try {
            pool.invoke(task);
        } catch(CancellationException e) {
            System.out.println("Goal is found, pool aborted");
        }
    }
}` },
        { type: `list`, items: [`Speedup equals Tserial divided by Tparallel.`, `Parallel efficiency equals Tserial divided by p multiplied by Tparallel, where p is processor count.`, `A graph puts parallel speedup vertically and processor count horizontally. A dashed line is linear; a typical-success curve rises below it; regions are labeled superlinear, sublinear, and negative. Superlinear speedup can result from a poor original sequential algorithm, randomized search, or additional fast memory caches.`] },
        { type: `text`, text: `Amdahl's Law says that if 50 percent of an application is parallel and 50 percent is serial, no processor count can give more than factor-two speedup. The formula shown is T_parallel = Tseq + T'par. With infinitely many processors, T'par theoretically approaches zero, leaving T_parallel = Tseq.` },
      ],
    },
    {
      id: `mutual-exclusion`,
      title: `Mutual Exclusion`,
      blocks: [
        { type: `heading`, text: `Race conditions and events` },
        { type: `text`, text: `The race-condition prompt asks how to put green pieces and red pieces in alternating colors. A race occurs when concurrent access makes the result depend on timing.` },
        { type: `text`, text: `A critical section is code accessing shared modifiable data or a resource that only one thread should operate on at a time. Mutual exclusion is the property that only one thread executes that section at a time; without it, a race condition results.` },
        { type: `text`, text: `Formally, thread A is a sequence of events a0, a1, and so on, where a0 followed by an arrow to a1 means ordered before. Events include assigning a shared variable, assigning a local variable, invoking a method, returning from a method, and many others.` },
        { type: `text`, text: `Concurrent execution combines events from thread A and thread B. The interleaving diagram presents their events as mixed in one execution order; the events need not be independent, because an event can affect shared state read by another.` },
        { type: `code`, code: `class Counter implements Runnable {
    int counter = 0;
    public void run() { counter++; }
    public static void main(String[] args) throws InterruptedException {
        ExecutorService exec = Executors.newFixedThreadPool(2);
        Counter task = new Counter();
        for(int i=0; i<1000; i++) {
            exec.execute(task);
        }
        if(!exec.isTerminated()) {
          exec.shutdown();
          exec.awaitTermination(5L,TimeUnit.SECONDS);
        }        
        System.out.println(task.counter);
    }
}` },
        { type: `text`, text: `This program has a race on counter, so different runs can print different answers. counter++ is not a single indivisible operation.` },
        { type: `heading`, text: `Synchronized critical sections and monitors` },
        { type: `text`, text: `synchronized methods or blocks define critical sections and achieve mutual exclusion. The two run forms below are both correct.` },
        { type: `code`, code: `public synchronized void run() { counter++; }
/* public void run() { synchronized(this) {counter++;} } */` },
        { type: `text`, text: `Every object has a monitor, a token determining which application thread controls an object instance. A synchronized method or block must gain the object's monitor before it executes. Access queues; entering is also called locking or acquiring monitor ownership. If thread A requests a monitor already entered by another thread, A waits for the other thread to leave.` },
        { type: `text`, text: `The monitor drawing puts OBJECT above MONITOR. Several threads are below, with a large circular pair of arrows labeled LOCK and UNLOCK around them: a thread locks before entering the object's monitor and unlocks on leaving. In the Counter example, only one thread gets the key to run; others queue. There is no fairness guarantee, so the longest waiter need not go first.` },
        { type: `text`, text: `Synchronizing a static method associates the monitor with the class. Synchronized static methods of the same class are mutually exclusive.` },
        { type: `code`, code: `class Counter implements Runnable {
    static int counter = 0;
    public synchronized static void increment() {counter++;}
    public void run() { increment(); } 
    public static void main(String[] args) throws InterruptedException {
        ExecutorService exec = Executors.newFixedThreadPool(2);
        Counter task = new Counter();
        for(int i=0; i<1000; i++) exec.execute(task);
        if(!exec.isTerminated()) {
          exec.shutdown();
          exec.awaitTermination(5L,TimeUnit.SECONDS);
        }        
        System.out.println(Counter.counter);
    }
}` },
        { type: `heading`, text: `Memory consistency` },
        { type: `text`, text: `Synchronization alone is not the entire solution. The alternating-color program may never terminate: even without a race in counter and color, a thread may begin with values that are no longer the last updated values.` },
        { type: `code`, code: `class Counter implements Runnable {
    static int counter = 0;
    static int turn = RED; //finals RED=0 and GREEN=1
    int me, other;
    public Counter(int c1, int c2) { me=c1; other=c2; }    
    synchronized static void update(int me, int other) {
        if(counter<MAX && turn==me) {
            counter++; turn=other;
        }
    }
    public void run() { 
        while(counter < MAX) {
            if(turn == me) update(me, other);
        }
    }
    public static void main(String args[])throws InterruptedException { 
        Counter task1 = new Counter(RED, GREEN);
        Counter task2 = new Counter(GREEN, RED);
        Thread t1 = new Thread(task1); Thread t2 = new Thread(task2);
        t1.start(); t2.start(); t1.join(); t2.join();
    }
}` },
        { type: `text`, text: `Modern multicore systems give each core a local cache. A CPU first copies memory from RAM to cache; an update may remain cached rather than immediately return to RAM because immediate write-back harms performance. The architecture drawing shows Thread 1 in CPU 1 reading and writing through CPU 1 cache, Thread 2 likewise through CPU 2 cache, and both caches exchanging data with main memory.` },
        { type: `text`, text: `For example, Thread 1 can change counter from 0 to 1 in CPU 1 cache, while Thread 2 later reads stale counter 0 from RAM. The second memory diagram depicts this mismatch, with CPU 1 cache holding counter 7, CPU 2 cache and main memory holding counter 0. This is a memory-consistency error.` },
        { type: `text`, text: `Declare counter and turn volatile to tell the JVM to store values in RAM after every update, so each thread gets the latest values. Updates inside synchronized code are already written to main memory at synchronized-block exit under the Java memory model.` },
        { type: `code`, code: `class Counter implements Runnable {
    volatile static int counter = 0;
    volatile static int turn = RED;
    ............
    ............
}` },
        { type: `heading`, text: `Locks and their limitations` },
        { type: `text`, text: `Any object instance can be the synchronized lock.` },
        { type: `code`, code: `class Counter implements Runnable {
    volatile int counter = 0;
    private Object lock = new Object();
    public void run() { 
        synchronized(lock) {
            counter++; 
        }
    } 
    ............
    ............
}` },
        { type: `text`, text: `Monitor locks are reentrant. When the same thread already owns a monitor and calls another synchronized method using it, it can take that monitor again; the request is redundant. The lock releases only after leaving the oldest synchronized block.` },
        { type: `code`, code: `class Counter implements Runnable {
    volatile int counter = 0;
    public synchronized int value() { return counter; }
    public synchronized void run() { 
        if(value() < 100) {
            counter++; 
        }
    } 
    ............
    ............
}` },
        { type: `list`, items: [`Monitor locks do not guarantee fairness: the longest waiter might not get the lock.`, `They can cause starvation when a thread holds a monitor during a large computation while others wait indefinitely.`, `A thread owning a monitor cannot be interrupted.`, `A thread cannot decline to wait when the monitor is unavailable.`] },
        { type: `heading`, text: `Producer and consumer` },
        { type: `text`, text: `The producer-consumer problem synchronizes transactions. The illustrations show Marge with a cookie jar as producer and Homer holding a cookie as consumer. They cooperate over one shared lock: Marge puts a cookie, waits and notifies Homer; Homer eats it, waits and notifies Marge; then the sequence repeats.` },
        { type: `text`, text: `wait() belongs to java.lang.Object. It requires the object's monitor and must be called in a synchronized method or synchronized code. It makes the current thread relinquish the CPU and monitor, then wait until notify() or notifyAll() is called on that object.` },
        { type: `text`, text: `The wait/notify timeline is: 1, consumer enters synchronized(lock); 2, consumer calls lock.wait and releases the lock; 3, producer enters synchronized(lock); 4, producer produces the resource; 5, producer calls lock.notify; 6, producer exits and releases the lock; 7, consumer reacquires the lock; 8, wait returns; 9, consumer consumes; 10, consumer exits. The sequence diagrams repeat these stages, showing the consumer initially waiting, the producer owning the lock while producing and notifying, and then the consumer resuming only after reacquiring the lock.` },
        { type: `code`, code: `public class SimpsonsTest { 
    public static void main(String[] args) { 
        CookieJar jar = new CookieJar(); 
        Homer homer = new Homer(jar); 
        Marge marge = new Marge(jar); 
        new Thread(homer).start(); 
        new Thread(marge).start(); 
    } 
}` },
        { type: `code`, code: `class Homer implements Runnable { 
    CookieJar jar; 
    public Homer(CookieJar jar) { this.jar = jar; } 
    public void eat() { 
        jar.getCookie("Homer"); 
        try { Thread.sleep((int)Math.random() * 500); } 
        catch (InterruptedException ie) {} 
    } 
    public void run() { for (int i = 0 ; i < 5 ; i++) eat(); } 
}` },
        { type: `code`, code: `class Marge implements Runnable { 
    CookieJar jar; 
    public Marge(CookieJar jar) { this.jar = jar; } 
    public void bake(int cookieNumber) { 
        jar.putCookie("Marge", cookieNumber); 
        try { Thread.sleep((int)Math.random() * 500); } 
        catch (InterruptedException ie) {} 
    } 
    public void run() { for (int i = 0 ; i < 5 ; i++) bake(i); } 
}` },
        { type: `code`, code: `class CookieJar { 
    private volatile int contents; 
    private volatile boolean available = false; 
    public synchronized void getCookie(String who) { 
        while (!available) { 
            try { wait(); } catch (InterruptedException e) { } 
        } 
        available = false; 
        notifyAll(); 
        System.out.println(who + " ate cookie " + contents); 
    } 
    public synchronized void putCookie(String who, int value) { 
       while (available) { 
            try { wait(); } catch (InterruptedException e) { } 
       } 
       contents = value; available = true; 
       System.out.println(who + " put cookie " + contents + " in the jar"); 
       notifyAll(); 
    } 
}` },
        { type: `text`, text: `The shown output alternates exactly: Marge puts cookie 0 and Homer eats 0; then the same put/eat pair occurs for 1, 2, 3, and 4.` },
      ],
    },
    {
      id: `mutual-exclusion-and-deadlocks`,
      title: `Mutual Exclusion and Deadlocks`,
      blocks: [
        { type: `heading`, text: `Java memory model` },
        { type: `text`, text: `This continuation revisits the never-terminating alternating-turn Counter: synchronization prevents a direct race but does not by itself guarantee that each thread sees the most recently updated counter and turn.` },
        { type: `text`, text: `The Java Memory Model defines how threads interpret reads and writes of shared variables. It exists because modern multicore hardware has a memory hierarchy of caches and RAM that improves memory-operation performance. Correct multithreaded programs require understanding these visibility rules.` },
        { type: `text`, text: `Primitive local variables are on a thread-local stack. Thread T1 can pass a primitive value to T2, but later modification by either thread is not visible through that copied value. Objects, including object forms of primitive types, are on the heap. T1 can pass a reference to T2; both use their local references to access the heap object, so changes to that object are visible to the other.` },
        { type: `text`, text: `A JVM-memory drawing has two thread stacks, each showing methodOne and methodTwo local variables, above a shared heap holding Object 1 through Object 5 or 6. Arrows from stack-local references point to heap objects; an object can point to another heap object. A simpler version shows two stacks and one shared heap. This distinguishes Java's logical stack and heap from physical hardware.` },
        { type: `text`, text: `A combined drawing puts JVM thread stacks and heap on the left and computer hardware on the right. Arrows map both stacks and the heap to CPU registers, CPU cache memory, and RAM. Hardware does not know Java's stack-versus-heap distinction: it treats them alike, creating visibility and read/write race concerns for shared variables.` },
        { type: `heading`, text: `Instruction reordering` },
        { type: `text`, text: `Initially A and B are zero. The table has Thread 1 executing R2 = A then B = 1, while Thread 2 executes R1 = B then A = 2. Possible outputs are R2=0 and R1=0; R2=2 and R1=0; R2=0 and R1=1; or R2=2 and R1=1. A compiler may reorder a thread's instructions if that changes nothing when that thread runs alone. Synchronizing both operations makes each thread read an updated value from RAM rather than cache.` },
        { type: `heading`, text: `Caches, volatile, and monitors` },
        { type: `text`, text: `Each CPU core has local cache. A value copied from RAM may be updated in cache without immediate write-back. If Thread 1 updates counter to 1 in CPU 1 cache and Thread 2 reads RAM before write-back, Thread 2 sees stale 0: a memory-consistency error.` },
        { type: `text`, text: `volatile static counter and turn request RAM visibility after updates; synchronized blocks also publish updates when they end. You can synchronize on a dedicated Object lock. Monitor locks are reentrant, but they are not fair, can starve waiters, cannot interrupt the owner, and provide no way to decline unavailable-lock waiting.` },
        { type: `code`, code: `class Counter implements Runnable {
    volatile static int counter = 0;
    volatile static int turn = RED;
    ............
    ............
}` },
        { type: `heading`, text: `Producer-consumer coordination` },
        { type: `text`, text: `Producer-consumer coordination uses one shared object lock. wait requires owning its monitor, releases that monitor while waiting, and resumes only after notify or notifyAll and later monitor reacquisition. In order: consumer locks and waits; producer locks, produces, notifies, and unlocks; consumer reacquires, returns from wait, consumes, and unlocks.` },
        { type: `text`, text: `The cookie-jar program starts Homer and Marge threads. Homer repeatedly gets a cookie then sleeps for a random interval; Marge repeatedly puts numbered cookies then sleeps. CookieJar uses volatile contents and available plus synchronized getCookie and putCookie. Each method waits in a while loop until its precondition holds, changes availability, calls notifyAll, and prints the action. The expected output alternates Marge putting and Homer eating cookies 0 through 4.` },
        { type: `code`, code: `class CookieJar { 
    private volatile int contents; 
    private volatile boolean available = false; 
    public synchronized void getCookie(String who) { 
        while (!available) { 
            try { wait(); } catch (InterruptedException e) { } 
        } 
        available = false; 
        notifyAll(); 
        System.out.println(who + " ate cookie " + contents); 
    } 
    public synchronized void putCookie(String who, int value) { 
       while (available) { 
            try { wait(); } catch (InterruptedException e) { } 
       } 
       contents = value; 
       available = true; 
       System.out.println(who + " put cookie " + contents + " in the jar"); 
       notifyAll(); 
    } 
}` },
        { type: `heading`, text: `Deadlock reminder` },
        { type: `text`, text: `A deadlock illustration shows Thread 1 holding resource A while wanting resource B and Thread 2 holding resource B while wanting resource A. Each waits for the resource held by the other, so neither can proceed. This is one of the multithreading risks alongside race conditions.` },
      ],
    },
  ],
};
