// PM2 ecosystem for PRODUCTION (runs on the server, under user `deployer`).
// Enables `pm2 reload` zero-downtime rolling restarts for the Node services.
//
// This is NOT used locally — local dev uses ./ecosystem.config.js via dev.sh.
// Apply on the server only as part of the cutover (see DEPLOY-RUNBOOK.md):
//   pm2 delete dashboard-api public-menu-api iq-rest   # one-time, brief restart
//   pm2 start /home/deploy/ecosystem.prod.config.js
//   pm2 save
//
// The two NestJS APIs run in cluster mode (2 instances) → `pm2 reload` brings
// workers up one at a time with no dropped requests. They are cluster-safe:
//   - orders_events pg LISTEN: every worker LISTENs and fans out to its own SSE
//     clients, so whichever worker holds a client's connection gets the event.
//   - public-menu-api's in-memory order rate-limit is per-worker → the effective
//     limit is ~2x (acceptable; tighten later with a shared store if needed).
// Landing (Next.js) stays in fork mode — `pm2 reload` there is a graceful restart
// (~1-2s), since Next isn't a plain cluster-able node entrypoint.

const base = {
  autorestart: true,
  watch: false,
  max_restarts: 10,
  min_uptime: "20s",
  kill_timeout: 8000,
  merge_logs: true,
  time: true,
};

module.exports = {
  apps: [
    {
      ...base,
      name: "dashboard-api",
      cwd: "/home/deploy/apps/iq-rest-dashboard-api",
      script: "dist/src/main.js",
      exec_mode: "cluster",
      instances: 2,
      env: { NODE_ENV: "production", PORT: 8130 },
    },
    {
      ...base,
      name: "public-menu-api",
      cwd: "/home/deploy/apps/iq-rest-public-menu-api",
      script: "dist/main.js",
      exec_mode: "cluster",
      instances: 2,
      env: { NODE_ENV: "production", PORT: 8131 },
    },
    {
      ...base,
      name: "iq-rest", // landing (Next.js)
      cwd: "/home/deploy/apps/iq-rest",
      script: "npm",
      args: "start",
      exec_mode: "fork",
      instances: 1,
      env: { NODE_ENV: "production" },
    },
  ],
};
