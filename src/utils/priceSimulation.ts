// src/utils/priceSimulation.ts

import { InvestmentOption } from "../types/investment";

export const simulatePriceChange = (option: InvestmentOption): number => {
    const change = (Math.random() - 0.5) * option.risk/100 * option.currentPrice; // Change price by ±5%
    return Math.max(option.currentPrice + change, 0); // Ensure price doesn't go below 0
  };
  