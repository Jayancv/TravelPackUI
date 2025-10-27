import { useQuery } from "@tanstack/react-query";
import { getTours } from "../api/tourApi";

export const TourList = () => {
  const { data: tours, isLoading, error } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  if (isLoading) return <p>Loading tours...</p>;
  if (error) return <p>Error loading tours.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Available Tours</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Code</th>
            <th className="p-2">Name</th>
            <th className="p-2">City</th>
            <th className="p-2">Country</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {tours?.map((tour) => (
            <tr key={tour.id} className="border-t">
              <td className="p-2">{tour.tourCode}</td>
              <td className="p-2">{tour.tourName}</td>
              <td className="p-2">{tour.city}</td>
              <td className="p-2">{tour.country}</td>
              <td className="p-2">
                {tour.duration} {tour.durationType}
              </td>
              <td className="p-2">${tour.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
