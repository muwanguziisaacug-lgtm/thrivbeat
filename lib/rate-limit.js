const windows = globalThis.__thrivbeatsLeadRateLimits || new Map();
globalThis.__thrivbeatsLeadRateLimits = windows;

export function consumeLeadRateLimit(ip, now = Date.now(), limit = 5, windowMs = 10 * 60 * 1000) {
  const recent = (windows.get(ip) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  windows.set(ip, recent);
  return true;
}

export function clearLeadRateLimits() { windows.clear(); }
