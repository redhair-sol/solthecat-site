// Central place for application-level URLs and config constants used by the
// React app. Server-side files (functions/solcam-check.js, vite.config.js)
// keep their own copies because they run in different runtimes (Cloudflare
// Workers / Node build) and cannot import from this module.

// Google Forms IDs are owned by gibial@gmail.com. If you swap the form,
// update both URLs (or move to env vars at that point).
export const CONTACT_FORM_URL = {
  en: "https://docs.google.com/forms/d/e/1FAIpQLSewVmGzPREJWL8I7jmLisaPUcgiN7hV9uDSuRZyX7hIuyIQdQ/viewform?embedded=true",
  el: "https://docs.google.com/forms/d/e/1FAIpQLSeJq77VFhKxVPaLMNnYPua3EU0hxBAQ7qz5IWGlCI1nhMRFaA/viewform?embedded=true",
};

// SolCam HLS stream — re-exported from streamUtils for convenience and to
// keep all app config discoverable from one file.
export { streamURL as SOLCAM_STREAM_URL } from "./utils/streamUtils.js";
