import { defineConfig } from 'vite';
import honey from "@honeyjs/core/plugin";
import loader from "@honeyjs/vite-loader";

export default defineConfig({
  root: './src',
  base: "./", // `/__mobile/
  build: {
    outDir: '../../src/client/',
    minify: true,
    emptyOutDir: true,
  },
  plugins: [
    honey({ addHMRAccept: true, transformCached: false }),
    loader({
      effect: "import { createEffect } from '@honeyjs/core'",
    })
  ],
  server: {
    port: 8080,
    watch: {
      usePolling: true
    }
  },
});
