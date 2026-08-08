export const dbmsChaptersD = [
  {
    id: 'intermediate-sql-joins-and-views',
    title: 'Intermediate SQL: Joins and Views',
    blocks: [
      { type: 'text', text: `Welcome back. This chapter connects related tables without losing track of what each row means, then introduces views: named, query-defined windows onto data. We will use course(course_id, title, dept_name, credits) and prereq(course_id, prereq_id) as our running example.` },
      { type: 'heading', text: `Join expressions` },
      { type: 'text', text: `A join starts from combinations of rows from two relations and keeps combinations that satisfy a matching rule. The FROM clause commonly contains the join, so later SELECT and WHERE clauses can use its result.` },
      { type: 'code', code: `select course.course_id, title, prereq_id
from course inner join prereq
  on course.course_id = prereq.course_id;` },
      { type: 'text', text: `This inner join retains only course identifiers found in both relations. If BIO-301 requires BIO-101 and CS-190 requires CS-101, it returns those two matched course-and-prerequisite rows. A course with no prerequisite and a prerequisite record with no course row are absent.` },
      { type: 'heading', text: `Natural joins and explicit conditions` },
      { type: 'code', code: `select course_id, title, prereq_id
from course natural join prereq;` },
      { type: 'text', text: `NATURAL JOIN automatically equates every same-named column, here course_id, and emits one copy of that common column. It is convenient only when identical names deliberately mean the same thing; an accidental shared column can silently change the query.` },
      { type: 'code', code: `select course_id, title, prereq_id
from course join prereq using (course_id);` },
      { type: 'text', text: `USING states the intended common column explicitly. The result has one course_id column, plus title and prereq_id, so it has the same useful shape as the natural-join result without relying on all column names.` },
      { type: 'code', code: `select c.course_id, c.title, p.prereq_id
from course as c join prereq as p
  on c.course_id = p.course_id;` },
      { type: 'text', text: `ON gives the most control: its Boolean condition decides matches, and both input columns remain available unless the SELECT list chooses otherwise. Use aliases to make repeated or long relation names easier to hear and read.` },
      { type: 'text', text: `For orientation, imagine course has BIO-301 Genetics Biology 4, CS-190 Game Design Comp. Sci. 4, and CS-315 Robotics Comp. Sci. 3. Imagine prereq has BIO-301/BIO-101, CS-190/CS-101, and CS-347/CS-101. The next results describe every row aloud.` },
      { type: 'heading', text: `Outer joins preserve unmatched information` },
      { type: 'text', text: `An inner join discards nonmatches. An outer join first makes all ordinary matches, then preserves selected unmatched input rows by filling the missing side's attributes with null. Null here means that no partner row was found, not an empty string or zero.` },
      { type: 'code', code: `select course_id, title, dept_name, credits, prereq_id
from course natural left outer join prereq;` },
      { type: 'text', text: `A left outer join promises to keep every course row. It returns BIO-301 with BIO-101 and CS-190 with CS-101. It also returns CS-315, Robotics, Comp. Sci., 3, with prereq_id null because no prerequisite row matches it.` },
      { type: 'code', code: `course_id | title       | dept_name  | credits | prereq_id
BIO-301   | Genetics     | Biology     | 4       | BIO-101
CS-190    | Game Design  | Comp. Sci.  | 4       | CS-101
CS-315    | Robotics     | Comp. Sci.  | 3       | null` },
      { type: 'text', text: `This result table is the left-join picture in words: there are three rows, one per course. The final row is preserved from course, and only its missing prereq attribute is null.` },
      { type: 'code', code: `select course_id, title, dept_name, credits, prereq_id
from course natural right outer join prereq;` },
      { type: 'text', text: `A right outer join instead preserves every prereq row. BIO-301 and CS-190 match as before. The third row is CS-347 with prerequisite CS-101 and null title, department, and credits, because its course description is missing.` },
      { type: 'code', code: `course_id | title | dept_name | credits | prereq_id
BIO-301   | Genetics | Biology    | 4       | BIO-101
CS-190    | Game Design | Comp. Sci. | 4     | CS-101
CS-347    | null  | null       | null    | CS-101` },
      { type: 'text', text: `Read the final right-join row as: prereq knows CS-347 requires CS-101, but course supplies no descriptive row for CS-347.` },
      { type: 'code', code: `select course_id, title, dept_name, credits, prereq_id
from course full outer join prereq using (course_id);` },
      { type: 'text', text: `A full outer join keeps unmatched rows from both sides. Its four rows are the two matches, CS-315 with a null prerequisite, and CS-347 with null course-description fields and prerequisite CS-101.` },
      { type: 'code', code: `course_id | title       | dept_name | credits | prereq_id
BIO-301   | Genetics     | Biology    | 4       | BIO-101
CS-190    | Game Design  | Comp. Sci. | 4       | CS-101
CS-315    | Robotics     | Comp. Sci. | 3       | null
CS-347    | null         | null       | null    | CS-101` },
      { type: 'text', text: `The full-join table makes the information-preserving goal concrete: all three course identifiers and all three prerequisite identifiers can be recovered from its four rows.` },
      { type: 'heading', text: `Views: virtual relations with useful boundaries` },
      { type: 'text', text: `A view is a stored query definition, not normally a separately stored table. It can simplify repeated queries and expose only the columns or rows a person needs, such as instructor identity and department without salary.` },
      { type: 'code', code: `create view faculty as
select ID, name, dept_name
from instructor;` },
      { type: 'text', text: `This defines faculty as a virtual three-column relation. The database stores the expression; whenever faculty is queried, it derives current rows from instructor.` },
      { type: 'code', code: `select name
from faculty
where dept_name = 'Biology';` },
      { type: 'text', text: `This asks the view for names of Biology instructors. Conceptually, the database expands faculty back into its defining SELECT, then applies the department condition.` },
      { type: 'code', code: `create view department_salary_total(dept_name, total_salary) as
select dept_name, sum(salary)
from instructor
group by dept_name;` },
      { type: 'text', text: `A view may also package an aggregate. It contains one row per department; total_salary is the sum of salaries for that department at query time.` },
      { type: 'code', code: `create view physics_fall_rooms as
select c.course_id, s.sec_id, s.building, s.room_number
from course as c join section as s on c.course_id = s.course_id
where c.dept_name = 'Physics'
  and s.semester = 'Fall' and s.year = 2025;

create view physics_watson_rooms as
select course_id, room_number
from physics_fall_rooms
where building = 'Watson';` },
      { type: 'text', text: `The second view depends on the first. Nonrecursive view expansion replaces physics_watson_rooms with its query and then replaces physics_fall_rooms with its join, producing one ordinary query. A circular dependency has no such finite expansion.` },
      { type: 'heading', text: `Updating views and materializing results` },
      { type: 'code', code: `insert into faculty (ID, name, dept_name)
values ('30765', 'Green', 'Music');` },
      { type: 'text', text: `For this simple single-table view, the database can translate the insert to instructor. Columns absent from the view, such as salary, receive null or a declared default; the operation succeeds only if the base-table constraints permit that value.` },
      { type: 'text', text: `Updates become ambiguous for joins, expressions, aggregates, DISTINCT, GROUP BY, or omitted non-nullable columns. For example, a view joining instructor to department by building cannot infer a unique department from a new building alone. Products therefore commonly allow updates only on simple views, and a view predicate may need WITH CHECK OPTION to prevent an update from making its own row disappear.` },
      { type: 'text', text: `A materialized view stores the query result physically. Reads can be faster, but changes to base relations make that stored result stale until the system refreshes or incrementally maintains it. Choose it for costly, frequently read summaries rather than as a substitute for careful schema design.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You can now choose INNER JOIN for matches only; LEFT, RIGHT, or FULL OUTER JOIN when unmatched rows matter; and NATURAL, USING, or ON according to how explicitly you want to state the match. Views provide reusable, controlled query interfaces, while materialized views trade maintenance work for faster reads.` }
    ]
  },
  {
    id: 'intermediate-sql-transactions-constraints-types-authorization',
    title: 'Intermediate SQL: Transactions, Constraints, Data Types, and Authorization',
    blocks: [
      { type: 'text', text: `Now we turn from asking questions of data to keeping it trustworthy and protected. Think of a database as a shared record: transactions make changes all-or-nothing, constraints reject invalid states, types describe values, and authorization limits who may act.` },
      { type: 'heading', text: `Transactions` },
      { type: 'text', text: `A transaction is a logical unit of work. Its atomicity means either all its intended changes become durable together or none remain. Isolation keeps unfinished work from being confused with another concurrent transaction's work.` },
      { type: 'code', code: `update account
set balance = balance - 500
where account_no = 'A-101';

update account
set balance = balance + 500
where account_no = 'A-204';

commit;` },
      { type: 'text', text: `These two updates form a transfer. COMMIT makes both permanent together. If the second update cannot complete, rolling back prevents a half-finished transfer in which money simply vanished.` },
      { type: 'code', code: `begin;
update account set balance = balance - 500 where account_no = 'A-101';
rollback;` },
      { type: 'text', text: `ROLLBACK cancels this unfinished transaction, restoring A-101's earlier balance. Many interfaces start transactions implicitly, and many default to auto-commit, meaning each successful statement becomes its own transaction; disable auto-commit when several statements must succeed together.` },
      { type: 'heading', text: `Integrity constraints` },
      { type: 'text', text: `Constraints are rules enforced by the DBMS so an authorized mistake cannot quietly corrupt a consistent database. They are more dependable than relying solely on each application to remember the same checks.` },
      { type: 'code', code: `create table department (
  dept_name varchar(20) primary key,
  building varchar(15),
  budget numeric(12,2) not null,
  unique (building)
);` },
      { type: 'text', text: `NOT NULL requires every budget. PRIMARY KEY makes dept_name unique and non-null. UNIQUE declares building a candidate key here; SQL's treatment of nulls in unique constraints varies by product, so know your DBMS's rules.` },
      { type: 'code', code: `create table section (
  course_id varchar(8),
  sec_id varchar(8),
  semester varchar(6),
  year numeric(4,0),
  primary key (course_id, sec_id, semester, year),
  check (semester in ('Fall', 'Winter', 'Spring', 'Summer'))
);` },
      { type: 'text', text: `The CHECK predicate permits only the four named semester values. A proposed row with semester 'Monsoon' is rejected, while a row with 'Fall' passes this rule.` },
      { type: 'heading', text: `Referential integrity and actions` },
      { type: 'code', code: `create table course (
  course_id varchar(8) primary key,
  title varchar(50),
  dept_name varchar(20),
  foreign key (dept_name) references department(dept_name)
);` },
      { type: 'text', text: `FOREIGN KEY says every non-null course department must be a department key that exists. It prevents an orphan course labelled with a department the database does not know.` },
      { type: 'code', code: `create table course (
  course_id varchar(8) primary key,
  title varchar(50),
  dept_name varchar(20),
  foreign key (dept_name) references department(dept_name)
    on delete cascade
    on update cascade
);` },
      { type: 'text', text: `With CASCADE, deleting a department deletes its dependent courses, and changing the department key updates matching foreign keys. Alternatives include SET NULL and SET DEFAULT. Without a declared action, a DBMS normally rejects a parent change that would leave children invalid.` },
      { type: 'text', text: `Self-references illustrate timing. In person(ID, mother, father), insert parent rows before a child, or insert null parent references and update them later. Some systems support deferrable constraints, checking the final transaction state rather than each intermediate statement.` },
      { type: 'code', code: `create assertion positive_department_budget
check (not exists (
  select 1 from department where budget < 0
));` },
      { type: 'text', text: `An assertion is a database-wide predicate: this one forbids any negative budget. It expresses rules spanning relations too, but many practical SQL systems do not implement CREATE ASSERTION; use supported constraints or carefully designed triggers when necessary.` },
      { type: 'heading', text: `Dates, defaults, large values, and schemas` },
      { type: 'list', items: [`CHAR(n) is fixed-width character storage, while VARCHAR(n) permits up to n characters.`, `SMALLINT and INTEGER store whole numbers; NUMERIC(p,d) stores exact fixed-point values with p total digits and d fractional digits.`, `REAL, DOUBLE PRECISION, and FLOAT are approximate floating-point types, so do not use them where exact decimal comparisons, such as money, are required.`] },
      { type: 'code', code: `create table event (
  event_id integer generated always as identity primary key,
  starts_on date,
  starts_at time,
  recorded_at timestamp default current_timestamp,
  duration interval day to second
);` },
      { type: 'text', text: `DATE holds a calendar date, TIME a time of day, TIMESTAMP both, and INTERVAL a duration. Subtracting two temporal values produces an interval; adding an interval moves a temporal value. The identity column has a system-generated key and recorded_at defaults when omitted.` },
      { type: 'code', code: `create type Dollars as numeric(12,2) final;
create domain degree_level as varchar(10)
  check (value in ('Bachelors', 'Masters', 'Doctorate'));

create table degree (
  student_id varchar(5),
  level degree_level,
  fee Dollars
);` },
      { type: 'text', text: `A user-defined type gives a named type; a domain is a reusable named domain that can include constraints. Here every level must be one of three words and fee has the named monetary representation. Exact support and syntax differ across products.` },
      { type: 'code', code: `create table archive_student
like student;

create table document (
  doc_id integer generated by default as identity primary key,
  body clob,
  attachment blob
);` },
      { type: 'text', text: `CREATE TABLE ... LIKE copies a table's structural pattern where supported. CLOB is a large character object and BLOB is uninterpreted binary content such as an image; applications often receive a locator or stream instead of loading the full object at once.` },
      { type: 'code', code: `create index student_id_index on student(ID);` },
      { type: 'text', text: `This syntax asks for an index that can speed lookups by ID, such as a selective equality search. An index is an access structure, not a constraint by itself, and it costs storage and update work.` },
      { type: 'heading', text: `Authorization` },
      { type: 'text', text: `Table privileges include SELECT to read, INSERT to add rows, UPDATE to change rows, and DELETE to remove rows. Separate administrative privileges may control creating indexes, tables, schema changes, and drops.` },
      { type: 'code', code: `grant select, insert on instructor to registrar;
grant update (salary) on instructor to payroll_clerk;
grant select on instructor to public;` },
      { type: 'text', text: `The first grant gives registrar read and insert access. The second permits payroll_clerk to update only salary. PUBLIC means every valid database user, so use it sparingly.` },
      { type: 'code', code: `revoke insert on instructor from registrar;
revoke select on instructor from public;` },
      { type: 'text', text: `REVOKE removes a previously granted privilege. If a user received the same privilege independently from another grantor, that separate path may still authorize them; dependent grants can be cascaded or rejected with RESTRICT depending on the request and DBMS.` },
      { type: 'code', code: `create role teaching_assistant;
grant select on takes to teaching_assistant;
grant teaching_assistant to instructor_role;
grant instructor_role to arun;` },
      { type: 'text', text: `Roles collect privileges and can inherit from other roles. Arun receives instructor_role and, through it, the teaching-assistant ability to read takes. This scales much better than granting each permission to every person.` },
      { type: 'code', code: `create view geology_instructor as
select ID, name, dept_name
from instructor
where dept_name = 'Geology';

grant select on geology_instructor to geology_staff;
grant references (dept_name) on department to schema_designer;
grant select on department to lead_analyst with grant option;` },
      { type: 'text', text: `A privilege on a view need not reveal direct access to its base table: the view can be a controlled interface, subject to the DBMS's view-ownership rules. REFERENCES permits a foreign key to use a column. WITH GRANT OPTION lets lead_analyst pass SELECT onward; revoking that grant may cascade to recipients.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `Use COMMIT for a completed unit and ROLLBACK to erase an unfinished one. Put data rules in constraints, choose types that reflect the values, add indexes for demonstrated access needs, and grant the narrowest privilege through roles or views.` }
    ]
  },
  {
    id: 'advanced-sql-programming-interfaces',
    title: 'Advanced SQL: Accessing SQL from a Programming Language',
    blocks: [
      { type: 'text', text: `SQL is excellent for set-based data work, while application languages handle screens, files, and general control flow. Their impedance mismatch is the gap between relational result sets and ordinary program variables and objects. An API bridges that gap.` },
      { type: 'heading', text: `API choices and the JDBC workflow` },
      { type: 'text', text: `ODBC is a widely used database connectivity interface, especially in C-family environments and tools. JDBC is Java's SQL interface. Both support connecting, sending queries or updates, receiving results, and reporting failures; embedded SQL instead places marked SQL inside a host-language source file for preprocessing.` },
      { type: 'code', code: `try (Connection conn = DriverManager.getConnection(
         "jdbc:vendor://db.example.com:5432/university", user, password);
     Statement stmt = conn.createStatement()) {
  // database work goes here
} catch (SQLException error) {
  System.out.println("Database problem: " + error.getMessage());
}` },
      { type: 'text', text: `This Java try-with-resources example opens a connection and a Statement, then closes both automatically when the block ends, even if an error occurs. Real JDBC URLs are vendor-specific; the neutral host here is example.com.` },
      { type: 'code', code: `int changed = stmt.executeUpdate(
  "insert into instructor values ('77987', 'Kim', 'Physics', 98000)");

ResultSet rows = stmt.executeQuery(
  "select dept_name, avg(salary) as average_salary " +
  "from instructor group by dept_name");
while (rows.next()) {
  System.out.println(rows.getString("dept_name") + " " +
                     rows.getBigDecimal("average_salary"));
}` },
      { type: 'text', text: `executeUpdate returns an affected-row count for a modification. executeQuery returns a ResultSet positioned before its first row; each next call advances to one department-average row. The loop prints one line for every department, naming it and then its calculated average salary.` },
      { type: 'code', code: `int credits = rows.getInt("tot_cred");
if (rows.wasNull()) {
  System.out.println("Total credits is SQL null");
}` },
      { type: 'text', text: `A primitive Java int cannot itself represent SQL null. getInt commonly returns zero for a null numeric field, so wasNull must be checked immediately to distinguish a genuine zero from a missing value.` },
      { type: 'heading', text: `Prepared statements prevent injection` },
      { type: 'code', code: `PreparedStatement addInstructor = conn.prepareStatement(
  "insert into instructor (ID, name, dept_name, salary) values (?, ?, ?, ?)");
addInstructor.setString(1, "88877");
addInstructor.setString(2, "Perry");
addInstructor.setString(3, "Finance");
addInstructor.setBigDecimal(4, new BigDecimal("125000.00"));
addInstructor.executeUpdate();` },
      { type: 'text', text: `The question marks are typed parameter positions, not string fragments. The driver sends the SQL structure separately from each value, so quotes in a name are data rather than syntax. Reuse the prepared statement by changing parameter values and executing again.` },
      { type: 'code', code: `String unsafe = "select * from instructor where name = '" + suppliedName + "'";
PreparedStatement safe = conn.prepareStatement(
  "select * from instructor where name = ?");
safe.setString(1, suppliedName);
ResultSet matches = safe.executeQuery();` },
      { type: 'text', text: `The first line is unsafe string concatenation. If suppliedName contains a quote followed by an always-true condition or another command, it can alter the intended SQL: an injection attack. The prepared version treats the entire supplied value as the one name parameter. Always parameterize untrusted input.` },
      { type: 'heading', text: `Discovering metadata` },
      { type: 'code', code: `ResultSetMetaData resultMeta = rows.getMetaData();
for (int column = 1; column <= resultMeta.getColumnCount(); column++) {
  System.out.println(resultMeta.getColumnName(column) + ": " +
                     resultMeta.getColumnTypeName(column));
}` },
      { type: 'text', text: `Result-set metadata lets a generic result viewer learn the selected columns at runtime. It prints one name-and-type description for each output column, without the program hard-coding the query's result shape.` },
      { type: 'code', code: `DatabaseMetaData databaseMeta = conn.getMetaData();
ResultSet columns = databaseMeta.getColumns(
  null, "university", "department", "%");
while (columns.next()) {
  System.out.println(columns.getString("COLUMN_NAME") + ": " +
                     columns.getString("TYPE_NAME"));
}` },
      { type: 'text', text: `Database metadata describes the catalog rather than one query result. This asks for all columns of department in the university schema, using percent as a pattern wildcard, and prints each column's name and database type.` },
      { type: 'code', code: `ResultSet keys = databaseMeta.getPrimaryKeys("", "", tableName);
while (keys.next()) {
  System.out.println(keys.getShort("KEY_SEQ") + ": " +
                     keys.getString("COLUMN_NAME"));
}` },
      { type: 'text', text: `This obtains primary-key metadata. KEY_SEQ tells the order of each part of a composite key, so a schema browser can correctly report a multi-column identifier.` },
      { type: 'heading', text: `Transactions and routines through JDBC` },
      { type: 'code', code: `conn.setAutoCommit(false);
try {
  // execute several related updates
  conn.commit();
} catch (SQLException error) {
  conn.rollback();
  throw error;
}` },
      { type: 'text', text: `Turning auto-commit off groups several statements into one application-controlled transaction. The successful path commits them; the error path rolls them all back. Restore or close the connection according to your pool's policy.` },
      { type: 'code', code: `CallableStatement countCall =
  conn.prepareCall("{? = call department_count(?)}");
countCall.registerOutParameter(1, java.sql.Types.INTEGER);
countCall.setString(2, "Physics");
countCall.execute();
int count = countCall.getInt(1);` },
      { type: 'text', text: `CallableStatement invokes a stored routine. This example supplies Physics, registers the function return position as an integer, and reads the returned instructor count after execution. Blob and Clob accessors similarly expose large objects as streaming-capable JDBC values.` },
      { type: 'heading', text: `Embedded SQL and cursors` },
      { type: 'text', text: `Dynamic SQL sends a statement assembled or selected at runtime, which JDBC does. Embedded SQL is written within a host-language program and translated by a preprocessor; its earlier checking can catch some errors before execution.` },
      { type: 'code', code: `#sql iterator DepartmentAverage(String deptName, int averageSalary);

DepartmentAverage averages = null;
#sql averages = {
  select dept_name, avg(salary)
  from instructor
  group by dept_name
};
while (averages.next()) {
  System.out.println(averages.deptName() + " " +
                     averages.averageSalary());
}
averages.close();` },
      { type: 'text', text: `SQLJ is one Java embedded-SQL approach. Its declared iterator gives the query result a known shape, letting a translator check more at build time than a fully dynamic JDBC string. The loop prints one department and average-salary pair for each result row, then closes the iterator.` },
      { type: 'code', code: `EXEC SQL BEGIN DECLARE SECTION;
int credit_amount;
char student_id[6];
char student_name[21];
EXEC SQL END DECLARE SECTION;

EXEC SQL CONNECT TO university USER :user_name USING :password;` },
      { type: 'text', text: `This schematic embedded-SQL fragment declares host variables and connects. The colon identifies a host-language variable so the SQL processor does not mistake it for a database column. Exact punctuation varies by host language.` },
      { type: 'code', code: `EXEC SQL DECLARE student_cursor CURSOR FOR
  SELECT ID, name
  FROM student
  WHERE tot_cred > :credit_amount;

EXEC SQL OPEN student_cursor;
EXEC SQL FETCH student_cursor INTO :student_id, :student_name;` },
      { type: 'text', text: `The cursor gives a name to a multirow SELECT. OPEN runs it using credit_amount's value at that moment. Each FETCH copies the next qualifying student's ID and name into host variables; repeated fetches walk the result one row at a time.` },
      { type: 'code', code: `while (SQLSTATE != '02000') {
  EXEC SQL FETCH student_cursor INTO :student_id, :student_name;
  // process a successfully fetched row
}
EXEC SQL CLOSE student_cursor;` },
      { type: 'text', text: `The no-more-data status ends the fetch loop; host languages provide their own status-handling conventions. CLOSE releases the cursor's result resources. Do not process host variables after the fetch that signals end of data.` },
      { type: 'code', code: `EXEC SQL DECLARE music_cursor CURSOR FOR
  SELECT *
  FROM instructor
  WHERE dept_name = 'Music'
  FOR UPDATE;

EXEC SQL UPDATE instructor
SET salary = salary + 1000
WHERE CURRENT OF music_cursor;` },
      { type: 'text', text: `A cursor declared FOR UPDATE can identify its currently fetched row. WHERE CURRENT OF updates that row rather than requiring the application to reconstruct a key predicate. Use this carefully with transaction and concurrency rules.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `JDBC and ODBC connect programs to relational data; Statements execute fixed SQL, PreparedStatements safely bind data, and ResultSets or cursors expose rows sequentially. Metadata supports generic tools, while explicit transaction control preserves multi-step correctness.` }
    ]
  },
  {
    id: 'advanced-sql-functions-triggers-recursion-olap',
    title: 'Advanced SQL: Functions, Procedures, Triggers, Recursion, and OLAP',
    blocks: [
      { type: 'text', text: `In this final chapter, SQL becomes programmable and analytical. We will define reusable routines, decide when automatic triggers help, follow a recursive query to its fixed point, and summarize many-dimensional business data.` },
      { type: 'heading', text: `Functions and procedures` },
      { type: 'text', text: `A function returns a value and can often appear inside an expression. A procedure is invoked for its effects and can return output parameters. Standard syntax varies substantially among database products, so treat these examples as portable ideas and verify your platform's dialect.` },
      { type: 'code', code: `create function department_count(p_dept varchar(20))
returns integer
begin
  declare total integer;
  select count(*) into total
  from instructor
  where dept_name = p_dept;
  return total;
end;` },
      { type: 'text', text: `This function counts instructor rows for its department parameter, places the count in a local variable, and returns it. Naming the parameter p_dept avoids ambiguity with the dept_name column.` },
      { type: 'code', code: `select dept_name, budget
from department
where department_count(dept_name) > 12;` },
      { type: 'text', text: `The function is evaluated for each candidate department. The output contains department names and budgets only for departments whose returned instructor count exceeds twelve.` },
      { type: 'code', code: `create function instructors_of(p_dept varchar(20))
returns table (
  ID varchar(5), name varchar(20), dept_name varchar(20), salary numeric(8,2)
)
return table (
  select ID, name, dept_name, salary
  from instructor
  where dept_name = p_dept
);

select * from table(instructors_of('Music'));` },
      { type: 'text', text: `A table-valued function acts like a parameterized relation where supported. The final query returns every instructor row whose department is Music, with the four declared columns.` },
      { type: 'code', code: `create procedure department_count_proc(
  in p_dept varchar(20), out total integer)
begin
  select count(*) into total
  from instructor
  where dept_name = p_dept;
end;

call department_count_proc('Physics', :answer);` },
      { type: 'text', text: `The procedure places Physics's count into its output argument. Procedures and functions may be overloaded when their argument counts or types distinguish them, subject to the DBMS's rules.` },
      { type: 'heading', text: `Procedural constructs and external routines` },
      { type: 'code', code: `declare total_budget numeric(12,2) default 0;
for row_value as
  select budget from department
do
  set total_budget = total_budget + row_value.budget;
end for;` },
      { type: 'text', text: `This procedural loop visits each department budget and accumulates it. SQL routines also commonly provide BEGIN/END blocks, local variables, assignment, IF/THEN/ELSE, CASE, WHILE, REPEAT, condition handlers, and SIGNAL; set-based SQL is still preferable when it expresses the task directly.` },
      { type: 'code', code: `create function geometry_overlap(a geometry, b geometry)
returns boolean
language Java
external name 'com.example.Geometry.overlap';` },
      { type: 'text', text: `An external routine declaration connects SQL to implementation in another language. This is useful for specialized computations, but executing foreign code in or near the database process adds reliability and security risk. Sandboxes or separate processes improve isolation, usually with performance overhead.` },
      { type: 'heading', text: `Triggers` },
      { type: 'text', text: `A trigger is an action the database runs automatically because an INSERT, DELETE, or UPDATE event occurred. Define the event, timing, optional condition, and action clearly; hidden side effects make systems difficult to understand.` },
      { type: 'code', code: `create trigger blank_grade_to_null
before update of grade on takes
referencing new row as new_row
for each row
when (new_row.grade = '')
begin atomic
  set new_row.grade = null;
end;` },
      { type: 'text', text: `This BEFORE row trigger normalizes an empty grade to null before the update is stored. The new-row reference is available for inserts and updates; old-row values are available for updates and deletes.` },
      { type: 'code', code: `create trigger add_earned_credits
after update of grade on takes
referencing old row as old_row new row as new_row
for each row
when (new_row.grade <> 'F' and new_row.grade is not null
      and (old_row.grade = 'F' or old_row.grade is null))
begin atomic
  update student
  set tot_cred = tot_cred + (
    select credits from course where course_id = new_row.course_id)
  where ID = new_row.ID;
end;` },
      { type: 'text', text: `This AFTER row trigger adds a course's credits only when a student's grade changes from failing or missing to a non-failing value. It prevents an ordinary grade revision from adding credits repeatedly. Production code should also define its policy for withdrawals and grade changes.` },
      { type: 'text', text: `FOR EACH ROW runs once per affected row. FOR EACH STATEMENT runs once for the entire modification and can use old or new transition tables containing all affected rows, which can be more efficient for bulk changes.` },
      { type: 'text', text: `Do not reach for triggers to maintain every summary or replicate databases: materialized-view maintenance, built-in replication, and explicit update methods are often clearer. Triggers can fire unexpectedly during restore or replication, can fail a critical transaction, and can cause cascading trigger chains. Disable only with a deliberate operational plan.` },
      { type: 'heading', text: `Recursive queries` },
      { type: 'code', code: `with recursive all_prereqs(course_id, prereq_id) as (
  select course_id, prereq_id
  from prereq
  union
  select a.course_id, p.prereq_id
  from all_prereqs as a
  join prereq as p on a.prereq_id = p.course_id
)
select * from all_prereqs;` },
      { type: 'text', text: `The anchor member supplies direct prerequisite pairs. The recursive member follows one more prerequisite edge, repeatedly. UNION removes duplicates so the process reaches a fixed point: every direct or indirect prerequisite pair, not merely a prechosen number of levels.` },
      { type: 'code', code: `prereq
course_id | prereq_id
CS-301    | CS-201
CS-201    | CS-101

all_prereqs for CS-301, by iteration
step 1: CS-201
step 2: CS-201, CS-101
step 3: CS-201, CS-101 (no new row)` },
      { type: 'text', text: `This narrated fixed-point table shows the recursion. First CS-301 directly requires CS-201. Following CS-201 adds CS-101. The next pass adds nothing, so the result stabilizes with two prerequisites. Recursive definitions used this way must be monotonic: adding base facts cannot remove an existing result.` },
      { type: 'heading', text: `Ranking and windows` },
      { type: 'code', code: `select ID, GPA,
  rank() over (order by GPA desc) as rank_with_gaps,
  dense_rank() over (order by GPA desc) as rank_without_gaps
from student_grades
order by rank_with_gaps;` },
      { type: 'text', text: `The highest GPA has rank 1. If two students tie for first, both receive rank 1 and the next RANK is 3; DENSE_RANK instead gives the next distinct GPA rank 2. The final ORDER BY displays those calculated ranks in order.` },
      { type: 'code', code: `select ID, dept_name, GPA,
  rank() over (
    partition by dept_name
    order by GPA desc nulls last
  ) as department_rank
from dept_grades
order by dept_name, department_rank;` },
      { type: 'text', text: `PARTITION BY starts a separate ranking competition for each department. NULLS LAST explicitly places missing GPAs after known ones. Other useful window ranking functions include ROW_NUMBER, PERCENT_RANK, CUME_DIST, and NTILE(n), which assigns roughly equal-sized ordered buckets.` },
      { type: 'code', code: `select sale_date, value,
  avg(value) over (
    order by sale_date
    rows between 1 preceding and 1 following
  ) as three_day_moving_average
from sales_by_day;` },
      { type: 'text', text: `For each date, this window averages that row's value with the immediately previous and next rows when present. Window frames can instead run from UNBOUNDED PRECEDING through the current row, or use value or time ranges.` },
      { type: 'code', code: `select account_number, date_time, value,
  sum(value) over (
    partition by account_number
    order by date_time
    rows unbounded preceding
  ) as running_balance
from transaction
order by account_number, date_time;` },
      { type: 'text', text: `This produces one row per transaction and a running balance within each account. Deposits contribute positive values and withdrawals negative values; the window begins at that account's first transaction and ends at the current row.` },
      { type: 'heading', text: `OLAP and multidimensional thinking` },
      { type: 'text', text: `A data warehouse integrates historical, relatively stable data for decision support. OLTP systems prioritize many small operational transactions; OLAP supports interactive summaries, trend analysis, and exploratory questions over measures such as quantity or revenue and dimensions such as item, location, customer, and time.` },
      { type: 'text', text: `Picture a sales cube with item, store, and time axes. Each cell is one measure value—for example on-hand inventory—for one item at one store at one time. A cross-tab is a two-dimensional view through that conceptual cube, not a requirement that the data be stored literally as a cube.` },
      { type: 'text', text: `A star schema places a central fact table containing numeric measures and keys to surrounding dimension tables. A location dimension can describe distribution and region; a day dimension can describe day, month, quarter, and year. A snowflake schema normalizes parts of dimensions into further linked tables. Dimension hierarchies support rolling day up to month, quarter, and year.` },
      { type: 'code', code: `select item_name, color, sum(quantity) as total_quantity
from sales
where clothes_size = 'small'
group by item_name, color;` },
      { type: 'text', text: `This is a slice: it fixes the size dimension to small and reports one aggregate per item-and-color pair. A dice fixes or selects several dimension values, such as particular stores, a quarter, and selected items. Pivoting changes which dimensions are row headers and column headers.` },
      { type: 'code', code: `select item_name, color, clothes_size, sum(quantity) as total_quantity,
  grouping(item_name) as item_is_total,
  grouping(color) as color_is_total,
  grouping(clothes_size) as size_is_total
from sales
group by cube(item_name, color, clothes_size);` },
      { type: 'text', text: `CUBE computes every grouping subset of its three attributes: detailed item-color-size totals, every two-way and one-way subtotal, and the grand total. In subtotal rows, omitted grouping attributes appear as null; GROUPING returns 1 for a null that represents an aggregate level and 0 otherwise, separating it from a stored null.` },
      { type: 'code', code: `select item_name, color, clothes_size, sum(quantity) as total_quantity
from sales
group by rollup(item_name, color, clothes_size);` },
      { type: 'text', text: `ROLLUP follows only prefix levels: item-color-size, then item-color, then item, then the grand total. It fits an ordered hierarchy. For example, rolling category then item gives item detail, a category subtotal, and an overall subtotal.` },
      { type: 'code', code: `select coalesce(item_name, 'all items') as item_name,
       coalesce(color, 'all colors') as color,
       sum(quantity) as total_quantity
from sales
group by cube(item_name, color);` },
      { type: 'text', text: `This makes a readable cross-tab-style relational output. It contains an item-and-color total for each detailed cell, row totals where color is aggregated, column totals where item is aggregated, and one grand-total row. In production, use GROUPING when stored null dimension values could otherwise be mistaken for totals.` },
      { type: 'text', text: `Roll-up moves from fine detail to coarser summaries; drill-down reverses it. A visual cube can be described without sight: slicing time to one quarter leaves a flat item-by-location grid, while dicing retains a smaller rectangular subcube. Cross-tab row and column headings are simply two chosen dimensions.` },
      { type: 'text', text: `OLAP implementations may be MOLAP, with multidimensional arrays; ROLAP, using relational structures; or HOLAP, a mixture. Precomputing all 2^n grouping combinations can be expensive, so systems commonly precompute selected aggregates and derive others when the aggregate is decomposable; median is a notable harder case.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `Functions and procedures package reusable work; procedural extensions and external routines add power with portability and security trade-offs. Triggers automate narrowly defined reactions, recursion follows arbitrary-length relationships, windows analyze ordered rows, and OLAP operations reveal summaries across dimensions.` }
    ]
  }
];
