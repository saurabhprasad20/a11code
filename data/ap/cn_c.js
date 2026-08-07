export const cnChaptersC = [
  {
    id: 'transport-layer-services-and-multiplexing',
    title: 'Transport-Layer Services and Multiplexing',
    blocks: [
      { type: 'text', text: `Welcome to the transport layer. Think of it as the end-system service that lets one application process communicate with another application process on a remote host, even though the actual path crosses many links and routers.` },
      { type: 'text', text: `This chapter first separates host-to-host delivery from process-to-process delivery. Then we will follow the header information that lets one host share its transport service among many applications.` },
      { type: 'heading', text: `What transport provides` },
      { type: 'text', text: `Transport protocols run in end systems, not inside ordinary routers. On the sending host, the protocol accepts an application message, divides it into segments, fills in a transport header, and gives each segment to IP. At the receiving host, it checks the header, reassembles the application data as needed, and delivers it through the correct socket.` },
      { type: 'text', text: `A network drawing shows applications at widely separated home, mobile, enterprise, data-center, provider, and ISP networks. The important idea is not the artwork: the two endpoint processes experience a logical end-to-end conversation although their data crosses a complicated network in between.` },
      { type: 'heading', text: `Transport layer and network layer` },
      { type: 'text', text: `The network layer supplies logical communication between hosts. The transport layer builds on that service to supply logical communication between processes running on those hosts. A host may run a browser, mail program, game, and server at the same time, so host delivery alone is not enough.` },
      { type: 'text', text: `Picture a household receiving one postal delivery. The street address gets it to the house, but a name or apartment number is still needed to reach the right person. IP addresses play the host-delivery role; transport port numbers play the local process-delivery role.` },
      { type: 'list', items: [`TCP gives a reliable, ordered byte stream, connection setup, flow control, and congestion control.`, `UDP provides a lightweight, connectionless best-effort datagram service.`, `Neither ordinary TCP nor UDP promises a particular delay or a guaranteed bandwidth.`] },
      { type: 'text', text: `The protocol comparison diagram places TCP and UDP above IP at both endpoints. TCP's logical service is shown as reliable and ordered; UDP's is shown as a thin extension of IP best effort. Both still depend on IP to carry their segments across the network.` },
      { type: 'heading', text: `Multiplexing and demultiplexing` },
      { type: 'text', text: `Multiplexing is the sender-side gathering step: several application sockets contribute data to one transport layer, which adds headers and sends segments downward. Demultiplexing is the receiver-side sorting step: the transport layer examines header values and sends each arriving segment to the intended socket.` },
      { type: 'text', text: `The layered figure has multiple processes above sockets on the left and several processes on the right. At each end, application, transport, network, link, and physical layers are stacked. Read the arrows as many upper-layer conversations being combined below, transported by the network, then separated again at the far endpoint.` },
      { type: 'text', text: `An IP datagram carries source and destination IP addresses. Its transport segment carries source and destination port numbers. The receiving host uses this combination of addressing information to decide which socket should receive the data.` },
      { type: 'heading', text: `UDP: connectionless demultiplexing` },
      { type: 'text', text: `A UDP socket is associated with a local port, for example a program can create a socket on port 12534. When a UDP segment arrives, the receiver normally uses its destination port number to select that socket. To send, an application supplies a destination IP address and destination port.` },
      { type: 'code', code: `sender UDP segment:   source IP, source port, destination IP, destination port
receiver's lookup:    destination port  ->  local UDP socket

DatagramSocket serverSocket = new DatagramSocket(6428);` },
      { type: 'text', text: `The UDP example diagram shows two client sockets using ports 5775 and 9157 and a server socket using port 6428. Datagrams from either client that name the server's port 6428 are delivered to that one server socket, even when their source addresses or source ports differ.` },
      { type: 'heading', text: `TCP: connection-oriented demultiplexing` },
      { type: 'text', text: `A TCP connection is identified by a four-part key, often called a 4-tuple: source IP address, source port number, destination IP address, and destination port number. TCP uses all four values when it directs an arriving segment.` },
      { type: 'code', code: `TCP connection key =
  (source IP address, source port, destination IP address, destination port)` },
      { type: 'text', text: `This lets one server port support many simultaneous clients. In the diagram, several segments are all addressed to server IP address B and port 80, yet they are directed to different server-side sockets because the clients' source addresses and/or source ports differ.` },
      { type: 'text', text: `Do not confuse the listening socket with each established connection. A server listens at a well-known local port, then creates or maintains a distinct connected socket for each client 4-tuple.` },
      { type: 'heading', text: `Trace one segment` },
      { type: 'text', text: `Practice this path in your mind: an application writes to its socket; transport gives the data a source and destination port; IP adds source and destination host addresses; the receiver's IP accepts the datagram for its host; then transport uses its demultiplexing rule to select the receiving socket.` },
      { type: 'heading', text: `A broader pattern` },
      { type: 'text', text: `Header-based multiplexing and demultiplexing are not unique to transport. Network, link, and other layers also use identifiers to combine traffic at one point and split it at another. At transport level, ports and, for TCP, the full 4-tuple are the crucial identifiers.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`Transport provides a logical process-to-process service above IP's host-to-host service.`, `A sender encapsulates application data in segments; a receiver decapsulates and delivers data to a socket.`, `UDP demultiplexing is based primarily on the destination port.`, `TCP demultiplexing identifies an established connection with all four address-and-port values.`] },
      { type: 'text', text: `Next we study UDP itself: deliberately small, fast to begin using, and responsible for very little beyond demultiplexing and error detection.` }
    ],
  },
  {
    id: 'connectionless-transport-udp',
    title: 'Connectionless Transport: UDP',
    blocks: [
      { type: 'text', text: `UDP is the minimal transport choice. It sends each datagram independently, without first negotiating a connection and without promising recovery when the network loses or reorders data.` },
      { type: 'heading', text: `The UDP service model` },
      { type: 'text', text: `UDP is connectionless: there is no sender-receiver handshake and no per-connection state to establish before a segment is sent. Its best-effort delivery means a segment can be lost or can reach the application in a different order from its neighbors.` },
      { type: 'text', text: `That restraint is useful when an application values quick startup, can tolerate occasional missing data, or implements the needed higher-level behavior itself. UDP does not turn an unreliable network into a reliable ordered stream.` },
      { type: 'heading', text: `Where UDP is used` },
      { type: 'list', items: [`Streaming media can prefer timely new samples over late repair of old ones.`, `DNS commonly uses UDP for short request-response exchanges.`, `SNMP commonly uses UDP for management messages.`, `HTTP/3 uses UDP as its substrate while its higher-layer protocol supplies reliability and congestion-control mechanisms.`] },
      { type: 'text', text: `If an application requires reliable transfer over UDP, it must add acknowledgements, retransmission rules, ordering, and congestion control above UDP. UDP itself does not silently provide those features.` },
      { type: 'heading', text: `Sender and receiver actions` },
      { type: 'text', text: `A UDP sender receives an application message, chooses header values, creates the UDP segment, and passes it to IP. A UDP receiver receives the segment from IP, checks its checksum, uses the destination port to demultiplex it, and hands its payload to the application socket.` },
      { type: 'text', text: `The sender-receiver illustration uses an SNMP client and an SNMP server. Follow it as a one-datagram exchange: the client gives a message to UDP, UDP labels it for the server, IP carries it, and the server's UDP passes the payload up after the destination port and checksum have been processed.` },
      { type: 'heading', text: `UDP segment format` },
      { type: 'code', code: `0                   15 16                  31
+----------------------+----------------------+
| source port          | destination port     |
+----------------------+----------------------+
| length               | checksum             |
+----------------------+----------------------+
| application data (payload)                 |
+---------------------------------------------+` },
      { type: 'text', text: `The format diagram is two 32-bit-wide header rows followed by payload. The first row contains two 16-bit ports. The second contains a 16-bit length and a 16-bit checksum. Length counts the complete UDP segment in bytes, header included; the payload is the application data.` },
      { type: 'heading', text: `Why a checksum is needed` },
      { type: 'text', text: `A checksum is an error-detection aid. A flipped bit can change a transmitted value: for example, a three-word message containing 5, 6, and 11 might arrive with its first value changed to 4. The checksum gives the receiver a chance to notice that something is inconsistent.` },
      { type: 'text', text: `For UDP's Internet checksum, the sender treats the UDP header, payload, and relevant IP addressing information as 16-bit words. It adds the words using one's-complement addition, then stores the one's complement of that sum in the checksum field.` },
      { type: 'code', code: `For each 16-bit word:
  sum = sum + word
  if a carry leaves bit 16, wrap it around and add it to the low 16 bits

checksum = one's complement of sum
receiver check: one's-complement sum of all words, including checksum, should be all 1 bits` },
      { type: 'text', text: `Here is the small binary example step by step. Add 1110011001100110 and 1101010101010101. The raw result has a seventeenth-bit carry: 1 1011101110111011. Wrap that leading 1 around, obtaining 1011101110111100. Complement every bit to obtain checksum 0100010001000011.` },
      { type: 'text', text: `At the receiver, a mismatch detects an error. A match means the check did not find an error; it is not proof that no possible error occurred. Different bit changes can sometimes compensate in an additive checksum, so this is useful but limited protection.` },
      { type: 'heading', text: `Read the checksum diagram aloud` },
      { type: 'text', text: `The checksum figure is best read as an arithmetic procedure rather than a visual layout: line up 16-bit words, add them, fold any overflow bit back into the low end, and invert the resulting 16 bits. The receiver performs the complementary consistency check before passing data upward.` },
      { type: 'text', text: `Notice the two roles of a UDP header. The ports answer where a datagram belongs on the local host. The checksum asks whether the received contents still agree with the transmitted arithmetic. Neither role asks whether an earlier or later UDP datagram was received.` },
      { type: 'heading', text: `Choosing UDP carefully` },
      { type: 'text', text: `UDP is not automatically faster in every useful sense: an application that has to rebuild reliability, ordering, pacing, and congestion response may need substantial extra logic. Its advantage is that the application can choose the behavior rather than inheriting TCP's stream semantics.` },
      { type: 'text', text: `A missing UDP datagram is not retried by UDP. Whether to ignore it, request a replacement, use redundant media data, or report an error is an application-protocol decision.` },
      { type: 'text', text: `Likewise, UDP does not create a relationship that must later be closed. Each send is a self-contained attempt to deliver one datagram to the named destination.` },
      { type: 'heading', text: `Strengths and limits` },
      { type: 'list', items: [`No connection setup means no initial round trip before the first segment.`, `Each datagram is independent, so UDP remains simple and has little protocol state.`, `The checksum can catch many corruption errors.`, `UDP does not provide reliable delivery, in-order delivery, flow control, or built-in congestion control.`] },
      { type: 'text', text: `A good mental summary is: UDP sends a datagram and lets the application decide how much additional control it needs. That can be an excellent design choice, but it is never a reliability guarantee.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `You can now read every UDP header field, explain its checksum calculation, and justify a UDP choice without claiming capabilities it does not have. Next we build reliability carefully, one network impairment at a time.` }
    ],
  },
  {
    id: 'principles-of-reliable-data-transfer',
    title: 'Principles of Reliable Data Transfer',
    blocks: [
      { type: 'text', text: `Reliable data transfer is a design problem: how can two endpoint protocols make application data arrive correctly and in order when the underlying channel may corrupt, lose, delay, or duplicate packets? We will build the answer in layers of difficulty.` },
      { type: 'heading', text: `A protocol is local knowledge plus messages` },
      { type: 'text', text: `The sender cannot look through the network to see what the receiver obtained. Likewise, the receiver cannot know whether its reply arrived at the sender. Each side learns about the other only through messages, which is why acknowledgements, timers, and state matter.` },
      { type: 'text', text: `The reliable-data-transfer picture has a sender protocol and receiver protocol surrounding an unreliable channel. Data is meant to travel one way, but control messages travel back. The two directions together implement one reliable application-level flow.` },
      { type: 'text', text: `We describe each endpoint with a finite-state machine, or FSM. A state records what the protocol must remember. An event triggers a transition; actions on that transition can create a packet, send it, deliver data, start a timer, or change state.` },
      { type: 'code', code: `Common abstract interface operations
rdt_send(data)          application gives data to sender
udt_send(packet)        protocol sends through underlying channel
rdt_rcv(packet)         a packet arrives from below
deliver_data(data)      receiver gives data to its application` },
      { type: 'heading', text: `rdt1.0: a perfect underlying channel` },
      { type: 'text', text: `Start with an unrealistically perfect channel: no bit errors and no losses. The sender FSM has one waiting state. When the application calls rdt_send, it makes a packet and calls udt_send, then is immediately ready for more data.` },
      { type: 'text', text: `The rdt1.0 receiver FSM also has one state. On packet arrival, it extracts the data and delivers it upward. The paired FSM drawing is therefore very simple: one send transition on the left and one receive-and-deliver transition on the right.` },
      { type: 'heading', text: `rdt2.0: handling bit errors` },
      { type: 'text', text: `Now allow packet bits to be corrupted. A checksum lets the receiver detect corruption, but detection alone does not repair anything. The receiver needs a way to tell the sender whether the packet was good.` },
      { type: 'list', items: [`An ACK says that a packet arrived correctly.`, `A NAK says that the receiver detected an error.`, `After a NAK, the sender retransmits its saved packet.`] },
      { type: 'text', text: `The rdt2.0 sender FSM alternates between waiting for data from the application and waiting for receiver feedback. It makes a checksummed packet, sends it, then returns to the first state on an ACK or resends on a NAK. The receiver waits for a packet, delivers correct data and sends an ACK, or sends a NAK if the checksum fails.` },
      { type: 'text', text: `In the no-error timing diagram, sender sends a packet, receiver receives and delivers it, receiver sends ACK, and only then does sender accept new application data. In the corrupted-data diagram, receiver detects corruption, returns NAK, and sender sends the saved copy again.` },
      { type: 'heading', text: `Why rdt2.0 is incomplete` },
      { type: 'text', text: `What if the ACK or NAK itself is corrupted? The sender cannot tell whether the receiver accepted the data. Blind retransmission could create a duplicate delivery, because the original data packet may actually have been received correctly.` },
      { type: 'heading', text: `rdt2.1: sequence numbers remove ambiguity` },
      { type: 'text', text: `rdt2.1 adds a sequence number to each data packet. With stop-and-wait, only 0 and 1 are needed: after a successful packet, the next valid packet must have the other number. The receiver remembers which sequence number it expects and discards a duplicate rather than delivering it twice.` },
      { type: 'text', text: `The sender FSM now has four conceptual waiting states: wait for application data with sequence 0, wait for ACK/NAK for 0, wait for application data with sequence 1, and wait for ACK/NAK for 1. A corrupt or negative response causes retransmission of the saved packet without changing its number.` },
      { type: 'text', text: `The receiver FSM has an expected-0 state and an expected-1 state. In each state, a correct expected packet is delivered, acknowledged, and advances the expectation. A duplicate or corrupt packet is not delivered; the receiver repeats appropriate feedback. The receiver cannot know whether its last feedback reached the sender, so it must remain safe under repeats.` },
      { type: 'heading', text: `rdt2.2: acknowledgements only` },
      { type: 'text', text: `rdt2.2 keeps the same reliability idea without explicit NAK packets. When it receives a bad or duplicate packet, the receiver re-sends an ACK for the most recently accepted sequence number. The sender treats a duplicate ACK as evidence that it should retransmit its current packet.` },
      { type: 'text', text: `This matters because a protocol can communicate negative information with a repeated positive acknowledgement. Modern TCP likewise uses ACKs rather than a separate NAK message type.` },
      { type: 'heading', text: `rdt3.0: losses as well as errors` },
      { type: 'text', text: `Suppose either data packets or ACKs can disappear. Checksums, sequence numbers, and ACKs are still necessary, but the sender can wait forever for a reply that was lost. It needs a timer.` },
      { type: 'text', text: `After sending a packet, the sender starts a countdown. If the expected ACK arrives in time, it stops the timer and advances to the other sequence number. If time expires first, it retransmits the saved packet and restarts the timer. A delayed original or delayed ACK can create a duplicate, but sequence numbers let the receiver recognize it safely.` },
      { type: 'text', text: `Read the four timing cases in order. With no loss, packet 0 is acknowledged, then packet 1 is acknowledged. With a lost data packet, the sender times out and repeats it. With a lost ACK, the sender times out and repeats a packet already delivered; the receiver detects that duplicate and repeats its ACK. With a premature timeout, the same safe duplicate behavior occurs because the original ACK was merely late.` },
      { type: 'heading', text: `The price of stop-and-wait` },
      { type: 'text', text: `Stop-and-wait allows only one unacknowledged packet at a time. After transmitting it, the sender idles while the packet propagates forward and its ACK propagates back. On a 1 Gbps link with 15 ms one-way propagation delay and an 8000-bit packet, transmission takes only 8 microseconds while an RTT is about 30 ms.` },
      { type: 'code', code: `U_sender = (L / R) / (RTT + L / R)
L = packet length in bits; R = link rate

For L = 8000 bits and R = 1 Gbps:
L/R = 8 microseconds
U_sender ≈ 8 microseconds / 30.008 milliseconds ≈ 0.00027` },
      { type: 'text', text: `The stop-and-wait timeline shows one short data-transmission interval, a long round-trip wait, then another short interval. Its lesson is stark: a protocol can leave a fast physical resource nearly idle.` },
      { type: 'heading', text: `Pipelining` },
      { type: 'text', text: `Pipelining fixes that waste by allowing multiple packets to be in flight before acknowledgements return. This increases utilization but requires a larger sequence-number space plus sender buffering, receiver buffering, or both. Two central designs are Go-Back-N and Selective Repeat.` },
      { type: 'heading', text: `Go-Back-N` },
      { type: 'text', text: `A Go-Back-N sender maintains a window of up to N consecutive sent but unacknowledged packets. Its send_base marks the oldest unacknowledged packet; nextseqnum marks the next number it may use. The sequence-space figure colors earlier packets as acknowledged, packets from send_base to nextseqnum as sent but unacknowledged, later slots inside the window as usable, and slots beyond the window as unavailable.` },
      { type: 'list', items: [`ACK(n) is cumulative: it confirms every packet through n.`, `Receiving ACK(n) moves send_base to n + 1 when it advances knowledge.`, `The sender keeps one timer for the oldest outstanding packet.`, `When that timer expires for n, it retransmits n and every later unacknowledged packet in its window.`] },
      { type: 'text', text: `The Go-Back-N receiver needs only the next expected number. It acknowledges the highest consecutive packet received. An out-of-order packet may be discarded rather than buffered, and the receiver repeats the ACK for the highest in-order packet, creating duplicate ACKs.` },
      { type: 'text', text: `In the window-four timing diagram, packets 0, 1, 2, and 3 are sent, but packet 2 is lost. The receiver ACKs 0 and 1, discards later 3, 4, and 5 as out of order, and repeatedly ACKs 1. When packet 2's timer expires, sender resends 2 through 5; the receiver can finally deliver them in sequence and sends ACKs through 5.` },
      { type: 'heading', text: `Selective Repeat` },
      { type: 'text', text: `Selective Repeat avoids resending data that arrived successfully. The receiver individually acknowledges correct packets and buffers out-of-order packets for later in-order delivery. The sender has a window of N sequence numbers and an individual timer for each unacknowledged packet.` },
      { type: 'text', text: `The paired-window diagram shows the sender's acknowledged slots behind send_base, unacknowledged slots in its active window, and usable future slots. The receiver diagram shows rcv_base, an expected-but-missing packet at the lower edge, buffered and already acknowledged out-of-order packets above it, and acceptable new numbers farther across the window.` },
      { type: 'text', text: `In the Selective Repeat example, packets 0 through 3 are sent and packet 2 is lost. The receiver accepts and ACKs 0 and 1, buffers and ACKs 3, 4, and 5, but cannot deliver those later payloads yet. The sender records those ACKs and retransmits only 2 after its timer expires. When 2 arrives, receiver delivers 2 and then immediately releases buffered 3, 4, and 5 in order.` },
      { type: 'text', text: `Selective Repeat has an important sequence-number rule. If the sequence number space is too small compared with the window, an old delayed packet can look like a new packet after numbers wrap around. To avoid that ambiguity, the sequence-number space must be at least twice the window size; equivalently, the window must be no more than half the sequence space.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`Checksums detect corruption; ACKs and retransmissions repair detected trouble.`, `Sequence numbers prevent a retransmission from becoming a duplicate delivery.`, `Timers recover from packet and ACK loss.`, `Stop-and-wait is simple but can waste a long, fast path.`, `Pipelining raises utilization: Go-Back-N repeats a suffix after loss, while Selective Repeat buffers and repairs individual packets.`] }
    ],
  },
  {
    id: 'connection-oriented-transport-tcp',
    title: 'Connection-Oriented Transport: TCP',
    blocks: [
      { type: 'text', text: `TCP applies reliable-transfer ideas to a practical, full-duplex Internet protocol. Its unit of reliability is a byte stream: applications see ordered bytes, not preserved message boundaries.` },
      { type: 'heading', text: `TCP service at a glance` },
      { type: 'list', items: [`TCP is point-to-point: one sender and one receiver participate in a connection.`, `It is connection-oriented: a handshake creates endpoint state before application data flows.`, `It offers reliable, in-order byte-stream delivery with cumulative acknowledgements and pipelining.`, `It includes receiver flow control and network congestion control.`, `MSS, maximum segment size, bounds the data normally placed in one TCP segment; a common value is 1460 bytes.`] },
      { type: 'heading', text: `TCP segment structure` },
      { type: 'code', code: `source port | destination port
sequence number
acknowledgement number
header length | reserved | control flags | receive window
checksum | urgent-data pointer
options (if present)
application data` },
      { type: 'text', text: `Read this format from top to bottom. Ports select the endpoint sockets. Sequence and acknowledgement numbers implement byte-stream reliability. Header length says where data begins. Flags include control signals such as SYN, ACK, FIN, and RST. The receive-window field advertises receiver capacity; checksum detects corruption; options extend TCP when negotiated.` },
      { type: 'heading', text: `Byte sequence and acknowledgement numbers` },
      { type: 'text', text: `TCP numbers bytes rather than segments. A segment's sequence number is the number of its first data byte. An ACK number is the next byte the sender of that ACK expects to receive, so it cumulatively confirms every earlier byte.` },
      { type: 'text', text: `The sender sequence-space diagram has five regions: bytes before SendBase are acknowledged; bytes from SendBase to the next sequence number are sent but still in flight; a following range inside the current window is usable but not yet sent; numbers beyond that range cannot be sent yet. The active window has width N in the diagram.` },
      { type: 'code', code: `If a segment has Seq = 42 and carries one byte:
receiver replies ACK = 43

If a segment has Seq = 1000 and carries bytes 1000 through 1099:
receiver replies ACK = 1100` },
      { type: 'text', text: `The simple interactive example shows one host sending the character C with sequence 42. The other host acknowledges 43, because it wants byte 43 next. When that host also sends a C of its own at sequence 79, the first host can acknowledge 80, possibly piggybacking that ACK with outgoing data.` },
      { type: 'text', text: `TCP acknowledgements are cumulative. The standard leaves the exact handling of out-of-order segments to the implementation, but the acknowledgement still identifies the lowest missing byte—the next byte needed for a contiguous prefix.` },
      { type: 'heading', text: `Estimating RTT and setting a timeout` },
      { type: 'text', text: `A timeout must be longer than the actual round-trip time, yet RTT changes as routes and queues change. A timeout that is too short creates needless retransmissions; one that is too long delays loss recovery.` },
      { type: 'text', text: `TCP measures SampleRTT from sending a segment until its ACK arrives, generally ignoring retransmitted segments because their ambiguous timing would contaminate the sample. It smooths recent observations into EstimatedRTT.` },
      { type: 'code', code: `EstimatedRTT = (1 - α) * EstimatedRTT + α * SampleRTT
α = 0.125

DevRTT = (1 - β) * DevRTT + β * |SampleRTT - EstimatedRTT|
TimeoutInterval = EstimatedRTT + 4 * DevRTT` },
      { type: 'text', text: `This exponential weighted moving average gives the newest sample some influence while retaining a fading memory of earlier samples. DevRTT measures variation; high variation increases the safety margin in the timeout interval.` },
      { type: 'heading', text: `Normal sender and receiver behavior` },
      { type: 'text', text: `When application data arrives, a TCP sender creates a segment using the next byte sequence number. If no retransmission timer is running, it starts one for the oldest unacknowledged data. On timeout it retransmits the appropriate outstanding segment and restarts the timer. On an ACK that covers new data, it advances SendBase and manages the timer for what remains.` },
      { type: 'text', text: `A receiver can delay an ACK for up to 500 ms when one expected segment arrives and no earlier ACK is pending, hoping to acknowledge a second segment together. If an expected segment arrives while another ACK is pending, it promptly sends one cumulative ACK for both. A higher-than-expected segment exposes a gap, so the receiver immediately sends a duplicate ACK naming the next missing byte. A segment that fills a gap triggers an immediate ACK when it begins at that gap's lower edge.` },
      { type: 'heading', text: `Retransmission cases` },
      { type: 'text', text: `If an ACK is lost, the sender eventually times out and retransmits. The receiver recognizes the repeated data as already covered and sends its cumulative ACK again. The extra copy is wasteful but correctness survives.` },
      { type: 'text', text: `A premature timeout can also resend data that was already received. A cumulative ACK still tells the sender how far the receiver's contiguous byte stream extends. In another useful case, a later cumulative ACK can cover an earlier lost ACK, allowing the sender to continue without waiting for the older acknowledgement.` },
      { type: 'heading', text: `Fast retransmit` },
      { type: 'text', text: `Waiting for a timer can be unnecessarily slow when later segments reveal a gap. Suppose five segments are sent and the second is lost. The receiver first ACKs the first segment's next byte, then sends the same ACK again for each later out-of-order segment because the missing second segment still blocks contiguous delivery.` },
      { type: 'text', text: `After the sender receives three duplicate ACKs, TCP fast retransmit resends the oldest unacknowledged segment without waiting for timeout. This is strong evidence that later data arrived but an earlier segment is missing.` },
      { type: 'heading', text: `Connection establishment` },
      { type: 'text', text: `Before data is exchanged, both endpoints must agree to connect and establish parameters such as their initial sequence numbers and receive-buffer state. A two-message exchange is unsafe in a network with delay variation, loss, retransmission, and reordering: an old connection request can arrive late and create incorrect shared state.` },
      { type: 'text', text: `The two-way-handshake diagrams illustrate that uncertainty. One endpoint sends a request with initial number x and the other accepts it, but delayed duplicates and reordered messages can make one side believe it has a new connection when the other does not share that belief.` },
      { type: 'code', code: `TCP three-way handshake
client in SYN-SENT  ->  SYN(seq = x)                 -> server in LISTEN
client              <-  SYN + ACK(seq = y, ack = x+1) <- server in SYN-RCVD
client in ESTAB     ->  ACK(ack = y+1)               -> server in ESTAB` },
      { type: 'text', text: `Narrate the state machine carefully. The server waits in LISTEN. The client sends SYN carrying x and enters SYN-SENT. The server records the request, replies with SYN plus ACK, and waits in SYN-RCVD. The client acknowledges y plus one and enters ESTAB; when that last ACK reaches the server, it too enters ESTAB. The third message confirms that the client received the server's choice.` },
      { type: 'heading', text: `Closing a connection` },
      { type: 'text', text: `TCP closes each direction independently. A side that has finished sending transmits a segment with FIN set to 1. The peer acknowledges that FIN and may continue sending until it sends its own FIN. Its ACK and FIN can be combined, and simultaneous FIN exchanges are handled safely.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`TCP numbers bytes and uses cumulative ACK numbers for the next byte expected.`, `EstimatedRTT and DevRTT make retransmission timeouts adaptive.`, `Three duplicate ACKs trigger fast retransmit of the oldest missing data.`, `The three-way handshake establishes mutually known state; FIN and ACK messages close each direction.`] }
    ],
  },
  {
    id: 'tcp-flow-control-and-the-sliding-window',
    title: 'TCP Flow Control and the Sliding Window',
    blocks: [
      { type: 'text', text: `Reliable delivery is not enough if a fast sender can overflow a slow receiver. TCP flow control lets the receiver say how much buffer space it currently has, so the sender can pace outstanding data to that limit.` },
      { type: 'heading', text: `The receive buffer` },
      { type: 'text', text: `At a receiver, IP delivers segments upward to TCP. TCP places their payload bytes in a receive buffer, and the application removes bytes by reading its socket. If data enters the buffer faster than the application removes it, the buffer would eventually overflow without flow control.` },
      { type: 'text', text: `The buffer diagram is a container labeled RcvBuffer. Some of its capacity contains TCP segment payloads waiting to be read by the application; the remaining empty capacity is rwnd, the receive window. Incoming data enters from the sender side, while the application drains data from the other side.` },
      { type: 'heading', text: `The advertised receive window` },
      { type: 'text', text: `TCP places the currently available buffer space in the rwnd field of its outgoing header. A typical receive-buffer default shown in the material is 4096 bytes, though operating systems may automatically adjust it. As the application reads or data arrives, the advertised value can change.` },
      { type: 'code', code: `rwnd = RcvBuffer - amount of received data not yet read by application

Sender rule:
unacknowledged data in flight <= most recently advertised rwnd` },
      { type: 'text', text: `This is receiver protection. If rwnd is 5000 bytes, the sender may have at most 5000 unacknowledged bytes outstanding under that advertisement. It is not a promise about the network's ability to carry 5000 bytes quickly.` },
      { type: 'heading', text: `A sliding-window walkthrough` },
      { type: 'text', text: `Imagine a sender allowed a five-segment window. It can send P1 through P5 without stopping for individual ACKs. The first ACK moves the left edge past P1; a later cumulative ACK through P2 moves it past P2. Each advance makes room at the right edge for new segments such as P6 and P7.` },
      { type: 'text', text: `The timing sketch shows P1, P2, P3, P4, and P5 leaving sender S toward destination D. ACKs travel back. Beneath that timeline, a number line marks the start and end of the window. After acknowledgements for P1 and P2, the whole permitted range shifts right: old acknowledged positions leave the window and newly allowed sequence positions enter at the far end.` },
      { type: 'code', code: `Example with five allowed segments
initial window:          [P1 P2 P3 P4 P5]
after cumulative ACK P1: [P2 P3 P4 P5 P6]
after cumulative ACK P2: [P3 P4 P5 P6 P7]` },
      { type: 'text', text: `In real TCP, the units are bytes, not the labels P1 through P7. The example uses segments only to make the sliding motion easy to hear: acknowledgements release capacity at the left edge, which permits new data at the right edge.` },
      { type: 'heading', text: `Two independent limits` },
      { type: 'text', text: `The sender is constrained both by the receiver's advertised rwnd and by its own congestion window, cwnd. The effective sending allowance is governed by the smaller limit, because satisfying one constraint does not satisfy the other.` },
      { type: 'code', code: `effective in-flight allowance = min(rwnd, cwnd)` },
      { type: 'heading', text: `Flow control is not congestion control` },
      { type: 'list', items: [`Flow control protects the receiving application's buffer. The receiver advertises rwnd.`, `Congestion control protects the network's routers and links from too much aggregate offered traffic. The sender adjusts cwnd using congestion signals.`, `A large rwnd does not prove the network has spare capacity.`, `A large cwnd does not allow the sender to overflow the receiver buffer.`] },
      { type: 'text', text: `This distinction is worth repeating. A receiver may be perfectly capable of accepting more data while a router queue is overloaded; alternatively, the network may be empty while an application is reading so slowly that its receive buffer is full. TCP addresses both problems with different controls.` },
      { type: 'heading', text: `A byte-level worked example` },
      { type: 'text', text: `Suppose the receiver advertises rwnd = 5000 bytes and the sender has already sent bytes 1000 through 2999. That is 2000 bytes in flight, leaving room for up to 3000 further bytes under the advertised receive-window limit.` },
      { type: 'code', code: `advertised rwnd = 5000 bytes
currently in flight = bytes 1000..2999 = 2000 bytes
space still allowed by rwnd = 5000 - 2000 = 3000 bytes` },
      { type: 'text', text: `When a cumulative ACK says ACK = 3000, it confirms that the receiver has the contiguous byte range through 2999. Those 2000 bytes no longer count as unacknowledged at the sender, so the left edge of the sender's byte window advances.` },
      { type: 'text', text: `The receiver might also put a different rwnd value in that ACK. If its application has drained the buffer, rwnd can grow; if more unread data now occupies the buffer, rwnd can shrink. The sender follows the latest advertised capacity it has learned.` },
      { type: 'heading', text: `What a closed receive window means` },
      { type: 'text', text: `If the receiver advertises rwnd = 0, the sender cannot send ordinary additional data into that buffer. The receiver later advertises a nonzero window after its application makes space; TCP also uses window probes so a lost window-update notification does not stall the connection indefinitely.` },
      { type: 'text', text: `A closed receive window says the receiver needs a pause. It does not, by itself, say that a path is congested. That is another reason to keep rwnd and cwnd conceptually separate.` },
      { type: 'heading', text: `A sliding-window checklist` },
      { type: 'list', items: [`The left edge is the first byte not cumulatively acknowledged.`, `Bytes behind that edge have been acknowledged and no longer occupy sender window space.`, `Bytes between the edge and the next sequence number are in flight.`, `Unused positions up to the permitted right edge may be transmitted when application data is ready.`, `An ACK and/or a larger advertised rwnd can move the rightward sending opportunity forward.`] },
      { type: 'heading', text: `Chapter recap` },
      { type: 'text', text: `The receiver advertises its unused buffer as rwnd, and the sender keeps its in-flight data within that bound. As cumulative ACKs arrive, the sender's permitted range slides forward. In the next chapter, cwnd supplies the separate network-protection bound.` }
    ],
  },
  {
    id: 'congestion-control-and-tcp-congestion-control',
    title: 'Congestion Control and TCP Congestion Control',
    blocks: [
      { type: 'text', text: `Congestion control is about the shared network rather than one receiver. When many sources offer more traffic than routers and links can handle, queues grow, delay rises, buffers overflow, and packets are discarded.` },
      { type: 'heading', text: `What congestion looks like` },
      { type: 'text', text: `A useful informal definition is too many sources sending too much data too quickly for the network. Its visible symptoms are long queueing delay in router buffers and packet loss when those buffers fill. This is fundamentally different from a single receiver running out of socket space.` },
      { type: 'heading', text: `Costs of congestion: one shared router` },
      { type: 'text', text: `In the first scenario, two flows share a router with input and output links of capacity R and effectively infinite buffers. Each flow can approach at most R/2. As each arrival rate approaches R/2, throughput may remain high but queueing delay becomes extremely large because the queue absorbs the excess.` },
      { type: 'text', text: `With finite buffers, the queue cannot grow forever; a full router drops arriving packets. In an idealized case where senders know exactly when buffer space exists, they send only when safe. In a less ideal case, they retransmit only packets known to have been dropped.` },
      { type: 'text', text: `Real senders do not have perfect knowledge. A premature timeout can cause a sender to transmit a second copy even though the original was merely delayed and both copies eventually arrive. The cost is more network work for the same useful receiver throughput, which reduces the maximum useful throughput.` },
      { type: 'heading', text: `Costs on multiple hops` },
      { type: 'text', text: `The multi-hop scenario has four senders sharing finite output buffers along intersecting paths. As one flow's offered load grows at a shared downstream queue, another flow's packets can all be dropped there and its throughput can fall toward zero. A packet discarded late has also wasted every upstream link transmission and buffer slot it consumed.` },
      { type: 'heading', text: `How endpoints learn about congestion` },
      { type: 'text', text: `With end-to-end congestion control, the network sends no direct rate command. Endpoints infer congestion from observed loss or delay; classic TCP follows this approach. With network-assisted control, routers provide explicit feedback, perhaps reporting a congestion level or a permitted rate.` },
      { type: 'text', text: `Explicit Congestion Notification, ECN, is one network-assisted method. A router marks ECN bits in the IP header instead of necessarily dropping a packet; the destination reflects that indication using the TCP ECE bit on an ACK, informing the sender that congestion was encountered.` },
      { type: 'heading', text: `The congestion window` },
      { type: 'text', text: `TCP maintains cwnd, a sender-side congestion window. It is a dynamic estimate of how much unacknowledged data the network can sustain. Together with rwnd, it bounds the usable sliding window: the sender must honor the smaller of the network-oriented and receiver-oriented limits.` },
      { type: 'heading', text: `AIMD: probe, then back off` },
      { type: 'text', text: `Classic TCP uses additive increase and multiplicative decrease, or AIMD. It steadily increases its sending rate while conditions appear good, probing for more bandwidth. A loss event is treated as a congestion signal, so the sender reduces its rate sharply.` },
      { type: 'text', text: `The cwnd-versus-time graph forms a sawtooth. Each upward edge is a gradual additive increase; each sudden downward edge is a multiplicative decrease after loss. The repeating shape is deliberate: it seeks a useful operating point without holding a fixed rate regardless of congestion.` },
      { type: 'list', items: [`With TCP Reno behavior, loss detected by three duplicate ACKs cuts the sending rate or window roughly in half.`, `With TCP Tahoe behavior, a timeout loss indication cuts cwnd to 1 MSS.`, `AIMD is distributed and asynchronous, yet it has useful stability and resource-sharing properties.`] },
      { type: 'heading', text: `Slow start` },
      { type: 'text', text: `At the start of a connection, TCP does not initially know the path's capacity. Slow start begins with cwnd = 1 MSS. Each arriving ACK increases cwnd by one MSS, so a full round with all ACKs doubles cwnd: one segment, then two, then four, then eight.` },
      { type: 'text', text: `The slow-start diagram shows a host first sending one segment, then two, then four as acknowledgements return. Its name is historical: the initial value is small, but the growth is exponential and becomes aggressive quickly.` },
      { type: 'heading', text: `Congestion avoidance and ssthresh` },
      { type: 'text', text: `Exponential growth is useful only while the sender is far below likely capacity. TCP uses ssthresh, the slow-start threshold, to choose the mode. After a loss event, ssthresh is set to half the cwnd just before the loss. When cwnd reaches ssthresh, growth changes from exponential slow start to linear congestion avoidance.` },
      { type: 'code', code: `On loss when cwnd was W:
ssthresh = W / 2

slow start:          cwnd grows by about 1 MSS per ACK
                      (about doubles each RTT)
congestion avoidance: cwnd grows by about 1 MSS per RTT` },
      { type: 'text', text: `The worked cwnd graph uses transmission rounds on the horizontal axis and congestion window in segments on the vertical axis. It rises 1, 2, 4, 8 during slow start, then 9, 10, 11, 12 linearly. A timeout after 12 sets ssthresh to 6 and drops Tahoe's cwnd to 1. It climbs 1, 2, 4, 6 and then continues linearly. The Reno path shown from 12 instead falls to 6 and continues linearly, reflecting loss detected by duplicate ACKs rather than timeout.` },
      { type: 'heading', text: `Fast recovery` },
      { type: 'text', text: `Fast recovery is the response associated with Reno-style triple-duplicate-ACK loss handling. Since later packets reached the receiver, the path is still carrying data; after fast retransmit, Reno reduces cwnd to around half rather than returning to one MSS, then resumes congestion avoidance. A timeout is treated as the stronger warning and restarts much more cautiously.` },
      { type: 'heading', text: `A bottleneck viewpoint` },
      { type: 'text', text: `A path's bottleneck link is the tightest link that is almost always busy when TCP is pushing data. Classic TCP and CUBIC increase their sending window until a loss signals that a router output near this bottleneck could not hold more. The practical goal is to keep the end-to-end pipe full, not overfill it with a persistent queue.` },
      { type: 'heading', text: `CUBIC and delay-based alternatives` },
      { type: 'text', text: `CUBIC uses the pre-loss window Wmax as a reference. After reducing the window, it grows more quickly when far below Wmax, becomes deliberately cautious near Wmax, and then increases again beyond it if no new congestion signal appears. Its window growth follows a cubic function of the distance in time from K, the time when the window reaches Wmax. CUBIC is the common default TCP algorithm on Linux and many web servers.` },
      { type: 'text', text: `The CUBIC parameter view names β as the multiplicative-decrease factor, wmax as the window before the latest reduction, T as time since reduction, C as a scaling constant, and cwnd as the present congestion window. A shown configuration uses β = 0.7 and C = 0.4, with window units in MSS-sized segments and time in seconds.` },
      { type: 'text', text: `Delay-based control tries to react before loss. It records RTTmin, the smallest observed, likely uncongested RTT, and compares measured throughput with cwnd / RTTmin. If measured throughput is close to that uncongested estimate, it increases cwnd linearly; if it is far below, it decreases cwnd linearly. The aim is high throughput with low queueing delay. BBR is an example of a deployed delay- and model-informed approach.` },
      { type: 'heading', text: `TCP fairness` },
      { type: 'text', text: `A common fairness target says that if K TCP connections share a bottleneck link of rate R, each should average about R/K. The two-flow diagram places each flow on a different axis. Additive increase moves the operating point diagonally upward toward the capacity boundary; multiplicative decrease moves it back toward the equal-share line. Repetition tends toward equal sharing for comparable TCP flows.` },
      { type: 'text', text: `Fairness is not automatic across every application behavior. A UDP application can send at a fixed rate without TCP's congestion response. Also, one application can open many parallel TCP connections: on a link already shared by nine connections, one new connection might get about R/10, while eleven new connections from one application could collectively obtain about R/2. This explains why connection-level fairness is not identical to application-level fairness.` },
      { type: 'heading', text: `Chapter recap` },
      { type: 'list', items: [`Congestion creates queueing delay, loss, duplicate work, and wasted upstream capacity.`, `TCP uses cwnd and observed signals to regulate offered load; its effective allowance is limited by both cwnd and rwnd.`, `Slow start grows exponentially; congestion avoidance grows linearly; ssthresh marks the transition.`, `AIMD and fast recovery respond differently to duplicate-ACK loss and timeout loss.`, `CUBIC, delay-based approaches, and ECN show that congestion control continues to evolve.`] }
    ],
  },
];
