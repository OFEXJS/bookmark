import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscator from "vite-plugin-bundle-obfuscator";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      apply: "build", // 只在构建时应用
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: false,
        debugProtection: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: "hexadecimal",
        stringArray: true,
        stringArrayEncoding: ["base64"],
        stringArrayThreshold: 0.8,
        transformObjectKeys: true,
      },
    }),
  ],
});
