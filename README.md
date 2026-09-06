# AitherDashboard

AitherDashboard is the central control panel for a user's shared Aither account, cloud data, connected apps, backend status, updates, and notifications.

## Version

AitherDashboard v1.6.0

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
- One-click JSON export of the dashboard's currently returned account, app, update, notification, system, and cloud data
- Dashboard-wide search with mobile-friendly search expansion
- Recent activity quick view on the Overview page
- Visible last-sync time after successful dashboard refresh
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
- Optional remembered dashboard search
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

## Recent Improvements — v1.6.0

- Added dashboard-wide search, including a mobile search mode.
- Added JSON export for the dashboard data already returned to the browser.
- Added a last-sync indicator to make refresh state clearer.
- Added a recent activity section to the Overview screen.
- Added optional remembered search preference.
- Improved status indicator classes so healthy, warning, and unavailable states are visually distinct.
- Exposed a small `window.AitherDashboard` API for refresh, view navigation, export, and state inspection.
- Kept the existing static GitHub Pages architecture and shared Aither Backend authentication flow.

## Source Basis

The dashboard is intended to remain the central Aither control surface. The Aither Core Panel feature plan calls for account management, a dashboard/system overview, basic controls/settings, and activity history. The advanced plan adds multi-user access, stronger authentication, emergency controls, camera/audio integrations, webhooks, dispatch integration, and OTA management; those advanced backend-dependent features should only be enabled when the corresponding Aither Backend APIs actually exist.