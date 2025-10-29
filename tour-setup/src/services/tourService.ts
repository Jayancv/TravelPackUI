
import axios from 'axios'
import type { TourContract } from "../types/TourContract";


const API_BASE = 'http://localhost:8080/api/v1/product-service/tour'


const POST_CONTRACT = '/contract'
const GET_CONTRACTS = '/contracts'


const getTourContracts = async (): Promise<TourContract[]> => {
  const { data } = await axios.get(API_BASE+GET_CONTRACTS);
  return data;
};

const addTourContract = async (tour: Omit<TourContract, "id">): Promise<TourContract> => {
  const { data } = await axios.post(API_BASE+POST_CONTRACT, tour);
  return data;
};

const deleteTourContract = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE+POST_CONTRACT}/${id}`);
};

export default { 
  getTours: getTourContracts, 
  addTour: addTourContract, 
  deleteTour: deleteTourContract 
}

