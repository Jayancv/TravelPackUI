import { apiClient } from "@travelpack/common-lib";

export interface Tour {
  id?: number;
  tourCode: string;
  tourName: string;
  city: string;
  country: string;
  duration: number;
  durationType: "D" | "H";
  price: number;
}

export const getTours = async (): Promise<Tour[]> => {
  const res = await apiClient.get("/tours");
  return res.data;
};

export const createTour = async (tour: Tour): Promise<Tour> => {
  const res = await apiClient.post("/tours", tour);
  return res.data;
};
