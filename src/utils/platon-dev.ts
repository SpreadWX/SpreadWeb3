import { Chain } from 'wagmi';

export const platonDev = {
  id: 2206132,
  name: 'PlatON Dev Testnet2',
  network: 'PlatON',
  nativeCurrency: {
    decimals: 18,
    name: 'LAT',
    symbol: 'lat',
  },
  rpcUrls: {
    public: { http: ['https://devnet2openapi.platon.network/rpc'] },
    default: { http: ['https://devnet2openapi.platon.network/rpc'] },
  },
  // blockExplorers: {
  //   etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  //   default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  // },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;
