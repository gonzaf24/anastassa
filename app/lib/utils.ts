export function parseCategoryParam(input: string): {
  numberPart: number;
  textPart: string;
} {
  // Divide la cadena por el último "-"
  const parts = input.split("-");

  // Extrae el número, que siempre es el último elemento y conviértelo a un número
  const numberPart = parseInt(parts.pop() || "0", 10);

  // Los elementos restantes son las palabras, únelas con espacios
  const textPart = parts.join(" ");

  return { numberPart, textPart };
}
