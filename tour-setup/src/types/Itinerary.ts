import type { ContractCost } from "./ContractCost";

export interface Itinerary extends ContractCost {
  itineraryCode: string;
  itineraryName: string;
}