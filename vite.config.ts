/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: "0.0.0.0",
    port: 12000,
    cors: true,
    headers: {
      "X-Frame-Options": "ALLOWALL",
    },
  },
  build: {
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    reporters: ["json", "verbose", "vitest-sonar-reporter"],
    outputFile: {
      json: "report.json",
      "vitest-sonar-reporter": "testResults/sonar-report.xml",
    },
    setupFiles: "./setupTests.ts",
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["json", "lcov"],
    },
  },
});
