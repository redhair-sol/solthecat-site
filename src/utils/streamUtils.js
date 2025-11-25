// src/utils/streamUtils.js

export const streamURL = "https://solcam.solthecat.com/solcam/index.m3u8";

/**
 * Checks if the main HLS manifest is available (Status 200).
 * @param {string} url - The URL of the manifest file.
 * @returns {Promise<boolean>}
 */
export async function checkStream(url) {
  try {
    // Προσθήκη timestamp για παράκαμψη cache (κρίσιμο)
    const noCacheUrl = `${url}?t=${Date.now()}`;
    const res = await fetch(noCacheUrl, { method: "GET" });
    return res.status === 200;
  } catch (err) {
    return false;
  }
}