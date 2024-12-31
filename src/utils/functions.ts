export function textSlicer(text: string, length: number = 50): string {
  if (text.length > length) {
    return text.slice(0, length) + " ...";
  }
  return text;
}
