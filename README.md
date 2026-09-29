# Rounds - An Off-Label Tech Discussion

Rounds is an independent technology journalism platform crafted for physicians, by clinicians. It's a vanilla JavaScript Single Page Application (SPA) designed directly for speed, simplicity, and easy hosting without any server footprint.

## Technologies Used
- **Frontend**: Vanilla JavaScript (ES6), HTML5, CSS3.
- **Routing**: Client-side hashless routing handled internally by `js/router.js`.
- **Database**: Local Storage (fully client-side data persistence for articles and settings).
- **Local docs tooling**: The site runs without a build step; pnpm installs the Swagger UI assets for its docs page.

## Setup Instructions

The site needs no build step. Install the local documentation assets once:

1. Clone or download this repository.
2. Open your terminal and navigate to the root folder:
   ```bash
   cd path/to/ROUNDS
   ```
3. Start the static UI:
   ```bash
   corepack enable
   pnpm install --frozen-lockfile
   pnpm run ui
   ```
4. Open `http://localhost:4400`.

ROUNDS serves its own Swagger UI at `http://localhost:4400/docs/` and live generated OpenAPI JSON at `/docs/openapi.json`. Start the platform server on port 8080 as well; the local static server proxies its specification. ROUNDS has no HTTP API of its own.

*(Note: the local web server is strictly required so that CORS policies allow the browser to parse `localStorage` properly and render the subpages).*

## How to Use the Application

### 1. The Main Site (`index.html`)
The user facing site is simple. Users can paginate through clinical articles about technology. All routing is tracked without causing page reloads via `router.js`.

### 2. The Admin Panel (`admin.html`)
To access the admin portal:
- Navigate to `http://localhost:4400/admin.html`
- Sign in with a Firebase Authentication user (email/password) created in the Firebase Console for your project. Set real values in `js/firebase-config.js` first — the panel refuses to authenticate against the placeholder config.

#### Admin Features:
- **Write Articles:** Access a rich text editor where you can input titles, authors, categories, and cover images (from local system or URL). 
- **Manage Articles:** View all built-in seed articles and user-published articles. You can mark articles as featured, edit existing ones, or delete them.
- **Delete Seed Articles:** Hard-coded seed articles can also be deleted; their IDs will be suppressed dynamically utilizing local storage.
- **View Subscribers:** The sidebar tracks people who signed up for the newsletter across the application. You can export these emails as a `.csv` under "Settings".
- **Hard Reset:** If you want to purge all changes and return to the default build, you can click "Delete All User Articles" under Settings. This wipes the user cache and restores any previously deleted seed data.

## Deployment Checklist
This application is perfectly suited for zero-config deployments. Since all data relies on the user's `localStorage` for testing, you'll need to hook up a remote database (like Firebase or Supabase) if you intend for multiple users to read identical newly-published objects. Otherwise, to host the dummy view globally:

- Deploy the `ROUNDS` folder statically to [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or GitHub Pages.
- Add your Google AdSense scripts to the placeholder divs inside `components.js`.
- Connect your newsletter button triggers to your preferred Mailing provider form endpoint (e.g. Mailchimp).
# RONDZ
# RONDZ
