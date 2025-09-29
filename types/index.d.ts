export interface ExistsOptions {
  allowOneLetterWords?: boolean;
}

export function exists(word: string, options?: ExistsOptions): boolean;
export interface RandomOptions {
  minLength?: number;
  maxLength?: number;
  seed?: number | string;
}

export function random(options?: RandomOptions): string;

declare const _default: {
  exists: typeof exists;
  random: typeof random;
};
export default _default;
