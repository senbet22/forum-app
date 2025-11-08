export function formatReadableDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("no-NO", {
      dateStyle: "medium",
    });
  } catch {
    return "Ugyldig dato";
  }
}
