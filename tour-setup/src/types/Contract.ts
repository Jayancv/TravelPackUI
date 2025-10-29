import type { ProductType } from "./ProductType";
import type { Supplier } from "./Supplier";

export interface Contract {
  contractId: string;
  contractName: string;
  contractCode: string;

  validFrom: string;   // ISO date string (e.g., "2025-11-01")
  validTo: string;     // same as above
  salesEnabled: boolean;

  type: ProductType;
  supplier: Supplier;

  cityCode: string;
  countryCode: string;
  currency: string;
}