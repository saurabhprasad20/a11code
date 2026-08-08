export const dbmsChaptersC = [
  {
    id: 'sql-data-definition',
    title: 'SQL: Data Definition and Basic Structure',
    blocks: [
      { type: 'text', text: `Welcome to SQL. In this chapter, we will first build the vocabulary that describes a database, then use it to create the university relations. SQL began as IBM's Sequel language in the System R research project and was later named Structured Query Language. Its standards progressed through SQL-86, SQL-89, SQL-92, SQL:1999, and SQL:2003. Real products commonly implement most SQL-92 features plus differing later and vendor-specific additions, so check the documentation for your database system.` },
      { type: 'heading', text: `What the data-definition language records` },
      { type: 'text', text: `SQL's data-definition language, or DDL, describes each relation's schema, the allowed domain of every attribute, and integrity rules. It can also describe indexes, permissions and authorization, and the relation's physical disk organization. In short, DDL records the structure and rules of the database, not merely its current rows.` },
      { type: 'heading', text: `Common SQL domain types` },
      { type: 'list', items: [`char(n) stores a character value of exactly n positions; varchar(n) stores a character value up to n positions.`, `int and smallint are machine-dependent integer ranges, with smallint the smaller range.`, `numeric(p,d) is exact fixed-point data: p total digits, of which d are to the right of the decimal point. For example, numeric(3,1) can store 44.5 exactly, but cannot store 444.5 or 0.32 exactly.`, `real and double precision are approximate floating-point types with machine-dependent precision; float(n) requests at least n digits of precision.`] },
      { type: 'heading', text: `Creating a relation` },
      { type: 'code', code: `create table r (
  A1 D1, A2 D2, ..., An Dn,
  integrity-constraint1,
  ...,
  integrity-constraintk
);` },
      { type: 'text', text: `This general form creates relation r. Each A name is an attribute in its schema, and each D is the attribute's domain type. The remaining lines are optional integrity constraints.` },
      { type: 'code', code: `create table instructor (
  ID char(5),
  name varchar(20),
  dept_name varchar(20),
  salary numeric(8,2)
);` },
      { type: 'text', text: `This first instructor definition has four columns: a five-character identifier, a name of at most 20 characters, a department name of at most 20 characters, and an exact salary with up to eight digits and two decimal places. At this stage it declares types but no keys.` },
      { type: 'heading', text: `Constraints at creation time` },
      { type: 'text', text: `A not null constraint requires a value. primary key (A1, ..., An) identifies each row uniquely and makes its key attributes non-null. foreign key (Am, ..., An) references r says that values in these columns must correspond to a referenced key in relation r.` },
      { type: 'code', code: `create table instructor (
  ID char(5),
  name varchar(20) not null,
  dept_name varchar(20),
  salary numeric(8,2),
  primary key (ID),
  foreign key (dept_name) references department
);` },
      { type: 'text', text: `Now every instructor has a name, ID uniquely identifies an instructor, and each non-null department name must identify an existing department. A primary-key declaration itself also prevents null key values.` },
      { type: 'code', code: `create table student (
  ID varchar(5),
  name varchar(20) not null,
  dept_name varchar(20),
  tot_cred numeric(3,0),
  primary key (ID),
  foreign key (dept_name) references department
);` },
      { type: 'text', text: `The student relation follows the same pattern. Its total-credit value is an exact whole number of up to three digits, and its department reference must be valid when supplied.` },
      { type: 'code', code: `create table takes (
  ID varchar(5),
  course_id varchar(8),
  sec_id varchar(8),
  semester varchar(6),
  year numeric(4,0),
  grade varchar(2),
  primary key (ID, course_id, sec_id, semester, year),
  foreign key (ID) references student,
  foreign key (course_id, sec_id, semester, year) references section
);` },
      { type: 'text', text: `A takes row links one student to one scheduled course section and records a possible grade. Its composite key currently includes the section identifier. If sec_id is removed from that key, the schema instead prevents a student from registering in two sections of the same course during one semester and year.` },
      { type: 'code', code: `create table course (
  course_id varchar(8),
  title varchar(50),
  dept_name varchar(20),
  credits numeric(2,0),
  primary key (course_id),
  foreign key (dept_name) references department
);` },
      { type: 'text', text: `Each course has a unique identifier, a title, a whole-number credit value, and a department reference. These linked definitions are how the schema protects relationships among university data.` },
      { type: 'heading', text: `Changing table contents and definitions` },
      { type: 'code', code: `insert into instructor
values ('10211', 'Smith', 'Biology', 66000);` },
      { type: 'text', text: `This inserts one instructor row. Because no column list is given, the values must be supplied in the table's declared column order and must satisfy its constraints.` },
      { type: 'code', code: `delete from student;` },
      { type: 'text', text: `This removes every row from student while leaving the student relation itself defined.` },
      { type: 'code', code: `drop table r;` },
      { type: 'text', text: `This removes relation r itself: its definition as well as its stored rows.` },
      { type: 'code', code: `alter table r add A D;` },
      { type: 'text', text: `This adds attribute A with domain D to relation r. Existing rows receive null in that newly added column.` },
      { type: 'code', code: `alter table r drop A;` },
      { type: 'text', text: `This asks the database to remove attribute A from relation r. Support for dropping individual attributes varies across database products.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You can now distinguish a schema from its rows, choose basic domain types, create relations, and enforce non-null, primary-key, and foreign-key rules. You also saw the essential commands for inserting data, deleting rows, removing a table, and evolving a table's columns. Next, we will retrieve information from these relations.` }
    ]
  },
  {
    id: 'basic-sql-queries',
    title: 'SQL: Basic Queries and Additional Operations',
    blocks: [
      { type: 'text', text: `Now we shift from defining the database to asking it questions. A typical query selects attributes from one or more relations and retains only rows meeting a predicate. Read the clauses as a guided pipeline: choose sources with FROM, filter with WHERE, and decide the displayed values with SELECT.` },
      { type: 'code', code: `select A1, A2, ..., An
from r1, r2, ..., rm
where P;` },
      { type: 'text', text: `Here A1 through An are desired attributes, r1 through rm are source relations, and P is a condition. The query result is itself a relation. In relational-algebra terms, SELECT corresponds to projection, FROM supplies a Cartesian product, and WHERE is selection.` },
      { type: 'heading', text: `Choosing columns with SELECT` },
      { type: 'code', code: `select name
from instructor;` },
      { type: 'text', text: `This projects the name column from instructor, returning the names of all instructor rows. SQL identifiers are normally case-insensitive, so name, NAME, and Name refer to the same identifier.` },
      { type: 'code', code: `select distinct dept_name
from instructor;` },
      { type: 'text', text: `This lists department names represented by instructors and removes repeated department values. SQL otherwise permits duplicates in both relations and query results.` },
      { type: 'code', code: `select all dept_name
from instructor;` },
      { type: 'text', text: `ALL explicitly preserves duplicate department names; it is the usual default behavior when DISTINCT is absent.` },
      { type: 'code', code: `select *
from instructor;` },
      { type: 'text', text: `The asterisk requests every instructor attribute, so each result row contains the entire instructor row.` },
      { type: 'code', code: `select '437';` },
      { type: 'text', text: `A literal needs no FROM clause. This result is a one-column, one-row table whose only value is 437.` },
      { type: 'code', code: `select '437' as FOO;` },
      { type: 'text', text: `This produces the same one-row literal result, while giving its output column the name FOO.` },
      { type: 'code', code: `select 'A'
from instructor;` },
      { type: 'text', text: `Because instructor supplies the rows, this produces one column containing A once for every instructor row.` },
      { type: 'code', code: `select ID, name, salary / 12
from instructor;` },
      { type: 'text', text: `SELECT may compute expressions using +, -, *, and /. This displays each instructor's ID and name plus salary divided by 12, rather than the original salary value.` },
      { type: 'code', code: `select ID, name, salary / 12 as monthly_salary
from instructor;` },
      { type: 'text', text: `This is the same calculation, but AS gives the calculated output column the clearer name monthly_salary.` },
      { type: 'heading', text: `Filtering rows with WHERE` },
      { type: 'code', code: `select name
from instructor
where dept_name = 'Comp. Sci.';` },
      { type: 'text', text: `The WHERE predicate retains only instructors whose department is Comp. Sci., then SELECT displays their names.` },
      { type: 'code', code: `select name
from instructor
where dept_name = 'Comp. Sci.' and salary > 80000;` },
      { type: 'text', text: `This adds a second requirement: an instructor must be in Comp. Sci. and earn more than 80,000. SQL combines comparisons with AND, OR, and NOT, and comparisons may use arithmetic expressions too.` },
      { type: 'heading', text: `Combining relations with FROM` },
      { type: 'code', code: `select *
from instructor, teaches;` },
      { type: 'text', text: `With two relations and no joining condition, FROM creates their Cartesian product: every instructor row paired with every teaches row. If columns share a name such as ID, their result labels are qualified, for example instructor.ID and teaches.ID. This large product is rarely the final goal; a WHERE condition normally selects the meaningful pairs.` },
      { type: 'code', code: `instructor
ID     name         dept_name   salary
10101  Srinivasan    Comp. Sci.  65000
12121  Wu           Finance     90000
15151  Mozart       Music       40000
22222  Einstein     Physics     95000
32343  El Said      History     60000

teaches
ID     course_id  sec_id  semester  year
10101  CS-101     1       Fall      2009
10101  CS-315     1       Spring    2010
10101  CS-347     1       Fall      2009
12121  FIN-201    1       Spring    2010
15151  MU-199     1       Spring    2010
22222  PHY-101    1       Fall      2009` },
      { type: 'text', text: `The Cartesian-product figure begins with five instructor rows and six teaches rows. Its result has ten columns: four instructor columns followed by five teaches columns, with separate ID labels. It shows, for example, Srinivasan paired with each of the six teaching assignments, then Wu paired with each assignment, and so on: five times six, or 30 pairs. The displayed rows use ellipses to show the repeated middle portion rather than printing all 30.` },
      { type: 'code', code: `select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;` },
      { type: 'text', text: `This turns the product into an equijoin by keeping a pair only when its instructor and teaching IDs agree. It returns the name and course ID for every instructor who has taught a course.` },
      { type: 'code', code: `select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID
  and instructor.dept_name = 'Art';` },
      { type: 'text', text: `This is the same join with an additional department filter. Only teaching assignments belonging to Art instructors remain, and the result displays each matching name and course ID.` },
      { type: 'heading', text: `Renaming and self-joins` },
      { type: 'code', code: `select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary
  and S.dept_name = 'Comp. Sci.';` },
      { type: 'text', text: `AS gives two roles to the same instructor relation. T is each candidate instructor, while S is a comparison instructor in Comp. Sci. The query returns each distinct T name that earns more than at least one such S. The word AS is optional, so instructor T means the same thing as instructor AS T.` },
      { type: 'code', code: `emp_super
person  supervisor
Bob     Alice
Mary    Susan
Alice   David
David   Mary` },
      { type: 'text', text: `The self-join figure is a two-column relation. Bob reports to Alice; Alice reports to David; David reports to Mary; and Mary reports to Susan. A first lookup finds Bob's direct supervisor, Alice. Joining another copy can find Alice's supervisor, David. Continuing the chain finds all of Bob's direct and indirect supervisors: Alice, David, Mary, and Susan.` },
      { type: 'heading', text: `Strings, sorting, and comparison predicates` },
      { type: 'code', code: `select name
from instructor
where name like '%dar%';` },
      { type: 'text', text: `LIKE compares strings to a pattern. The percent sign matches any sequence of characters, so this asks for instructors whose name contains dar somewhere within it.` },
      { type: 'code', code: `like '100\\%' escape '\\'` },
      { type: 'text', text: `This pattern matches the literal text 100%, not an arbitrary string starting with 100. The ESCAPE clause makes backslash the escape character, so the escaped percent loses its wildcard role.` },
      { type: 'list', items: [`LIKE patterns are case-sensitive in the model presented here. Intro% matches strings beginning with Intro, and %Comp% matches strings containing Comp.`, `Three underscores, written ___, match exactly three characters; ___% matches strings of three or more characters.`, `SQL also offers string concatenation with ||, case conversion, length operations, substring extraction, and related functions.`] },
      { type: 'code', code: `select distinct name
from instructor
order by name;` },
      { type: 'text', text: `This returns each instructor name once and sorts the displayed result alphabetically by name. ASC is the default sort direction; ORDER BY name DESC reverses it. You may sort by more than one key, such as ORDER BY dept_name, name.` },
      { type: 'code', code: `select name
from instructor
where salary between 90000 and 100000;` },
      { type: 'text', text: `BETWEEN includes both endpoints. This retrieves names for salaries from 90,000 through 100,000 inclusive.` },
      { type: 'code', code: `select name, course_id
from instructor, teaches
where (instructor.ID, dept_name) = (teaches.ID, 'Biology');` },
      { type: 'text', text: `SQL can compare tuples position by position. This requires both ID values to agree and the instructor department to equal Biology, then returns the matching name and course ID.` },
      { type: 'heading', text: `Why duplicates matter` },
      { type: 'text', text: `SQL commonly uses bag, or multiset, semantics. If selection keeps a tuple appearing c1 times, all c1 copies remain. Projection produces one projected copy for every input copy. If a tuple occurs c1 times in r1 and another occurs c2 times in r2, their Cartesian-product row occurs c1 times c2 times.` },
      { type: 'code', code: `r1(A, B) = {(1, a), (2, a)}
r2(C)    = {(2), (3), (3)}

projection of B from r1 = {(a), (a)}
projection of B from r1 × r2 =
  {(a, 2), (a, 2), (a, 3), (a, 3), (a, 3), (a, 3)}` },
      { type: 'text', text: `The duplicate example has two r1 rows that both project to a, so the projected result retains two a values. r2 has 2 once and 3 twice. Pairing the two a copies with r2 therefore yields two copies of (a, 2) and four copies of (a, 3). In relational-algebra notation, an SQL SELECT-FROM-WHERE query is the bag version of: take the product of all FROM relations, select rows satisfying P, then project A1 through An.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You have learned the SELECT-FROM-WHERE pattern, duplicate control, computed expressions, filters, products and joins, aliases, pattern matching, ordering, tuple comparisons, and bag behavior. These ideas let you ask focused questions from one relation or from carefully connected relations.` }
    ]
  },
  {
    id: 'sets-null-aggregation-subqueries-modification',
    title: 'SQL: Sets, Nulls, Aggregation, Subqueries, and Updates',
    blocks: [
      { type: 'text', text: `This final section extends everyday queries with set reasoning, incomplete data, summaries, nested questions, and permanent changes. Work through each feature slowly: its main power comes from combining it with the earlier SELECT-FROM-WHERE structure.` },
      { type: 'heading', text: `Set operations` },
      { type: 'code', code: `(select course_id from section
 where semester = 'Fall' and year = 2009)
union
(select course_id from section
 where semester = 'Spring' and year = 2010);` },
      { type: 'text', text: `UNION combines the course IDs offered in Fall 2009 with those offered in Spring 2010. A course appearing in either period appears once in the result.` },
      { type: 'code', code: `(select course_id from section
 where semester = 'Fall' and year = 2009)
intersect
(select course_id from section
 where semester = 'Spring' and year = 2010);` },
      { type: 'text', text: `INTERSECT keeps only course IDs present in both semester-specific result sets, so it finds courses offered in both periods.` },
      { type: 'code', code: `(select course_id from section
 where semester = 'Fall' and year = 2009)
except
(select course_id from section
 where semester = 'Spring' and year = 2010);` },
      { type: 'text', text: `EXCEPT keeps Fall 2009 course IDs that do not occur in the Spring 2010 set.` },
      { type: 'code', code: `select distinct T.salary
from instructor as T, instructor as S
where T.salary < S.salary;` },
      { type: 'text', text: `For each candidate salary T, this self-join looks for some larger salary S. Therefore it returns every distinct instructor salary below the maximum.` },
      { type: 'code', code: `select distinct salary
from instructor;` },
      { type: 'text', text: `This supplies the complete distinct salary set. To obtain the maximum using set difference, take this full salary query EXCEPT the preceding below-a-larger-salary query; the one remaining value is the largest salary.` },
      { type: 'code', code: `(select distinct salary
 from instructor)
except
(select distinct T.salary
 from instructor as T, instructor as S
 where T.salary < S.salary);` },
      { type: 'text', text: `This writes that maximum-salary set difference in full. The second parenthesized query contains every salary that has a larger counterpart, so subtracting it from all distinct salaries leaves the maximum salary.` },
      { type: 'text', text: `UNION, INTERSECT, and EXCEPT discard duplicates by default. Their bag counterparts are UNION ALL, INTERSECT ALL, and EXCEPT ALL. When a tuple occurs m times in r and n times in s, it occurs m + n times in r UNION ALL s, min(m,n) times in r INTERSECT ALL s, and max(0, m - n) times in r EXCEPT ALL s.` },
      { type: 'heading', text: `Null and three-valued logic` },
      { type: 'code', code: `select name
from instructor
where salary is null;` },
      { type: 'text', text: `NULL represents a value that is unknown or absent. Arithmetic involving NULL yields NULL, so 5 + NULL is NULL. Use IS NULL, as this query does, to find instructors whose salary is missing; do not use = NULL.` },
      { type: 'text', text: `SQL conditions can be true, false, or unknown. Any comparison with NULL is unknown, including 5 < NULL, NULL <> NULL, and NULL = NULL. With unknown: unknown OR true is true, but unknown OR false and unknown OR unknown are unknown; true AND unknown is unknown, false AND unknown is false, and unknown AND unknown is unknown; NOT unknown remains unknown. P IS UNKNOWN tests for this third value. WHERE treats unknown like false, so it does not retain that row.` },
      { type: 'heading', text: `Aggregating values` },
      { type: 'text', text: `Aggregate functions consume the multiset of values in a column and produce one value. AVG computes the mean, MIN and MAX find extremes, SUM totals values, and COUNT counts values.` },
      { type: 'code', code: `select avg(salary)
from instructor
where dept_name = 'Comp. Sci.';` },
      { type: 'text', text: `The WHERE clause first limits the input to Comp. Sci. instructors; AVG then returns their average salary as one result value.` },
      { type: 'code', code: `select count(distinct ID)
from teaches
where semester = 'Spring' and year = 2010;` },
      { type: 'text', text: `This counts different instructor IDs among Spring 2010 teaching assignments, so an instructor teaching more than one section is counted once.` },
      { type: 'code', code: `select count(*)
from course;` },
      { type: 'text', text: `COUNT(*) counts rows, returning the total number of course tuples.` },
      { type: 'code', code: `select dept_name, avg(salary) as avg_salary
from instructor
group by dept_name;` },
      { type: 'text', text: `GROUP BY forms one instructor group per department, then computes its average salary. The shown input table has columns ID, name, dept_name, and salary. Its rows are: 76766 Crick, Biology, 72000; 45565 Katz, Comp. Sci., 75000; 10101 Srinivasan, Comp. Sci., 65000; 83821 Brandt, Comp. Sci., 92000; 98345 Kim, Elec. Eng., 80000; 12121 Wu, Finance, 90000; 76543 Singh, Finance, 80000; 32343 El Said, History, 60000; 58583 Califieri, History, 62000; 15151 Mozart, Music, 40000; 33456 Gold, Physics, 87000; and 22222 Einstein, Physics, 95000.` },
      { type: 'code', code: `dept_name   avg_salary
Biology     72000
Comp. Sci.  77333
Elec. Eng.  80000
Finance     85000
History     61000
Music       40000
Physics     91000` },
      { type: 'text', text: `The result table has one row per department. It reports Biology 72,000; Comp. Sci. 77,333; Elec. Eng. 80,000; Finance 85,000; History 61,000; Music 40,000; and Physics 91,000. The department column is the group label and avg_salary is the computed value.` },
      { type: 'code', code: `/* invalid */
select dept_name, ID, avg(salary)
from instructor
group by dept_name;` },
      { type: 'text', text: `This is invalid because ID is neither aggregated nor listed in GROUP BY. A group may contain several IDs, so SQL has no single ID to display. Every selected attribute outside an aggregate must appear in the grouping list.` },
      { type: 'code', code: `select dept_name, avg(salary)
from instructor
group by dept_name
having avg(salary) > 42000;` },
      { type: 'text', text: `HAVING filters completed groups, so this returns department names and averages only where the departmental average exceeds 42,000. In contrast, WHERE filters individual rows before groups are formed.` },
      { type: 'code', code: `select sum(salary)
from instructor;` },
      { type: 'text', text: `This totals instructor salaries. Aggregates other than COUNT(*) ignore rows whose aggregated value is NULL. If no non-null value exists, SUM, AVG, MIN, and MAX yield NULL; COUNT of a nullable expression yields 0 in an all-null collection, while COUNT(*) still counts rows.` },
      { type: 'heading', text: `Nested subqueries` },
      { type: 'text', text: `A subquery is a SELECT-FROM-WHERE expression inside another query. A SELECT item may be replaced by a subquery that yields one value, a FROM item may be a valid subquery, and a WHERE condition can compare an attribute B with a subquery result. Common WHERE uses test membership, comparisons with a set, or reason about its cardinality.` },
      { type: 'code', code: `select distinct course_id
from section
where semester = 'Fall' and year = 2009
  and course_id in (
    select course_id
    from section
    where semester = 'Spring' and year = 2010
  );` },
      { type: 'text', text: `The inner query creates Spring 2010 course IDs. The outer query considers Fall 2009 sections and keeps a course ID only when it belongs to that inner set. The result is courses offered in both terms.` },
      { type: 'code', code: `select distinct course_id
from section
where semester = 'Fall' and year = 2009
  and course_id not in (
    select course_id
    from section
    where semester = 'Spring' and year = 2010
  );` },
      { type: 'text', text: `This reverses the membership test, producing Fall 2009 courses that were not offered in Spring 2010.` },
      { type: 'code', code: `select count(distinct ID)
from takes
where (course_id, sec_id, semester, year) in (
  select course_id, sec_id, semester, year
  from teaches
  where teaches.ID = '10101'
);` },
      { type: 'text', text: `The inner query lists the exact course-section, term, and year combinations taught by instructor 10101. The outer query counts distinct students whose takes rows match one of those four-part tuples. This intentionally elaborate form demonstrates tuple membership.` },
      { type: 'code', code: `select name
from instructor
where salary > some (
  select salary
  from instructor
  where dept_name = 'Biology'
);` },
      { type: 'text', text: `SOME means at least one. This returns an instructor name if that salary is greater than one or more Biology salaries. It is equivalent to the earlier self-join that compares T.salary with S.salary while S is in Biology.` },
      { type: 'code', code: `select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary
  and S.dept_name = 'Biology';` },
      { type: 'text', text: `This is the self-join formulation of the previous SOME query. Each displayed T must outrank at least one Biology row S, and DISTINCT removes repeats caused by matching several S rows.` },
      { type: 'code', code: `F <comparison> some r` },
      { type: 'text', text: `This predicate is true exactly when there exists a tuple t in r for which F <comparison> t holds. The comparison may be <, <=, >, =, or <>. The figure's one-column examples say: 5 < SOME {0, 5, 6} is true because 5 is less than 6; 5 < SOME {0, 5} is false; 5 = SOME {0, 5} is true; and 5 <> SOME {0, 5} is true because 5 differs from 0. = SOME is equivalent to IN, but <> SOME is not equivalent to NOT IN.` },
      { type: 'code', code: `select name
from instructor
where salary > all (
  select salary
  from instructor
  where dept_name = 'Biology'
);` },
      { type: 'text', text: `ALL requires the comparison to hold for every value returned by the subquery. This finds instructors paid more than every Biology instructor.` },
      { type: 'code', code: `F <comparison> all r` },
      { type: 'text', text: `This is true exactly when F compares successfully with every tuple in r. The figure shows: 5 < ALL {0, 5, 6} is false; 5 < ALL {6} is true; 5 = ALL {4, 5} is false; and 5 <> ALL {4, 6} is true. <> ALL is equivalent to NOT IN, but = ALL is not equivalent to IN.` },
      { type: 'text', text: `EXISTS is true when its subquery is nonempty, while NOT EXISTS is true when it is empty.` },
      { type: 'code', code: `select course_id
from section as S
where semester = 'Fall' and year = 2009
  and exists (
    select *
    from section as T
    where semester = 'Spring' and year = 2010
      and S.course_id = T.course_id
  );` },
      { type: 'text', text: `For each Fall 2009 section S, the inner query looks for a Spring 2010 section T with the same course ID. EXISTS keeps S only when such a row exists, again finding courses offered in both terms. S is a correlation name from the outer query, and the inner query is correlated because it refers to S.` },
      { type: 'code', code: `select distinct S.ID, S.name
from student as S
where not exists (
  (select course_id
   from course
   where dept_name = 'Biology')
  except
  (select T.course_id
   from takes as T
   where S.ID = T.ID)
);` },
      { type: 'text', text: `For one student S, the first subquery lists all Biology courses and the second lists courses that student has taken. EXCEPT finds required Biology courses missing from the student's record. NOT EXISTS requires that difference to be empty, which means every Biology course was taken. This follows the set fact that X minus Y is empty exactly when X is a subset of Y; an = ALL formulation cannot express this task.` },
      { type: 'code', code: `select T.course_id
from course as T
where unique (
  select R.course_id
  from section as R
  where T.course_id = R.course_id
    and R.year = 2009
);` },
      { type: 'text', text: `UNIQUE tests whether a subquery result has no duplicate tuples. Here it returns courses whose matching 2009 section query has no repeated course ID, meaning the course was offered at most once in 2009.` },
      { type: 'heading', text: `Subqueries as relations and values` },
      { type: 'code', code: `select dept_name, avg_salary
from (
  select dept_name, avg(salary) as avg_salary
  from instructor
  group by dept_name
)
where avg_salary > 42000;` },
      { type: 'text', text: `A subquery may appear in FROM as a temporary derived relation. The inner query makes department average-salary rows; the outer query filters those rows over 42,000. Since the average is already computed in the inner relation, no HAVING clause is needed outside.` },
      { type: 'code', code: `select dept_name, avg_salary
from (
  select dept_name, avg(salary)
  from instructor
  group by dept_name
) as dept_avg(dept_name, avg_salary)
where avg_salary > 42000;` },
      { type: 'text', text: `This equivalent version gives the derived relation a name and explicitly names its two output columns, then applies the same threshold.` },
      { type: 'code', code: `with max_budget(value) as (
  select max(budget)
  from department
)
select department.name
from department, max_budget
where department.budget = max_budget.value;` },
      { type: 'text', text: `WITH defines a temporary relation available only to this one query. max_budget contains the single greatest department budget; joining it to department and comparing values returns every department tied for that maximum.` },
      { type: 'code', code: `with dept_total(dept_name, value) as (
  select dept_name, sum(salary)
  from instructor
  group by dept_name
),
dept_total_avg(value) as (
  select avg(value)
  from dept_total
)
select dept_name
from dept_total, dept_total_avg
where dept_total.value > dept_total_avg.value;` },
      { type: 'text', text: `The first temporary relation totals salaries per department. The second averages those departmental totals. The final query names departments whose own total exceeds that average total.` },
      { type: 'code', code: `select dept_name,
  (select count(*)
   from instructor
   where department.dept_name = instructor.dept_name)
  as num_instructors
from department;` },
      { type: 'text', text: `A scalar subquery is used where one value is expected. For each department row, this correlated subquery counts its instructors and supplies num_instructors. A scalar subquery that returns more than one row causes a runtime error.` },
      { type: 'heading', text: `Modifying the database` },
      { type: 'text', text: `The three basic modification categories are deleting rows, inserting rows, and updating selected values.` },
      { type: 'code', code: `delete from instructor;` },
      { type: 'text', text: `This removes every instructor row.` },
      { type: 'code', code: `delete from instructor
where dept_name = 'Finance';` },
      { type: 'text', text: `This deletes only instructors assigned to Finance.` },
      { type: 'code', code: `delete from instructor
where dept_name in (
  select dept_name
  from department
  where building = 'Watson'
);` },
      { type: 'text', text: `The inner query finds departments in the Watson building. The outer DELETE removes instructor rows associated with any of those department names.` },
      { type: 'code', code: `delete from instructor
where salary < (
  select avg(salary)
  from instructor
);` },
      { type: 'text', text: `This removes instructors earning below the original overall average. SQL first evaluates the average and identifies rows to delete, then deletes those rows without repeatedly recomputing the average as the table shrinks.` },
      { type: 'code', code: `insert into course
values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);` },
      { type: 'text', text: `This adds one course row using the declared column order.` },
      { type: 'code', code: `insert into course(course_id, title, dept_name, credits)
values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);` },
      { type: 'text', text: `This equivalent insertion names the receiving columns explicitly, which makes the correspondence clear.` },
      { type: 'code', code: `insert into student
values ('3003', 'Green', 'Finance', null);` },
      { type: 'text', text: `This adds a student whose total credits are presently unknown or absent, represented by NULL.` },
      { type: 'code', code: `insert into student
select ID, name, dept_name, 0
from instructor;` },
      { type: 'text', text: `INSERT can consume a query result. This inserts one student-format row for every instructor, copying ID, name, and department and assigning zero total credits. SQL fully evaluates the SELECT before inserting its rows, preventing a self-referential statement such as INSERT INTO table1 SELECT * FROM table1 from expanding while it reads.` },
      { type: 'code', code: `update instructor
set salary = salary * 1.03
where salary > 100000;

update instructor
set salary = salary * 1.05
where salary <= 100000;` },
      { type: 'text', text: `Together these aim to raise salaries over 100,000 by 3 percent and the others by 5 percent. Their order matters: if the 5-percent update ran first, a salary could cross the threshold and receive both changes.` },
      { type: 'code', code: `update instructor
set salary = case
  when salary <= 100000 then salary * 1.05
  else salary * 1.03
end;` },
      { type: 'text', text: `CASE expresses the same conditional raise safely in one update. Each original salary is tested once and receives exactly one branch.` },
      { type: 'code', code: `update student as S
set tot_cred = (
  select sum(credits)
  from takes, course
  where takes.course_id = course.course_id
    and S.ID = takes.ID
    and takes.grade <> 'F'
    and takes.grade is not null
);` },
      { type: 'text', text: `For each student S, this correlated scalar subquery joins completed takes rows to courses, ignores failed and unknown grades, sums the earned credits, and writes that total to tot_cred. A student with no qualifying courses receives NULL because SUM has no non-null input.` },
      { type: 'code', code: `case
  when sum(credits) is not null then sum(credits)
  else 0
end` },
      { type: 'text', text: `Use this expression in place of the bare SUM when students with no qualifying courses should receive 0 rather than NULL.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You can now combine result sets, reason carefully about NULL and unknown, summarize data by group, express nested membership and comparison questions, introduce temporary named results, and safely delete, insert, or update rows. Together with the earlier chapters, these are the core tools for reading and maintaining a relational database.` }
    ]
  }
];
