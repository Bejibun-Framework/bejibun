import type {Network, TScheme} from "@bejibun/x402/types/x402";
import {facilitator} from "@coinbase/x402";

const config: Record<string, any> = {
    version: 2,
    scheme: "exact" as TScheme,
    price: "$0.001",
    networks: {
        evm: {
            network: "eip155:8453" as Network,
            payTo: "0xdABe8750061410D35cE52EB2a418c8cB004788B3"
        },
        svm: {
            network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" as Network,
            payTo: "GAnoyvy9p3QFyxikWDh9hA3fmSk2uiPLNWyQ579cckMn"
        }
    },
    facilitator: facilitator
};

export default config;