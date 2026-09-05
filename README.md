# AitherDashboard

AitherDashboard is the central web dashboard for viewing data exposed by AitherBackend.

## Version

AitherDashboard v1.2.0

## Shared Aither Account

The dashboard now includes the shared Aither account UI. Create or sign in with the same Aither account used by Aither Notes, Maps, Clock, Calculator, AI, Web, and the other Aither services.

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/session`
- `POST /api/auth/logout`
- Default backend: `https://aither-backend.onrender.com`
- Session cookies are sent with credentialed requests.

## Features

- Responsive desktop and mobile UI
- Direct connection to the production AitherBackend deployment
- Shared Aither account creation and sign-in
- Aither Backend session/account status
- Account profile data
- Connected app registry
- Backend updates
- Notifications
- Backend status, health, version, and environment
- Configurable backend URL for development or alternate deployments
- Cookie-based authentication support with `credentials: include`
- Optional 60-second automatic refresh
- Works as a static site and is suitable for GitHub Pages

## Production Backend

The dashboard defaults to `https://aither-backend.onrender.com` and reads the public AitherBackend API endpoints. The backend URL can still be changed from **Settings**.

For browser authentication to work across origins, AitherBackend must be deployed over HTTPS and configured with CORS for the dashboard origin. Its session cookie settings must also be compatible with the deployment.

## GitHub Pages

This is a static HTML/CSS/JavaScript app. Publish the repository's `main` branch with GitHub Pages using the repository root as the source.
