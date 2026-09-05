# AitherDashboard

AitherDashboard is the central web dashboard for viewing data exposed by AitherBackend.

## Features

- Responsive desktop and mobile UI
- Direct connection to the production AitherBackend Render deployment
- Aither Backend session/account status
- Account profile data
- Connected app registry
- Backend updates
- Notifications
- Backend status, health, version, and environment
- Configurable backend URL for development or alternate deployments
- Cookie-based authentication support with `credentials: include`
- Render connection status and response timing
- Optional 60-second automatic refresh
- Works as a static site and is suitable for GitHub Pages

## Production Backend

The dashboard defaults to:

`https://aither-backend.onrender.com`

The dashboard reads the public AitherBackend API endpoints, including:

- `GET /api/auth/session`
- `POST /api/auth/logout`
- `GET /api/status`
- `GET /api/health`
- `GET /api/version`
- `GET /api/config`
- `GET /api/apps`
- `GET /api/updates`
- `GET /api/notifications`

The backend URL can still be changed from **Settings**. The dashboard does not contain private API keys or provider secrets.

For browser authentication to work across origins, AitherBackend must be deployed over HTTPS and configured with CORS for the dashboard origin. Its session cookie settings must also be compatible with the deployment.

## GitHub Pages

This is a static HTML/CSS/JavaScript app. Publish the repository's `main` branch with GitHub Pages using the repository root as the source.

## Version

AitherDashboard v1.1.0
