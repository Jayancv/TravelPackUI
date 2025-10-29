import React, { useEffect, useState } from "react";
import { TourForm } from "../components/TourForm";
import { TourList } from "../components/TourList";
import tourService from "../services/tourService";
import type { TourContract } from "../types/TourContract";

const TourSetupPage: React.FC = () => {
  const [tours, setTours] = useState<TourContract[]>([]);

  useEffect(() => {
    (async () => {
      const data = await tourService.getTours();
      setTours(data);
    })();
  }, []);

  const handleAdd = (newTour: TourContract) => setTours([...tours, newTour]);

  const handleDelete = async (id: string) => {
    await tourService.deleteTour(id);
    setTours(tours.filter((t) => t.contractId !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Tour Product Setup</h1>
      <div className="bg-white shadow-md rounded-xl p-6">
        <TourForm onAdd={handleAdd} />
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Available Tours</h2>
      
        <TourList /*tours={tours}  */onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default TourSetupPage;
