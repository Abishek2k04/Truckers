# TRUCKER PRO — Advanced Logistics Simulator (demo)
## Setup (Windows CMD)
```
cd trucker-pro
npm install
npm run dev
npm run build
npm run preview
```
## Structure
- `src/config/progression.ts` — all XP/level/loan settings. XP formula mode is selectable: `linear`, `percent` (additive, non‑compounding) or explicit `table`; each level is computed independently.
- `src/hooks/store.ts` — mock game state + localStorage persistence (key `trucker-pro-demo-v1`). Reset in Settings.
- `src/services/truckService.ts` — interface for a future real backend.
## FiveM integration (future)
A public website can NOT safely read server data directly. Never put oxmysql credentials, Cfx.re keys or API secrets in frontend code, and never connect the browser to the database.
Required: a backend (Node/Express etc.) or the `truck` resource exposing a small authenticated HTTP API (or NUI callbacks for in‑game use) that validates the player (e.g. Cfx.re/Discord login → citizenid), enforces all rules server‑side (balance, level, ownership) via QBCore/Qbox + oxmysql, and returns only that player's data. Then implement `TruckService` over that API and swap it for the mock.
All data in this demo is fictional.
