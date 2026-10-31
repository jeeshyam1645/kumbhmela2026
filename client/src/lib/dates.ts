const PRAYAGRAJ_TZ = "Asia/Kolkata";

/** Calendar date in Prayagraj, independent of the viewer's timezone.
 *  `YYYY-MM-DD` parsed with `new Date()` is UTC midnight and shifts a day
 *  west of India (including many search-engine crawlers).
 */
export function formatPrayagraj(
  isoDate: string,
  locale: string,
  options: Intl.DateTimeFormatOptions,
) {
  const date = new Date(`${isoDate}T00:00:00+05:30`);
  return new Intl.DateTimeFormat(locale, {
    timeZone: PRAYAGRAJ_TZ,
    ...options,
  }).format(date);
}
