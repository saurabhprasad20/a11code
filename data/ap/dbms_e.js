export const dbmsChaptersE = [
  {
    id: 'indexing-basics-and-ordered-indices',
    title: 'Indexing Basics and Ordered Indices',
    blocks: [
      { type: 'text', text: `Welcome. A database can hold many records, so a full scan is often the wrong place to begin. An index is a smaller access structure that helps the system reach the wanted records quickly, much as a library catalogue guides you to a book rather than making you inspect every shelf.` },
      { type: 'heading', text: `The vocabulary of an index` },
      { type: 'text', text: `A search key is one attribute, or a group of attributes, used to look up records. It is not necessarily a primary key. An index file consists of index entries, and each entry pairs a search-key value with a pointer to a record, a data block, or a collection of record pointers.` },
      { type: 'code', code: `index entry
search-key value  |  pointer
------------------+---------------------------
value             |  record, block, or bucket` },
      { type: 'text', text: `The picture is a two-cell row: the search-key cell is on the left and its pointer cell is on the right. Because this file is normally much smaller than the data file, searching it first can avoid reading many data blocks.` },
      { type: 'heading', text: `Two broad families` },
      { type: 'list', items: [`Ordered indices keep search-key values in sorted order. They support equality lookups and naturally support ranges.`, `Hash indices use a hash function to spread search-key values across storage buckets. They are aimed chiefly at equality lookup.`] },
      { type: 'heading', text: `How to judge an index` },
      { type: 'text', text: `Ask what access patterns it handles efficiently: an exact attribute value, a range of values, or both. Then weigh lookup time, insertion time, deletion time, and the extra storage it consumes. There is no universally best index; the workload decides.` },
      { type: 'heading', text: `Ordered indices and file order` },
      { type: 'text', text: `In an ordered index, entries are arranged by search key. A primary, or clustering, index uses the same ordering attribute as the sequentially stored file. Its search key is often the primary key, but that is not required. A secondary, or non-clustering, index follows a different attribute order. An ordered sequential file together with its clustering index is called an index-sequential file.` },
      { type: 'heading', text: `Dense index: one entry per key value` },
      { type: 'text', text: `A dense index has an entry for every search-key value present in the file. In the instructor example ordered by ID, the index lists 10101, 12121, 15151, 22222, 32343, 33456, 45565, 58583, 76543, 76766, 83821, and 98345, each pointing directly to its matching instructor row.` },
      { type: 'code', code: `dense ID index                 instructor file
10101 -> record 10101           10101  Srinivasan  Comp. Sci.  65000
12121 -> record 12121           12121  Wu          Finance     90000
...                              ...
98345 -> record 98345           98345  Kim         Elec. Eng.  80000` },
      { type: 'text', text: `The diagram places the narrow index column on the left and the instructor rows on the right; an arrow from every ID entry reaches exactly its own row. A dense index can also use a nonunique ordered attribute. With the file ordered by department, entries Biology, Comp. Sci., Elec. Eng., Finance, History, Music, and Physics point to the first record for those department values in the ordered data.` },
      { type: 'heading', text: `Sparse index: selected guideposts` },
      { type: 'text', text: `A sparse index stores entries for only some search-key values, so it requires the data file itself to be ordered on that key. To find K, choose the greatest indexed key that is less than K, follow its pointer, and scan forward in the file until K is found or passed.` },
      { type: 'code', code: `sparse ID index
10101 -> first record of block 0
32343 -> first record of block 1
76766 -> first record of block 2` },
      { type: 'text', text: `The sparse-index picture shows three index entries at left. Their arrows lead to the first row of three successive sections of the ordered instructor file. A particularly useful compromise is one sparse entry per data block, storing that block's least search-key value.` },
      { type: 'heading', text: `Dense versus sparse` },
      { type: 'list', items: [`Sparse indices use less space and need fewer changes when records are inserted or deleted.`, `Dense indices usually find a record sooner because they point more precisely.`, `The common block-level sparse design balances those two costs.`] },
      { type: 'heading', text: `Secondary indices` },
      { type: 'text', text: `A file stored by instructor ID may still need questions such as “Which instructors are in this department?” or “Which have this salary, or a salary in this range?” A secondary index supplies that alternate access path. It must be dense, because the underlying records are not stored in its search-key order.` },
      { type: 'code', code: `secondary salary index
40000 -> [ pointer to Mozart ]
60000 -> [ pointer to El Said ]
...
80000 -> [ pointer to Singh, pointer to Kim ]
...
95000 -> [ pointer to Einstein ]` },
      { type: 'text', text: `In the salary diagram, a sorted index column sits at left. Every key points to a small bucket in the middle, and each bucket holds pointers into the ID-ordered instructor table at right. The 80000 bucket has two pointers because two instructors share that salary. This pointer-bucket design lets one secondary-key value identify every matching record.` },
      { type: 'heading', text: `Multilevel indexing` },
      { type: 'text', text: `If a primary index does not fit in memory, reading it from disk for every lookup is costly. Treat that on-disk primary index as another sorted file and build a sparse outer index on it. The original primary index becomes the inner index. More levels can be added until the top level is small enough to keep in memory.` },
      { type: 'code', code: `outer index
  -> inner-index block 0 -> data block 0
  -> inner-index block 1 -> data block 1
                         -> later data blocks` },
      { type: 'text', text: `The diagram has an outer index on the left. Its entries point to two depicted inner-index blocks in the centre; entries in those blocks then point to blue data blocks at right. The ellipses mean that more blocks exist at each level. Every insertion or deletion must preserve the relevant entries at all levels.` },
      { type: 'heading', text: `Updating a one-level index: deletion` },
      { type: 'text', text: `First remove the data record. In a dense index, remove the key entry in the corresponding way when no data record still has that search-key value. In a sparse index, if the departing row supplied an index entry, replace that entry with the next key in file order. If that next key already has its own index entry, remove the old entry instead.` },
      { type: 'text', text: `For example, the sparse-ID drawing has index values 10101, 32343, and 76766. If the only record at a given indexed value disappears, its guidepost changes to the next represented file key, unless that successor is already a guidepost. This keeps each sparse pointer aligned with a block boundary or starting record.` },
      { type: 'heading', text: `Updating a one-level index: insertion` },
      { type: 'text', text: `Look up the new record's search key first. In a dense index, add an entry when the value was absent. In a block-level sparse index, no index change is needed unless insertion creates a new data block; then insert the first key of that new block. The multilevel version is the same idea applied upward through the levels.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You can now describe an index entry, distinguish ordered from hash access, and choose between clustering and secondary indices. You have also seen why dense and sparse indices trade lookup speed for space and maintenance, how pointer buckets represent duplicate secondary values, and how multilevel indexing keeps an enormous index manageable.` }
    ]
  },
  {
    id: 'b-plus-tree-index-files',
    title: 'B+-Tree Index Files',
    blocks: [
      { type: 'text', text: `Now we improve on ordinary index-sequential files. As those files grow, overflow blocks accumulate and eventually force a disruptive whole-file reorganization. A B+-tree instead repairs itself with small local splits, redistributions, and merges. It does add update work and storage, but its steady performance makes it widely used.` },
      { type: 'heading', text: `Balance and capacity rules` },
      { type: 'text', text: `A B+-tree is rooted, and every route from root to leaf has the same length. For order n, every nonroot internal node has from ceil(n/2) through n children. Every nonroot leaf has from ceil((n-1)/2) through n-1 search-key values. A nonleaf root has at least two children; when the root is also the only leaf, it may hold zero through n-1 values.` },
      { type: 'heading', text: `The shape of a node` },
      { type: 'code', code: `P1 | K1 | P2 | ... | P(n-1) | K(n-1) | Pn

K values: ordered search keys
P values: child pointers in internal nodes;
          record or record-bucket pointers in leaves` },
      { type: 'text', text: `Read the node from left to right as alternating pointers and separator keys. Keys are strictly increasing when duplicates are absent; with duplicates they may be nondecreasing. A duplicate may cross a leaf boundary, so an internal separator can equal a key in the subtree to its left as well as keys to its right.` },
      { type: 'heading', text: `What leaf nodes contain` },
      { type: 'text', text: `For each leaf key Ki, pointer Pi reaches its matching file record or a bucket of matching records. Leaf nodes are ordered from left to right, and the final pointer Pn is a link to the next leaf. That chain is especially useful for range scans.` },
      { type: 'code', code: `[ Brandt | Califieri | Crick | next-leaf ]`
      },
      { type: 'text', text: `The leaf diagram shows three named keys in one horizontal node. Three downward arrows point to the corresponding instructor rows, while a rightward arrow from the final pointer leads to the next leaf. The linked leaves form one sorted sequence even though they are separate disk blocks.` },
      { type: 'heading', text: `What internal nodes mean` },
      { type: 'text', text: `Internal nodes are a multilevel sparse index over the leaves. In a node P1, K1, P2, ..., K(n-1), Pn, P1 leads to keys below K1. For middle pointer Pi, its keys are at least K(i-1) and below Ki. Pn leads to keys at least K(n-1).` },
      { type: 'heading', text: `Instructor-tree diagram` },
      { type: 'text', text: `For n = 6, the example root holds separators El Said and Mozart. It points to three leaves: [Brandt, Califieri, Crick, Einstein], [El Said, Gold, Katz, Kim], and [Mozart, Singh, Srinivasan, Wu]. Arrows connect the root to those leaves, and the leaves point rightward in key order. Leaves therefore hold 3 to 5 values, nonroot internal nodes 3 to 6 children, and the root at least 2 children.` },
      { type: 'heading', text: `Searching the tree` },
      { type: 'text', text: `Start at the root. At each internal node, find the first separator Ki with V less than or equal to Ki. If there is none, follow the rightmost pointer. Otherwise follow Pi when V is smaller than Ki, or P(i+1) when V equals Ki. At the leaf, find the first key equal to V and follow its record pointer; if none exists, the value is absent.` },
      { type: 'text', text: `The search figure illustrates the decisions with root separator Mozart; the left internal node has Califieri, Einstein, Gold and the right one has Srinivasan. Its leaves read [Adams, Brandt], [Califieri, Crick], [Einstein, El Said], [Gold, Katz, Kim], [Mozart, Singh], and [Srinivasan, Wu], joined left to right. You can trace a requested name by comparing at each separator until one leaf remains.` },
      { type: 'heading', text: `Insertion: first find the leaf` },
      { type: 'list', items: [`Find the leaf where the new search key belongs.`, `If that key already exists, add the record to the data file and, if needed, add its pointer to the key's bucket.`, `If the key is new, store its data record and insert the key-pointer pair in the leaf when room exists.`, `If the leaf is full, split it while including the new pair.`] },
      { type: 'heading', text: `Splitting a leaf` },
      { type: 'text', text: `Sort the n leaf entries after including the newcomer. Leave the first ceil(n/2) in the old leaf and move the rest to a new leaf p. Copy p's smallest key k, along with a pointer to p, into the parent. If that parent is full, split it too; this can continue up to a root split, which increases tree height by one.` },
      { type: 'code', code: `before inserting Adams
[ Brandt | Califieri | Crick ]

after leaf split
[ Adams | Brandt ] -> [ Califieri | Crick ]
                         ^
                copy Califieri upward with pointer to new leaf` },
      { type: 'text', text: `This worked picture begins with the full leaf [Brandt, Califieri, Crick]. Adams belongs before Brandt. The split makes [Adams, Brandt] on the left and [Califieri, Crick] on the right; the leaf link is redirected to the new right leaf. The parent gains separator Califieri and a pointer to that right leaf.` },
      { type: 'heading', text: `Worked insertion: Adams` },
      { type: 'text', text: `In the order-4 tree, a leaf may hold two or three values. Before the insertion, the root holds Mozart; its left internal child has Einstein and Gold, and the right child has Srinivasan. The leftmost leaf [Brandt, Califieri, Crick] is full. After inserting Adams, it becomes [Adams, Brandt] followed by [Califieri, Crick], and the left internal node becomes [Califieri, Einstein, Gold]. All leaves still remain at the same depth.` },
      { type: 'heading', text: `Worked insertion: Lamport` },
      { type: 'text', text: `Next, Lamport goes into the full [Gold, Katz, Kim] leaf. It splits into [Gold, Katz] and [Kim, Lamport], so Kim must enter the parent. The old left internal node is already full, so it splits: [Califieri, Einstein] remains left and [Kim] becomes a new middle internal node. The root changes from [Mozart] to [Gold, Mozart], with three children. This is the same upward-propagation rule in action.` },
      { type: 'heading', text: `Deletion: remove, then repair` },
      { type: 'text', text: `Locate and delete the data record and remove its pointer from any bucket. Remove the leaf's key-pointer pair only when no bucket remains or the bucket has become empty. If the leaf falls below its minimum occupancy, inspect a sibling.` },
      { type: 'text', text: `When the underfull node and a sibling fit into one node, merge them into the left node, delete the other node, and remove the matching separator-pointer pair from the parent. That parent deletion can itself trigger the same process farther up.` },
      { type: 'text', text: `When the two siblings cannot fit together, borrow or redistribute enough pointers and keys that both satisfy the minimum. Then correct the parent separator that describes their boundary. If deletion leaves the root with one child, discard the root and make its only child the new root.` },
      { type: 'heading', text: `Worked deletion: merging after Srinivasan` },
      { type: 'text', text: `In the order-4 example, deleting Srinivasan leaves the rightmost leaf [Wu], below its two-key minimum. It merges with its left sibling [Mozart, Singh], creating [Mozart, Singh, Wu]. The right internal node loses a child and its separator changes accordingly. The figure keeps the other leaves [Adams, Brandt], [Califieri, Crick], [Einstein, El Said], and [Gold, Katz, Kim] unchanged.` },
      { type: 'heading', text: `Worked deletion: borrowing after Singh and Wu` },
      { type: 'text', text: `Starting with a right-side leaf [Mozart, Singh, Wu], delete Singh and Wu. The remaining [Mozart] leaf is underfull, but its left sibling [Gold, Katz, Kim] has a spare key. Borrow Kim, producing [Gold, Katz] and [Kim, Mozart]. The parent separator must change from Mozart to Kim, because Kim is now the first key of the right child.` },
      { type: 'heading', text: `Worked deletion: cascading merge after Gold` },
      { type: 'text', text: `After deleting Gold from [Gold, Katz], that leaf has only Katz and must merge with [Kim, Mozart], yielding [Katz, Kim, Mozart]. The internal node above becomes underfull and merges with its sibling; the parent separator is pulled down during that merge. Finally the root has just one child, so the root is removed and the merged internal node becomes the new root, with separators Califieri, Einstein, and Gold above four leaves.` },
      { type: 'heading', text: `B-tree note` },
      { type: 'text', text: `A B-tree is related but stores each search key only once. A key in an internal node is not repeated in a leaf, and that internal key needs an additional pointer to its record or bucket. The diagram contrasts a B-tree whose upper node contains Einstein, Katz, and Singh with a B+-tree whose internal separators are duplicated in its leaves.` },
      { type: 'list', items: [`A B-tree can sometimes find a key before reaching a leaf and may use fewer nodes.`, `Only a small fraction of lookups end early; larger internal entries lower fanout, so an equivalent B-tree is often deeper.`, `Its insertions and deletions are more intricate, which is why B+-trees are generally easier to implement.`] },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `A B+-tree keeps every leaf at one depth, uses internal nodes to direct a search, and links its leaves for ordered traversal. You have followed the full local-repair story: split a full leaf and propagate a separator upward; after deletion, merge when possible or borrow when necessary; then repair parents and, if needed, shorten the root.` }
    ]
  },
  {
    id: 'hashing-bitmaps-and-multiple-key-access',
    title: 'Hashing, Bitmap Indices, and Multiple-Key Access',
    blocks: [
      { type: 'text', text: `A bucket is a storage unit, usually one disk block, holding one or more records. A hash function h maps every search-key value in set K to an address in bucket set B. For lookup, insertion, and deletion, compute h(key) and search the resulting bucket. Different keys can share that bucket, so records inside it are checked sequentially.` },
      { type: 'text', text: `The instructor example uses department name as the key and ten buckets. It assigns a character its numeric binary code, sums the codes in the department name, and takes the result modulo 10. Thus Music reaches bucket 1, History bucket 2, and both Physics and Electrical Engineering bucket 3.` },
      { type: 'code', code: `bucket 1: Mozart, Music
bucket 2: El Said, History; Califieri, History
bucket 3: Einstein, Physics; Gold, Physics; Kim, Elec. Eng.
bucket 4: Wu, Finance; Singh, Finance
bucket 5: Crick, Biology
bucket 6: Srinivasan, Katz, Brandt (Comp. Sci.)
buckets 0 and 7: empty in the shown state` },
      { type: 'text', text: `The diagram lays out eight of the ten rectangular buckets in two columns. Each occupied rectangle holds instructor rows whose department hashes there; empty slots remain in the other rectangles. It makes collisions visible: distinct department names can land in one bucket.` },
      { type: 'text', text: `The worst function sends every key to one bucket, turning access into a scan proportional to the number of keys. An ideal function spreads key values evenly. Typical functions compute on the key's binary representation; for a string, one simple approach adds character encodings and reduces modulo the number of buckets.` },
      { type: 'text', text: `A bucket can overflow because there are too few buckets, because many records share one key, or because the function distributes keys unevenly. Overflow cannot be ruled out completely, so static hashing uses overflow buckets.` },
      { type: 'code', code: `bucket 1  -> overflow bucket 1a -> overflow bucket 1b` },
      { type: 'text', text: `The chaining diagram shows ordinary buckets 0 through 3 vertically. Bucket 1 has a rightward pointer to one extra bucket, which points to a second extra bucket. This closed-hashing chain preserves all colliding records but makes lookup slower as it grows. The open-hashing alternative avoids overflow buckets but is unsuitable for this database setting.` },
      { type: 'text', text: `Hashing can organize a file itself or form an index containing search keys and record pointers. Strictly, a separate hash index is secondary: if the file already uses the same hash organization and same key, another primary hash index would add no benefit. In ordinary discussion, “hash index” often refers to either arrangement.` },
      { type: 'text', text: `The hash-index figure uses instructor ID. Buckets 0 through 7 contain ID entries, each with an arrow to the ID-ordered instructor table. Bucket 5 overflows: its main bucket contains 15151 and 33456, and its linked overflow bucket holds 58583 and 98345. This is an index because buckets contain pointers rather than the complete records.` },
      { type: 'text', text: `Static hashing fixes the number B of bucket addresses. If B starts too small, growth creates many overflow chains. Reserving a large B for future growth wastes mostly empty space at first, and shrinking wastes space later. Rebuilding periodically with a new function is expensive and interrupts normal use, so dynamic bucket growth is preferable.` },
      { type: 'heading', text: `Extendable hashing: the directory idea` },
      { type: 'text', text: `Extendable hashing uses a hash result drawn from a large range, commonly a 32-bit value, but presently examines only its first i bits. Those i high-order bits index a bucket-address table of size 2^i. Initially i can be 0. Multiple directory entries may point to one physical bucket, so the number of buckets can be less than 2^i.` },
      { type: 'code', code: `hash value: 00110101
use first i bits as directory address

directory prefixes -> bucket pointers
00... -> bucket 1
01... -> bucket 1
10... -> bucket 2
11... -> bucket 3` },
      { type: 'text', text: `The general diagram shows the directory at left, labelled by prefixes such as 00, 01, 10, and 11, with arrows to buckets on the right. The 00 and 01 entries share bucket 1, so that bucket has local depth i1 = i - 1; the other pictured buckets have local depths i2 = i3 = i. A local depth says how many leading hash bits distinguish that bucket.` },
      { type: 'text', text: `For key Kj, compute X = h(Kj), use X's first i bits as a directory position, and follow the indicated bucket pointer. A bucket accepts the record if it has room. Otherwise it must split and insertion is tried again; an implementation may use an overflow bucket in exceptional cases.` },
      { type: 'text', text: `Use four-bit hash values and capacity two records per bucket. With global depth i = 1, the directory has two entries. One points to a local-depth-1 bucket containing 0001. The other points to a local-depth-1 bucket containing 1001 and 1100. Inserting 1010 targets that second, full bucket.` },
      { type: 'text', text: `Because the full bucket's local depth equals i, first double the directory and raise i from 1 to 2. The addresses are now 00, 01, 10, and 11, initially with duplicated pointers. Split the old 1-prefixed bucket into two local-depth-2 buckets: 1001 and 1010 occupy the 10 bucket, while 1100 occupies the 11 bucket. The 00 and 01 entries still share the 0001 bucket with local depth 1.` },
      { type: 'code', code: `after inserting 1010
00, 01 -> local depth 1: [0001]
10     -> local depth 2: [1001, 1010]
11     -> local depth 2: [1100]` },
      { type: 'text', text: `Now insert 0111 and 0000. Prefix 0 still points through the shared local-depth-1 bucket, which splits without increasing global depth: 00 points to [0000, 0001] and 01 points to [0111]. The final shown insertion of 1001 targets the already full 10 bucket. Its local depth equals global depth 2, so the directory doubles to global depth 3 and that bucket splits: 100 points to [1001], while 101 points to [1010]. The other directory prefixes duplicate their existing bucket pointers.` },
      { type: 'text', text: `Let bucket j have local depth ij. If global depth i is greater than ij, more than one directory entry names j. Allocate a bucket z, increase both local depths to ij + 1, redirect the second half of j's directory entries to z, reinsert j's old records across j and z, then retry the incoming record.` },
      { type: 'text', text: `If i equals ij, only one directory entry names the full bucket. Unless a configured bit limit or too many repeated splits calls for an overflow bucket, increment i, double the directory, replace each old directory entry with two entries pointing to the same bucket, and then apply the first case.` },
      { type: 'text', text: `To delete, find the bucket and remove the key. An empty bucket may be removed with directory updates. A bucket can coalesce only with its buddy: a bucket having the same local depth and the same prefix except for the last of those local-depth bits. Shrinking the directory is possible but costly, so it is sensible only when the bucket count is far below directory size.` },
      { type: 'list', items: [`Extendable hashing holds performance as a file grows and has little unused bucket space.`, `It adds a directory indirection, and a very large directory may exceed memory or require awkward contiguous disk space; a B+-tree can help locate directory entries.`, `Changing directory size is costly. Linear hashing is an alternative that grows the directory incrementally but accepts more overflow buckets.`] },
      { type: 'text', text: `Choose a B+-tree when ordered traversal, ranges, or a mixed workload matter. Choose hashing for direct equality selection when range order is irrelevant. Both need space and update work; dynamic hashing avoids static overflow decay, while B+-trees preserve sorted access as they adjust.` },
      { type: 'heading', text: `Multiple-key access with separate indices` },
      { type: 'code', code: `select ID
from instructor
where dept_name = 'Finance' and salary = 80000;` },
      { type: 'text', text: `With single-attribute indices, the system may use the department index and test salary afterward, use the salary index and test department afterward, or collect record pointers from both indices and intersect the pointer sets. The third route avoids fetching every record that satisfies just one condition when both pointer sets are selective.` },
      { type: 'text', text: `An index on more than one attribute uses a composite search key such as (dept_name, salary). It is sorted lexicographically: (a1, a2) comes before (b1, b2) if a1 is smaller, or if first values tie and a2 is smaller.` },
      { type: 'text', text: `An index on (dept_name, salary) can directly fetch records for department Finance and salary 80000, and can efficiently handle Finance with salary below 80000. It cannot efficiently combine a range on the leading attribute with an equality on the second attribute, such as dept_name below Finance and balance equal to 80000, because many entries match the leading range but not the later condition.` },
      { type: 'text', text: `A covering index stores extra attributes so a query can be answered from the index without fetching base records. This is particularly valuable for secondary indices, whose record pointers might otherwise cause many scattered data reads. The extra attributes belong only in leaves, not in the internal routing nodes.` },
      { type: 'heading', text: `Bitmap indices: a value-list of bits` },
      { type: 'text', text: `A bitmap index is designed to combine conditions over several attributes. Number relation records consecutively, preferably so record n is easy to retrieve. For each distinct attribute value, keep one bitmap with one bit per record: bit i is 1 exactly when record i has that value, otherwise 0. It suits low-cardinality attributes such as gender, state, country, or a small number of income bands.` },
      { type: 'code', code: `record number:  0 1 2 3 4
gender m:       1 0 0 1 0
gender f:       0 1 1 0 1
income L1:      1 0 1 0 0
income L2:      0 1 0 0 0
income L3:      0 0 0 0 1
income L4:      0 0 0 1 0
income L5:      0 0 0 0 0` },
      { type: 'text', text: `The bitmap figure's five rows are ID 76766 with m and L1, 22222 with f and L2, 12121 with f and L1, 15151 with m and L4, and 58583 with f and L3. The bit vectors at right encode the same positions. This is called a value-list index: at each record position, exactly one bitmap for a single-valued attribute has a 1.` },
      { type: 'text', text: `For equal-length vectors, AND computes an intersection, OR a union, and NOT a complement, bit by matching bit. For example, 100110 AND 110011 gives 100010; their OR gives 110111; and NOT 100110 gives 011001. In the pictured instructor subset, male AND income level L1 is 10010 AND 10100, producing 10000, so only record 0 qualifies.` },
      { type: 'text', text: `This is most useful for several conditions, not usually one isolated condition. Native word operations process 32 or 64 bits at once, and a COUNT query can count result bits without fetching records. With 100-byte records and eight distinct values, the basic bitmaps take about one percent of the relation size.` },
      { type: 'text', text: `Bitmap indices traditionally shine where many rows repeat a small set of values, such as one gender value for each city resident. They can also be useful for rarely updated, high-cardinality data. They include rows with NULL values, which can help statements such as COUNT. AND, OR, NOT, and XOR are available bitwise operations.` },
      { type: 'text', text: `Runs of equal bits can be compressed, for example representing seven consecutive zeroes with a run description. Compression saves storage, but a simple implementation may need to decompress before a bitwise operation, potentially erasing the speed gain. Low-cardinality, mostly static warehouse columns are therefore especially good candidates.` },
      { type: 'text', text: `An insertion appends positions to bitmap entries, which is relatively straightforward. A deletion is harder because positions must remain meaningful. One technique keeps an existence bitmap, marking a deleted record's position 0; each query ANDs its result with that bitmap as the final step.` },
      { type: 'text', text: `A B+-tree leaf that would otherwise store one record-list pointer per frequent value can instead store one bit per record, saving space. More importantly, simple bitmap indices cooperate: an index on a and one on b answer a = v AND b = w by ANDing their vectors. Separate B-trees do not cooperate this directly; a composite B-tree would be needed, and covering all permutations across n attributes can require n! composite trees.` },
      { type: 'text', text: `A bitmap result remains a bitmap whose bit positions retain tuple addresses in ordinal order. It can therefore feed later grouping or aggregation and can be converted readily to physical page locations. A conventional value-list pointer result is commonly useful only for its immediate selection.` },
      { type: 'code', code: `create index index_name on relation_name(attribute_list);
create index b_index on branch(branch_name);

create unique index index_name on relation_name(attribute_list);
drop index index_name;

create bitmap index person_region on person(region);` },
      { type: 'text', text: `The first form creates an index; the second line is an example. A unique index can enforce that its search key is a candidate key, although a SQL UNIQUE constraint may already provide that guarantee. Systems commonly also offer choices for index type and clustering. The final statement shows a database-specific bitmap-index form for a low-cardinality region column.` },
      { type: 'text', text: `You have traced static buckets and overflow chains, then watched an extendable-hash directory split as its prefix depth grows. You can now compare hashing with ordered indexing, combine single or composite access paths, and use bitmap vectors, existence bits, and Boolean operations to answer multi-condition questions efficiently.` }
    ]
  }
];
