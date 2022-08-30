export function plural(number: number, singular: string, plural: string) {
  return (number === 1 ? singular : plural).replace('%d', number.toString());
}
