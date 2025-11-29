// vite.config.ts

import { defineConfig } from "vite"

export default defineConfig({
    server: {
        port: 5000,
        open: true,
    },
    base: "game",
    
    // [EDIT] Configuration to allow JSX inside .ts files
    esbuild: {
        // Force esbuild to process TypeScript (.ts) files as if they were TSX (.tsx)
        loader: 'tsx',
        include: [
            // Ensure both .ts and .tsx files are processed for JSX
            'src/**/*.ts', 
            'src/**/*.tsx', 
        ],
        exclude: []
    }
})