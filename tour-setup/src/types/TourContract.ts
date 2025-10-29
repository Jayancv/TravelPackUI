import type { Contract } from "./Contract";
import type { Itinerary } from "./Itinerary";

export interface TourContract extends Contract {
  tourName: string;
  tourCode: string;

  tourType: string;
  groupTour: boolean;
  duration: number;

  itineraries: Itinerary[];
}