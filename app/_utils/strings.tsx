export const formatString = (text: string) => {
  const formattedText = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  return formattedText
}

// Utility function to convert strings to camelCase
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => (index === 0 ? match.toLowerCase() : match.toUpperCase()))
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
}
