// wagmi.ts

import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "@reown/appkit/networks";

const projectId = "e92cd95903697faa0452d626c1b1a673";

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet],
  ssr: true,
  connectors: [],
});

export const appkitInstance = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet],
  projectId,
  metadata: {
    name: "Puzzling Potions",
    description: "my web3 game",
    url: "https://puzzpo.xyz/",
    icons: ["https://puzzpo.xyz/logo.png"],
  },
  themeMode: "dark",
});

export const config = wagmiAdapter.wagmiConfig;