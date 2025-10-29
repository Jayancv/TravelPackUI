import { useQuery } from "@tanstack/react-query";
import tourService from "../services/tourService";
import { TourCard } from "./TourCard";
import { TourCardExpd } from "./TourCardExpd";

export const TourList = ({ onDelete }: { onDelete: (id: string) => void }) => {
  const {
    data: tours,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: tourService.getTours,
  });

  if (isLoading) return <p>Loading tours...</p>;
  if (error) return <p>Error loading tours.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tours?.map((tour) => (
        // <TourCard
        //   key={tour.contractId}
        //   tour={tour}
        //   onDelete={onDelete}
        //   // Optional onEdit callback can be passed here
        // />
        <TourCardExpd
            key={tour.contractId}
            tour={tour}
            onDelete={onDelete}
            onEdit={(tour) => console.log("Edit", tour)}
        />

      ))}
    </div>
  );
};
