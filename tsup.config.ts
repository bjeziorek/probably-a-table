import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // TSUP shouldn't bundle tests
  ignoreWatch: ["src/**/*.test.ts", "src/**/*.test.tsx, setupTests.ts"],
  external: ["react", "react-dom"]
});
