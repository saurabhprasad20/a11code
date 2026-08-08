export const dbmsChaptersG = [
  {
    id: 'transactions-and-serializability',
    title: 'Transactions and Serializability',
    blocks: [
      { type: 'heading', text: 'Why transactions matter' },
      { type: 'text', text: `A transaction is one logical unit of database work: a sequence of reads and writes that must be treated as one dependable action. SQL lets us say BEGIN, COMMIT, and ROLLBACK, but transaction management explains why those words are so valuable. In this chapter, you will learn how a database keeps simultaneous work from producing impossible results.` },
      { type: 'heading', text: 'One transfer, one promise' },
      { type: 'text', text: `Imagine moving 100 rupees from account A, whose balance is 500, to account B, whose balance is 200. The transaction reads A, writes A = 400, reads B, writes B = 300, and commits. It is not two unrelated updates: the bank must never preserve only the withdrawal or only the deposit.` },
      { type: 'heading', text: 'ACID: the contract for a transaction' },
      { type: 'list', items: [`Atomicity means all or nothing. If a failure occurs after A becomes 400 but before B becomes 300, recovery restores A to 500; the transfer has no partial effect.`, `Consistency means a correct transaction carries the database from one valid state to another. Here, the total A + B remains 700 and rules such as “a balance may not go below its allowed limit” remain true.`, `Isolation means concurrently running transactions behave as though the important effect were produced in a safe serial order. A customer checking A should not be forced to see the half-finished transfer.`, `Durability means that once COMMIT reports success, the new balances survive a later power failure. Recovery can reconstruct the committed transfer.`] },
      { type: 'text', text: `Notice the division of responsibility. The application writes a transaction that respects business rules, while the database engine supplies atomicity, isolation, and durability machinery. Consistency is the shared result: database constraints and correct transaction logic together protect it.` },
      { type: 'heading', text: 'Transfer narrated as a transaction' },
      { type: 'code', code: `1. BEGIN Ttransfer.
2. Read A = 500.
3. Write A = 400.
4. Read B = 200.
5. Write B = 300.
6. COMMIT Ttransfer.

If step 5 cannot happen, ROLLBACK restores A = 500.` },
      { type: 'text', text: `The numbered sequence is the intended story. Atomicity says either steps 1 through 6 become durable as one completed story, or their effects disappear. We will now ask what happens when several stories overlap.` },
      { type: 'heading', text: 'Transaction states and lifecycle' },
      { type: 'code', code: `1. Active: the transaction is executing its reads and writes.
2. Partially committed: its final statement finished, but COMMIT is not yet safely durable.
3. Committed: the commit record is durable; its result must survive.
4. Failed: an error, deadlock decision, or crash prevents normal completion.
5. Aborted: its changes have been undone; it may restart or end.` },
      { type: 'text', text: `A transaction begins active. After its final operation it is partially committed, because a crash at exactly that moment still matters. A successful durable commit leads to committed. A failure leads to failed, then recovery rolls it back to aborted. This careful vocabulary helps us state exactly what a recovery system owes each transaction.` },
      { type: 'heading', text: 'Schedules: recorded interleavings' },
      { type: 'text', text: `A schedule is the order in which the database executes operations from transactions. We write r1(X) for transaction T1 reading X, w2(X) for T2 writing X, and c1 for T1 committing. The database may interleave operations to keep hardware busy, but it must preserve the order of operations within each individual transaction.` },
      { type: 'code', code: `Serial schedule:
1. r1(A); w1(A); c1.
2. r2(B); w2(B); c2.

Concurrent schedule:
1. r1(A).
2. r2(B).
3. w1(A).
4. w2(B).
5. c1; c2.` },
      { type: 'text', text: `The serial schedule finishes T1 before starting T2. The concurrent schedule overlaps independent work and can be faster. Concurrency is welcome; unsafe concurrency is not. A serializable schedule is a concurrent schedule whose final meaning matches some serial order of the same transactions.` },
      { type: 'heading', text: 'Anomaly: lost update' },
      { type: 'code', code: `Initial X = 100; T1 adds 10 and T2 subtracts 20.
1. T1 reads X = 100.
2. T2 reads X = 100.
3. T1 writes X = 110.
4. T2 writes X = 80.
5. T1 and T2 commit.` },
      { type: 'text', text: `T2 wrote a value computed from an old copy and erased T1's addition. A serial execution would end at either 90 or 90? Let us calculate carefully: 100 + 10 - 20 = 90 in either serial order. Ending at 80 proves one update was lost.` },
      { type: 'heading', text: 'Anomaly: dirty read' },
      { type: 'code', code: `Initial A = 500.
1. T1 writes A = 400 for a transfer, but has not committed.
2. T2 reads A = 400 and reports that balance.
3. T1 aborts and restores A = 500.
4. T2 commits its report or uses 400 in another update.` },
      { type: 'text', text: `T2 consumed a value that never became real. If T2 had based an update on it, T2 might also need to abort; that chain is a cascading abort. Reading only committed values prevents this particular danger.` },
      { type: 'heading', text: 'Anomaly: unrepeatable read' },
      { type: 'code', code: `Initial price P = 50.
1. T1 reads P and obtains 50.
2. T2 writes P = 60 and commits.
3. T1 reads P again and obtains 60.
4. T1 continues a calculation expecting one stable price.` },
      { type: 'text', text: `T1 did not read uncommitted data, yet its second read differs from its first. This is an unrepeatable read: a row previously read was changed and committed by another transaction before the first transaction finished.` },
      { type: 'heading', text: 'Anomaly: phantom' },
      { type: 'code', code: `T1 asks for all orders where amount > 1000.
1. T1 reads the qualifying set and finds orders 7 and 9.
2. T2 inserts order 12 with amount 1500 and commits.
3. T1 repeats the same predicate read.
4. T1 now finds orders 7, 9, and 12.` },
      { type: 'text', text: `The extra qualifying row is called a phantom. Locking the existing rows alone cannot stop it, because T2 created a new row in the searched range. Later we will meet predicate and index-range locking, which address this problem.` },
      { type: 'heading', text: 'Conflicts and conflict serializability' },
      { type: 'text', text: `Two operations conflict when they belong to different transactions, access the same data item, and at least one is a write. Read-read does not conflict; read-write, write-read, and write-write do. A schedule is conflict serializable if swaps of adjacent nonconflicting operations can transform it into a serial schedule.` },
      { type: 'heading', text: 'Testing with a precedence graph' },
      { type: 'code', code: `Schedule:
1. T1 reads X.
2. T2 writes X.  Add edge T1 -> T2.
3. T2 reads Y.
4. T1 writes Y.  Add edge T2 -> T1.

Graph described in words:
T1 points to T2 because of X.
T2 points to T1 because of Y.
Following T1 -> T2 -> T1 returns to the start: a cycle.` },
      { type: 'text', text: `Build one graph node per transaction. For every conflicting pair, point from the earlier operation's transaction to the later operation's transaction. The cycle above says T1 would have to come before T2 and T2 before T1, which is impossible; the schedule is not conflict serializable. No cycle means a topological ordering of the graph gives an equivalent serial order.` },
      { type: 'heading', text: 'A successful graph test' },
      { type: 'code', code: `Schedule:
1. T1 writes X.
2. T2 reads X.  Add T1 -> T2.
3. T2 writes Y.
4. T3 reads Y.  Add T2 -> T3.

Graph path: T1 -> T2 -> T3.
There is no route back to an earlier node, so no cycle.
Equivalent serial order: T1, then T2, then T3.` },
      { type: 'text', text: `The graph is a screen-reader-friendly substitute for a picture: name each node, name each directed edge, and trace whether an edge path returns to where it began. This test is central because many concurrency-control protocols guarantee exactly this acyclic property.` },
      { type: 'heading', text: 'View serializability, briefly' },
      { type: 'text', text: `View serializability is broader than conflict serializability. It asks whether every read sees the same initial value or the value written by the same transaction, and whether each item has the same final writer as in some serial schedule. It can accept a few schedules with blind writes that the conflict test rejects, but deciding it is much harder, so practical systems usually enforce conflict serializability instead.` },
      { type: 'heading', text: 'Recoverable and cascadeless schedules' },
      { type: 'code', code: `Recoverable:
1. T1 writes X.
2. T2 reads X from T1.
3. T1 commits.
4. T2 commits.  T2 waits to commit until T1 commits.

Cascadeless:
1. T1 writes X.
2. T1 commits.
3. T2 reads X.  Reads occur only after the writer commits.` },
      { type: 'text', text: `A recoverable schedule never lets a reader commit before the transaction it read from commits. A cascadeless schedule goes further: no transaction reads uncommitted data at all, so one abort cannot force readers to abort. Strict schedules go further still by preventing other transactions from reading or writing an item until its writer commits or aborts.` },
      { type: 'heading', text: 'SQL isolation levels' },
      { type: 'code', code: `Level                Dirty read   Unrepeatable read   Phantom
Read uncommitted     allowed      allowed             allowed
Read committed       prevented    allowed             allowed
Repeatable read      prevented    prevented           may be allowed
Serializable         prevented    prevented           prevented

Products can implement named levels differently; check your DBMS documentation.` },
      { type: 'text', text: `Read uncommitted offers little protection. Read committed is common for ordinary work but allows a later reread to change. Repeatable read keeps read rows stable, though the SQL standard historically permits phantoms. Serializable is the strongest promise: results must match a serial execution, often by locking or by aborting a transaction that would violate that promise.` },
      { type: 'heading', text: 'Chapter recap' },
      { type: 'text', text: `You now have the language for safe shared data: ACID, states, schedules, anomalies, serializability, and commit dependencies. The goal is not to make all work serial; it is to make useful overlap behave safely. Next, we turn that goal into enforcement mechanisms: locks, timestamps, validation, and versions.` }
    ]
  },
  {
    id: 'concurrency-control',
    title: 'Concurrency Control',
    blocks: [
      { type: 'heading', text: 'From the promise to the mechanism' },
      { type: 'text', text: `The previous chapter defined serializable behavior. Concurrency control is the machinery that makes that behavior happen while transactions overlap. You will learn several families of methods, why each blocks an unsafe interleaving, and where each has a practical trade-off.` },
      { type: 'heading', text: 'Shared and exclusive locks' },
      { type: 'text', text: `A lock reserves a data item before an operation. A shared lock, written S, permits reading. An exclusive lock, written X, permits reading and writing. Many transactions may hold S on the same item, but X is private: it conflicts with both S and X held by another transaction. A lock manager records grants, queues incompatible requests, and releases locks when the protocol allows.` },
      { type: 'code', code: `Compatibility for the same item:
Requested lock     Existing S     Existing X
S                  compatible     incompatible
X                  incompatible   incompatible

If T1 holds S(A), T2 may receive S(A).
If T1 holds X(A), T2 must wait for either S(A) or X(A).` },
      { type: 'text', text: `This table tells the lock manager whether a request can proceed immediately. It does not itself tell us when to acquire or release locks. That timing rule is the heart of two-phase locking.` },
      { type: 'heading', text: 'Two-phase locking, or 2PL' },
      { type: 'text', text: `Two-phase locking (2PL) requires a growing phase, in which a transaction may acquire locks but release none, followed by a shrinking phase, in which it may release locks but acquire none. It can read only after acquiring S and write only after acquiring X. The boundary between phases is called the lock point.` },
      { type: 'code', code: `Valid 2PL sequence for T1:
1. Acquire S(A).
2. Acquire X(B).
3. Read A; write B.
4. Release S(A).  Shrinking phase begins.
5. Release X(B).

Invalid sequence:
1. Acquire S(A).
2. Release S(A).
3. Request X(B).  New acquisition after release violates 2PL.` },
      { type: 'text', text: `Because each transaction gathers every needed lock before it begins releasing any, the order of lock points gives an acyclic precedence order. Therefore 2PL guarantees conflict serializability. It may still make transactions wait, and ordinary 2PL can still allow cascading aborts if it releases a write lock before commit.` },
      { type: 'heading', text: 'Strict and rigorous 2PL' },
      { type: 'text', text: `Strict 2PL keeps every X lock until commit or abort. No other transaction can read or overwrite an uncommitted write, so schedules are strict and cascading aborts disappear. Rigorous 2PL keeps both S and X locks until commit or abort. It is simpler to reason about and makes the commit order match the serial order, although it can reduce concurrency.` },
      { type: 'heading', text: 'Lock conversions' },
      { type: 'code', code: `Upgrade: S(A) -> X(A), usually before writing A.
1. T1 holds S(A).
2. T1 requests X(A).
3. The upgrade waits until no other S or X holder remains.

Downgrade: X(A) -> S(A).
1. T1 finishes writing A.
2. T1 changes X(A) to S(A).
3. Other readers may now share S(A).` },
      { type: 'text', text: `Under 2PL, an upgrade belongs in the growing phase because it obtains stronger permission. A downgrade belongs in the shrinking phase because it gives permission away. Upgrades are useful, but if two readers both try to upgrade, they can contribute to a deadlock.` },
      { type: 'heading', text: 'Deadlock: circular waiting' },
      { type: 'code', code: `1. T1 acquires X(A).
2. T2 acquires X(B).
3. T1 requests X(B) and waits for T2.
4. T2 requests X(A) and waits for T1.
5. Neither can proceed or release its first lock: deadlock.` },
      { type: 'text', text: `This is not a slow transaction; it is a permanent circular wait unless the database intervenes. A system can prevent some cycles, detect cycles after they arise, or make a conservative timeout decision.` },
      { type: 'heading', text: 'Wait-die prevention' },
      { type: 'text', text: `Assign every transaction a timestamp when it starts; older means smaller timestamp. In wait-die, if an older requester wants a lock held by a younger transaction, the older transaction waits. If a younger requester wants a lock held by an older transaction, the younger transaction aborts, or “dies,” and later restarts with its original timestamp. Edges can only point from older waiting transactions to younger holders, so a cycle cannot form.` },
      { type: 'heading', text: 'Wound-wait prevention and timeouts' },
      { type: 'text', text: `Wound-wait reverses the response: an older requester aborts, or wounds, a younger holder and takes its place; a younger requester waits for an older holder. It is often less wasteful because older transactions are allowed to finish. A timeout simply aborts a transaction that has waited unusually long. Timeouts are easy but can abort a transaction that was merely slow, not deadlocked.` },
      { type: 'heading', text: 'Detecting deadlocks with a wait-for graph' },
      { type: 'code', code: `1. T1 waits for a lock held by T2: add edge T1 -> T2.
2. T2 waits for a lock held by T3: add edge T2 -> T3.
3. T3 waits for a lock held by T1: add edge T3 -> T1.
4. Trace T1 -> T2 -> T3 -> T1: this is a cycle.
5. Choose one victim, abort it, release its locks, and remove its edges.` },
      { type: 'text', text: `A wait-for graph has transactions, not data items, as nodes. An edge means “this transaction is waiting for that transaction.” The cycle identifies a deadlock. A victim selector may choose the transaction with the least work, fewest updated pages, lowest priority, or lowest restart cost; after rollback, the survivors can continue.` },
      { type: 'heading', text: 'Starvation and fairness' },
      { type: 'text', text: `Starvation means a transaction repeatedly waits or is repeatedly chosen as a victim and never completes, even though the system keeps working. Lock queues commonly use first-come, first-served ordering, and restart policies preserve an old timestamp, to give an unlucky transaction a growing chance to finish. Deadlock freedom alone does not guarantee starvation freedom.` },
      { type: 'heading', text: 'The phantom needs range protection' },
      { type: 'text', text: `Row locks protect rows that already exist. For a query such as WHERE amount > 1000, serializable locking also needs to protect the predicate's range. Predicate locking conceptually locks the condition itself. Real systems commonly use index-range or next-key locks, which lock the relevant index interval and prevent an insert that would become a new matching row.` },
      { type: 'code', code: `1. T1 scans the index range amount > 1000 and locks that range.
2. T2 tries to insert amount = 1500 into the same range.
3. The lock manager finds the range conflict and makes T2 wait.
4. T1 finishes and commits.
5. T2 inserts after T1's serializable view is complete.` },
      { type: 'text', text: `The order above explains why the new row cannot appear midway through T1's repeated query. The database protects not only named records, but also the space in which qualifying records could be added.` },
      { type: 'heading', text: 'Multiple-granularity locking' },
      { type: 'text', text: `Databases organize lockable objects in a hierarchy, for example database, table, page, then row. Coarse locks cost less but block more work; fine locks permit more concurrency but cost more to manage. Intention locks announce that a transaction intends to lock lower-level objects, so another transaction can quickly tell whether a coarse request is safe.` },
      { type: 'code', code: `Common intention modes:
IS: intention shared; plans S locks below.
IX: intention exclusive; plans X locks below.
SIX: S on this object plus intention X below.

To X-lock row R in table Orders:
1. Acquire IX on database.
2. Acquire IX on Orders.
3. Acquire X on row R.
4. Release in the protocol's permitted order.` },
      { type: 'text', text: `A transaction seeking an S lock on the whole table checks the table's intention locks and learns that a row writer exists. The hierarchy lets a database avoid inspecting every row while preserving the meaning of locks at all levels.` },
      { type: 'heading', text: 'Timestamp ordering' },
      { type: 'text', text: `Timestamp-ordering control avoids waiting for locks. Give each transaction T a unique timestamp TS(T). For each item X, keep read_TS(X), the largest timestamp of a transaction that read X, and write_TS(X), the largest timestamp of a transaction that wrote X. Operations that would violate timestamp order are aborted and restarted.` },
      { type: 'code', code: `Read rule for T reading X:
1. If TS(T) < write_TS(X), T is too old to see this newer write: abort T.
2. Otherwise read X and set read_TS(X) to max(read_TS(X), TS(T)).

Write rule for T writing X:
1. If TS(T) < read_TS(X), a newer reader already saw the old version: abort T.
2. If TS(T) < write_TS(X), ordinary timestamp ordering aborts T.
3. Otherwise write X and set write_TS(X) = TS(T).` },
      { type: 'text', text: `The rules force every successful operation to fit one timestamp order, so successful schedules are serializable in that order. The cost is restarts: a transaction can do useful work and then discover it is too old for an item.` },
      { type: 'heading', text: 'Thomas write rule' },
      { type: 'text', text: `The Thomas write rule improves the second write case. If TS(T) < write_TS(X), T's write is obsolete because a newer write already exists; instead of aborting T for that write, the system can ignore the obsolete write. This increases accepted schedules while preserving a view-serializable result. It does not change the case where TS(T) < read_TS(X), because a newer reader's observation cannot simply be erased.` },
      { type: 'heading', text: 'Validation or optimistic concurrency control' },
      { type: 'text', text: `Optimistic concurrency control assumes conflicts are uncommon. A transaction has three phases: read, where it reads database values and writes only a private workspace; validation, where it checks whether its read and write sets conflict with relevant transactions; and write, where validated private changes are installed. A failed validation causes restart rather than a lock wait.` },
      { type: 'code', code: `1. T1 reads A and plans to write B privately.
2. T2 commits a write to A.
3. T1 reaches validation.
4. T1 discovers that its read set {A} conflicts with T2's write set {A}.
5. T1 fails validation, discards private work, and restarts.` },
      { type: 'text', text: `This approach is attractive for short, mostly read-only work because readers do not block writers during the read phase. Under heavy contention, repeated validation failures can become expensive.` },
      { type: 'heading', text: 'Multiversion concurrency control' },
      { type: 'text', text: `Multiversion concurrency control (MVCC) keeps more than one committed version of a row. A reader uses a consistent snapshot, often determined by its start time, while a writer creates a newer version rather than overwriting the one a reader needs. Readers and writers therefore interfere less often than with a single current copy.` },
      { type: 'code', code: `1. At time 10, A has committed version A@10 = 500.
2. Treader starts at time 11 and reads its snapshot: A@10.
3. Twriter commits A@12 = 400.
4. Treader rereads A and still sees A@10 = 500.
5. A later transaction can see A@12 = 400.` },
      { type: 'text', text: `Snapshot isolation is a common MVCC promise: each transaction reads one stable snapshot and concurrent writers to the same row are usually prevented from both committing. It prevents dirty and unrepeatable reads, but is not automatically serializable.` },
      { type: 'heading', text: 'The write-skew caveat' },
      { type: 'code', code: `Rule: at least one of doctors A and B must remain on call.
1. T1 snapshot sees A on call and B on call; it plans A off call.
2. T2 snapshot sees A on call and B on call; it plans B off call.
3. T1 writes only A and commits.
4. T2 writes only B and commits.
5. Both are off call, although neither transaction saw that result.` },
      { type: 'text', text: `The writes touched different rows, so ordinary snapshot-isolation write-conflict detection did not stop them. This write skew violates the cross-row rule. Serializable MVCC systems add dependency tracking or predicate protection to abort one transaction when necessary.` },
      { type: 'heading', text: 'Chapter recap' },
      { type: 'text', text: `Locks and 2PL enforce conflict serializability; strictness keeps aborts from cascading. Deadlock handling and fairness keep locking usable. Range and intention locks extend protection beyond one row. Timestamp, validation, and multiversion approaches offer different ways to reach safe overlap. Next, we ask how the database keeps completed work safe when software, power, or storage fails.` }
    ]
  },
  {
    id: 'recovery-system',
    title: 'Recovery System',
    blocks: [
      { type: 'heading', text: 'Why a recovery system exists' },
      { type: 'text', text: `Concurrency control protects the meaning of simultaneous work; recovery protects that meaning across failure. This chapter connects directly to ACID atomicity and durability. You will see how logs, buffer policies, checkpoints, and restart algorithms determine exactly which changes to redo and which to undo.` },
      { type: 'heading', text: 'Kinds of failure' },
      { type: 'list', items: [`A transaction failure affects one transaction: invalid input, a constraint violation, explicit rollback, deadlock victim selection, or application error.`, `A system failure loses volatile memory because of a crash, operating-system fault, or power loss, while database files on disk normally remain intact.`, `A media failure damages or loses nonvolatile storage itself, such as a failed disk or corrupted page. It needs backup and archived-log recovery, not merely a restart log.`] },
      { type: 'text', text: `Each failure asks a different question. For one failed transaction, undo its incomplete effects. For a system crash, determine what reached disk and reconstruct a correct state. For media loss, restore a sound copy and roll it forward with retained logs.` },
      { type: 'heading', text: 'Storage and the stable-storage idea' },
      { type: 'text', text: `Registers, caches, and main memory are volatile: a crash can erase them. SSDs and disks are nonvolatile but can still fail. Stable storage is an abstraction, not a magical device: the system approximates it with reliable media, checksums, replication or mirroring, and carefully ordered writes, so a log record reported durable is extremely unlikely to disappear.` },
      { type: 'heading', text: 'Buffers shape recovery obligations' },
      { type: 'code', code: `Steal:     a dirty page from an uncommitted transaction may reach disk.
No-steal:  it may not; uncommitted changes stay out of disk pages.
Force:     all pages changed by a committing transaction reach disk at COMMIT.
No-force:  commit may finish without flushing every changed page.` },
      { type: 'text', text: `Steal requires UNDO, because a loser transaction may already have changed a disk page. No-force requires REDO, because a winner may have committed while some changed pages were still only in memory. High-performance systems commonly use steal and no-force, accepting both undo and redo in exchange for better buffer use and faster commits.` },
      { type: 'heading', text: 'The write-ahead log' },
      { type: 'text', text: `A log is an append-only history on stable storage. Write-ahead logging, often shortened to WAL, has two rules: before a changed data page reaches disk, its log record describing the old value must be durable; before COMMIT is acknowledged, the commit record must be durable. The first rule makes undo possible, and the second makes durable commitment knowable.` },
      { type: 'code', code: `Typical records:
<START T1>
<UPDATE T1, page P, old=500, new=400>
<COMMIT T1>
<ABORT T2>
<END T2>

An update record identifies the transaction and page and carries enough
before-image and/or after-image information for recovery.` },
      { type: 'text', text: `The exact binary format differs among systems, but the idea is stable. A before-image tells recovery how to undo; an after-image tells it how to redo. An END record says rollback has completed and the transaction no longer needs recovery attention.` },
      { type: 'heading', text: 'Deferred and immediate modification' },
      { type: 'text', text: `With deferred modification, database pages are not changed until after commit, so recovery needs only redo committed transactions. With immediate modification, updates may reach pages before commit, subject to WAL; recovery must undo losers and redo winners. Immediate modification works naturally with steal/no-force buffering and is the foundation for modern practical recovery.` },
      { type: 'heading', text: 'Undo, redo, and idempotence' },
      { type: 'code', code: `Undo example:
1. Log says old P.balance=500, new P.balance=400 for unfinished T1.
2. Recovery writes P.balance=500.

Redo example:
1. Log says old Q.balance=200, new Q.balance=300 for committed T1.
2. Recovery writes Q.balance=300.

Repeat either action again: the resulting value is unchanged.` },
      { type: 'text', text: `That final property is idempotence. A crash during recovery must not create a new problem, so redo may safely repeat an after-image and undo may safely restore a before-image. Real systems also use page log sequence numbers to decide efficiently whether a particular redo has already reached a page.` },
      { type: 'heading', text: 'Checkpoints bound restart work' },
      { type: 'text', text: `Without checkpoints, a restart might scan a log from the beginning of the database's life. A checkpoint records a recent recovery starting point, commonly including active transactions and dirty pages. A fuzzy checkpoint permits ordinary transactions to continue while it is taken, so it avoids a long global pause; recovery still scans enough earlier information to account for pages that were dirty at the checkpoint.` },
      { type: 'code', code: `Checkpoint idea:
1. Write <BEGIN CHECKPOINT>.
2. Record active transactions and dirty pages, such as T2 active and page P dirty.
3. Write <END CHECKPOINT> and make it durable.
4. On restart, begin analysis from this recent checkpoint rather than the oldest log record.` },
      { type: 'text', text: `A checkpoint does not mean every page is clean or every transaction has finished. It is a trustworthy summary that limits how much history recovery must reconsider.` },
      { type: 'heading', text: 'Restart example: read the log' },
      { type: 'code', code: `Log in chronological order:
1. <START T1>
2. <UPDATE T1, A, old=500, new=400>
3. <START T2>
4. <UPDATE T2, B, old=200, new=250>
5. <COMMIT T1>
6. <START T3>
7. <UPDATE T3, C, old=10, new=20>
8. CRASH` },
      { type: 'text', text: `Treat this log as a spoken record. T1 committed, so it is a winner. T2 and T3 started but did not commit, so they are losers. Because pages may have been flushed in any order under steal/no-force, recovery cannot guess from the in-memory state at the crash; it follows the log.` },
      { type: 'heading', text: 'Restart example: redo winners' },
      { type: 'code', code: `1. Identify T1 as committed from record 5.
2. Locate T1's update at record 2: A old=500, new=400.
3. Redo by ensuring A is 400 if that update is not already on disk.
4. Do not redo T2 or T3 as completed transactions; they are losers.` },
      { type: 'text', text: `Redo makes the durable result of T1 present even if A's changed page was still in a buffer when the crash happened. Writing 400 again is safe because redo is idempotent.` },
      { type: 'heading', text: 'Restart example: undo losers backward' },
      { type: 'code', code: `1. Scan backward from the crash.
2. Undo T3's record 7: restore C from 20 to 10.
3. Continue backward and undo T2's record 4: restore B from 250 to 200.
4. Write abort/end information for T3 and T2 as rollback completes.
5. T1 is left intact because it committed.` },
      { type: 'text', text: `The backward direction is important when one transaction updated the same page several times: undoing its newest change first exposes the correct older value for the next undo. After these steps, the database reflects exactly the committed transfer-like work from T1 and none of the incomplete work from T2 or T3.` },
      { type: 'heading', text: 'ARIES in plain language' },
      { type: 'text', text: `ARIES means Algorithms for Recovery and Isolation Exploiting Semantics. It is an influential recovery design for steal/no-force databases. Rather than memorizing every implementation detail, keep its central promise in mind: after a crash, reconstruct what had happened, repeat history safely, then undo work that lacked a commit.` },
      { type: 'heading', text: 'Log sequence numbers and recovery tables' },
      { type: 'text', text: `Each log record has a log sequence number, or LSN, that increases with log order. Each page stores the LSN of the latest update it contains, called its pageLSN. During redo, if a pageLSN is already at least the record LSN, that change is already present and can be skipped. ARIES also builds a dirty-page table, holding each dirty page and the earliest LSN that may need redo, plus a transaction table describing active transactions and their latest log positions.` },
      { type: 'heading', text: 'ARIES phase one: analysis' },
      { type: 'code', code: `1. Start at the last completed checkpoint.
2. Scan forward through log records.
3. Rebuild the transaction table: identify winners and transactions active at crash.
4. Rebuild the dirty-page table: for each dirty page, retain its earliest relevant LSN.
5. Classify active-at-crash transactions as losers to be undone later.` },
      { type: 'text', text: `Analysis does not yet change pages. It first gives recovery a reliable map: who was active, which pages might be stale, and how far back redo must begin. This is why a fuzzy checkpoint remains useful even while normal work continues.` },
      { type: 'heading', text: 'ARIES phase two: redo, repeating history' },
      { type: 'code', code: `1. Start redo at the smallest recovery LSN in the dirty-page table.
2. Scan forward.
3. For an update record, consider redo only if its page is in the dirty-page table
   and the page may need that record.
4. Compare pageLSN with the record LSN.
5. Reapply the after-image only when pageLSN is lower.` },
      { type: 'text', text: `ARIES repeats history, including some changes made by transactions that will later lose. This may sound surprising, but it recreates the exact pre-crash state consistently; the following undo phase removes loser effects. Repeating history simplifies recovery when updates from many transactions were interleaved on pages.` },
      { type: 'heading', text: 'ARIES phase three: undo' },
      { type: 'code', code: `1. Start with the latest log records of all loser transactions.
2. Follow each transaction's previous-record links backward.
3. Undo each update by applying its before-image.
4. Log a compensation log record for the undo.
5. When a loser reaches its start record, write END for it.` },
      { type: 'text', text: `A compensation log record records that an undo action occurred. If another crash interrupts recovery, that record prevents recovery from undoing the same logical action incorrectly and supports restartable undo. The result is atomicity for losers and durability for winners, even across repeated crashes.` },
      { type: 'heading', text: 'Recovery while transactions are concurrent' },
      { type: 'text', text: `Concurrent transactions do not make logging ambiguous: every update record names its transaction, and per-transaction previous-LSN links preserve each transaction's own chain. WAL orders the durable log before corresponding pages. Strict concurrency control also helps recovery because no committed transaction has depended on a loser’s uncommitted update, so undoing losers does not create a cascade of already committed work to retract.` },
      { type: 'heading', text: 'Media recovery, backups, and high availability' },
      { type: 'text', text: `For a damaged device, restore the most recent verified backup, then redo archived log records made after that backup. Remote backups keep a copy away from the primary site, protecting against local disasters. High availability adds replicas and failover so another server can take over quickly; replicated logs and careful acknowledgement rules are needed so failover does not falsely claim a transaction was durable.` },
      { type: 'heading', text: 'Chapter recap' },
      { type: 'text', text: `Recovery turns COMMIT into a promise that survives failure. Buffer policies explain why modern systems need both undo and redo. WAL records the evidence, checkpoints shorten restart, and ARIES organizes restart into analysis, redo, and undo. Together with the concurrency controls from the previous chapter, these mechanisms let SQL transactions be both safe during normal operation and dependable after a crash.` }
    ]
  }
];
