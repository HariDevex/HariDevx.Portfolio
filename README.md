# Portfolio (MERN Edition)

Modernized the static portfolio into a MERN-friendly setup with a React/Vite front-end and Express API that can plug into MongoDB.

## Structure
- `client/` — React + Vite single-page portfolio (pulls data from API). Assets live in `client/public/img` and `client/public/Doc`.
- `server/` — Express API exposing the portfolio data and a contact endpoint, ready to connect to MongoDB via `MONGODB_URI`.

## Quick start
1) Install deps
```bash
cd server && npm install
cd ../client && npm install
```
Tailwind CSS is wired through PostCSS; adjust `tailwind.config.js` if you add new file paths.

2) Run the API (port 4000 by default)
```bash
cd server
cp .env.example .env   # add MONGODB_URI if you have one
npm run dev
```

3) Run the React dev server (port 5173)
```bash
cd client
npm run dev
```

4) Open `http://localhost:5173` — the client will proxy `/api` calls to `http://localhost:4000`.

## Production build
```bash
cd client && npm run build
```
Serve `client/dist` behind any static host and point it to your API URL with `VITE_API_URL=https://your-api`. Add a reverse proxy for `/api` or configure CORS on the server.

## API routes
- `GET /api/portfolio` — returns structured portfolio data (hero, summary, education, skills, gallery, projects, contact).
- `GET /api/contact` — lightweight health check (reports Mongo status).
- `POST /api/contact` — accepts `{ name, email, message }`; currently logs to the server console.

## Notes
- Mongo is optional; if `MONGODB_URI` is unset the API serves in-memory data and reports `mongoStatus: "skipped"`.
- Design tokens and layout live in `client/src/styles/main.css`.
