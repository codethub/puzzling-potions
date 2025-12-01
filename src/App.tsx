// App.tsx
import { useEffect, useRef } from "react"; 
import { Application, Text } from "pixi.js";
import { initAssets } from "./utils/assets";
import { navigation } from "./utils/navigation";
import { LoadScreen } from "./screens/LoadScreen";
import { TiledBackground } from "./ui/Background";
import { HomeScreen } from "./screens/HomeScreen";
import { GameScreen } from "./screens/GameScreen";
import { getUrlParam } from "./utils/getUrlParams";
import { ResultScreen } from "./screens/ResultScreen";

// Set default Pixi Text properties globally
Text.defaultResolution = 2;
Text.defaultAutoResolution = false;

// Global reference for Pixi app, needed for cleanup and external access
let pixiApp: Application | null = null;

function resize(app: Application) {
    // Standard responsive logic
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minWidth = 375;
    const minHeight = 700;

    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    
    const view = app.renderer.view as HTMLCanvasElement;
    
    view.style.width = `${windowWidth}px`;
    view.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0); 

    app.renderer.resize(width, height);
    navigation.resize(width, height);
}

async function init() { 
    // Load game assets
    await initAssets();

    // Hide loading screen defined in index.html
    document.body.classList.add("loaded");

    // Add shared background
    navigation.setBackground(TiledBackground);

    // Show initial screens based on URL params
    await navigation.showScreen(LoadScreen);
    
    if (getUrlParam('game') !== null) {
        await navigation.showScreen(GameScreen);
    } else if (getUrlParam('result') !== null) {
        await navigation.showScreen(ResultScreen);
    } else {
        await navigation.showScreen(HomeScreen);
    }
}

export function App() {
    // Ref to attach the Pixi canvas to the DOM
    const appContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Init Pixi app only once
        if (!appContainerRef.current) return;

        // 1. Create Application instance, specifically asking for HTMLCanvasElement
        pixiApp = new Application<HTMLCanvasElement>({
            backgroundColor: 0xffffff,
            backgroundAlpha: 0,
            resolution: 2
        });

        // 2. Attach canvas to the DOM element
        appContainerRef.current.appendChild(pixiApp.view as HTMLCanvasElement);

        // 3. Setup resize listener
        const handleResize = () => resize(pixiApp!);
        resize(pixiApp);
        window.addEventListener("resize", handleResize);

        // 4. Start game logic
        init();

        // Cleanup: remove listeners and destroy Pixi instance
        return () => {
            window.removeEventListener("resize", handleResize);
            if (pixiApp) {
                pixiApp.destroy(true, true);
                pixiApp = null;
            }
        };
    }, []);

    // Render a container div for the Pixi canvas and the Wallet Button
    return (
        <div 
            ref={appContainerRef} 
            // The container must be relative to anchor the absolute button
            style={{ 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden', 
                position: 'relative' 
            }} 
        >
            {/* The Pixi canvas is appended to this div via useEffect */}
            
            {/* Reown Connect Button: positioned absolutely over the canvas */}
            <div 
                style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    zIndex: 100 // Ensure visibility above Pixi canvas
                }}
            >
                <appkit-button />
            </div>
        </div>
    );
}