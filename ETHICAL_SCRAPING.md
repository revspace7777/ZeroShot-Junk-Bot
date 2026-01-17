# Server-Tolerant & Ethical Scraping Strategy

This document outlines the techniques employed (and recommended) to ensure our data extraction remains "server tolerant"—minimizing load on `goloadup.com` while maximizing our reliability and avoidance of blocking.

## 1. Traffic & Concurrency Control
*   **Worker Limits (`--workers`)**:
    *   *Purpose*: Strictly limits the number of simultaneous connections to the server.
    *   *Function*: Prevents "Denial of Service" behavior. We should keep this reasonable (e.g., 5-10 workers) to avoid spiking their server load.
*   **Rate Limiting (Per-Worker Delay)**:
    *   *Purpose*: Adds a "human-like" or "system-friendly" pause between requests.
    *   *Function*: Each worker sleeps for `X` milliseconds (e.g., 100-500ms) between actions. This smooths out the traffic pattern.
*   **Exponential Backoff**:
    *   *Purpose*: Handle server overload signals (HTTP 429/500/503) gracefully.
    *   *Function*: If the server errors, we pause and wait progressively longer (1s, 2s, 4s...) before retrying, giving their system time to recover.

## 2. Data Efficiency
*   **Resume Capability (`--resume`)**:
    *   *Purpose*: Never scrape the same data twice.
    *   *Function*: Checks existing records (DB or JSON) before queuing a task. This saves thousands of unnecessary requests if a job is interrupted.
*   **Targeted GraphQL Queries**:
    *   *Purpose*: Request ONLY the data we need.
    *   *Function*: Unlike scraping HTML (which fetches images, CSS, ads), our GraphQL queries fetch ~500 bytes of pure JSON. This is extremely lightweight for their bandwidth.

## 3. Fingerprinting & Identification
*   **Session Reuse (Keep-Alive)**:
    *   *Purpose*: Mimic a consistent user session and reduce handshake overhead.
    *   *Function*: We reuse the same TCP connection (via `requests.Session`) rather than opening a new socket for every request. This lowers CPU overhead for their load balancers.
*   **User-Agent Rotation (Planned)**:
    *   *Purpose*: Avoid traffic looking like it comes from a single bot script.
    *   *Function*: Rotate valid `User-Agent` strings (Chrome, Firefox, Safari) to blend in with legitimate traffic.
    *   *Note*: Currently using a standard Mozilla string, but rotation adds safety.

## 4. Architecture
*   **Decoupled Storage (SQLite)**:
    *   *Purpose*: Prevent local I/O bottlenecks from slowing down network operations.
    *   *Function*: writing to a local DB is instant compared to network requests, ensuring our script doesn't "hang" or create weird connection timeouts.

## Summary Checklist for "Stealth"
- [ ] Low Concurrency (start small, e.g., 5 workers).
- [ ] Random Jitter (randomize sleep times slightly, e.g., 0.1s - 0.3s).
- [ ] Respect HTTP 429 (Too Many Requests).
- [ ] Use valid CSRF tokens (shows we are a "legitimate" browser-like client).
