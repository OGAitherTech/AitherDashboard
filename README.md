# AitherDashboard

AitherDashboard is the central control panel for a user's shared Aither account and cloud data.

## Version

AitherDashboard v1.4.0

## Shared Aither Account

Use the same Aither account across the Aither ecosystem. The dashboard connects to the production Aither Backend automatically and keeps account access in one place.

Supported account routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/session`
- `POST /api/auth/logout`
- `GET /api/data`

The dashboard uses credentialed requests and the shared Aither Backend session. It does not ask for another Aither service's password or private API key.

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
- Production backend selected automatically
- Optional backend override for local development or alternate deployments
- Credentialed authentication support with `credentials: include`
- Optional 60-second automatic refresh
- Responsive desktop, tablet, and mobile UI
- Improved keyboard focus states and accessible labels
- Works as a static site and is suitable for GitHub Pages

## Production Backend

The production dashboard backend is `https://aitherbackend.onrender.com`. For GitHub Pages authentication to work reliably, the backend deployment must allow the dashboard origin through credentialed CORS and use compatible secure cross-site cookie settings.

## GitHub Pages

This is a static HTML/CSS/JavaScript app. Publish the repository's `main` branch with GitHub Pages using the repository root as the source.
