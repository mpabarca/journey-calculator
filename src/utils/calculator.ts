import { COST_BY_TRANSPORT } from "../constants";
import type { JourneyType, TransportType } from "../type";

export function calculateCost(
  distance: number,
  transport: TransportType
): number {
  return parseFloat((distance * COST_BY_TRANSPORT[transport]).toFixed(2));
}

export function calculateTotalDistance(journey: JourneyType): number {
  return (
    journey.stops.reduce(
      (accumulative, stop) => accumulative + stop.distance,
      0
    ) + journey.intialDistance
  );
}
