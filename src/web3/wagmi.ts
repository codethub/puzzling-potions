// wagmi.ts


// wagmi.ts

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { celo } from "@reown/appkit/networks";

const projectId = "cd169b99d42633d1d81f5aee613d0eed";

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [celo],
  ssr: true,
  connectors: [],
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [celo],
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

