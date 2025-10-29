import React, { useState } from "react";
import tourService from "../services/tourService";
import type { TourContract } from "../types/TourContract";

interface Props {
  onAdd: (tour: TourContract) => void;
}

export const TourForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({
    contractName: "",
    contractCode: "",
    validFrom: "",
    validTo: "",
    salesEnabled: true,
    tourName: "",
    tourCode: "",
    tourType: "TOU",
    groupTour: false,
    duration: 1,
    cityCode: "",
    countryCode: "",
    currency: "USD",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTour: Omit<TourContract, "contractId"> = {
      ...form,
      type: "TOU",
      supplier: {
        id: 1,
        name: "Default Supplier",
        code: "SUP-001",
        address: "",
        cityCode: form.cityCode || "",
        countryCode: form.countryCode || "",
      },
      itineraries: [],
    };

    try {
      const created = await tourService.addTour(newTour as TourContract);
      onAdd(created);
      alert("Tour contract created successfully!");

      setForm({
        contractName: "",
        contractCode: "",
        validFrom: "",
        validTo: "",
        salesEnabled: true,
        tourName: "",
        tourCode: "",
        tourType: "TOU",
        groupTour: false,
        duration: 1,
        cityCode: "",
        countryCode: "",
        currency: "USD",
      });
    } catch (error) {
      console.error("Error creating tour:", error);
      alert("Failed to create tour contract");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create Tour Contract</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contract Name / Code */}
        <input
          name="contractName"
          value={form.contractName}
          onChange={handleChange}
          placeholder="Contract Name"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
          required
        />
        <input
          name="contractCode"
          value={form.contractCode}
          onChange={handleChange}
          placeholder="Contract Code"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
          required
        />

        {/* Tour Name / Code */}
        <input
          name="tourName"
          value={form.tourName}
          onChange={handleChange}
          placeholder="Tour Name"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
          required
        />
        <input
          name="tourCode"
          value={form.tourCode}
          onChange={handleChange}
          placeholder="Tour Code"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
        />

        {/* Tour Type / Duration */}
        <select
          name="tourType"
          value={form.tourType}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
        >
          <option value="TOU">Tour</option>
          <option value="HTL">Hotel</option>
          <option value="FLT">Flight</option>
        </select>

        <input
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (days)"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
          min={1}
        />

        {/* City / Country */}
        <input
          name="cityCode"
          value={form.cityCode}
          onChange={handleChange}
          placeholder="City Code"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
        />
        <input
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
          placeholder="Country Code"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
        />

        {/* Currency / Checkboxes */}
        <input
          name="currency"
          value={form.currency}
          onChange={handleChange}
          placeholder="Currency (e.g. USD)"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="groupTour"
            checked={form.groupTour}
            onChange={handleChange}
            id="groupTour"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
          />
          <label htmlFor="groupTour" className="text-gray-700">Group Tour</label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="salesEnabled"
            checked={form.salesEnabled}
            onChange={handleChange}
            id="salesEnabled"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300"
          />
          <label htmlFor="salesEnabled" className="text-gray-700">Sales Enabled</label>
        </div>

        {/* Valid Dates */}
        <input
          type="date"
          name="validFrom"
          value={form.validFrom}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
          required
        />
        <input
          type="date"
          name="validTo"
          value={form.validTo}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-300 focus:outline-none w-full"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition"
      >
        Save Contract
      </button>
    </form>
  );
};
