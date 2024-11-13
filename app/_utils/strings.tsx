export const formatString = (text: string) => {
  const formattedText = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  return formattedText
}
