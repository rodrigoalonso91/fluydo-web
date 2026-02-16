export function normalizeArgentinaPhone(input: string): string {
  const digitsOnly = input.replace(/\D/g, "");

  if (digitsOnly.startsWith("549")) return digitsOnly;
  if (digitsOnly.startsWith("54")) return `549${digitsOnly.slice(2)}`;

  return `549${digitsOnly}`;
}
