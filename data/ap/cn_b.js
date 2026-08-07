export const cnChaptersB = [
{
 id: 'principles-of-network-applications', title: 'Principles of Network Applications', blocks: [
 { type: 'text', text: `The application layer is where people use networked programs. We will connect its design choices to the protocols you will meet next.` },
 { type: 'heading', text: `Applications at the edge` },
 { type: 'text', text: `Web, social networking, text messaging, email, multiplayer games, stored-video streaming, P2P sharing, Internet telephony, video meetings, search, and remote login are network applications.` },
 { type: 'text', text: `An application is software on end systems that exchanges messages with a counterpart. A browser can speak to web-server software. Core devices forward traffic but do not run users' applications, allowing rapid application deployment at the network edge.` },
 { type: 'text', text: `Picture home, mobile, enterprise, content-provider, data-center, regional, and global networks connected together. Applications run at the outer endpoints of this picture, using the intervening networks as their path.` },
 { type: 'heading', text: `Client-server architecture` },
 { type: 'text', text: `A client-server application has an always-on server with a stable IP address, often replicated in data centers for scale. Clients contact it, may connect intermittently, and may have changing addresses. Clients do not usually contact one another directly. HTTP, IMAP, and FTP follow this pattern.` },
 { type: 'text', text: `The client-server figure has one server-side machine in the middle of a network and multiple client devices around it. Every shown communication path joins a client to the server; none joins client to client.` },
 { type: 'heading', text: `Peer-to-peer architecture` },
 { type: 'text', text: `P2P has no indispensable always-on server. End systems communicate directly, requesting service from peers and providing service in return. An arriving peer brings both demand and upload capacity, a useful self-scalability property.` },
 { type: 'text', text: `The P2P figure has many equal peer devices exchanging directly rather than one center. Management is harder because peers disconnect and change addresses. File sharing is a standard use.` },
 { type: 'text', text: `For a file of size F sent to N peers, client-server distribution takes more than max(NF/us, F/dmin). P2P takes more than max(F/us, F/dmin, NF/(us + sum(ui))). Peer upload capacity is why P2P can scale better.` },
 { type: 'text', text: `BitTorrent divides a file into 256 Kbit chunks. A tracker introduces peers in a torrent. A joining peer gathers chunks, uploads while downloading, asks neighbors what they hold, requests rarest chunks first, and favors its four fastest contributors while periodically optimistically unchoking another candidate.` },
 { type: 'heading', text: `Processes and sockets` },
 { type: 'text', text: `A process is a running program. Same-host processes use operating-system interprocess communication; processes on separate hosts exchange network messages. The initiator is the client process and the contacted process is the server process. P2P programs can play both roles.` },
 { type: 'text', text: `A socket is the application's doorway to transport. Application code puts a message through one doorway; the operating system and network deliver it to the receiving process's doorway. The layered figure places developer control above the socket and operating-system control below it.` },
 { type: 'heading', text: `Process addressing` },
 { type: 'text', text: `An IP address identifies a host, not one process among many. A process destination is IP address plus port number. HTTP servers conventionally use port 80 and mail servers port 25. These fields let transport demultiplex data to the intended socket.` },
 { type: 'heading', text: `Application-layer protocols` },
 { type: 'list', items: [`They name message types, such as request and response.`, `They define syntax: fields and field boundaries.`, `They define semantics: the meaning of fields.`, `They specify when messages are sent and how a recipient responds.`] },
 { type: 'text', text: `Open protocols are publicly specified, usually through RFCs, allowing independent implementations to interoperate; HTTP and SMTP are examples. Proprietary protocols do not offer that shared public specification.` },
 { type: 'heading', text: `Transport requirements` },
 { type: 'text', text: `Ask what the application needs: complete delivery, bounded delay, minimum throughput, and security. File transfer, email, and web transactions need no loss. Audio and video can accept some loss. Telephony and games need delay in tens of milliseconds; streaming can tolerate seconds.` },
 { type: 'text', text: `Audio commonly needs 5 Kbps to 1 Mbps; video may need 10 Kbps to 5 Mbps. Those are throughput-sensitive. File transfer, email, web documents, and text messaging are usually elastic: they adapt to available rate.` },
 { type: 'heading', text: `TCP, UDP, and TLS` },
 { type: 'text', text: `TCP first sets up a connection, then provides reliable transfer, flow control, and congestion control. It does not guarantee timing, minimum rate, or security. FTP, SMTP, and HTTP commonly use it.` },
 { type: 'text', text: `UDP sends unreliable datagrams without setup and supplies none of TCP's reliability, flow, or congestion control promises. Its small overhead and application control suit some telephony and games. Streaming may use TCP, while telephony can use TCP or UDP.` },
 { type: 'text', text: `Plain TCP and UDP do not encrypt. TLS, usually used by an application library above TCP, adds encryption, integrity, and endpoint authentication: clear text placed in a TLS socket crosses the network encrypted.` },
 { type: 'heading', text: `Chapter recap` },
 { type: 'text', text: `Applications run at endpoints, choose client-server or P2P organization, identify processes with IP address plus port, define message rules, and select TCP, UDP, and TLS according to their requirements.` }
 ]
},
{
 id: 'the-web-and-http', title: 'The Web and HTTP', blocks: [
 { type: 'text', text: `HTTP is the Web's application protocol. Let us trace a page load, then inspect its messages and its mechanisms for state and freshness.` },
 { type: 'heading', text: `Web objects and roles` },
 { type: 'text', text: `A web page consists of objects, which can live on different servers. Its base HTML object references further objects such as images, audio, or applets; each has a URL.` },
 { type: 'text', text: `The browser is the HTTP client: it requests, receives, and presents objects. The web server returns requested objects. The overview figure shows desktop and phone browsers connected to a server; device type does not alter the client role.` },
 { type: 'text', text: `HTTP uses TCP. The client creates a TCP connection to server port 80, the server accepts it, HTTP messages are exchanged, and the connection eventually closes. HTTP is stateless: a server does not retain earlier request history, avoiding difficult recovery of inconsistent remembered state after failure.` },
 { type: 'heading', text: `Connection choices` },
 { type: 'text', text: `Non-persistent HTTP opens a TCP connection, transfers at most one object, and closes it. A base page containing ten image references therefore needs separate object connections. Persistent HTTP keeps one TCP connection open so it can carry several objects between the same endpoints.` },
 { type: 'text', text: `The non-persistent timeline begins with browser connection setup and server acceptance. The browser requests the base HTML object, the server returns it and closes. The browser parses the returned HTML, finds ten image URLs, and repeats that sequence for each image.` },
 { type: 'heading', text: `RTT analysis` },
 { type: 'text', text: `RTT is the time for a small packet to reach the server and a reply to return. Per non-persistent object, one RTT establishes TCP and one RTT carries the request and brings back the first response bytes. Add the file transmission interval: response time is about 2 RTT + file transmission time.` },
 { type: 'text', text: `The timing figure labels a small setup packet, a small request, and a large file. Each round trip includes transmission, propagation, and processing in both directions; the last interval is the remaining file delivery time.` },
 { type: 'text', text: `Persistent HTTP/1.1 removes repeated setup and operating-system overhead. The client can request referenced objects as it discovers them. In favorable cases all references need only one RTT, rather than two RTTs per object; browsers can also use multiple parallel connections.` },
 { type: 'heading', text: `Request messages` },
 { type: 'text', text: `A traditional HTTP request is ASCII text. Its request line contains method, URL, and version, separated by spaces and ended by CRLF. Header lines follow; a blank line ends the headers; an optional entity body follows.` },
 { type: 'code', code: `GET /lesson.html HTTP/1.1\r\n
Host: example.edu\r\n
User-Agent: browser\r\n
\r\n` },
 { type: 'text', text: `GET retrieves an object. POST puts form input in the entity body. GET can put input after a question mark in the URL. HEAD asks only for headers that GET would return. PUT uploads content and replaces the named object with its entity body.` },
 { type: 'heading', text: `Response messages` },
 { type: 'text', text: `A response starts with version, status code, and phrase; headers follow; a blank line separates them from optional data. Headers can provide date, server, last-modified date, ETag, byte-range support, content length, connection information, and content type.` },
 { type: 'code', code: `HTTP/1.1 200 OK\r\n
Content-Type: text/html\r\n
Content-Length: 2652\r\n
\r\n
<html>requested object</html>` },
 { type: 'list', items: [`200 OK: success; the object follows.`, `301 Moved Permanently: use the Location header's new address.`, `400 Bad Request: the server could not understand the request.`, `404 Not Found: this server lacks the requested object.`, `505 HTTP Version Not Supported: the version cannot be served.`] },
 { type: 'heading', text: `Cookies` },
 { type: 'text', text: `A stateless exchange has no built-in multi-step transaction memory. If a client changes X once and fails before a second change, a stateful design must define what happens. Cookies let sites carry selected continuity across independent HTTP exchanges.` },
 { type: 'text', text: `Cookies combine four pieces: a response cookie header, a later request cookie header, a browser-managed local cookie store, and a site database. On a first visit, a site creates an identifier and database entry; later requests return that identifier.` },
 { type: 'text', text: `The cookie diagram follows a browser returning one week later. Its saved identifier travels to the server, which looks it up in its back-end database. This can support authorization, carts, recommendations, and webmail sessions, but persistent third-party identifiers can also track behavior across sites.` },
 { type: 'heading', text: `Conditional GET` },
 { type: 'text', text: `A cache can avoid retransmitting an unchanged object by sending If-Modified-Since with its copy's date. If the origin has not changed it, the reply is 304 Not Modified and no object crosses the link. If it changed, the reply is 200 OK with new data.` },
 { type: 'text', text: `The conditional diagram splits after the same request: one branch ends in the compact 304 response for an unchanged object; the other returns a 200 response and the new object. This lowers delay and link use.` },
 { type: 'heading', text: `Chapter recap` },
 { type: 'text', text: `HTTP is a stateless client-server protocol over TCP. Know object composition, connection reuse and RTT cost, request and response structure, status codes, cookie-based continuity, and conditional freshness checking.` }
 ]
},
{
 id: 'dns-internets-directory-service', title: `DNS: The Internet's Directory Service`, blocks: [
 { type: 'text', text: `DNS is the distributed directory that translates the names people use into the IP addresses packet delivery needs.` },
 { type: 'heading', text: `DNS purpose and services` },
 { type: 'text', text: `Hosts and routers use IP addresses for datagrams, while people prefer names. DNS is a distributed database plus an application-layer protocol through which hosts and name servers perform name and address translation.` },
 { type: 'text', text: `DNS also supports host aliases and canonical names, mail-server aliases, and load distribution: one replicated service name can map to multiple IP addresses.` },
 { type: 'heading', text: `Why not one directory?` },
 { type: 'text', text: `A centralized DNS service would have one failure point, too much traffic, long distances for many users, and difficult maintenance. The Internet-scale query load requires distribution.` },
 { type: 'heading', text: `Hierarchical database` },
 { type: 'text', text: `The hierarchy has root servers at the top, TLD servers below for domains such as .com, .org, .net, .edu, and country suffixes, and authoritative servers below them for individual domains.` },
 { type: 'text', text: `To resolve www.example.com in the simplified tree, ask a root for a .com server, ask that TLD server for example.com's authoritative server, then ask that authoritative server for www's address. The figure is a descending root-to-TLD-to-authoritative tree.` },
 { type: 'text', text: `Root servers are the last-resort referral source and are replicated worldwide. The map uses increasingly dark shading for countries with more root-server instances. DNSSEC adds authentication and message integrity to DNS data.` },
 { type: 'text', text: `TLD servers direct a suffix's queries toward authoritative servers. An authoritative server supplies definitive mappings for its organization's named hosts and can be operated by that organization or a provider.` },
 { type: 'heading', text: `Local DNS server` },
 { type: 'text', text: `A local or default DNS server is supplied by an ISP, company, or campus. It is not formally a hierarchy level. A host asks it first; it acts as a proxy and has a cache of recently learned mappings, which may be stale.` },
 { type: 'heading', text: `Iterative lookup` },
 { type: 'text', text: `In an iterative lookup, a contacted server returns a referral: it says which server to contact next. The query diagram shows host to local resolver, then resolver to root, TLD, and authoritative server; the final answer returns to the host through the resolver.` },
 { type: 'heading', text: `Recursive lookup` },
 { type: 'text', text: `In a recursive lookup, the contacted name server continues the lookup on the requester's behalf and returns the final answer. The same diagram's arrows chain the work forward and return the answer backward. This can burden upper-level servers.` },
 { type: 'heading', text: `Caching` },
 { type: 'text', text: `Any name server can cache a learned mapping for its TTL, time to live. Caching TLD data locally means roots are seldom contacted. It speeds lookup and lowers load, but an address change can remain unknown until cached TTLs expire; update and notification mechanisms help.` },
 { type: 'heading', text: `Resource records` },
 { type: 'text', text: `DNS stores resource records as (name, value, type, TTL). A maps hostname to IP address; NS gives an authoritative name server for a domain; CNAME maps an alias to a canonical name; MX identifies a domain's mail server.` },
 { type: 'code', code: `(www.example.com, 203.0.113.20, A, 3600)
(example.com, ns1.example.net, NS, 3600)
(alias.example.com, www.example.com, CNAME, 3600)
(example.com, mail.example.com, MX, 3600)` },
 { type: 'text', text: `The records diagram shows a root table pointing suffixes to TLD addresses, a TLD table pointing domains to authoritative servers, and an authoritative table mapping hostnames to addresses. One table guides the resolver to the next.` },
 { type: 'heading', text: `DNS messages` },
 { type: 'text', text: `Queries and replies use the same structure. Their header includes a 16-bit identification number copied into the reply, plus flags for query or reply, recursion desired, recursion available, and authoritative answer.` },
 { type: 'code', code: `Header: ID | flags | counts
Question: name and type
Answer: requested resource records
Authority: authoritative-server records
Additional: related helpful records` },
 { type: 'text', text: `The question section identifies the requested name and type. Answer records resolve it; authority records name authoritative servers; additional records provide useful related information, such as an address for a named server.` },
 { type: 'heading', text: `Registering a domain` },
 { type: 'text', text: `A domain owner registers its name and authoritative-server names and addresses. The registrar publishes NS records and address records for those servers in the TLD. The owner's authoritative server then adds host A records and a domain MX record.` },
 { type: 'heading', text: `Security` },
 { type: 'text', text: `DNS risks include flooding root or TLD servers, man-in-the-middle redirection, cache poisoning with forged replies, and DDoS amplification using spoofed source addresses. Replication, filtering, caching, and DNSSEC help defend the service.` },
 { type: 'heading', text: `Chapter recap` },
 { type: 'text', text: `DNS uses hierarchy, local resolvers, caching, records, and structured messages to turn names into usable network destinations. You can now trace both referral and recursive resolution and explain how a new domain becomes visible.` }
 ]
},
{
 id: 'electronic-mail-ftp-and-web-caching', title: 'Electronic Mail, FTP, and Web Caching', blocks: [
 { type: 'text', text: `Email, FTP, and web caching show three distinct ways application protocols organize communication.` },
 { type: 'heading', text: `Email components` },
 { type: 'text', text: `Email has user agents, mail servers, and SMTP. A user agent, or mail reader, composes, edits, and reads. A mail server holds incoming messages in user mailboxes and places outgoing messages in a queue.` },
 { type: 'text', text: `The email-flow figure follows six steps: a sender composes in a user agent, submits to the sender's server, that server opens an SMTP connection to the receiver's server, transfers the message, the receiver's server stores it in a mailbox, and the recipient's user agent reads it.` },
 { type: 'heading', text: `SMTP` },
 { type: 'text', text: `SMTP uses reliable TCP, traditionally server port 25. The sending mail server is the SMTP client and the receiving mail server is the SMTP server. A transfer has greeting, message transfer, and closure; commands are ASCII text and replies have status codes and phrases.` },
 { type: 'code', code: `S: 220 mail.example.edu ready
C: HELO sender.example
S: 250 hello
C: MAIL FROM:<learner@sender.example>
C: RCPT TO:<reader@example.edu>
C: DATA
S: 354 end with a line containing only a period
C: Message text
C: .
S: 250 accepted
C: QUIT` },
 { type: 'text', text: `This exchange begins with the server greeting. The client identifies itself, gives envelope sender and recipient, enters data mode, sends message text followed by a period-only line, receives acceptance, then quits. Traditional SMTP data is 7-bit ASCII.` },
 { type: 'heading', text: `SMTP and HTTP` },
 { type: 'text', text: `SMTP uses persistent connections and marks message end with CRLF.CRLF. Like HTTP it has textual command-response exchanges and status codes. HTTP generally pulls a separately encapsulated object after a request; SMTP pushes mail and can carry several objects in a multipart message.` },
 { type: 'heading', text: `Mail format and retrieval` },
 { type: 'text', text: `The email message format is distinct from SMTP's envelope commands. Header lines such as To:, From:, and Subject: precede a blank line, then the body. MAIL FROM and RCPT TO control delivery; they are not these message headers.` },
 { type: 'code', code: `To: reader@example.edu
From: learner@sender.example
Subject: Study question

May we review the chapter tomorrow?` },
 { type: 'text', text: `SMTP delivers and stores a message on the receiving server. IMAP is a mail-access protocol: it retrieves, deletes, and organizes server-stored messages in folders. POP is another access protocol. Webmail commonly uses HTTP for its browser interface, SMTP to send, and IMAP or POP to retrieve.` },
 { type: 'heading', text: `FTP` },
 { type: 'text', text: `FTP uses TCP but separates a persistent control connection from data connections. The control channel carries commands and authentication. A distinct data TCP connection carries each file, while the control connection can continue across transfers.` },
 { type: 'text', text: `The FTP figure places client and server at opposite ends. One long arrow is labeled control TCP. Separate arrows below it represent new data TCP connections for file transfers. This is out-of-band control, unlike protocols that mix commands and object data in one connection.` },
 { type: 'heading', text: `Web caches and proxies` },
 { type: 'text', text: `A web cache is a proxy. A configured browser sends every HTTP request to it. On a hit it returns its stored object; on a miss it becomes a client to the origin server, retrieves and stores the object, then returns it to the browser.` },
 { type: 'text', text: `The proxy figure puts clients on the left, cache in the middle, and origin servers on the right. A hit turns back at the cache. A miss continues from cache to origin and returns by the reverse route. Thus a cache is server to the browser and client to the origin.` },
 { type: 'text', text: `Caches cut response time by being close to clients, reduce load on an institution's access link, and allow content delivery without every provider owning nearby infrastructure.` },
 { type: 'heading', text: `Delay and traffic example` },
 { type: 'text', text: `Consider a 1 Gbps institutional LAN, a 1.54 Mbps Internet access link, 100 Kbit objects, 15 requests per second, and a two-second Internet RTT. The browser data rate is 1.50 Mbps. LAN utilization is 0.0015 but access-link utilization is about 0.97, so heavy queueing can create minutes of access delay.` },
 { type: 'text', text: `The diagram makes the bottleneck explicit: many local browsers share a fast LAN, then converge on one much slower access link to remote origin servers. A faster link helps but costs more.` },
 { type: 'text', text: `With a cache hit rate of 0.4, only 60% of traffic crosses the access link: 0.6 × 1.50 Mbps = 0.9 Mbps, or about 0.58 utilization. Average delay becomes 0.6 × 2.01 seconds plus 0.4 times a few milliseconds, about 1.2 seconds; this cache can be cheaper than a 154 Mbps access link.` },
 { type: 'heading', text: `Conditional GET at a cache` },
 { type: 'text', text: `To validate rather than retransmit, a cache sends If-Modified-Since with its copy's date. An unchanged origin object causes HTTP 304 Not Modified without data; a changed object causes 200 OK with data. This preserves freshness while saving delay and traffic.` },
 { type: 'heading', text: `Chapter recap` },
 { type: 'text', text: `Email combines user agents, mail servers, SMTP, and IMAP or POP. FTP separates control and data connections. A proxy cache serves nearby hits, reduces bottleneck load, and uses conditional GET to avoid carrying unchanged objects.` }
 ]
},
{
 id: 'socket-programming', title: 'Socket Programming', blocks: [
 { type: 'text', text: `Socket programming turns application-layer messages into running client and server programs. The socket API gives a program a disciplined interface to transport.` },
 { type: 'heading', text: `Socket abstraction` },
 { type: 'text', text: `A process creates a socket through an operating-system call. Linked sockets form a data-pipe abstraction between applications. A socket address has a 32-bit IP address for the device and a 16-bit port number for the process on that device.` },
 { type: 'text', text: `The socket figure places a client application and a server application in user space above dotted user/kernel boundaries. Red socket endpoints cross those boundaries and join a long green path through lower layers. Application code invokes the Socket API, rather than operating the lower layers itself.` },
 { type: 'text', text: `Unix-domain sockets communicate locally on one machine. Internet sockets include TCP stream sockets, UDP datagram sockets, and raw sockets that send or receive packets with little added processing.` },
 { type: 'heading', text: `UDP server flow` },
 { type: 'text', text: `UDP requires no connection setup. A server creates a datagram socket and binds it to a known port. It receives a request datagram together with the sender address, processes it, and sends a reply datagram to that address.` },
 { type: 'heading', text: `UDP client flow` },
 { type: 'text', text: `A UDP client creates a datagram socket, sends a request addressed to server IP and port, receives a reply, and closes. There is no accept call and no connection state.` },
 { type: 'code', code: `// UDP server
server = DatagramSocket(9876)
while (true) {
  request, clientAddress = server.receive()
  server.send(process(request), clientAddress)
}

// UDP client
client = DatagramSocket()
client.send(request, serverIP, 9876)
reply, sender = client.receive()
client.close()` },
 { type: 'text', text: `UDP does not promise delivery, order, uniqueness, or congestion control. A program needing timeouts, retransmission, or sequence checks must implement those choices above UDP.` },
 { type: 'heading', text: `TCP server setup` },
 { type: 'text', text: `A TCP server creates a socket, binds it to its selected local IP address and well-known port, and calls listen. This becomes the welcoming socket: it waits for incoming connection attempts.` },
 { type: 'text', text: `accept is blocking. When a client arrives, it returns a new connection socket dedicated to that client. The original welcoming socket remains available to accept another connection.` },
 { type: 'heading', text: `TCP client setup` },
 { type: 'text', text: `A TCP client creates a socket and calls connect with the server IP address and port. TCP establishes a connection between client and server before application data is exchanged.` },
 { type: 'text', text: `The three-way handshake is SYN from client, SYN plus ACK from server, and ACK from client. It establishes the connection; after it, TCP can provide reliable byte-stream transfer using acknowledgments and retransmissions.` },
 { type: 'heading', text: `TCP data flow` },
 { type: 'text', text: `Once connected, the client writes a request and reads a reply. The server reads the request from its connection socket, processes it, writes a reply, and closes that connection when finished.` },
 { type: 'text', text: `The sequence figure has server calls descending on the left: socket, bind, listen, accept, read, write, close. Client calls descend on the right: socket, connect, write, read, close. Arrows label connection establishment, client-to-server request data, and server-to-client reply data. accept is marked as waiting until the client connects.` },
 { type: 'code', code: `// TCP server
welcome = socket(TCP)
bind(welcome, serverIP, 8080)
listen(welcome)
while (true) {
  connection = accept(welcome) // blocks
  request = read(connection)
  write(connection, process(request))
  close(connection)
}

// TCP client
client = socket(TCP)
connect(client, serverIP, 8080)
write(client, request)
reply = read(client)
close(client)` },
 { type: 'heading', text: `Meaning of common calls` },
 { type: 'text', text: `socket chooses address family and type, and returns a file descriptor the program uses in later calls. bind attaches it to a local address. If an application does not bind, the operating system can choose a port; servers normally bind a known port.` },
 { type: 'text', text: `listen asks the system to accept queued TCP connection attempts. accept removes one connection from that queue and creates its connection socket. connect actively asks to reach a server socket.` },
 { type: 'text', text: `read or recv obtains bytes and commonly blocks until bytes arrive. write or send supplies bytes to transmit. close releases the descriptor; shutdown can disable reading, writing, or both while managing TCP closure.` },
 { type: 'heading', text: `Serving many clients` },
 { type: 'text', text: `A sequential server delays later clients while it processes one request. It can fork a new process per accepted client, leaving the original to listen, though processes are heavyweight. Threads are lighter but require synchronization of shared data.` },
 { type: 'text', text: `Event-driven designs use non-blocking sockets and readiness mechanisms such as poll, select, or epoll, allowing one program to manage multiple active connections without blocking on just one.` },
 { type: 'heading', text: `C API shapes` },
 { type: 'code', code: `int socket(int domain, int type, int protocol);
int bind(int sockfd, struct sockaddr *addr, int addrlen);
int listen(int sockfd, int backlog);
int connect(int sockfd, struct sockaddr *addr, int addrlen);
int accept(int sockfd, struct sockaddr *addr, int addrlen);
int recv(int sockfd, void *buf, int buflen, int flags);
int send(int sockfd, void *buf, int buflen, int flags);
int shutdown(int sockfd, int how);` },
 { type: 'text', text: `C Internet socket code commonly uses sys/types.h, sys/socket.h, and netinet/in.h. Other languages wrap these calls, but the UDP and TCP sequences remain the same.` },
 { type: 'heading', text: `Chapter recap` },
 { type: 'text', text: `Sockets connect application code to transport. UDP exchanges independent addressed datagrams. TCP clients call socket, connect, write, read, close; TCP servers create a bound listening socket, accept a per-client socket, read, write, and close. The welcoming socket enables continuing service.` }
 ]
}
];
