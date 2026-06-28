import type {TFacilitator, TNetwork, TPrice, TScheme} from "@bejibun/x402/types/x402";
import {facilitator} from "@coinbase/x402";

const config: Record<string, any> = {
    scheme: "exact" as TScheme,
    price: "$1" as TPrice,
    networks: [
        {
            network: "eip155:8453" as TNetwork,
            payTo: "0xdABe8750061410D35cE52EB2a418c8cB004788B3"
        },
        {
            network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" as TNetwork,
            payTo: "GAnoyvy9p3QFyxikWDh9hA3fmSk2uiPLNWyQ579cckMn"
        }
    ],
    facilitator: facilitator as TFacilitator
};

export default config;