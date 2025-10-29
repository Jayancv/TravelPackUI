export interface ContractCost {
  id: number;

  unitCost: number;
  adultCost: number;
  teenCost: number;
  childCost: number;
  infantCost: number;

  currency: string;
}