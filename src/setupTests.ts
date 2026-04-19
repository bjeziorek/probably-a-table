// import { expect } from 'vitest';
// import matchers from '@testing-library/jest-dom/matchers';

// expect.extend(matchers);

import '@testing-library/jest-dom/vitest';

// import '@testing-library/jest-dom';
import { vi } from 'vitest';

// vi.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key: string) => key,
//   }),
// }));

console.log("SETUP LOADED");
// throw new Error("SETUP NOT LOADED");
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserver;

declare global {
  interface Window {
    ResizeObserver: any;
  }
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
