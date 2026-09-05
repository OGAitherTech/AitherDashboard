# AitherDashboard

AitherDashboard is the central control panel for a user's shared Aither account and cloud data.

## Version

AitherDashboard v1.3.0

## My Data

The **My Data** section reads `GET /api/data` from AitherBackend and displays the signed-in user's synchronized Aither service data grouped by app. It is designed to be the central place to inspect data from Notes, Clock, Calculator, Maps, AI, Web, Weather, Aither Apps, and Aither Forge.

The dashboard never asks for another service's password or private API key. Data access is authorized by the same AitherBackend session used across the ecosystem.

## Shared Aither Account

Create or sign in with the same Aither account used by the Aither services.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/session`
- `POST /api/auth/logout`
- `GET /api/data`
- Default backend: `https://aither-backend.onrender.com`
- Session cookies are sent with credentialed requests.

## Features

- Responsive desktop and mobile UI
- Shared Aither account creation and sign-in
- Central **My Data** cloud view
- Per-service synchronized data cards with expandable JSON inspection
- Aither Backend session/account status
- Connected app registry
- Backend updates and notifications
- Backend status, health, version, and environment
- Configurable backend URL for development or alternate deployments
- Cookie-based authentication support with `credentials: include`
- Optional 60-second automatic refresh
- Works as a static site and is suitable for GitHub Pages

## Production Backend

The dashboard defaults to `https://aither-backend.onrender.com`. AitherBackend must use HTTPS, credentialed CORS, and compatible secure cross-site cookies for GitHub Pages authentication.

## GitHub Pages

This is a static HTML/CSS/JavaScript app. Publish the repository's `main` branch with GitHub Pages using the repository root as the source.
