export const dbmsChaptersF = [
  {
    id: 'functional-dependencies-and-design-goals',
    title: 'Functional Dependencies and Design Goals',
    blocks: [
      { type: 'text', text: `Welcome to relational database design. Earlier relational-model lessons taught you how to represent facts as rows, and SQL lessons taught you how to ask for those facts. This chapter asks a deeper question: which facts should share a relation in the first place? Good design keeps facts dependable as people add, change, and remove rows. You will learn to express rules with functional dependencies, test keys with closure, and break an unsafe relation into safe pieces.` },
      { type: 'text', text: `A relation design should make intended facts easy to state and hard to contradict. It should avoid needless repetition, permit useful constraints to be checked, and allow a decomposed relation to be joined back without inventing facts or losing facts. Redundancy is not automatically wrong, but accidental redundancy is costly because one real-world fact then has several copies that can drift apart.` },
      { type: 'heading', text: `A running bad-design example` },
      { type: 'code', code: `EnrollmentBad(studentId, studentName, courseId, courseTitle, instructorId, instructorOffice)

Rows, read left to right by the named columns:
17 | Asha | DB101 | Database Foundations | I9 | Room 204
22 | Ben  | DB101 | Database Foundations | I9 | Room 204
31 | Chao | NW110 | Networks             | I7 | Room 118` },
      { type: 'text', text: `The first two rows describe two enrollments, but each repeats the course title, instructor identifier, and instructor office. Imagine that DB101 has 200 students. The one fact that instructor I9 works in Room 204 is copied into 200 places. That is our warning signal.` },
      { type: 'text', text: `Suppose I9 moves from Room 204 to Room 310. If we edit only Asha's row, it says I9 is in Room 310 while Ben's row still says Room 204. Both values cannot describe the same instructor at the same time. Updating every repeated copy is possible, but relying on every future update to do so is fragile. This inconsistency caused by a partial update is an update anomaly.` },
      { type: 'text', text: `Now suppose the school has planned course AI205, titled Introductory AI, taught by instructor I4 in Room 410, but no student has enrolled yet. EnrollmentBad needs a studentId to make a row. We either cannot store the course and office at all, or we create a fake enrollment with missing student data. The design wrongly ties a course fact to an unrelated enrollment fact. That is an insertion anomaly.` },
      { type: 'text', text: `Finally, imagine Chao withdraws and the third row is the only NW110 enrollment. Deleting that enrollment also deletes the only stored statement that NW110 is Networks and I7 works in Room 118. An enrollment change should not erase course and instructor knowledge. This unwanted loss is a deletion anomaly.` },
      { type: 'heading', text: `Decomposition as a repair` },
      { type: 'text', text: `Decomposition replaces one relation schema with smaller schemas. For the running example, we might store Enrollment(studentId, courseId), Course(courseId, courseTitle, instructorId), and Instructor(instructorId, instructorOffice). A course exists before an enrollment, and an office exists in exactly one instructor row. Repetition now appears only where a genuine relationship requires it.` },
      { type: 'code', code: `Enrollment: 17 | DB101 ; 22 | DB101 ; 31 | NW110
Course:     DB101 | Database Foundations | I9 ; NW110 | Networks | I7
Instructor: I9 | Room 204 ; I7 | Room 118` },
      { type: 'text', text: `When we join these three relations on their shared identifiers, Asha's and Ben's enrollment rows each receive the one DB101 course row and the one I9 instructor row. Chao's row receives NW110 and I7. The join reconstructs the original three meaningful rows without storing the repeated descriptions three times.` },
      { type: 'list', items: [`A lossless-join decomposition lets a natural join recover exactly the original legal relation, with no missing and no invented tuples.`, `Dependency preservation lets us enforce the original functional dependencies by checking the smaller relations separately, rather than joining them just to validate a rule.`, `The resulting relations should have understandable meanings. Splitting merely to obtain small tables is not a design goal.`] },
      { type: 'heading', text: `Lossless join versus lossy join` },
      { type: 'text', text: `Here is a deliberately bad split. Start with Assignment(employee, project, manager), with two rows: Lina works on Atlas under manager M1, and Omar works on Beacon under manager M2. Split it into EmployeeProject(employee, project) and EmployeeManager(employee, manager). This split happens to join safely because employee appears in both and determines the other pieces in this tiny example. Now instead split into ProjectManager(project, manager) and EmployeeManager(employee, manager).` },
      { type: 'code', code: `Original Assignment:
Lina | Atlas  | M1
Omar | Beacon | M2

After a lossy split:
ProjectManager:  Atlas | M1 ; Beacon | M2
EmployeeManager: Lina  | M1 ; Omar   | M2` },
      { type: 'text', text: `Joining those two pieces on manager gives Lina-Atlas-M1 and Omar-Beacon-M2, which are valid original rows. But if both Lina and Omar reported to M1 while only Lina worked on Atlas, the join would also manufacture Omar-Atlas-M1. The common manager value would combine independently stored facts that did not belong together. A lossy decomposition creates these spurious rows, so it is unacceptable.` },
      { type: 'heading', text: `The two-relation lossless test` },
      { type: 'text', text: `For a split of R into R1 and R2, the split is lossless with respect to a set F of dependencies exactly when F implies either that the common attributes R1 intersect R2 functionally determine R1, or that they functionally determine R2. In plain language, the shared columns must be a key for at least one side. This test gives a precise reason the right common identifier matters.` },
      { type: 'heading', text: `Functional dependencies` },
      { type: 'text', text: `A functional dependency, abbreviated FD, is a rule about all legal instances of a relation. The notation A → B says that whenever two rows agree on attribute set A, they must also agree on attribute set B. A is the determinant and B is the determined attribute set. It does not mean that A causes B; it means A fixes B within this relation's business rules.` },
      { type: 'code', code: `Course(courseId, courseTitle, instructorId)
courseId → courseTitle, instructorId

If two Course rows have courseId DB101, both must carry the same title
and the same instructor identifier.` },
      { type: 'text', text: `An FD may involve several attributes on either side. In Enrollment(studentId, courseId, grade), the pair studentId, courseId → grade says one student's grade is fixed for one course. Neither identifier alone normally fixes grade. FDs describe constraints; sample data can suggest one, but only a stated rule justifies accepting it.` },
      { type: 'text', text: `An FD X → Y is trivial when every attribute in Y is already in X. For example, studentId, courseId → courseId is always true, regardless of data. It is nontrivial when Y contains something outside X, such as courseId → courseTitle. Nontrivial FDs are usually the ones that reveal redundancy and guide decomposition.` },
      { type: 'text', text: `Armstrong's axioms are sound and complete inference rules for FDs. Sound means they never derive a false consequence; complete means every FD logically implied by F can be derived using them. Treat these as small moves for reasoning rather than facts to memorize without purpose.` },
      { type: 'list', items: [`Reflexivity: if Y is a subset of X, then X → Y. This produces every trivial dependency.`, `Augmentation: if X → Y, then XZ → YZ. Adding the same context Z to both sides keeps the rule true.`, `Transitivity: if X → Y and Y → Z, then X → Z. Determination can travel through an intermediate set.`] },
      { type: 'code', code: `Union:          X → Y and X → Z  implies  X → YZ
Decomposition:  X → YZ           implies  X → Y and X → Z
Pseudotransitivity: X → Y and WY → Z  implies  WX → Z` },
      { type: 'text', text: `For example, courseId → courseTitle and courseId → instructorId combine by union into courseId → courseTitle, instructorId. Pseudotransitivity is useful when a known determinant supplies only part of a larger determinant: if departmentId → chairId and term, chairId → budget, then term, departmentId → budget.` },
      { type: 'heading', text: `Attribute closure: the practical inference tool` },
      { type: 'text', text: `The closure of an attribute set X under F, written X plus, is every attribute that X can determine using F. We compute it by starting with X and repeatedly adding the right side of any FD whose left side is already present. Stop when a full pass adds nothing. Closure answers both key questions and implication questions.` },
      { type: 'heading', text: `Worked closure computation` },
      { type: 'code', code: `R(A, B, C, D, E)
F = { A → B, B → C, AC → D, D → E }
Find A plus.

Start:       { A }
A → B:       { A, B }
B → C:       { A, B, C }
AC → D:      { A, B, C, D }
D → E:       { A, B, C, D, E }` },
      { type: 'text', text: `Because A plus contains every attribute of R, A is a superkey. Notice the careful order: AC → D could not fire at the start, but it could fire after B → C supplied C. Repeating the scan until it stabilizes is what makes the procedure reliable.` },
      { type: 'text', text: `A superkey is any attribute set whose closure contains all attributes of R. A candidate key is a minimal superkey: remove any one of its attributes and it stops being a superkey. In the last example, A is a candidate key because A plus is all of R and there is no smaller nonempty set. If AB plus is all of R but A plus already is, AB is only a superkey, not a candidate key.` },
      { type: 'text', text: `A useful search habit is to include every attribute that never appears on the right side of an FD, because no FD can derive it from other attributes. Then add attributes as needed and test closure. Check minimality by removing each attribute in turn. There may be more than one candidate key.` },
      { type: 'text', text: `F plus, the closure of F, is the set of every FD implied by F. It is enormous in notation because reflexivity alone contributes many trivial rules, so we rarely list it. To test whether a proposed X → Y belongs to F plus, compute X plus under F. The dependency is implied precisely when Y is contained in X plus.` },
      { type: 'heading', text: `Canonical, or minimal, covers` },
      { type: 'text', text: `A canonical cover, also called a minimal cover, is an equivalent FD set with no avoidable clutter. Conventionally, each FD has one attribute on its right side, no FD has an extraneous attribute on its left side, and no FD is redundant. Different minimal covers can exist, but each preserves the same implications.` },
      { type: 'heading', text: `Worked minimal-cover reduction` },
      { type: 'code', code: `Start: F = { A → BC, B → C, AB → D, D → E }

1. Split right sides: A → B, A → C, B → C, AB → D, D → E
2. A → C is redundant because A → B and B → C imply it.
3. In AB → D, B is extraneous: A → B, so A gives both A and B,
   then AB → D can fire. Replace AB → D with A → D.

Minimal cover: { A → B, B → C, A → D, D → E }` },
      { type: 'text', text: `The reduced cover says exactly as much as the original set for design purposes, but makes each direct fact easier to see. We did not discard B → C: without it, A would no longer imply C through B. After reductions, optionally combine FDs with the same left side for readability, while remembering the one-right-side convention during the algorithm.` },
      { type: 'text', text: `In X → Y, an attribute A in X is extraneous if F still implies X minus A → Y. Test it by computing the closure of X minus A under the appropriate FD set. An attribute B in Y is extraneous if removing B from the right side leaves an equivalent implication set; with single-attribute right sides, this case is automatically avoided. Removing extraneous attributes prevents us from treating a nonminimal determinant as a genuine key.` },
      { type: 'text', text: `After decomposing R into schemas R1 through Rn, project the dependencies onto each schema. The decomposition preserves F when the union of those projected dependencies implies all of F. Then local constraints suffice. A lossless split is essential for correct queries; preservation is strongly desirable because a database should not need a join merely to reject an invalid update.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You can now recognize update, insertion, and deletion anomalies as symptoms of facts stored in the wrong combination. You have used FDs to state rules, Armstrong's axioms and closure to infer consequences, and minimal covers to remove needless wording. Next, we turn those tools into normal forms and repeatable decomposition algorithms.` }
    ]
  },
  {
    id: 'normal-forms-and-decomposition',
    title: 'Normal Forms and Decomposition',
    blocks: [
      { type: 'text', text: `Now we put functional dependencies to work. Normalization is a disciplined way to reshape a relation so that each stored fact has a sensible home. It builds directly on the relational model, candidate keys, and closures from the preceding chapter. You will learn the major normal forms, two practical decomposition methods, and when a small, deliberate amount of denormalization is reasonable.` },
      { type: 'heading', text: `First normal form: values are atomic` },
      { type: 'text', text: `A relation is in first normal form, or 1NF, when every attribute value comes from an atomic domain for the chosen design: each row-column intersection holds one value, not a list, repeating group, or nested relation. Atomic does not mean indivisible in every imaginable context. A full name may be one value if no query needs its parts; it should be split if separate family-name queries are required.` },
      { type: 'code', code: `Not 1NF for a single phone attribute:
Student(studentId, name, phoneNumbers)
17 | Asha | [555-0101, 555-0199]

1NF design:
Student(studentId, name): 17 | Asha
StudentPhone(studentId, phone): 17 | 555-0101 ; 17 | 555-0199` },
      { type: 'text', text: `The bracketed value hides two phone facts inside one cell. With StudentPhone, each phone is an ordinary row, so a query can find a number, enforce its format, add one number, or remove one number without parsing a private mini-list. Repeating columns such as phone1, phone2, phone3 have the same problem: they impose an arbitrary limit and make queries awkward.` },
      { type: 'text', text: `1NF improves representation, but it does not eliminate redundancy. A flat enrollment relation can have one value per cell and still repeat course names on every enrollment. The higher normal forms focus on dependencies between whole attribute sets and are therefore the main design tools for relational schemas.` },
      { type: 'heading', text: `Second normal form and partial dependency` },
      { type: 'text', text: `A relation is in second normal form, or 2NF, when it is in 1NF and every nonprime attribute is fully functionally dependent on every candidate key. A prime attribute belongs to at least one candidate key. A partial dependency occurs when a nonprime attribute depends on a proper subset of a composite candidate key.` },
      { type: 'code', code: `EnrollmentInfo(studentId, courseId, studentName, courseTitle, grade)
Candidate key: studentId, courseId
FDs: studentId → studentName
     courseId → courseTitle
     studentId, courseId → grade

Rows:
17 | DB101 | Asha | Database Foundations | A
22 | DB101 | Ben  | Database Foundations | B` },
      { type: 'text', text: `studentName depends only on studentId, and courseTitle depends only on courseId. Each is a partial dependency on part of the composite key, so EnrollmentInfo is not in 2NF. The title Database Foundations is repeated once for every enrolled student, bringing back the update and deletion risks you already know.` },
      { type: 'code', code: `Student(studentId, studentName): 17 | Asha ; 22 | Ben
Course(courseId, courseTitle): DB101 | Database Foundations
Enrollment(studentId, courseId, grade): 17 | DB101 | A ; 22 | DB101 | B` },
      { type: 'text', text: `Now the student name lives once per student, the course title once per course, and the grade depends on the whole Enrollment key. Joining an enrollment with its Student and Course rows restores a readable report. 2NF matters chiefly when a candidate key has several attributes; with only single-attribute candidate keys, partial dependency cannot occur.` },
      { type: 'heading', text: `Third normal form` },
      { type: 'text', text: `A relation R is in third normal form, or 3NF, with respect to F when for every nontrivial FD X → A in F plus, at least one condition holds: X is a superkey of R, or A is a prime attribute. This exact definition handles relations with several candidate keys. An easier intuition is that nonkey facts should depend on a key, the whole key, and nothing but a key, but use the formal test when designing.` },
      { type: 'code', code: `Employee(employeeId, employeeName, departmentId, departmentName)
FDs: employeeId → employeeName, departmentId
     departmentId → departmentName

Rows:
E1 | Lina | D10 | Research
E2 | Omar | D10 | Research` },
      { type: 'text', text: `employeeId is a key, but departmentId → departmentName has a determinant that is not a superkey and a right-side attribute that is not prime. Thus the relation is not 3NF. departmentName depends on employeeId only through departmentId, a transitive dependency. Updating Research to Applied Research would require changing every employee in D10.` },
      { type: 'code', code: `Employee(employeeId, employeeName, departmentId): E1 | Lina | D10 ; E2 | Omar | D10
Department(departmentId, departmentName): D10 | Research` },
      { type: 'text', text: `The decomposition stores the department name once. A natural join on departmentId gives both employee report rows their shared name. Crucially, departmentId is a key of Department, so its dependency is local and clean.` },
      { type: 'heading', text: `Boyce-Codd normal form` },
      { type: 'text', text: `Boyce-Codd normal form, or BCNF, is stricter than 3NF. R is in BCNF if, for every nontrivial FD X → Y in F plus, X is a superkey of R. Unlike 3NF, BCNF offers no exception when Y is prime. It removes every FD-based redundancy detectable from the stated dependencies.` },
      { type: 'code', code: `Teaching(student, course, instructor)
Rules: student, course → instructor
       instructor → course

Candidate keys: student, course and student, instructor
All three attributes are prime.` },
      { type: 'text', text: `The dependency instructor → course violates BCNF because instructor alone is not a superkey: one instructor can teach many students. Yet Teaching is 3NF because course, the right side, is prime. This exception permits 3NF to keep a useful dependency local, but instructor's assigned course repeats across every student taught by that instructor.` },
      { type: 'text', text: `Suppose I9 teaches DB101 to Asha and Ben. Teaching has rows Asha-DB101-I9 and Ben-DB101-I9. If I9 is reassigned to AI205, both rows must change. BCNF would separate InstructorCourse(instructor, course) from StudentInstructor(student, instructor). That removes repetition, but the original dependency student, course → instructor may no longer be checkable in one separate relation. This is the central practical tradeoff.` },
      { type: 'heading', text: `The BCNF decomposition algorithm` },
      { type: 'list', items: [`Begin with the full schema R in a collection of relation schemas.`, `If a schema S has a nontrivial FD X → Y that violates BCNF in S, replace S by S1 = X union Y and S2 = S minus (Y minus X).`, `Repeat on the resulting schemas until no violation remains. The decomposition at each split is lossless because X is a key for S1.`] },
      { type: 'code', code: `Start R(A, B, C, D), F = { A → B, B → C }
AD is a candidate key: AD gives B through A → B, then C through B → C.

B → C violates BCNF in R because B is not a superkey.
First split: BC(B, C) and ABD(A, B, D)

In ABD, A → B still violates BCNF because A is not a superkey.
Second split: AB(A, B) and AD(A, D)

Result: BCNF schemas BC(B, C), AB(A, B), and AD(A, D).` },
      { type: 'text', text: `Read each split carefully. The first relation contains the violating dependency B → C, and the common attribute B determines all of BC, so that split is lossless. The remaining relation still exposes A → B; its second split is lossless because common attribute A determines all of AB. The final AD relation carries the independent key context, and no listed nontrivial FD violates BCNF in any final schema.` },
      { type: 'text', text: `Return to Teaching(student, course, instructor). Decomposing on instructor → course gives InstructorCourse(instructor, course) and StudentInstructor(student, instructor). Both are BCNF. However, neither relation contains student and course together, so neither alone can enforce student, course → instructor. To check that rule after an insertion, the system must join the two relations. Lossless join survives; dependency preservation does not.` },
      { type: 'heading', text: `3NF synthesis: the preservation-first method` },
      { type: 'text', text: `The 3NF synthesis algorithm deliberately guarantees dependency preservation and a lossless join. Begin from a canonical cover, which you learned to compute in the previous chapter. It creates a relation for each determinant and its directly determined attributes, then makes sure a relation contains a candidate key of the original schema.` },
      { type: 'code', code: `1. Find a canonical cover Fc with single-attribute right sides.
2. For each left side X in Fc, make a schema X plus all attributes
   directly determined by X. Combine identical left sides.
3. Remove any schema contained inside another schema.
4. If no schema contains a candidate key of R, add one candidate-key schema.` },
      { type: 'code', code: `Canonical cover: student, course → instructor ; instructor → course

Create StudentCourseInstructor(student, course, instructor)
Create InstructorCourse(instructor, course)

The second schema is contained in the first, so remove it.
A candidate key is already contained in the first schema.
Result: Teaching(student, course, instructor), which is 3NF and preserves both FDs.` },
      { type: 'text', text: `This result retains the original relation because 3NF permits the prime-attribute exception. Both rules can be enforced in that one table. The price is the possible repeated instructor-course fact. In a write-heavy system where redundancy is especially costly, BCNF may be preferable with enforcement performed by a join, transaction logic, or an additional constraint strategy.` },
      { type: 'heading', text: `Multivalued dependencies` },
      { type: 'text', text: `Functional dependencies say one value fixes another. A multivalued dependency, abbreviated MVD, describes independent sets of multiple values. In R(X, Y, Z), X ↠ Y says that for each X value, its allowed Y values vary independently of the remaining Z values. When one X has several Y values and several Z values, the relation contains their combinations.` },
      { type: 'code', code: `StudentInterest(student, hobby, language)
For Asha, hobbies are Chess and Music; languages are Hindi and English.
Rows required by independence:
Asha | Chess | Hindi
Asha | Chess | English
Asha | Music | Hindi
Asha | Music | English

MVDs: student ↠ hobby and student ↠ language` },
      { type: 'text', text: `No hobby determines a language, and no language determines a hobby. The four rows simply record every combination of two independent lists. Adding the hobby Painting requires two new rows, one for each language. Removing English must remove two rows. This is redundancy from an MVD, not from an ordinary FD.` },
      { type: 'heading', text: `Fourth normal form` },
      { type: 'text', text: `A relation is in fourth normal form, or 4NF, when for every nontrivial MVD X ↠ Y, X is a superkey. StudentInterest is not in 4NF because student is not a superkey and both independent lists are stored together. Decompose it into StudentHobby(student, hobby) and StudentLanguage(student, language). Joining Asha's two hobbies with her two languages intentionally regenerates the four combinations, but each independent fact is stored once.` },
      { type: 'text', text: `Fifth normal form, also called project-join normal form or PJNF, addresses rare join dependencies where a relation must be reconstructed from three or more projections. Domain-key normal form is an ideal in which every constraint follows from attribute domains and keys. These topics are valuable for specialized designs, but their prerequisites and unusual business rules make them less common in everyday application schemas.` },
      { type: 'heading', text: `A practical normalization decision path` },
      { type: 'list', items: [`Start by naming one real-world fact per proposed relation and make all values atomic for the required queries: reach 1NF.`, `List candidate keys and functional dependencies from business rules, not guesses from a small sample. Use closure to verify them.`, `Remove partial dependencies when composite keys cause them: reach 2NF. Then remove transitive nonkey dependencies: reach 3NF.`, `Test every nontrivial FD determinant for superkey status. Decompose to BCNF when redundancy matters and the lost dependency checks are acceptable.`, `Check for independent multi-valued lists. When a nonkey determinant has an MVD, use 4NF decomposition.`, `For each decomposition, verify lossless join and decide explicitly whether dependency preservation is required.`] },
      { type: 'text', text: `Normalization is the default for correctness, not a ban on all duplication. After measuring a real workload, a team may deliberately cache a derived total, copy a display label into a search index, or maintain a reporting table to avoid expensive joins. Do this only with a clear performance reason, a declared source of truth, and a transaction, trigger, refresh process, or application rule that keeps copies synchronized. Accidental denormalization is an anomaly; controlled denormalization is an engineered tradeoff.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You can now move from atomic values in 1NF through partial-dependency removal in 2NF, transitive-dependency control in 3NF, and the stronger determinant rule of BCNF. You have seen why 3NF synthesis preserves dependencies while BCNF decomposition can favor less redundancy, and why independent multi-valued facts call for 4NF. In practice, aim for 3NF or BCNF, prove lossless joins, preserve dependencies where operationally important, and denormalize only as a documented, maintained choice.` }
    ]
  }
];
