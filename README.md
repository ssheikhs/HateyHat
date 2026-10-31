# HateyHat — Social Development Events Platform

**HateyHat** (হাতে হাত, "hand in hand") is a community platform where people create, join and track social service events in their neighbourhood: winter clothes distribution in Mirpur, blanket drives in Mohammadpur, tree plantations, blood donation camps and more.

🔗 **Live site:** https://hateyhat.vercel.app
🔗 **Server repo:** https://github.com/ssheikhs/hateyhat-server

## Features

- **Email/password and social login** with BetterAuth (Google and GitHub), password rules checked on both the form and the server, and toasts for every success and error.
- **Create events** with title, description, event type, a thumbnail (upload from your computer or paste a link), location and a date that must be in the future, with a live preview of the event card while you type.
- **Upcoming Events** shows only events that haven't happened yet, with search by title or area and quick filters by event type.
- **Join or leave events** from the public details page; organizers see the list of volunteers who joined.
- **Manage Events** lets organizers update or delete their own events (the API rejects changes from anyone else), and **Joined Events** lists everything you signed up for, sorted by date.
- **Profile page** to update your name and photo (uploaded or linked), with counts of the events you organized and joined.
- **Light and dark themes** that switch the whole site and remember your choice, plus loading skeletons on every data-driven page.
- **Protected API**: every private request carries a short-lived JWT signed by BetterAuth and verified by the Express server against the published JWKS.

## Tech stack

Next.js 16 (App Router) · JavaScript · Tailwind CSS 4 · DaisyUI 5 · BetterAuth + MongoDB adapter + JWT plugin · React Hot Toast · SweetAlert2 · Express 5 · MongoDB

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

The Express server must be running (see the server repo) and `NEXT_PUBLIC_API_URL` must point to it. The browser reaches the API through `/api/server/*`, which Next.js forwards to that URL, so no CORS setup is needed.

## Environment variables

| Name | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (same cluster as the server) |
| `DB_NAME` | Database name, e.g. `hateyhat` |
| `BETTER_AUTH_SECRET` | Long random string |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | URL of this site, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | URL of the Express server |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth app |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app |
