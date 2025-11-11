export function formatReadableDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("no-NO", {
      dateStyle: "short",
    });
  } catch {
    return "Ugyldig dato";
  }
}
