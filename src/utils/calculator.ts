import { COST_BY_TRANSPORT } from "../constants";
import type { TransportType } from "../type";

export function calculateCost(
  distance: number,
  transport: TransportType
): number {
  return parseFloat((distance * COST_BY_TRANSPORT[transport]).toFixed(2));
}
