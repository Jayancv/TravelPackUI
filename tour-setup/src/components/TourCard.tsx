import React from "react";
import type { TourContract } from "../types/TourContract";

interface Props {
  tour: TourContract;
  onDelete: (id: string) => void;
  onEdit?: (tour: TourContract) => void;
}

export const TourCard: React.FC<Props> = ({ tour, onDelete, onEdit }) => {
  return (
    <div className="border rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{tour.tourName}</h3>
      <p className="text-gray-500">{tour.cityCode}, {tour.countryCode}</p>
      <p className="text-sm text-gray-700">Duration: {tour.duration} days</p>
      <p className="text-sm font-medium">{tour.currency}</p>

      <div className="mt-3 flex space-x-2">
        <button
          className="text-red-600 hover:underline"
          onClick={() => onDelete(tour.contractId)}
        >
          Delete
        </button>
        {onEdit && (
          <button
            className="text-blue-600 hover:underline"
            onClick={() => onEdit(tour)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
