export type CamelCase<S extends string> = S extends `${infer First} ${infer Rest}`
  ? `${Lowercase<First>}${Capitalize<CamelCase<Rest>>}` // Convert first word to lowercase, rest to capitalized camelCase
  : Lowercase<S> // For single words, just lowercase
