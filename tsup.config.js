import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/main.ts", "src/preload.ts"],
  format: "cjs",
  outDir: "dist",
  outExtension: (ctx) => (ctx.format === "js" ? "cjs" : ctx.format),
  platform: "node",
  publicDir: "public",
})
