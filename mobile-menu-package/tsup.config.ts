import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'next', 'next-themes', 'three'],
    inject: ['./react-shim.js'],
    esbuildOptions(options) {
        options.banner = {
            js: '"use client";',
        }
    },
})
