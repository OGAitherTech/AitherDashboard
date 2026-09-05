# AitherDashboard

AitherDashboard is the central control panel for a user's shared Aither account, cloud data, connected apps, backend status, updates, and notifications.

## Version

AitherDashboard v1.5.0

## Shared Aither Account

Use the same Aither account across the Aither ecosystem. The dashboard connects to the production Aither Backend automatically and keeps account access in one place.

Supported account routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/session`
- `POST /api/auth/logout`
- `GET /api/data`

The browser stores the returned Aither session token locally and sends it as a Bearer token for authenticated API requests. The dashboard does not ask for another Aither service's password or private API key.

## My Data

The **My Data** section reads `GET /api/data` and displays the signed-in user's synchronized Aither service data grouped by app. It is designed as the central place to inspect data from Notes, Clock, Calculator, Maps, AI, Web, Weather, Aither Apps, and Aither Forge.

## Features

- Shared Aither account creation and sign-in
- One account entry point in the dashboard header
- Central **My Data** cloud view
- Per-service synchronized data cards with expandable JSON inspection
- Aither Backend session/account status
- Connected app registry
- Backend updates and notifications
- Backend status, health, version, and environment
- Built-in **Test connection** diagnostics with response time
- Production backend selected automatically
- Optional backend override for local development or alternate deployments
- Bearer-token authentication for GitHub Pages-friendly requests
- Stale legacy backend URL cleanup
- Automatic stale-session cleanup when the backend reports an invalid session
- Optional 60-second automatic refresh
- Responsive desktop, tablet, and iPhone/Safari-friendly UI
- Mobile sidebar behavior with touch-friendly controls
- Reduced-motion support for accessibility
- Improved keyboard focus states and accessible labels
- Works as a static site and is suitable for GitHub Pages

## Production Backend

The production dashboard backend is `https://aitherbackend.onrender.com`.

The dashboard uses direct browser requests with Bearer authentication so it can work reliably from a static GitHub Pages deployment without depending on third-party cookie behavior.

## GitHub Pages

This is a static HTML/CSS/JavaScript app. Publish the repository's `main` branch with GitHub Pages using the repository root as the source.

## Recent Improvements — v1.5.0

- Refreshed the visual system with cleaner cards, depth, spacing, and focus states.
- Added smoother view transitions and button interaction feedback.
- Improved sticky mobile/desktop top-bar behavior.
- Improved small-screen layouts for iPhone-sized displays.
- Added safe-area-friendly responsive behavior and better text wrapping.
- Added reduced-motion support.
- Added a mobile sidebar backdrop style when the navigation drawer is open.
- Updated documentation to match the current Bearer-token authentication flow.
