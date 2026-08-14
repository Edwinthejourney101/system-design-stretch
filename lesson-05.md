# Lesson 5: The System Audit

The written audit of your running system. Every claim must be backed by
something you observed in the Network tab, the console, or the server's
terminal output.

## Single point of failure

## Latency

## Caching

## The layers

## One request's full journey

## STRETCH: what a real system would need that json-server skipped

# System Architecture Audit: Stretch Records

## 1. Single Point of Failure (SPOF) and Failure Handling

- **Observation:** When the local `json-server` was stopped while the web page was active, reloading the page triggered an immediate connection refusal. Because the asynchronous `fetch()` call failed to connect, the `catch` block executed, presenting the visitor with the on-screen error banner (`Oops! Failed to fetch`) while the `finally` block successfully cleared the loading state.
- **Single Point of Failure (SPOF):** The local Node.js process running `json-server` on port 3000 is a complete SPOF; if it goes offline, the application cannot retrieve data or persist new entries.
- **Redundancy:** Redundancy in this context would mean deploying a replicated, failover backend service across multiple independent nodes or cloud instances so that if one server instance fails, another automatically handles incoming requests without service disruption.

---

## 2. Latency

- **Observation:** Throttling the network connection in DevTools to **"Slow 3G"** significantly increased the time required for data delivery. The load time jumped from under 50ms to several seconds.
- **User Experience:** While waiting for the network response, the loading message (`<p id="loading">Loading data from multiple servers...</p>`) held the screen, preventing the user from seeing stale or broken layouts.
- **Definition:** This delay is known as **network latency**—the time elapsed between initiating the HTTP request and receiving the first byte of data back from the server.

---

## 3. Caching

- **Observation:** Comparing reloads with **"Disable cache"** checked versus unchecked revealed a noticeable delta in resource delivery. With caching enabled, subsequent fetches utilized browser disk/memory cache or received fast validation headers, reducing network overhead and render times.
- **Definition:** **Caching** stores static responses locally in the browser so that repetitive requests for unchanged resources bypass the remote server entirely, optimizing bandwidth and performance.

---

## 4. Layer-by-Layer Architecture

- **Presentation Layer (Client):** The browser environment executing HTML, CSS, and modern JavaScript (`script.js`). It manages user interaction, DOM manipulation, form inputs, and the UI rendering loop.
- **Application Layer (Middle):** The Node.js-powered `json-server` running locally.
  - _What sits here:_ HTTP request routing, header management (including CORS headers like `Access-Control-Allow-Origin`), and JSON body parsing.
  - _What does NOT sit here:_ Real business logic, transactional validations, robust authentication middleware, or persistent database indexing (it merely reads/writes a flat JSON file).
- **Data Layer (Storage):** The flat file **`artists.json`** residing on the file system, representing persistent storage.

---

## 5. Full Request Journey

Tracing a single `GET http://localhost:3000/artists` request through the system based on DevTools and server terminal logs:

1. **Initiation:** JavaScript executes `fetch('http://localhost:3000/artists')`, creating an asynchronous HTTP request object.
2. **Transport & Network:** The browser translates the URL, resolves `localhost`, and sends a TCP/HTTP GET request across the loopback interface.
3. **Server Processing:** The server terminal logs the incoming request: `GET /artists 200 OK`. The application layer reads `artists.json` from disk.
4. **Response:** The server packages the data with headers (`Content-Type: application/json`, CORS headers) and returns status `200 OK`.
5. **Client Parsing:** The browser receives the fulfilled Promise, runs `.json()` to parse the payload into a JavaScript array, and iterates through the records to dynamically construct DOM elements (`<article>`, `<h3>`, `<p>`), rendering the cards on screen.

---

## 6. Production Gaps & Security Realism

A production-grade system requires components that `json-server` intentionally omits:

- **Validation:** Ensuring incoming data adheres to strict structural and sanitization rules (preventing injection attacks or malformed entries).
- **Identity & Authentication:** Verifying who is making the request (e.g., JWT tokens, session cookies) before granting write access.
- **Business Rules:** Enforcing unique constraints, role-based permissions, and rate-limiting.
- _Conclusion:_ As proven in previous lessons, client-side validation can easily be bypassed in the browser; therefore, **security and critical validation can never live in the browser alone**—they must be enforced strictly on the server backend.
