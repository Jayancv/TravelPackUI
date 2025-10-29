import React, { useState } from "react";
import type { TourContract } from "../types/TourContract";
import type { Itinerary } from "../types/Itinerary";
import type { Supplier } from "../types/Supplier";

interface Props {
  tour: TourContract;
  onDelete: (id: string) => void;
  onEdit?: (updatedTour: TourContract) => void;
}

export const TourCardExpd: React.FC<Props> = ({ tour, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);

  // Local form state for editing
  const [form, setForm] = useState<TourContract>({ ...tour });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSave = () => {
    setEditing(false);
    if (onEdit) onEdit(form);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Header / Image */}
      <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <img
          className="p-4 rounded-t-lg object-cover h-28 w-full"
          src="/src/assets/img/berlin1.jpg"
          alt={tour.tourName}
        />
        <div className="px-5 pb-2">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {tour.tourName}
          </h5>
          <p className="text-gray-500 text-sm mt-1">
            {tour.cityCode}, {tour.countryCode} • {tour.duration} days
          </p>
          {/* <p className="text-gray-900 text-lg font-bold mt-1">
            {tour.currency} {tour.unitCost?.toFixed(2)}
          </p> */}
        </div>
      </div>

      {/* Expanded / Details */}
      {expanded && (
        <div className="px-5 pb-5 space-y-2 border-t border-gray-200">
          {editing ? (
            <>
              {/* Editable fields */}
              <input
                className="border p-2 w-full rounded"
                name="tourName"
                value={form.tourName}
                onChange={handleChange}
                placeholder="Tour Name"
              />
              <input
                className="border p-2 w-full rounded"
                name="tourCode"
                value={form.tourCode}
                onChange={handleChange}
                placeholder="Tour Code"
              />
              <input
                className="border p-2 w-full rounded"
                name="cityCode"
                value={form.cityCode}
                onChange={handleChange}
                placeholder="City Code"
              />
              <input
                className="border p-2 w-full rounded"
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                placeholder="Country Code"
              />
              <input
                className="border p-2 w-full rounded"
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration"
              />
              {/* <input
                className="border p-2 w-full rounded"
                type="number"
                name="unitCost"
                value={form.unitCost}
                onChange={handleChange}
                placeholder="Price"
              /> */}
              <select
                className="border p-2 w-full rounded"
                name="currency"
                value={form.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </>
          ) : (
            <>
              <p>
                <span className="font-medium">Tour Code:</span> {tour.tourCode}
              </p>
              <p>
                <span className="font-medium">Supplier:</span>{" "}
                {tour.supplier?.name} ({tour.supplier?.code})
              </p>
              <p>
                <span className="font-medium">Duration:</span> {tour.duration}{" "}
                {tour.duration}
              </p>
              <p>
                <span className="font-medium">Currency:</span> {tour.currency}
              </p>
              <p>
                <span className="font-medium">Sales Enabled:</span>{" "}
                {tour.salesEnabled ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-medium">Group Tour:</span>{" "}
                {tour.groupTour ? "Yes" : "No"}
              </p>

              {tour.itineraries?.length > 0 && (
                <div>
                  <span className="font-medium">Itineraries:</span>
                  <ul className="list-disc ml-5">
                    {tour.itineraries.map((it) => (
                      <li key={it.itineraryCode}>{it.itineraryName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {tour.itineraries?.length > 0 && (
            <div className="mt-2">
              <span className="font-medium">Itineraries:</span>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                {tour.itineraries.map((it) => (
                  <li key={it.itineraryCode}>
                    <p className="font-semibold">
                      {it.itineraryName} ({it.itineraryCode})
                    </p>
                    <p className="text-gray-900 text-sm">
                      Price: {it.currency} {it.unitCost?.toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Adult: {it.adultCost?.toFixed(2)}, Teen:{" "}
                      {it.teenCost?.toFixed(2)}, Child:{" "}
                      {it.childCost?.toFixed(2)}, Infant:{" "}
                      {it.infantCost?.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex space-x-2">
            {editing ? (
              <>
                <button
                  className="bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300 text-white font-medium rounded-lg text-sm px-4 py-2 transition"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-200 text-gray-800 font-medium rounded-lg text-sm px-4 py-2 transition"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
  className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
                <button
  className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition"
                  onClick={() => onDelete(tour.contractId)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
