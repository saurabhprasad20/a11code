export const osChaptersA = [
  {
    id: 'introduction-to-operating-systems',
    title: 'Introduction to Operating Systems',
    blocks: [
      { type: 'text', text: `This chapter begins with the machine beneath every application. You will learn what makes a computer programmable and why an operating system, or OS, is the essential manager between programs and hardware.` },
      { type: 'text', text: `By the end, you should be able to trace a request from an application into the kernel, explain why protected execution matters, and name the major services an OS provides.` },
      { type: 'heading', text: `A computer as a programmable machine` },
      { type: 'text', text: `At its most useful level, a computer accepts input, stores information, performs instructions, and produces output. A program is a sequence of instructions and data; hardware repeatedly fetches an instruction, interprets it, and carries it out.` },
      { type: 'list', items: [`The central processing unit, or CPU, performs arithmetic, logic, and control operations.`, `Memory holds instructions and working data so the CPU can reach them.`, `Input and output, abbreviated I/O, connects the machine to keyboards, displays, disks, networks, sensors, and other devices.`, `Buses and controllers carry addresses, data, and control signals among these parts.`] },
      { type: 'text', text: `A processor diagram shows a control unit directing a register set, an arithmetic and logic unit, or ALU, and a program counter. Address lines leave the processor to select a location, while data lines carry values in either direction. The program counter identifies the next instruction; the control unit coordinates the fetch and execution cycle.` },
      { type: 'heading', text: `From hardware to an operating system` },
      { type: 'text', text: `Raw hardware is powerful but inconvenient and dangerous to use directly. An OS is privileged software that abstracts hardware into useful services and coordinates competing programs. It is both a resource manager and a control program.` },
      { type: 'list', items: [`As a resource manager, the OS allocates CPU time, memory, storage space, and device access.`, `As a control program, it prevents erroneous or malicious activity from damaging other programs or the machine.`, `As an abstraction layer, it turns device-specific details into stable ideas such as files, processes, virtual memory, and communication channels.`] },
      { type: 'text', text: `The layered-system diagram can be read from bottom to top: computer hardware supports the operating system; the OS supports system and application programs such as editors, compilers, and databases; users interact with those programs. This placement lets many programs share one machine without each program having to know each device protocol.` },
      { type: 'heading', text: `Kernel services and OS structure` },
      { type: 'text', text: `The kernel is the core portion of the OS that executes with full hardware privilege. It supplies the mechanisms on which ordinary programs depend, while user programs run outside the kernel.` },
      { type: 'list', items: [`Process and thread management creates work units, records their state, and schedules them.`, `Memory management assigns and protects address spaces and translates program addresses.`, `File and storage management organizes persistent data and controls access.`, `I/O management uses device drivers and interrupt handlers to serve hardware.`, `Protection and security enforce which code may perform sensitive operations.`] },
      { type: 'text', text: `A layered OS view puts user programs at the top. Beneath them are services such as the task scheduler, file-system management, I/O management, and memory-management unit support. Device drivers, firmware, and interrupt handlers sit nearer the hardware. The kernel spans these privileged layers, coordinating them rather than being a single simple function.` },
      { type: 'heading', text: `Interrupts: hardware asks for attention` },
      { type: 'text', text: `Devices do not wait for the CPU to poll them constantly. Instead, a device can raise an interrupt: a signal asking the CPU to pause its current instruction stream and run an interrupt handler.` },
      { type: 'list', items: [`The CPU saves enough of the interrupted program state to resume later.`, `It transfers control to the appropriate interrupt-handler entry.`, `The handler acknowledges or services the device, perhaps recording input or completing an I/O request.`, `The handler either returns to the interrupted work or lets the scheduler choose another runnable process.`] },
      { type: 'text', text: `A periodic timer interrupt is especially important. It lets the kernel regain control even if a user program never voluntarily yields. That is the foundation of time sharing: save one task's state, select another, restore its state, and continue.` },
      { type: 'heading', text: `Processes and the scheduler` },
      { type: 'text', text: `A process is a running instance of a program, not merely a program file. The OS loads its executable, gives it an address space, and stores its changing execution context in a process control block, or PCB.` },
      { type: 'list', items: [`A PCB includes a process identifier, CPU register values, program counter, scheduling information, memory information, open I/O state, and pending events.`, `When a time slice ends, the scheduler saves the current process context in its PCB and restores another process context.`, `This rapid alternation creates the useful illusion that multiple programs run at once on one CPU.`] },
      { type: 'text', text: `One process-scheduling diagram has processes P1 through P6 above a scheduler, with a real-time clock feeding a timer interrupt handler below. The timer handler invokes the scheduler; the scheduler chooses a process; the selected process runs in the application layer. It teaches that the clock gives the kernel regular opportunities to share the CPU.` },
      { type: 'heading', text: `User mode, kernel mode, and system calls` },
      { type: 'text', text: `The CPU provides at least two execution modes. User mode restricts ordinary applications: they cannot directly execute privileged instructions, change page tables, or command devices. Kernel mode permits the OS to perform those sensitive operations.` },
      { type: 'list', items: [`A system call is the controlled doorway from user mode into kernel mode.`, `A program places a system-call identifier and arguments where the calling convention requires, then executes a trap or dedicated system-call instruction.`, `The kernel validates the request and arguments, performs the operation if permitted, returns a result, and resumes user mode.`, `Examples include opening a file, reading, writing, creating a process, and exiting.`] },
      { type: 'text', text: `This boundary is not bureaucracy: it is protection. If every application could alter another application's memory or write a disk controller directly, a single bug could corrupt the whole system.` },
      { type: 'heading', text: `A compact machine-level view` },
      { type: 'text', text: `From an assembly programmer's view, processor-visible state includes the program counter, registers, and condition codes. Memory is a byte-addressable array containing code, data, and a stack used for procedure calls. Condition codes record results such as zero, sign, carry, or overflow and guide conditional branches.` },
      { type: 'code', code: `int sum(int x, int y)
{
    int t = x + y;
    return t;
}

sum:
    pushl %ebp
    movl %esp, %ebp
    movl 12(%ebp), %eax
    addl 8(%ebp), %eax
    popl %ebp
    ret` },
      { type: 'text', text: `The lower portion is one possible 32-bit assembly translation of the C function. It establishes a stack frame, loads one argument into the return-value register, adds the other argument from the stack, restores the frame pointer, and returns. The OS must preserve this machine state accurately when it switches processes.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`A computer combines CPU, memory, and I/O; a program directs the CPU through stored instructions.`, `The OS abstracts and shares hardware while enforcing protection.`, `Interrupts and timer interrupts return control to the kernel.`, `PCBs and context switches let the scheduler multiplex the CPU.`, `System calls cross safely from restricted user mode to privileged kernel mode.`] },
      { type: 'text', text: `Next, we look more closely at the CPU, memory, I/O paths, and boot sequence that make these OS services possible.` }
    ],
  },
  {
    id: 'computer-system-architecture',
    title: 'Computer-System Architecture',
    blocks: [
      { type: 'text', text: `The operating system can manage hardware only because the hardware offers clear mechanisms for execution, storage, communication, and protection. This chapter connects those mechanisms to the abstractions introduced previously.` },
      { type: 'text', text: `You will trace compiled code into memory, follow a boot sequence into the kernel, and explain how processors, memory, interrupts, and I/O cooperate.` },
      { type: 'heading', text: `The broad hardware picture` },
      { type: 'text', text: `A minimal architecture has three peers: input/output, the CPU, and main memory. The diagram places I/O on the left, CPU in the center, and memory on the right, with arrows both ways between adjacent components. I/O moves data to and from devices; CPU performs computation; memory holds N words of B bits.` },
      { type: 'text', text: `At a closer level, a processor executes instructions from memory while reading and writing data. The control path chooses operations; the datapath moves values through registers, an ALU, multiplexers, and memory.` },
      { type: 'text', text: `A single-cycle datapath diagram begins with a program counter and instruction memory. The instruction selects registers, may provide an immediate value, and flows through an ALU. A control unit sets signals such as register destination, memory read or write, branch, and ALU operation. Adders advance the program counter or form a branch target, while multiplexers select the next address and write-back value. This detailed wiring illustrates that each instruction is a coordinated movement of bits, not a magical action.` },
      { type: 'heading', text: `CPU state and instruction classes` },
      { type: 'text', text: `The program counter, called EIP in 32-bit x86 and RIP in 64-bit x86, contains the address of the next instruction. It normally advances after an instruction, although calls, returns, jumps, and conditional jumps replace it with another address.` },
      { type: 'list', items: [`Registers hold frequently used values close to the CPU.`, `Condition-code flags record arithmetic outcomes and support branches.`, `Data-movement instructions include MOV, PUSH, POP, and LEA. LEA loads an effective address rather than the data stored there.`, `Arithmetic instructions include TEST, shifts, ADD, MUL, and signed IMUL.`, `Control instructions include JMP, conditional jumps such as JZ and JNZ, CALL, and RET.`, `I/O instructions such as IN and OUT access hardware ports; system instructions include INT, IRET, and SYSCALL.`] },
      { type: 'text', text: `A control-instruction table distinguishes relative and indirect jumps. A relative jump adds a signed displacement to the next instruction address; an indirect jump obtains the target from a register or memory. Either way, it changes the normal program-counter sequence.` },
      { type: 'heading', text: `Registers and the call stack` },
      { type: 'text', text: `The 32-bit x86 register family has general-purpose registers such as EAX, EBX, ECX, and EDX, plus index and stack registers. In 64-bit x86, the corresponding full-width registers use R names and additional registers R8 through R15 are available.` },
      { type: 'text', text: `A 64-bit call-frame diagram is a vertical stack with high addresses at the top and low addresses at the bottom. Above the frame pointer are the return address and incoming stack arguments; below it are local values. The stack pointer marks the current lower edge. It also shows early arguments passed in registers, such as RDI, RSI, RDX, RCX, R8, and R9. The diagram teaches why a context switch must retain both registers and stack-related state.` },
      { type: 'heading', text: `From source program to running process` },
      { type: 'text', text: `A source program becomes executable through a sequence of translations. Each stage has a different responsibility, and the OS later loads the result into a process.` },
      { type: 'list', items: [`Preprocessing performs textual replacement for directives such as includes and macros.`, `Lexical analysis divides characters into tokens such as keywords, identifiers, constants, and operators.`, `Parsing checks whether token sequences follow the language grammar.`, `Semantic analysis assigns meaning and records information useful for later translation.`, `Intermediate-representation generation creates machine-like operations independent of a final instruction encoding.`, `Code generation and optimization turn that representation into assembly. The assembler emits object code, and the linker resolves references and libraries into an executable.`, `At execution time, the loader establishes the program image and any dynamic-library bindings.`] },
      { type: 'code', code: `unsigned square_int(unsigned a)
{
    return a * a;
}

; intermediate representation
%1 = mul i32 %a, %a
ret i32 %1

; one possible assembly result
square_unsigned:
    movl 4(%esp), %eax
    imull %eax, %eax
    ret` },
      { type: 'text', text: `The same calculation appears successively as source, an intermediate multiply, and assembly. The compiler chooses where the input and result live; here EAX receives the argument and then holds the product returned to the caller.` },
      { type: 'heading', text: `Program memory layout` },
      { type: 'text', text: `A running program has regions with distinct roles and permissions. Separating them helps the OS protect code and manage dynamic storage.` },
      { type: 'list', items: [`Text, or code, contains executable instructions.`, `Read-only data, often called rodata, holds constants such as string literals.`, `Data holds initialized global variables; BSS holds uninitialized global or static storage.`, `The heap grows as dynamic allocation requests memory.`, `The stack holds call frames, return addresses, parameters, and automatic local variables.`] },
      { type: 'text', text: `The process-memory diagram places text and data at low addresses, then the heap growing upward. The stack begins near high addresses and grows downward. Empty space separates the two growing regions. This arrangement lets both expand until they approach one another, subject to limits and virtual-memory policy.` },
      { type: 'heading', text: `Memory and protection` },
      { type: 'text', text: `Physical memory is shared by firmware, devices, and ordinary RAM. A 32-bit physical-layout diagram starts at address zero with low memory, then a display region and device expansion regions, a firmware read-only region, extended memory, unused space depending on installed RAM, and memory-mapped devices near the top of the four-gigabyte range.` },
      { type: 'text', text: `The memory-management unit, or MMU, translates a process's virtual addresses to physical locations and enforces permissions. Boot code may begin with simple physical addressing; later the OS enables protected virtual addressing using mechanisms such as paging and, on relevant architectures, segmentation.` },
      { type: 'heading', text: `I/O, interrupts, and system entry` },
      { type: 'text', text: `Hardware devices are slower and more varied than the CPU. Controllers and device drivers hide device details. Completion or error events commonly arrive as interrupts, allowing the CPU to do other work rather than spin waiting.` },
      { type: 'list', items: [`On interrupt entry, hardware saves essential control state and loads a handler address from an interrupt vector.`, `Low-level handler code saves remaining registers and establishes a safe kernel stack.`, `The higher-level service routine handles or buffers the event.`, `The scheduler may select a different process before low-level code restores the selected context.`] },
      { type: 'text', text: `IRET returns from an interrupt, restoring the saved flags and control state. INT is a software interrupt or trap. On modern 64-bit x86, SYSCALL provides a dedicated system-call entry instruction; it transfers to kernel-controlled code using a calling convention for the request number and arguments.` },
      { type: 'heading', text: `Booting into the OS` },
      { type: 'text', text: `When power arrives, firmware first performs a power-on self-test to check essential hardware. Firmware initializes basic devices, finds a bootable target, loads initial boot code into memory, and transfers control to it. The bootloader then locates and loads the operating-system kernel, which initializes memory, devices, and the first user-space work.` },
      { type: 'text', text: `Modern firmware interfaces can use a dedicated system partition and support many boot entries, while older boot schemes used a small initial disk record and tighter partition limits. The key OS lesson is unchanged: early privileged code establishes enough hardware state to load and start the kernel safely.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`CPU state, instruction execution, and the stack explain what a process context contains.`, `The toolchain produces an executable whose code, data, heap, and stack become a process image.`, `The MMU and CPU modes protect memory and privileged operations.`, `Interrupts and system-entry instructions connect devices and applications to kernel code.`, `The boot path transfers the machine from firmware control to the OS.`] }
    ],
  },
  {
    id: 'processes-and-process-creation',
    title: 'Processes and Process Creation',
    blocks: [
      { type: 'text', text: `A program on disk becomes useful only when the OS turns it into a process. Building on the machine and memory model, this chapter explains process state, creation, execution replacement, and termination.` },
      { type: 'text', text: `You will be able to distinguish a program from a process, interpret a process-state diagram, and reason through fork, exec, wait, and exit.` },
      { type: 'heading', text: `The process concept` },
      { type: 'text', text: `A process is an active execution environment: program instructions plus current CPU state, address space, open resources, and kernel bookkeeping. Each process sees an isolated virtual address space containing its own code, data, heap, and stack.` },
      { type: 'list', items: [`New means the process is being created.`, `Ready means it can run but is waiting for a CPU.`, `Running means it currently owns a CPU.`, `Waiting, also called blocked, means it cannot continue until an event such as I/O completion occurs.`, `Terminated means execution has ended, although some status may remain until a parent collects it.`] },
      { type: 'text', text: `The state diagram begins with new, which is admitted to ready. Scheduler dispatch moves ready to running. A running process that waits for I/O moves to waiting; I/O completion returns it to ready. An interrupt or preemption moves running back to ready, and exit moves running to terminated. Follow these arrows carefully: ready is runnable, while waiting is not.` },
      { type: 'heading', text: `The process control block` },
      { type: 'text', text: `The PCB is the kernel record that lets a process pause and later resume as though nothing happened. A PCB diagram stacks fields for process state, process number, program counter, registers, memory limits, and a list of open files, followed by additional bookkeeping.` },
      { type: 'list', items: [`The program counter says where execution resumes.`, `Register contents include stack and general registers.`, `Scheduling fields include priorities and queue links.`, `Memory-management fields describe the address space.`, `Accounting fields track CPU use and limits.`, `I/O fields identify allocated devices and open files.`] },
      { type: 'text', text: `A context switch saves the outgoing process context in its PCB and restores the incoming context from another PCB. This is necessary work but not useful application work, so its time is scheduling overhead.` },
      { type: 'heading', text: `Processes as a tree` },
      { type: 'text', text: `Processes commonly create children, and children can create further children. The resulting parent-child relationships form a process tree. A sample tree places an initial system process at the root, with service processes and login-related processes below it, and shells or other programs as descendants.` },
      { type: 'list', items: [`A process identifier, or PID, uniquely identifies a process while it exists.`, `A parent and child may share all resources, a subset, or none, depending on the creation model.`, `They may execute concurrently, or a parent may wait for a child to finish.`] },
      { type: 'heading', text: `fork: creating a child` },
      { type: 'text', text: `On Unix-like systems, fork creates a child process. Both parent and child continue from the instruction after fork, so return values tell them which role they have: the child receives zero, the parent receives the child's PID, and a negative result indicates failure.` },
      { type: 'code', code: `pid_t pid = fork();

if (pid < 0) {
    perror("fork");
    return 1;
} else if (pid == 0) {
    execlp("ls", "ls", NULL);
    perror("execlp");
    _exit(127);
} else {
    wait(NULL);
    printf("Child completed\n");
}` },
      { type: 'text', text: `The child branch replaces itself with the ls program through execlp. The parent branch waits. If exec succeeds, it does not return because the child process now executes the new program image; if it fails, the child reports the failure and exits.` },
      { type: 'text', text: `A creation-flow diagram shows fork splitting into two paths. The parent goes to wait and then resumes. The child goes to exec, then exit; exit wakes the parent's wait. It captures the common shell pattern: create a child to run a command while the parent coordinates completion.` },
      { type: 'heading', text: `Copy-on-write and clone` },
      { type: 'text', text: `Naively copying every memory page at fork would be expensive, especially because a child often immediately calls exec. Copy-on-write avoids that waste: parent and child initially map the same pages as protected shared pages; only a later write causes the kernel to allocate and copy the affected page.` },
      { type: 'text', text: `Linux implements related creation operations with a flexible clone mechanism. Flags determine what the new task shares. A process-like creation keeps independent resources; a thread-like creation can share an address space, file descriptors, filesystem information, or signal handling.` },
      { type: 'code', code: `/* Thread-like sharing of selected resources */
clone(CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND, 0);

/* Process-like creation */
clone(SIGCHLD, 0);

/* vfork-style creation */
clone(CLONE_VFORK | CLONE_VM | SIGCHLD, 0);` },
      { type: 'text', text: `These calls show the design idea, not a complete application interface. Sharing virtual memory with CLONE_VM is central to thread-like behavior; a normal fork-style child instead gets its own logical address space, typically implemented efficiently with copy-on-write.` },
      { type: 'heading', text: `Threads and kernel threads` },
      { type: 'text', text: `A process can contain one or more threads of execution. Threads in one process share its address space and many resources but have separate execution state such as registers and stacks.` },
      { type: 'text', text: `The thread-model diagram contrasts three separate one-thread processes with one process containing three threads. In both cases the kernel is below user space, but the three threads in one process share the enclosing process resources. Kernel threads are scheduler-visible tasks that execute kernel work and normally lack an ordinary user address space.` },
      { type: 'heading', text: `Termination, zombies, and orphans` },
      { type: 'text', text: `A process normally terminates by returning from its main function or calling exit. The kernel releases resources, closes or drops references as appropriate, records an exit status, and notifies the parent.` },
      { type: 'list', items: [`wait or waitpid lets a parent collect a terminated child's PID and status.`, `A zombie is a terminated child whose parent has not yet collected its status; it retains a small process-table record, not its full execution memory.`, `An orphan is a child whose parent has terminated. The OS reparents it to a suitable reaper process so its eventual exit status can be collected.`, `A parent may abort a child when its work is no longer needed or it exceeds assigned resources.`] },
      { type: 'heading', text: `System calls and safe user-memory access` },
      { type: 'text', text: `Process operations are system calls because they change kernel-managed state. On a system-call entry, the kernel must treat all user pointers as untrusted and copy data safely across the protection boundary.` },
      { type: 'code', code: `SYSCALL_DEFINE3(silly_copy, unsigned long *, src,
                unsigned long *, dst, unsigned long len)
{
    unsigned long buf;

    if (copy_from_user(&buf, src, len))
        return -EFAULT;
    if (copy_to_user(dst, &buf, len))
        return -EFAULT;
    return len;
}` },
      { type: 'text', text: `This illustrative kernel routine copies from a user address into a kernel variable and then back to another user address. The checked helpers prevent the kernel from blindly dereferencing an invalid or forbidden user pointer.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`A process combines a program image with changing execution and resource state.`, `The PCB makes context switching possible.`, `fork creates a child; exec replaces a process image; wait reaps a child; exit terminates it.`, `Copy-on-write postpones copying until a shared page is written.`, `Threads share process resources while retaining separate execution contexts.`] }
    ],
  },
  {
    id: 'inter-process-communication-part-1',
    title: 'Inter-Process Communication, Part 1',
    blocks: [
      { type: 'text', text: `Separate processes are protected from one another by default, yet useful programs often need to collaborate. Inter-process communication, or IPC, provides deliberate, controlled ways to exchange information and coordinate work.` },
      { type: 'text', text: `This first IPC chapter introduces the two broad models, then develops signals, anonymous pipes, named pipes, and shared memory.` },
      { type: 'heading', text: `Why processes cooperate` },
      { type: 'text', text: `Independent processes neither affect nor are affected by one another's execution. Cooperating processes can exchange data or influence each other, which is useful when an application is divided into components.` },
      { type: 'list', items: [`Information sharing lets several processes access common information.`, `Computation speedup divides work among processes or processors.`, `Modularity separates responsibilities into clearer components.`, `Convenience allows a user or service to work with several related activities.`] },
      { type: 'heading', text: `Shared memory and message passing` },
      { type: 'text', text: `IPC has two main models. In message passing, processes use kernel-mediated send and receive operations. In shared memory, the kernel establishes a common region and processes then read or write that region directly.` },
      { type: 'text', text: `A comparison diagram has two halves. On the message-passing side, processes A and B communicate through a kernel message queue holding messages m0 through mn. On the shared-memory side, the processes' address spaces overlap at one shared-memory region. Message passing makes sharing explicit but incurs copying and protection-boundary overhead; shared memory can be fast after setup but requires careful synchronization.` },
      { type: 'heading', text: `Signals: asynchronous notifications` },
      { type: 'text', text: `A signal is an event delivered to a process in response to a condition. Hardware faults, terminal actions, timers, and other processes can generate signals. The default action depends on the signal, while an application may catch many signals with a handler, ignore some, or block delivery temporarily.` },
      { type: 'list', items: [`SIGINT commonly represents a terminal interrupt.`, `SIGTERM requests termination, while SIGKILL cannot be caught or ignored.`, `SIGSEGV reports invalid memory access; SIGFPE reports an arithmetic exception.`, `SIGALRM is associated with an alarm timer.`, `SIGPIPE occurs when writing to a pipe that has no reader.`, `SIGUSR1 and SIGUSR2 are available for application-defined uses.`] },
      { type: 'text', text: `Signals are notifications, not a general data transport. A handler must do only operations that are safe in an asynchronous context; complicated ordinary work should be deferred to normal program flow.` },
      { type: 'heading', text: `Signal masks and reliable handlers` },
      { type: 'text', text: `Each process has a kernel-maintained signal mask. A masked signal is withheld until it becomes unblocked, except for signals that the system does not permit a process to block.` },
      { type: 'code', code: `sigset_t set;

sigemptyset(&set);
sigaddset(&set, SIGINT);
sigprocmask(SIG_BLOCK, &set, NULL);

/* critical region */

sigprocmask(SIG_UNBLOCK, &set, NULL);` },
      { type: 'text', text: `This sequence constructs a set containing SIGINT, adds it to the current mask, performs a critical region, then removes it. sigprocmask can block selected signals, unblock them, or replace the entire mask.` },
      { type: 'code', code: `static void on_interrupt(int sig)
{
    printf("received signal %d\n", sig);
}

struct sigaction action;
action.sa_flags = 0;
action.sa_handler = on_interrupt;
sigemptyset(&action.sa_mask);
sigaction(SIGINT, &action, NULL);` },
      { type: 'text', text: `sigaction installs a specified handler and its associated mask policy. It is more precise and portable across POSIX systems than relying on older signal behavior. The handler receives the signal number so one function can distinguish events if needed.` },
      { type: 'heading', text: `Timers and signals` },
      { type: 'text', text: `Interval timers can request periodic signal delivery. A timer configuration has an initial expiration and an interval for subsequent expirations. Timers help implement timeouts and profiling, but their exact clock basis matters: some measure elapsed time and others account for CPU time.` },
      { type: 'code', code: `struct itimerval timer;
timer.it_value.tv_sec = 1;
timer.it_value.tv_usec = 0;
timer.it_interval.tv_sec = 1;
timer.it_interval.tv_usec = 0;
setitimer(ITIMER_PROF, &timer, NULL);` },
      { type: 'text', text: `This configuration requests a first profiling-timer expiration after one second and repeats every second. The corresponding signal handler should be installed before the timer begins.` },
      { type: 'heading', text: `Anonymous pipes` },
      { type: 'text', text: `A pipe is a kernel buffer that connects a writer to a reader. It is commonly used by related processes, especially after fork. In a shell pipeline, one program's standard output becomes another program's standard input.` },
      { type: 'code', code: `int fd[2];
if (pipe(fd) == -1)
    perror("pipe");

/* fd[0] is the read end; fd[1] is the write end */` },
      { type: 'text', text: `The process diagram places fd[1] above a pipe buffer with an arrow into it and fd[0] above the buffer with an arrow out. The pipe buffer lives in the kernel. Writes to fd[1] are read from fd[0].` },
      { type: 'text', text: `After fork, both parent and child inherit both descriptors. Correct code closes the unused end in each process. A two-pipe diagram illustrates bidirectional parent-child communication: pipe 0 carries parent-to-child data and pipe 1 carries child-to-parent data. A single-direction pipeline needs only one pipe and one reader/writer direction.` },
      { type: 'code', code: `int pfds[2];
pipe(pfds);

if (fork() == 0) {
    close(STDOUT_FILENO);
    dup(pfds[1]);
    close(pfds[0]);
    execlp("ls", "ls", NULL);
} else {
    close(STDIN_FILENO);
    dup(pfds[0]);
    close(pfds[1]);
    execlp("wc", "wc", "-l", NULL);
}` },
      { type: 'text', text: `The child redirects standard output to the pipe write end before running ls. The parent redirects standard input from the pipe read end before running wc -l. Each closes the end it will not use, which is vital: a reader sees end-of-file only after every copy of the write end is closed.` },
      { type: 'list', items: [`read, write, and close operate on pipe descriptors as they do on file descriptors.`, `When the last writer closes the write end, a read from the read end eventually returns zero bytes for end-of-file.`, `Writing when every read end is closed causes SIGPIPE by default, or write fails with EPIPE if that signal is handled or ignored.`] },
      { type: 'heading', text: `Named pipes, also called FIFOs` },
      { type: 'text', text: `An anonymous pipe is inherited through a family relationship. A named pipe, or FIFO, is a filesystem object that unrelated processes can open by name. Data still travels in first-in, first-out order.` },
      { type: 'code', code: `#define FIFO_NAME "fifo_1"

if (mkfifo(FIFO_NAME, 0666) == -1)
    perror("mkfifo");

int fd = open(FIFO_NAME, O_WRONLY);
write(fd, message, message_length);
close(fd);` },
      { type: 'text', text: `This creates a FIFO with permissions, opens its writing end, sends bytes, and closes it. A reader opens the same named object with O_RDONLY and uses read. Opening a FIFO can wait until a corresponding endpoint is present, which provides basic rendezvous behavior.` },
      { type: 'heading', text: `Shared memory` },
      { type: 'text', text: `System V shared memory gives cooperating processes mappings of the same physical storage. The kernel controls creation and attachment; once attached, normal loads and stores access the shared region without a per-access kernel call.` },
      { type: 'code', code: `key_t key = ftok("shared-key-file", 'R');
int shmid = shmget(key, 1024, 0644 | IPC_CREAT);
char *data = shmat(shmid, NULL, 0);

/* read or write through data */

shmdt(data);
shmctl(shmid, IPC_RMID, NULL);` },
      { type: 'text', text: `ftok derives a key, shmget obtains or creates an identifier, and shmat attaches it into the process address space. shmdt detaches a process's mapping. Detaching does not destroy the object; IPC_RMID marks it for removal according to the system's lifecycle rules.` },
      { type: 'text', text: `Shared memory solves data placement, not coordination. If two processes write the same location concurrently, their operations can race. Later synchronization mechanisms are needed to make multi-step shared updates safe.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`IPC enables intentional cooperation between isolated processes.`, `Signals deliver asynchronous notifications and can be masked or handled.`, `Pipes stream bytes through kernel buffers; FIFOs let unrelated processes rendezvous by name.`, `Shared memory can be efficient but requires explicit synchronization.`] }
    ],
  },
  {
    id: 'inter-process-communication-part-2',
    title: 'Inter-Process Communication, Part 2',
    blocks: [
      { type: 'text', text: `Part 1 established byte streams and shared memory. This chapter adds record-oriented message queues and full-duplex local sockets, giving you several choices for communicating processes.` },
      { type: 'text', text: `The key question is not which mechanism is universally best, but what communication shape your program needs: typed records, one-way bytes, or a two-way conversation.` },
      { type: 'heading', text: `System V message queues` },
      { type: 'text', text: `A message queue is a kernel-managed collection of discrete messages. Unlike a raw pipe, it preserves message boundaries and associates each message with a positive long type value.` },
      { type: 'code', code: `#include <sys/msg.h>

key_t key = ftok("queue-key-file", 'b');
int msqid = msgget(key, 0666 | IPC_CREAT);` },
      { type: 'text', text: `ftok supplies a key and msgget returns a queue identifier, creating the queue if the creation flag and permissions allow it. The ID is then used for send, receive, and control operations.` },
      { type: 'heading', text: `Message layout and sending` },
      { type: 'text', text: `The interface requires the first member of a message buffer to be a long mtype. The standard illustrative msgbuf has only one character of text, so real programs define a larger structure whose first field remains the type.` },
      { type: 'code', code: `struct work_message {
    long mtype;             /* must be positive */
    char text[128];
};

struct work_message message;
message.mtype = 2;
msgsnd(msqid, &message, sizeof(message.text), 0);` },
      { type: 'text', text: `The size argument counts the bytes after mtype, not the long type field itself. This message has type 2 and a 128-byte payload array. A production program checks every return value and defines the payload format clearly for both endpoints.` },
      { type: 'heading', text: `Receiving by type` },
      { type: 'code', code: `struct work_message message;
ssize_t count = msgrcv(msqid, &message,
                       sizeof(message.text), msgtyp, 0);` },
      { type: 'text', text: `msgrcv can select more than simply the oldest message. A message-type table has three cases: msgtyp zero retrieves the next message regardless of type; a positive msgtyp retrieves the next message with exactly that type; a negative msgtyp retrieves the first message whose type is less than or equal to the absolute value. This selection enables simple priority or category routing.` },
      { type: 'code', code: `msgctl(msqid, IPC_RMID, NULL);` },
      { type: 'text', text: `IPC_RMID removes a message queue when the program no longer needs it. Creating persistent kernel objects without planning their cleanup is a resource leak, so ownership and removal are part of IPC design.` },
      { type: 'heading', text: `Unix-domain sockets` },
      { type: 'text', text: `A Unix-domain socket provides local, bidirectional communication using the socket model familiar from network programming. It uses an address in the local system namespace instead of an internet host and port.` },
      { type: 'code', code: `struct sockaddr_un local;
local.sun_family = AF_UNIX;
strcpy(local.sun_path, "service.socket");` },
      { type: 'text', text: `The sockaddr_un structure identifies the address family as AF_UNIX and carries a local path name. Stream sockets provide a reliable ordered byte stream, conceptually similar to two one-way pipes bundled together.` },
      { type: 'heading', text: `Creating a local server` },
      { type: 'code', code: `int server = socket(AF_UNIX, SOCK_STREAM, 0);

unlink(local.sun_path);
bind(server, (struct sockaddr *)&local,
     strlen(local.sun_path) + sizeof(local.sun_family));
listen(server, 5);

struct sockaddr_un remote;
socklen_t len = sizeof(remote);
int client = accept(server, (struct sockaddr *)&remote, &len);` },
      { type: 'text', text: `socket creates an endpoint. bind assigns its local name, and unlink removes a stale pathname before binding. listen changes the endpoint into a passive listener with a pending-connection backlog. accept waits for a client and returns a new connected descriptor; the original server descriptor stays available to accept later clients.` },
      { type: 'code', code: `char buf[100];
ssize_t len;

while ((len = recv(client, buf, sizeof(buf), 0)) > 0)
    send(client, buf, len, 0);

close(client);
close(server);` },
      { type: 'text', text: `This is an echo loop: it receives bytes on the accepted connection and sends the same bytes back. recv returning zero means the peer closed its sending side. The server then closes resources; shutdown may instead close only reading, only writing, or both directions.` },
      { type: 'heading', text: `Connecting as a client` },
      { type: 'code', code: `int client = socket(AF_UNIX, SOCK_STREAM, 0);

struct sockaddr_un remote;
remote.sun_family = AF_UNIX;
strcpy(remote.sun_path, "service.socket");

if (connect(client, (struct sockaddr *)&remote,
            strlen(remote.sun_path) + sizeof(remote.sun_family)) == -1)
    perror("connect");` },
      { type: 'text', text: `The client independently creates an endpoint, fills the same server address, and calls connect. Once the server accepts it, both sides use send and recv on their connected descriptors. This separation of listening endpoint from connection endpoint lets one server handle multiple conversations.` },
      { type: 'heading', text: `socketpair: related processes with two-way communication` },
      { type: 'text', text: `socketpair creates two already-connected local socket descriptors. It is especially convenient before fork, when a parent and child need a full-duplex channel without naming a filesystem path.` },
      { type: 'code', code: `int sv[2];
char ch;

socketpair(AF_UNIX, SOCK_STREAM, 0, sv);

if (fork() == 0) {
    read(sv[1], &ch, 1);
    ch = toupper((unsigned char)ch);
    write(sv[1], &ch, 1);
} else {
    write(sv[0], "b", 1);
    read(sv[0], &ch, 1);
    wait(NULL);
}` },
      { type: 'text', text: `The parent writes a lowercase b through one endpoint. The child reads it through the other endpoint, converts it to uppercase, and writes the result back. The parent reads B. Unlike a simple one-way pipe, either endpoint can both read and write.` },
      { type: 'heading', text: `Choosing an IPC mechanism` },
      { type: 'list', items: [`Use signals for compact asynchronous notification, not structured payload transfer.`, `Use a pipe for a simple one-way byte stream between related processes.`, `Use a FIFO for a named one-way byte stream between processes that can open the same filesystem object.`, `Use shared memory when large or frequent data exchange justifies explicit synchronization.`, `Use message queues for kernel-mediated discrete messages and type-based selection.`, `Use Unix-domain sockets for local client-server sessions or bidirectional stream communication.`] },
      { type: 'text', text: `All IPC creates a protocol obligation: define who creates the channel, what each message means, how endpoints detect completion or failure, and who cleans up.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`Message queues preserve records and can select by message type.`, `Unix-domain sockets offer local two-way client-server communication.`, `socketpair gives related processes an immediate full-duplex connection.`, `Correct endpoint closing and cleanup are part of correct IPC behavior.`] }
    ],
  },
  {
    id: 'cpu-scheduling-part-1',
    title: 'CPU Scheduling, Part 1',
    blocks: [
      { type: 'text', text: `Processes may be ready at the same time, but a single CPU can execute only one instruction stream at a time. CPU scheduling is the kernel policy that chooses which ready process runs next.` },
      { type: 'text', text: `This chapter develops scheduling goals and classic policies. As you read, keep the process-state model in mind: a scheduler chooses among ready processes, never among blocked ones.` },
      { type: 'heading', text: `CPU and I/O bursts` },
      { type: 'text', text: `Process execution typically alternates between CPU bursts and I/O bursts. During a CPU burst, the process computes; during an I/O burst, it waits for a device or event. Multiprogramming keeps the CPU busy by running another ready process while one process waits.` },
      { type: 'text', text: `The burst-cycle diagram alternates groups of load, store, add, and file operations labeled CPU burst with boxes labeled wait for I/O. It shows that a process is not continuously CPU-bound; scheduling gains an opportunity whenever it blocks.` },
      { type: 'heading', text: `Dispatching and context switching` },
      { type: 'text', text: `A timer interrupt, an I/O event, or a system call can bring the kernel to the scheduler. The dispatcher transfers control to the selected process. If a different process was running, the system saves the old PCB context and loads the new one.` },
      { type: 'text', text: `An interrupt-handling sequence is: hardware stacks the program counter and related state; hardware loads a handler address from the interrupt vector; low-level code saves registers and establishes a kernel stack; the service routine handles the event; the scheduler selects a process; low-level code starts the chosen process. This explains why a context switch has measurable overhead.` },
      { type: 'heading', text: `Process-state movements` },
      { type: 'text', text: `A three-state diagram labels running, ready, and blocked. First, a running process blocks for input and moves to blocked. Second, the scheduler chooses another ready process. Third, it later chooses the original process, moving it from ready to running. Fourth, input becomes available and moves the blocked process to ready. The order emphasizes that I/O completion makes a process eligible; it does not guarantee immediate execution.` },
      { type: 'heading', text: `Scheduling criteria` },
      { type: 'list', items: [`CPU utilization: keep the processor busy when useful work exists.`, `Throughput: maximize processes completed per unit time.`, `Turnaround time: minimize total time from submission to completion.`, `Waiting time: minimize total time spent in the ready queue.`, `Response time: minimize time to a first visible response, especially for interactive work.`, `Fairness and starvation avoidance: ensure eligible work is not postponed indefinitely.`] },
      { type: 'text', text: `No single policy optimizes every criterion. A batch workload may value throughput and turnaround; an interactive workload values prompt response; a real-time workload may value deadlines.` },
      { type: 'heading', text: `First-come, first-served` },
      { type: 'text', text: `First-come, first-served, or FCFS, runs ready processes in arrival order. It is nonpreemptive: once a process begins a CPU burst, it continues until it blocks or finishes.` },
      { type: 'code', code: `Processes: P1 = 24, P2 = 3, P3 = 3
Arrival order: P1, P2, P3

Gantt timeline:
0          24  27  30
|---- P1 ----|P2|P3|

Waiting times: P1 = 0, P2 = 24, P3 = 27
Average waiting time = (0 + 24 + 27) / 3 = 17` },
      { type: 'text', text: `The timeline starts P1 at time 0. P2 cannot start until time 24, and P3 cannot start until time 27. This illustrates the convoy effect: a long CPU-bound job at the front makes short jobs wait behind it.` },
      { type: 'heading', text: `Shortest job first and shortest remaining time` },
      { type: 'text', text: `Shortest job first, or SJF, chooses a ready process with the smallest next CPU burst. Its preemptive form, shortest-remaining-time first, or SRTF, switches if a newly arrived process has a shorter remaining burst than the running process.` },
      { type: 'code', code: `Process   arrival   burst
P1        0         8
P2        1         4
P3        2         9
P4        3         5

SRTF timeline:
0 1     5         12        17        26
|P1| P2  |    P4    |   P1    |   P3    |` },
      { type: 'text', text: `At time 0 P1 starts. P2 arrives at time 1 with a shorter burst and preempts P1. P3 arrives at time 2 but is longer than P2's remaining work. P4 arrives at time 3 but is also longer than P2's remaining work. P2 finishes at 5; P4 then runs to 10, followed by P1 to 17 and P3 to 26. The listed waiting-time total is 26, giving an average of 6.5 milliseconds.` },
      { type: 'text', text: `SJF is optimal for average waiting time when burst lengths are known, but operating systems must predict future bursts. It can also starve long work if short jobs continually arrive.` },
      { type: 'heading', text: `Round robin` },
      { type: 'text', text: `Round robin, or RR, gives each ready process a time quantum. When the quantum expires, the timer interrupts, the current process is preempted if unfinished, and it goes to the back of the ready queue.` },
      { type: 'code', code: `Processes: P1 = 24, P2 = 3, P3 = 3
Quantum = 4

Gantt timeline:
0    4   7   10   14   18   22   26   30
| P1 |P2 | P3 | P1 | P1 | P1 | P1 | P1 |` },
      { type: 'text', text: `P1 uses the first four units and has 20 left. P2 finishes in three units, then P3 finishes in three. P1 is now alone and receives five further quanta, with the last one needing only two units. RR gives short jobs an earlier response than FCFS, though its average turnaround can exceed SJF.` },
      { type: 'text', text: `With n ready processes and quantum q, each receives at most q at once and, ignoring overhead, waits no more than roughly (n minus 1) times q before another turn. If q is very large, RR approaches FCFS; if q is very small, context-switch overhead consumes too much time.` },
      { type: 'text', text: `The time-quantum figure compares a process requiring 10 units. Quantum 12 needs zero context switches; quantum 6 divides it into two intervals and one switch; quantum 1 divides it into ten intervals and nine switches. It teaches the direct cost of choosing an excessively small quantum.` },
      { type: 'heading', text: `Multilevel queues` },
      { type: 'text', text: `A multilevel queue partitions the ready queue into fixed classes, such as interactive foreground and batch background. Each class can use its own internal policy: for example, RR in the foreground and FCFS in the background.` },
      { type: 'list', items: [`Fixed-priority selection always serves a higher class before a lower class, but can starve lower classes.`, `Time-sliced selection reserves a fraction of processor time for each class, such as most time for interactive work and some time for batch work.`, `Processes remain permanently assigned to their class in a basic multilevel queue.`] },
      { type: 'text', text: `The queue-priority figure is a vertical set of horizontal queues: system processes have the highest priority, followed by interactive, interactive editing, batch, and lowest-priority user jobs. Arrows through each band show progress, while the ordering warns that strict priority can delay low bands indefinitely.` },
      { type: 'heading', text: `Multilevel feedback queues` },
      { type: 'text', text: `A multilevel feedback queue allows a process to move between queues. It can favor short or interactive behavior near the top while gradually moving CPU-hungry work downward; aging can promote waiting work to prevent starvation.` },
      { type: 'code', code: `Q0: round robin, quantum 8 ms
Q1: round robin, quantum 16 ms
Q2: first-come, first-served

New job -> Q0
Unfinished after 8 ms -> Q1
Unfinished after 16 more ms -> Q2` },
      { type: 'text', text: `The diagram places Q0 above Q1 above Q2, with arrows downward after an exhausted quantum. A new job gets quick service in Q0. If it repeatedly consumes whole quanta, it is demoted to longer quanta and ultimately FCFS, preserving responsive treatment for brief work.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`Schedulers select ready processes and context switches carry their state across CPU ownership changes.`, `FCFS is simple but can create a convoy behind long jobs.`, `SJF and SRTF favor short bursts but need prediction and can starve long jobs.`, `RR shares the CPU through time quanta and improves interactive response.`, `Multilevel policies classify or adapt process priority and behavior.`] }
    ],
  },
  {
    id: 'cpu-scheduling-part-2',
    title: 'CPU Scheduling, Part 2',
    blocks: [
      { type: 'text', text: `Classic scheduling policies explain the trade-offs. This chapter follows that foundation into Linux scheduler evolution and the Completely Fair Scheduler, or CFS.` },
      { type: 'text', text: `You will learn how CFS uses virtual runtime, a balanced tree, weights, and scheduling classes to approximate fair processor sharing efficiently.` },
      { type: 'heading', text: `Task states in a practical kernel` },
      { type: 'text', text: `A Linux task-state diagram begins when an existing task creates another task. The new task is runnable but not executing, then the scheduler dispatches it to running. A running task can sleep on a wait queue for an event, becoming interruptible or uninterruptible waiting; when the event occurs it returns to the run queue. Preemption by higher-priority work also returns a task to runnable state. Exit leads to a zombie state until reaping.` },
      { type: 'text', text: `One terminology detail matters: older Linux state names use TASK_RUNNING for both a currently executing task and a ready runnable task. The conceptual distinction remains the same as before: only one task per CPU is executing at an instant, while multiple tasks may be eligible.` },
      { type: 'heading', text: `Earlier Linux schedulers` },
      { type: 'list', items: [`An early scheduler used a circular queue and round-robin policy: compact and simple, but not designed for large systems.`, `A later scheduler introduced classes such as real-time and ordinary tasks and added symmetric multiprocessing support.`, `The 2.4-era scheduler examined tasks with a goodness function, making selection O(N) for N tasks. It used epochs and time slices but scaled poorly.`, `The O(1) scheduler used a separate run queue per CPU and active and expired priority arrays. Finding the highest-priority nonempty queue took constant-time selection.`] },
      { type: 'text', text: `In the O(1) design, real-time tasks use static priorities. Ordinary tasks have dynamic priorities influenced by nice value and interactive behavior. When the active array empties, it exchanges with the expired array. This avoids scanning every task, but its policy could still be difficult to tune for fairness and responsiveness.` },
      { type: 'heading', text: `The CFS fairness model` },
      { type: 'text', text: `CFS aims to model an ideal multitasking CPU: if two equally weighted runnable tasks exist, each should receive about half the processor over time. Real hardware cannot execute both simultaneously, so CFS tracks imbalance and chooses the task most owed service.` },
      { type: 'list', items: [`Virtual runtime, often written vruntime, records CPU service adjusted by task weight.`, `A smaller vruntime means the task has received less adjusted service and has greater need of the CPU.`, `When a task runs, its vruntime increases; when it remains runnable, CFS later chooses the lowest vruntime.`, `Sleeper fairness prevents a task that was blocked from being unfairly penalized when it becomes runnable again.`] },
      { type: 'heading', text: `The red-black tree run queue` },
      { type: 'text', text: `Rather than a linear ready list, CFS stores runnable scheduling entities in a time-ordered red-black tree for each CPU. A red-black tree remains balanced, so insertion, deletion, and selection require O(log n) time.` },
      { type: 'text', text: `The tree diagram places virtual-runtime values along a left-to-right axis. The leftmost node, value 2 in the example, represents the greatest need for CPU time; larger values toward the right represent less need. CFS selects the leftmost runnable node. Tree colors and balancing rules keep any path from becoming excessively longer than another.` },
      { type: 'text', text: `After a task runs, the scheduler adds its adjusted execution time to vruntime and reinserts it if still runnable. In this way a task moves right as it receives service, allowing others with less service to become the leftmost choice.` },
      { type: 'heading', text: `CFS data structures` },
      { type: 'text', text: `A task is described by task_struct, which contains state, stack reference, flags, priorities, a scheduling-class pointer, and a sched_entity. The sched_entity contains scheduling data including the red-black-tree node. The per-run-queue structure contains the tree root and task timeline.` },
      { type: 'text', text: `The structure diagram connects task_struct to sched_entity, sched_entity to rb_node, and the per-CPU run-queue structure to the red-black tree. This layering separates general task information from the generic tree mechanics used to order CFS entities.` },
      { type: 'heading', text: `Selecting and preempting tasks` },
      { type: 'text', text: `The generic schedule function handles a need to switch, including an explicit yield. It returns a preempted task to its scheduling class through a put-previous-task operation. To select a task, the generic scheduler calls pick_next_task; the fair class selects the leftmost entity and maps it back to its task structure.` },
      { type: 'list', items: [`enqueue_task adds a newly runnable entity to the tree and increases the runnable count.`, `dequeue_task removes an entity that is no longer runnable and decreases that count.`, `yield_task generally removes and reinserts the yielding entity so other eligible work can run.`, `check_preempt_curr decides whether a newly runnable task should preempt the current one.`, `pick_next_task returns the most appropriate eligible task.`] },
      { type: 'text', text: `CFS does not use a fixed traditional time slice for every task. Its preemption duration is variable and based on fairness targets, with a minimum granularity controlling how fine-grained scheduling can become. Larger granularity favors batching; smaller granularity can improve interactive latency at the cost of more switching.` },
      { type: 'heading', text: `Nice values, weights, and virtual runtime` },
      { type: 'text', text: `CFS expresses ordinary-task priority through weights rather than a separate run queue for every priority. Nice values run from negative 20, highest priority, to positive 19, lowest priority; zero is the default. A higher nice value means the task is being more accommodating to other tasks.` },
      { type: 'code', code: `Approximate weight rule:
weight = 1024 / (1.25 ^ nice)

CPU share = weight(task) / sum_of_runnable_weights

vruntime increment = actual_runtime *
                     weight_at_nice_0 / weight(task)` },
      { type: 'text', text: `The formulas show two related effects. A heavier task receives a larger CPU share. Its vruntime also grows more slowly for the same actual runtime, so it remains competitive for selection longer. A lighter, more positive-nice task's vruntime grows more quickly.` },
      { type: 'code', code: `Task A: nice 0, weight 1024
Task B: nice 0, weight 1024
Total weight: 2048

A share = 1024 / 2048 = 50 percent
B share = 1024 / 2048 = 50 percent

If A has nice 1, approximate weight 820:
A share = 820 / (820 + 1024) = about 45 percent
B share = 1024 / (820 + 1024) = about 55 percent` },
      { type: 'text', text: `Equal nice values lead to equal weighted service. When A becomes slightly nicer, its smaller weight gives it roughly 45 percent while B receives roughly 55 percent. This is proportional fairness, not an all-or-nothing priority rule.` },
      { type: 'heading', text: `Group scheduling` },
      { type: 'text', text: `Per-task fairness alone can be gamed by creating many tasks. Group scheduling introduces a hierarchy: tasks in a group share a group allocation, while another single task can receive a comparable group-level share. Administrators can organize fairness across users, processes, or other controlled groups.` },
      { type: 'heading', text: `Scheduling classes` },
      { type: 'text', text: `Each task belongs to a scheduling class that defines behavior through a common function interface. The fair class implements ordinary CFS scheduling. Separate real-time classes implement first-in, first-out and round-robin real-time semantics. The generic scheduler consults class methods in order of scheduling policy.` },
      { type: 'text', text: `This design makes scheduling extensible: each class supplies operations to enqueue, dequeue, yield, check preemption, and choose the next task, while the core scheduling path uses the same conceptual interface.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`CFS approximates an ideal weighted fair processor by tracking virtual runtime.`, `The runnable tasks on each CPU are ordered in a balanced red-black tree.`, `The leftmost, lowest-vruntime task normally runs next.`, `Nice values become weights that determine both proportional CPU share and vruntime growth.`, `Scheduling classes let fair, real-time, and other policies share a kernel scheduling framework.`] },
      { type: 'text', text: `Together, the scheduling chapters show both the policy questions—who should run and why—and the data structures that let a real OS answer them quickly.` }
    ],
  },
];
