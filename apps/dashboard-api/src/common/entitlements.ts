// Entitlement logic now lives in the shared @iq-rest/entitlements package (the
// single source of truth, consumed by both APIs). This file stays as a thin
// re-export so the many `./entitlements` / `../common/entitlements` import sites
// don't have to change. See packages/entitlements/src/index.ts.
export * from "@iq-rest/entitlements";
