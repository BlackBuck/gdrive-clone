/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
// next.config.js
const config = {
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true, 
  }

  export default config