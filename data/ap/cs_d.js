const t = (text) => ({ type: 'text', text });
const h = (text) => ({ type: 'heading', text });
const l = (items) => ({ type: 'list', items });
const c = (code) => ({ type: 'code', code });

export const csChaptersD = [
  {
    id: 'web-security-threats-and-attacks',
    title: 'Web Security: Threats and Attacks',
    blocks: [
      t(`Web applications put powerful services within a click: banking, learning, health care, and communication. That convenience makes the browser a security boundary worth understanding carefully. We will first trace an ordinary web exchange, then see how an attacker can misuse the assumptions behind it.`),
      h(`A browser, a server, and a request`),
      t(`A browser is the client: it asks for a resource. A server receives that request, may consult files, databases, or application code, and returns a response. The workflow figure shows this as two arrows between a browser on the left and a server in the middle: the rightward arrow is a URL-based request, and the leftward arrow is an HTML response. Two arrows also connect the server to stored files and application resources on its right.

Hypertext Transfer Protocol, or HTTP, is the request-and-response protocol browsers use for pages, images, scripts, downloads, and application programming interface calls. HTTP itself is stateless: a server does not automatically remember that two separate requests came from the same person.`),
      c(`GET /courses?topic=web HTTP/1.1
Host: learn.example
Accept: text/html`),
      t(`This small request asks the host learn.example for one resource. Request headers can reveal useful operational information, such as accepted formats, browser characteristics, language preferences, and sometimes the page that linked here. Treat such headers as untrusted input, not proof of identity.

A response begins with a status line, then headers, then usually a body. Status families give a quick summary: 2xx means success, 3xx means redirection, 4xx means the client request was rejected, and 5xx means the server failed while handling it.`),
      c(`HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<h1>Welcome</h1>`),
      h(`URLs and methods`),
      t(`A Uniform Resource Locator, or URL, identifies a resource. Its scheme says how to communicate, its host names a server, its optional port selects a service, its path selects a resource, and its query carries name-and-value parameters. A fragment after a number sign is normally interpreted by the browser to navigate within a document, rather than sent to the server.

For example, in https://learn.example:443/search?q=network, HTTPS is the scheme; learn.example is the host; 443 is the port; /search is the path; and q=network is the query. Percent encoding represents special characters in a URL, but decoding does not make input safe; validation is still required.`),
      t(`GET is intended to retrieve a representation. Its parameters are often visible in the address bar, browser history, logs, and referral information, so it is a poor place for secrets or state-changing operations. POST carries data in the request body, which is less exposed in the address bar but is not encryption and does not make data trustworthy.

Asynchronous browser requests, historically called XMLHttpRequest and commonly made with fetch, let a page obtain data without a full reload. They support interactive applications, but they remain subject to browser security rules.`),
      h(`HTML and the Document Object Model`),
      t(`HTML describes a document as nested elements. The browser represents that document in memory as the Document Object Model, or DOM: a tree of nodes that scripts can inspect and change. The DOM figure labels a hierarchy from the browser and window, through a document, down to elements such as a heading and paragraph.`),
      c(`<ul id="topics">
  <li>HTTP</li>
</ul>`),
      t(`In this example, the list is an element node, its list item is a child node, and the visible word HTTP is a text node. JavaScript can create a node, add it, remove it, or alter an event handler. This flexibility is useful—and is exactly why untrusted data must never be treated as trusted markup or script.`),
      h(`HTTPS protects the trip, not every action`),
      t(`Plain HTTP can be read or altered by someone able to observe the path. Hypertext Transfer Protocol Secure, or HTTPS, uses Transport Layer Security, or TLS, to authenticate the server and protect data in transit with encryption and integrity checks.

The TLS diagram is a two-column conversation between client and server. They first exchange hello messages and fresh random values, then the server supplies a certificate. After certificate validation and key-establishment messages, both sides derive shared secrets, switch to encrypted communication, and confirm that the handshake has finished.`),
      t(`Certificate authorities help browsers associate a public key with a domain name. This system depends on correct certificate validation and on users not bypassing certificate warnings. HTTPS protects a connection from many network attackers, but it does not repair a vulnerable server, a malicious script delivered by the legitimate site, or a forged request that the browser itself is allowed to send.`),
      h(`Cookies, sessions, and origins`),
      t(`Because HTTP is stateless, applications commonly use a cookie containing a random session identifier. On each later request to the cookie’s scope, the browser can attach it automatically. The server looks up the identifier and recovers the authenticated session state.`),
      c(`Cookie: session=unpredictable-random-value`),
      t(`A cookie is a bearer credential: whoever can send a valid session value may be treated as that session. This is why theft through script injection and misuse through cross-site requests are so serious.

The same-origin policy, or SOP, limits one origin’s scripts from reading another origin’s protected content. An origin is the combination of scheme, host, and port. A page at https://portal.example and one at http://portal.example differ by scheme; https://portal.example:8443 differs by port; and https://staff.portal.example differs by host.`),
      t(`The SOP is mainly a reading boundary, not a rule that prevents every cross-origin request. A malicious page can often cause a browser to navigate, load a resource, or submit a form to another site. The key question is whether it can read the response or whether the target will accept the action.`),
      h(`Broken authentication and authorization`),
      t(`Broken authentication or session management occurs when an application makes it too easy to guess, steal, reuse, or fix a login session. Predictable session identifiers, missing expiration, unchanged identifiers after login, weak password handling, and insecure recovery flows all create openings.

An insecure direct object reference, often called IDOR, happens when a server uses an identifier from the request without checking that the authenticated user may access that object. A URL such as /invoice/1042 is not an authorization decision; the server must verify ownership or an appropriate role on every request.`),
      h(`Cross-site scripting`),
      t(`Cross-site scripting, or XSS, occurs when a site puts attacker-controlled content into a browser context where it becomes executable code. The attacker’s goal is not merely a pop-up: code running under the trusted site’s origin may alter the page, impersonate actions, read accessible data, or send information away.

Reflected, or non-persistent, XSS happens when a request value is immediately reflected into a response. An attacker can send a victim a crafted search link; the legitimate site returns the attacker’s text in the page, and the victim’s browser interprets it as markup or script if the application failed to encode it.`),
      c(`// Vulnerable server-side rendering
page = "<p>You searched for: " + query + "</p>";

// If query is treated as HTML, attacker-controlled markup can run.`),
      t(`The reflected-XSS figure is a text-focused example: a page echoes a supplied value, and a specially constructed input causes code to execute in the victim’s browser. The important lesson is that a valid HTTPS address and a familiar domain do not save a page that renders untrusted input as code.

Stored, or persistent, XSS occurs when hostile content is saved in a database, forum post, profile, support ticket, or other backend store. Every later visitor who receives that content may trigger the attack. Its reach can be much wider because the attacker need not persuade each victim to follow a unique link.`),
      t(`DOM-based XSS arises when client-side JavaScript reads untrusted data—perhaps a URL fragment, query value, or message—and inserts it into an unsafe DOM sink such as innerHTML. The server response may be harmless; the unsafe transformation happens entirely in the browser.`),
      c(`// Unsafe DOM update
message.innerHTML = location.hash.slice(1);

// Safer: insert text, not markup
message.textContent = location.hash.slice(1);`),
      t(`A related figure shows a login form whose action is changed by injected script. In words, the form originally sends credentials to the expected login endpoint; hostile code changes that destination before submission, so the victim unknowingly sends credentials elsewhere. This illustrates why XSS can defeat many other browser defenses.

Injected code may appear in markup, attributes, event handlers, URLs, or browser features that interpret strings as JavaScript. Defenders should not rely on blocking one tag or one spelling: correct context-sensitive encoding and safe DOM APIs are the durable answer.`),
      h(`Cross-site request forgery`),
      t(`Cross-site request forgery, or CSRF, tricks an already logged-in browser into sending a state-changing request to a site that trusts its automatically attached credentials. The attacker usually cannot read the response because of the same-origin policy, but may not need to: making the transfer, changing an email address, or modifying a router setting is the goal.

CSRF is a confused-deputy problem. The browser possesses authority in the form of a session cookie; a hostile page supplies instructions; and the target site mistakes the browser’s attached authority for the user’s intentional approval.`),
      c(`POST /transfer HTTP/1.1
Host: bank.example
Cookie: session=valid-session

to=attacker-account&amount=100`),
      t(`The CSRF flow figure can be followed in four steps: the victim logs in to a trusted site, so a session cookie is stored; the victim later visits an attacker-controlled page; that page silently causes the browser to request a sensitive endpoint at the trusted site; and the browser attaches its cookie, so an unprotected server performs the action as the victim.

One visual example uses a hidden image whose source is a money-transfer URL. Loading an image makes a request even though nothing meaningful is displayed. Modern applications should never use GET for a sensitive change, but changing to POST alone is insufficient because a hostile page can submit a form too.`),
      t(`CSRF can also target devices on a private network. If a router keeps a default credential or accepts unauthenticated state changes, a page visited from inside the network may send requests to the router’s private address. The router example emphasizes that a perimeter firewall does not make an internal web control panel safe from the user’s own browser.`),
      h(`Injection beyond the browser`),
      t(`Injection means data crosses a language boundary and is mistakenly interpreted as part of a command. JavaScript injection is one case; Structured Query Language injection, or SQL injection, command injection, XML injection, and file inclusion are others. The underlying mistake is the same: concatenating untrusted data into program syntax.`),
      c(`// Vulnerable SQL construction
sql = "SELECT * FROM users WHERE name = '" + name + "'";

// Input such as ' OR '1'='1 changes the WHERE condition.`),
      t(`The SQL-injection figure shows a query template with a quoted name field. When a quote and an always-true condition are supplied as data, the database parser sees a different query, one that can match every row. The attacker did not “break SQL”; the application gave the attacker control over SQL grammar.`),
      c(`// Vulnerable command construction
run("report --user " + userName);

// A shell metacharacter in userName can be interpreted as another command.`),
      t(`Command injection is similar, but the interpreter is a command shell or operating-system command runner. Passing a single argument array to a process API and avoiding a shell is safer than composing a command string. An application service account should also have only the permissions it needs.

Binary shellcode is a low-level payload intended to execute inside another process after an exploitation flaw permits it. The shellcode diagram traces a short instruction sequence being assembled into bytes and hidden inside what looks like ordinary data before it reaches a target process. The security goal is to prevent the memory-safety flaw and stop unexpected code execution, not to depend on recognizing one byte sequence.`),
      t(`Static shellcode analysis compares content with known instruction patterns; it is fast but can miss obfuscated variants. Dynamic analysis emulates suspicious content and observes its behavior; it can see through more disguises but costs more time and can still be evaded. These trade-offs foreshadow the detection systems we will study later.`),
      h(`Other web attack surfaces`),
      t(`Clickjacking places a genuine sensitive control inside a transparent or misleading frame so that a user clicks it while believing they clicked something else. The trusted page performs a real action, but consent was manipulated. Frame restrictions and clear confirmation for high-impact actions help.

File inclusion vulnerabilities occur when an application lets a request choose a file or template without strict control. A local-file inclusion bug may expose server files; remote inclusion can cause the server to fetch or execute unwanted content in unsafe configurations. Use fixed allowlists and mapped identifiers, not arbitrary paths from requests.`),
      h(`Chapter recap`),
      t(`The web is a chain of interpreters and delegated trust: browser, server, database, session cookie, and DOM. XSS turns data into code in a trusted origin; CSRF misuses automatically attached authority; injection turns data into commands. In the next chapter, we build defenses that preserve those boundaries deliberately.`)
    ]
  },
  {
    id: 'web-security-defenses',
    title: 'Web Security: Defenses',
    blocks: [
      t(`Now that you can name the trust boundaries an attack crosses, we can defend them methodically. Good web security is not one magic header or library; it is a set of mutually reinforcing habits that make untrusted input stay data and make important actions require real authorization.`),
      h(`Begin with a trust model`),
      t(`Never trust client input. This includes form fields, URL parameters, cookies, request headers, uploaded filenames, API JSON, values placed in hidden fields, and data received from another internal service. A browser can be modified, requests can be replayed, and “hidden” is only a presentation choice.

Validation asks whether input is acceptable for its intended meaning. Prefer allowlists: define permitted length, type, syntax, range, and business rules, then reject everything else. For example, an account number may need a fixed character set and a server-side ownership check; merely stripping a few suspicious characters is not enough.`),
      l([`Validate on the server, even when the browser also provides helpful client-side validation.`, `Canonicalize carefully before validation when more than one encoding could represent the same value.`, `Give users useful errors, but do not reveal stack traces, secrets, or internal query details.`, `Log rejected inputs safely so log viewers cannot be attacked by the logged content.`]),
      h(`Encode for the output context`),
      t(`Validation cannot predict every harmless piece of user prose. Output encoding therefore protects the moment data is rendered. It changes reserved characters into a representation the current parser treats as text rather than syntax.`),
      c(`// Render plain text safely in HTML
<p>Comment: &lt;not executable markup&gt;</p>`),
      t(`Encoding is context-specific. HTML element text, an HTML attribute, a URL component, a JavaScript string, and a CSS value each have different grammar rules. A value encoded for one context is not automatically safe in another, so avoid constructing code contexts from strings whenever possible.

Use framework escaping by default and safe DOM interfaces such as textContent. Avoid dangerous sinks such as innerHTML, document.write, and string-based event handlers unless a carefully reviewed sanitizer is required for a narrowly defined rich-text feature.`),
      h(`Prevent injection with structure, not escaping alone`),
      t(`Parameterized queries, also called prepared statements, separate SQL syntax from data. The database parses the fixed query structure first, then binds each value as a typed value. A quote inside a name remains part of that name; it cannot become a new WHERE clause or command.`),
      c(`const statement = db.prepare(
  "SELECT * FROM users WHERE username = ? AND room = ?"
);
const rows = statement.all(username, roomNumber);`),
      t(`This is safer than string concatenation because the placeholders describe data positions. Strong typing and server-side validation add useful checks, but they do not replace parameter binding.

Use safe APIs for every interpreter boundary: parameterized database calls, argument-array process execution without a shell, structured library calls instead of dynamic expressions, and schema-aware parsers. Object-relational mapping tools can help when they continue to bind parameters, but review any escape hatch that accepts raw queries.`),
      t(`Give the database and service accounts least privilege. A read-only reporting account should not be able to delete tables; a web process should not administer the host. This turns a missed validation bug into a smaller incident rather than total compromise.`),
      h(`Defend sensitive actions from CSRF`),
      t(`Use an unpredictable anti-CSRF token that an attacker’s site cannot read. The server associates it with the authenticated session, or validates it using a sound stateless design, and checks it on every state-changing request.`),
      c(`<form method="post" action="/transfer">
  <input type="hidden" name="csrfToken" value="server-generated-random-token">
  <button type="submit">Confirm transfer</button>
</form>`),
      t(`The server must verify the token before performing the change. Tokens should have enough randomness, should not be guessed from a pattern, and should be scoped and rotated thoughtfully. A finer-grained token can better bind a particular action, but introduces more implementation complexity.

Set SameSite on session cookies to limit cross-site attachment. SameSite=Lax is a useful default for many sessions; SameSite=Strict is tighter but can affect legitimate navigation; SameSite=None requires Secure and is appropriate only when cross-site use is truly needed. This is a valuable layer, not a replacement for server-side CSRF validation in sensitive flows.`),
      t(`Use POST, PUT, PATCH, or DELETE for state changes and keep GET free of side effects. Reauthenticate the user, request a transaction-specific confirmation, or require a second factor for unusually sensitive actions. These checks make a stolen click or a stale session less valuable.

XSS can often read page-level anti-CSRF tokens or directly issue trusted requests, so reducing XSS is essential to CSRF protection. Think in layers rather than looking for a single checkbox labeled secure.`),
      h(`Content Security Policy`),
      t(`Content Security Policy, or CSP, is a browser-enforced allowlist describing where a page may load scripts, styles, images, frames, and other resources. A restrictive policy reduces the damage of an accidental injection by making unauthorized script execution harder.`),
      c(`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-random-per-response';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none'`),
      t(`A nonce is a fresh random value the server places both in the policy and on an intended script element. Do not weaken a CSP merely to permit inline event handlers or broad third-party script sources. Start with report-only mode if needed, observe violations, then enforce a policy that the application can maintain.

The frame-ancestors directive controls which sites may embed a page, helping prevent clickjacking. The older X-Frame-Options header can provide compatibility, but CSP is the more expressive modern control.`),
      h(`Manage sessions as high-value secrets`),
      t(`Generate session identifiers with a cryptographically secure random generator. Send them only over HTTPS with the Secure cookie attribute, mark them HttpOnly so ordinary page scripts cannot read them, and choose an appropriate SameSite setting.`),
      l([`Create a new session identifier after successful login and after privilege changes to prevent session fixation.`, `Expire idle and absolute sessions; revoke sessions at logout and after credential resets where feasible.`, `Store only the minimum session data and keep authorization decisions server-side.`, `Rate-limit login, recovery, and token-verification endpoints; monitor for credential stuffing and anomalous use.`]),
      t(`Authentication proves who is making a request; authorization decides what that identity may do. Check authorization on every server-side action and object access. Never assume that a user who can see a link, guess an identifier, or submit a hidden field has permission.`),
      h(`Use HTTPS correctly`),
      t(`Serve the entire authenticated application over HTTPS, not just its login form. Redirect HTTP to HTTPS, avoid mixed active content, and use modern TLS configurations maintained by the platform. Secure transport prevents many network attacks on cookies and forms, but it does not validate input or make an unsafe endpoint safe.

Use HTTP Strict Transport Security, or HSTS, where the deployment supports it, so browsers remember to use HTTPS for the domain. Carefully plan subdomain coverage before enabling it broadly, because the browser will enforce the choice for its configured lifetime.`),
      h(`Secure development practice`),
      t(`Design security in from the first feature: identify assets, actors, trust boundaries, abuse cases, and the permissions each operation needs. Use code review focused on data flow, dependency updates, secrets management, and security tests for the attacks most relevant to the feature.

Keep dependencies and runtime components patched. Pin and review third-party scripts, minimize their privileges, and avoid placing long-lived secrets in source code, client bundles, logs, or URLs. Use a managed secret store and rotate compromised credentials promptly.`),
      t(`Handle failures safely. Use generic login errors, bounded request sizes and timeouts, structured logs with access controls, and a practiced incident response process. Security monitoring should help operators distinguish normal mistakes from abuse without exposing user data unnecessarily.`),
      h(`A defensive checklist`),
      l([`Treat every client-controlled value as untrusted.`, `Allow only valid input and encode every untrusted output for its exact context.`, `Bind query and command parameters instead of concatenating syntax.`, `Require server-verified anti-CSRF tokens and use SameSite cookies for state changes.`, `Use CSP, frame restrictions, HTTPS, and secure cookie attributes as overlapping browser protections.`, `Authenticate strongly, authorize every action, and minimize the privileges of every account.`]),
      h(`Chapter recap`),
      t(`The safest pattern is simple to state and demanding to practice: preserve structure. Data stays data through queries, commands, pages, and DOM updates; sessions remain secret and short-lived; and a server independently confirms every sensitive action. With these controls in place, we can now study systems that detect and contain the attacks that still get through.`)
    ]
  },
  {
    id: 'intrusion-detection-and-prevention-systems',
    title: 'Intrusion Detection and Prevention Systems',
    blocks: [
      t(`Preventive controls reduce risk, but no organization should assume every control will always work. Intrusion detection and prevention systems provide a second line of defense: they observe activity, decide whether it is suspicious, alert people, and sometimes block the activity before damage spreads.`),
      h(`What counts as an intrusion?`),
      t(`An intrusion is a set of actions that tries to compromise confidentiality, integrity, or availability—the CIA security goals. Reading protected records threatens confidentiality; changing records threatens integrity; exhausting a service threatens availability.

Intrusion detection is the process of identifying and responding to evidence of an intrusion. Intrusion prevention extends that work with access-control actions intended to stop exploitation: dropping traffic, resetting a connection, quarantining a device, or blocking an account.`),
      t(`An Intrusion Detection System, or IDS, assumes two things. First, relevant system activity can be observed. Second, normal and intrusive activity leaves meaningfully different evidence. Both assumptions have limits, so an IDS produces evidence for judgment rather than a guarantee of safety.`),
      h(`The IDS processing pipeline`),
      t(`At an algorithmic level, an IDS extracts features from audit data and applies models that connect those features into a decision. At a systems level, it needs collection, preprocessing, a knowledge base or model store, a detection engine, alarms, and response handling.

The component diagram flows downward from audit records into an audit-data preprocessor, which produces activity data for a detection engine. A cylinder labeled detection models feeds that engine from the left. Alarms then flow to a decision engine, which also receives a decision table from the left, and finally produces an action or report. The diagram visually ties this pipeline to the two assumptions: observable activity and distinct evidence.`),
      h(`Signature and misuse detection`),
      t(`Misuse detection, also called signature-based detection, compares observed activity with known attack patterns. A signature might identify a protocol violation, a characteristic byte sequence, a known malicious domain, or an implausible header combination.

The signature figure shows a stored collection of intrusion patterns feeding a pattern-matching tree. Observed activity rises from a computer into that tree; a match travels to a red intrusion label and a stop sign. It is a useful mental model: known evidence leads quickly to a known conclusion.`),
      l([`Strength: precise, fast detection for attacks with maintained signatures.`, `Strength: alerts can include a useful name and recommended response.`, `Weakness: a new attack, a changed payload, or a disabled rule may have no matching signature.`, `Weakness: the signature collection must be curated and deployed quickly enough to matter.`]),
      t(`A historical “land” attack pattern, where a packet’s source and destination addresses are the same, illustrates a simple rule. The broader lesson is not that one condition catches all attacks, but that misuse detection looks for explicit known evidence.`),
      h(`Anomaly detection`),
      t(`Anomaly detection builds a profile of expected behavior and flags measurements far outside it. The measurement may be CPU use, process size, login time, connection rate, destination diversity, command sequence, or a statistical property of application data.

The anomaly chart has a horizontal scale for process size and a vertical scale for CPU use. A normal-profile region occupies the expected area, while a distant point is labeled abnormal and probable intrusion. It communicates a useful warning: unusual is a hypothesis, not proof.`),
      t(`Anomalies can be harmless new behavior, such as a legitimate software rollout or a popular event. They can also be caused by faults: a router misconfiguration, link failure, or peer-to-peer application error may resemble an attack. This is why anomaly systems commonly have a higher false-positive rate than narrow signatures.`),
      h(`Errors and the base-rate problem`),
      t(`A true positive is an alert when an intrusion is present. A false negative is an intrusion that produces no alert. A false positive, also called a false alarm, is an alert when no intrusion occurred. A true negative is normal activity correctly left alone.

The detection rate is the share of real intrusions that alert; the false-negative rate is the share missed. The false-alarm rate is the share of ordinary activity that alerts. These rates must be understood alongside operational impact, not as isolated marketing numbers.`),
      t(`The base-rate problem is especially important. Suppose intrusions are very rare among millions of events. Even a detector with an apparently tiny false-positive rate can create far more false alerts than real ones, overwhelming analysts. Tune thresholds against realistic traffic and measure how many alerts actually deserve action.`),
      h(`Host-based and network-based deployment`),
      t(`A host-based IDS, or HIDS, monitors a particular computer using operating-system audit sources: process activity, system calls, file integrity, logs, authentication events, and user commands. It sees what happens after traffic reaches the host, including encrypted application content once the host decrypts it.

HIDS deployment has costs. Sensors must be installed, maintained, and protected on many machines, and a compromised host may try to blind its own sensor. It can also be less effective at observing a large scanning or worm outbreak across a whole address space.`),
      t(`A network-based IDS, or NIDS, observes traffic at strategic points such as gateways, network taps, or switch mirror ports. It can spot protocol violations, connection patterns, scanning, and malicious payloads visible in the traffic.

The deployment figure shows a worm at the far left sending several paths through an Internet cloud and gateway routers into an organization’s network. A host sensor appears inside that network, observing only a limited part of the incoming paths. The visual argument is that a gateway sensor may see a spreading worm earlier and at broader scale than isolated host sensors.`),
      t(`Encryption is a practical challenge for NIDS. Payload and sometimes header information may be unavailable to a passive observer. A security program can combine network metadata analysis with host telemetry or inspect traffic at an authorized decryption point, while carefully protecting the resulting sensitive data.`),
      h(`Network IDS requirements and architecture`),
      l([`Keep up with high-volume traffic while avoiding packet loss.`, `Notify operators in time for a useful response.`, `Separate the detection mechanism from policy choices so policy can evolve.`, `Be extensible, economical with resources, resilient under stress, and hardened against attack.`]),
      t(`The NIDS architecture figure is a vertical pipeline. Network packets flow upward into libpcap, a packet-capture interface; configured filters select a filtered packet stream for an event engine; the event engine emits an event stream to a policy-script interpreter; and that interpreter produces alerts or notifications. Policy scripts and event controls feed downward into the relevant stages.

This architecture makes a key distinction: collection turns packets into events, while policy determines what an organization considers alert-worthy and how it responds. A fast capture engine is not enough if rules, staffing, and escalation paths are unclear.`),
      h(`IDS versus IPS and firewall placement`),
      t(`A passive network IDS watches a copy of traffic and normally fails open: if it stops working, traffic can still pass. A firewall or network Intrusion Prevention System, or IPS, sits in the traffic path and actively filters or blocks; it is often designed to fail closed, meaning a failure may stop traffic rather than risk allowing it.

The firewall-versus-IDS figure places a firewall or IPS inline on the route, with an IDS on a monitoring branch. The contrast is operational: prevention can stop a known threat immediately, but a mistaken rule can disrupt legitimate work. Detection avoids that interruption but requires someone or something else to respond.`),
      t(`Place sensors where they can see useful traffic: at internet boundaries, between sensitive network segments, near critical services, and at cloud or remote-access chokepoints. Avoid assuming one perimeter device sees all east-west movement, encrypted services, wireless paths, or provider-managed traffic.`),
      h(`Evasion and resilient detection`),
      t(`Attackers may fragment packets, split data across segments, alter harmless-looking encodings, flood the sensor, exploit protocol ambiguities, or use encryption to evade inspection. A detector must normalize traffic and reassemble relevant streams in the same way endpoints do, or an attacker can show the IDS one meaning and the target another.

Polymorphic malware changes its outward byte pattern while preserving its malicious goal. The polymorphism figure shows internet traffic reaching a signature filter, while varied bit strings fail to match one exact pattern. This motivates detection tied to the vulnerability or behavior, not only a single exploit string.`),
      t(`A vulnerability signature recognizes a property that must be present to exploit a particular flaw. The buffer-overflow diagram depicts a protocol message whose field grows beyond the capacity of a vulnerable buffer. A length boundary can be harder for many variants to avoid than a fixed payload signature, though it must still be validated carefully to prevent false alarms.`),
      h(`Data sources and zero-day detection`),
      t(`IDSs can examine a single packet’s addresses, ports, flags, and header fields; a sequence of packets checked against protocol specifications; reconstructed connection state and frequency; application content features such as keywords or character distributions; and traffic-flow measures such as volume and velocity.

The zero-day architecture figure begins with a network tap, then a protocol classifier that sorts traffic into boxes such as web, mail, name service, and other protocol flows. Known attacks go through a known-attack filter. Other flows are classified into suspicious traffic or added to a normal-traffic reservoir; core algorithms combine these pools, real-time signals, policy controls, and information from monitored decoy networks to produce signatures.`),
      t(`A zero-day vulnerability is exploited before defenders have an established signature. Statistical baselines, protocol behavior, vulnerability-aware rules, and carefully isolated honeypots or darknets can provide early signals. A honeypot is a monitored decoy; unexpected contact with it can be valuable evidence, but it must be isolated so it does not become an attacker’s stepping stone.`),
      h(`Worms and learning systems`),
      t(`A worm is self-replicating malicious software that exploits a victim and then seeks additional victims. Rapid random probing, a surge of similar traffic, growing destination counts, and many failed connection attempts are useful network-level indicators. Worms may spread through email, messaging, internet services, chat networks, or file sharing.

The email-worm diagram shows outgoing email passing through feature extraction. Labeled training examples feed a machine-learning step to create a model; separately, test data enters a classifier, which outputs either clean or infected. Models such as probabilistic classifiers, support-vector machines, or clustering can assist, but their quality depends on representative training data and careful monitoring for drift.`),
      h(`Next-generation systems and operations`),
      t(`Next-generation IDS and IPS designs seek to combine vulnerability awareness, adaptive signature generation for new attacks, and correlation across multiple audit sources. Correlation helps answer questions a lone alert cannot: what is the scope, target, sequence, and likely intent of an incident?

A Security Information and Event Management system, or SIEM, centralizes and correlates logs and alerts from endpoints, identity systems, applications, cloud services, and network controls. It can improve investigation context, but it inherits the quality problems of its data sources and rules.`),
      t(`Technology succeeds only with policy and management. Define what is protected and what behavior is acceptable, decide who receives which notification and how quickly, document authority to block or isolate systems, and rehearse coordinated response. Tune rules after deployment; an ignored alert is not a defense.`),
      h(`A practical example: Snort-style monitoring`),
      t(`Snort is a well-known multi-mode packet analysis tool. It can act as a packet sniffer, logger, forensic data source, or network IDS. Its design combines packet capture, a rules-based detection engine, and plug-ins.

In sniffer mode, decoded packets are displayed for inspection. In packet-logger mode, data is saved in a chosen format for later analysis. In NIDS mode, the system applies signatures, statistical checks, protocol verification, stream reassembly, fragmentation handling, and application-level normalization.`),
      c(`alert tcp $EXTERNAL_NET any -> $HOME_NET 80 (
  msg:"Example suspicious web request";
  content:"example-marker";
  sid:1000001;
  rev:1;
)`),
      t(`This illustrative rule has a header before the parentheses and options inside them. The header says to alert on TCP traffic from an external network to port 80 in the protected network. The options provide a human-readable message, a content test, a rule identifier, and a revision. In real operations, rules need testing, owners, expiry review, and context before they become blocking controls.`),
      h(`Chapter recap`),
      t(`IDS and IPS are evidence-driven safety systems, not substitutes for secure design. Signature detection is sharp against known attacks; anomaly detection can reveal novel behavior but demands careful tuning. Combine host and network visibility, protect the sensors themselves, use policy-led response, and continually measure false positives, false negatives, coverage, and operational value.`)
    ]
  }
];
