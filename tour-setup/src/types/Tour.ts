export type DurationType = "days" | "hours" | "nights"; // adjust allowed values as needed

export interface Tour {
  id: string;
  tourCode: string;
  tourName: string;
  city: string;
  country: string;
  duration: number;
  durationType: DurationType;
  description?: string;
  price: number;
  availableDates?: string[]; // keep older fields optional if used elsewhere
}