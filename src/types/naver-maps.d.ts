export {};

declare global {
  interface Window {
    naver: typeof globalThis.naver;
  }
}
