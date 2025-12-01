// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react" // New Import!

export default defineConfig({
    plugins: [react()], // New Plugin!
    server: {
        port: 5000,
        open: true,
    },
    base: "pixi-game-match3",
})