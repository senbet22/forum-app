export function canChangeUsername(
  lastChanged?: string,
  backendCooldownSeconds = 20,
  frontendExtraSeconds = 600
): {
  allowed: boolean;
  nextAllowedDate: Date | null;
  remainingSeconds: number;
} {
  if (!lastChanged || lastChanged.startsWith("0001")) {
    return { allowed: true, nextAllowedDate: null, remainingSeconds: 0 };
  }

  // Normalize ISO string with long milliseconds
  const normalized = lastChanged.replace(/\.(\d{3})\d*Z$/, ".$1Z");
  const last = new Date(normalized);
  if (isNaN(last.getTime())) {
    return { allowed: true, nextAllowedDate: null, remainingSeconds: 0 };
  }

  const now = new Date();
  const next = new Date(last);

  next.setSeconds(next.getSeconds() + backendCooldownSeconds + frontendExtraSeconds);

  const allowed = now >= next;
  const remainingSeconds = Math.ceil((next.getTime() - now.getTime()) / 1000);

  return {
    allowed,
    nextAllowedDate: next,
    remainingSeconds: allowed ? 0 : remainingSeconds,
  };
}
