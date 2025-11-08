export function canChangeUsername(
  lastChanged: string,
  cooldownDays = 30,
  cooldownSeconds = 20
): {
  allowed: boolean;
  nextAllowedDate: Date | null;
  remainingDays: number;
} {
  const neverChanged = lastChanged.startsWith("0001");
  if (neverChanged) {
    return { allowed: true, nextAllowedDate: null, remainingDays: 0 };
  }

  const last = new Date(lastChanged);
  const now = new Date();
  const next = new Date(last);

  // Cooldown 20 seconds
  next.setSeconds(next.getSeconds() + cooldownSeconds);
  const remaining = Math.ceil((next.getTime() - now.getTime()) / 1000);

  // Cooldown 30 days
  // next.setDate(next.getDate() + cooldownDays);  <--- gets read here, false linting
  // const remaining = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const allowed = now >= next;

  return {
    allowed,
    nextAllowedDate: next,
    remainingDays: allowed ? 0 : remaining,
  };
}
