# Rounds - An Off-Label Tech Discussion

Rounds is an independent technology journalism platform crafted for physicians, by clinicians. It's a vanilla JavaScript Single Page Application (SPA) designed directly for speed, simplicity, and easy hosting without any server footprint.

## Technologies Used
- **Frontend**: Vanilla JavaScript (ES6), HTML5, CSS3.
- **Routing**: Client-side hashless routing handled internally by `js/router.js`.
- **Database**: Local Storage (fully client-side data persistence for articles and settings).
- **No Build Tools**: Runs straight from the browser. No Node, no Webpack, no dependencies.

## Setup Instructions

Since this application contains zero external dependencies and runs purely on the DOM, there is no installation or build process required. 

1. Clone or download this repository.
2. Open your terminal and navigate to the root folder:
   ```bash
   cd path/to/ROUNDS
   ```
3. Start any local web server to serve the static files:
   - **Using Python:**
     ```bash
     python3 -m http.server 8000
     ```
   - **Using Node (npx):**
     ```bash
     npx serve .
     ```
   - *Alternative: Modern editors like VS Code have a "Live Server" extension you can start by right-clicking `index.html`.*
4. Open your browser to `http://localhost:8000` (or whichever port your server booted).

*(Note: the local web server is strictly required so that CORS policies allow the browser to parse `localStorage` properly and render the subpages).*

## How to Use the Application

### 1. The Main Site (`index.html`)
The user facing site is simple. Users can paginate through clinical articles about technology. All routing is tracked without causing page reloads via `router.js`.

### 2. The Admin Panel (`admin.html`)
To access the admin portal:
- Navigate to `http://localhost:8000/admin.html`
- **Default Password:** `offLabel1` (defined at the top of `js/admin.js`)

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
