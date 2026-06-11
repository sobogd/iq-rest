// PM2 ecosystem for PRODUCTION (runs on the server, under user `deployer`).
// Enables `pm2 reload` zero-downtime rolling restarts for the Node services.
//
// This is NOT used locally — local dev uses ./ecosystem.config.js via dev.sh.
// Apply on the server only as part of the cutover (see DEPLOY-RUNBOOK.md):
//   pm2 delete dashboard-api public-menu-api iq-rest   # one-time, brief restart
//   pm2 start /home/deploy/ecosystem.prod.config.js
//   pm2 save
//
// public-menu-api runs in cluster mode (2 instances) → `pm2 reload` brings workers
// up one at a time with no dropped requests. It is cluster-safe: no @Cron jobs, and
// its in-memory order rate-limit being per-worker just makes the effective limit ~2x
// (acceptable; move to a shared store later if needed).
//
// dashboard-api stays FORK (single instance): it has 4 @Cron jobs (inbox-notify,
// usage-stitch, Meta CAPI conversion upload every 15m, usage-cleanup). In cluster
// mode every worker would fire them → DOUBLED conversions/emails. `pm2 reload` here
// is a graceful restart (~2s). To make it true zero-downtime later: guard the crons
// to only run on NODE_APP_INSTANCE===0, then switch to cluster.
//
// Landing (Next.js) stays fork — `pm2 reload` is a graceful restart (~2s); Next
// isn't a plain cluster-able node entrypoint.

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
      exec_mode: "fork", // FORK: has @Cron jobs — cluster would double them
      instances: 1,
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
