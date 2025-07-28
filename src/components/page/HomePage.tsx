/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import JourneyForm from "../ui/JourneyForm";
import Dropdown from "../ui/Dropdown";
import Summary from "../ui/Summary";
import { calculateCost, calculateTotalDistance } from "../../utils/calculator";
import type { JourneyType, StopType, ValidationErrorsType } from "../../type";

// Form -> 3 fields: 2 location string - 1 km number -> transport dropdown -> button calculate cost
// Summary -> total cost number
// cheatsheet cost per km

const defaultJourney: JourneyType = {
  start: "",
  destination: "",
  intialDistance: 0,
  transport: "car",
  cost: 0,
  totalDistance: 0,
  stops: [],
};
const defaultValidationErrors: ValidationErrorsType = {
  isError: false,
  errors: {
    start: "",
    destination: "",
    intialDistance: "",
    stops: [
      {
        name: "",
        distance: "",
      },
    ],
  },
};

function HomePage() {
  const [journey, setJourney] = useState<JourneyType>(defaultJourney);
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>(defaultValidationErrors);

  function updateField(
    field: keyof JourneyType,
    value: string | number,
    index?: number,
    fieldStop?: keyof StopType
  ) {
    if (field === "stops" && index !== undefined && fieldStop)
      updateStop(index, fieldStop, value);
    else if (
      field === "intialDistance" ||
      field === "cost" ||
      field === "totalDistance"
    )
      setJourney((prev) => ({ ...prev, [field]: Number(value) }));
    else setJourney((prev) => ({ ...prev, [field]: value }));
  }

  function addStop() {
    setJourney((prev) => ({
      ...prev,
      stops: [...prev.stops, { name: "", distance: 0 }],
    }));
  }

  function removeStop(index: number) {
    setJourney((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
  }

  function updateStop(index: number, fieldStop: keyof StopType, value: any) {
    const updatedStops = [...journey.stops];
    updatedStops[index] = {
      ...updatedStops[index],
      [fieldStop]: fieldStop === "distance" ? Number(value) : value,
    };
    setJourney((prev) => ({ ...prev, stops: updatedStops }));
  }

  const validateAllFields = (): boolean => {
    const errors: ValidationErrorsType["errors"] = {
      start: "",
      destination: "",
      intialDistance: "",
      stops: [],
    };

    let isValid = true;

    // Validate start
    if (!journey.start.trim()) {
      errors.start = "This field is required.";
      isValid = false;
    }

    // Validate destination
    if (!journey.destination.trim()) {
      errors.destination = "This field is required.";
      isValid = false;
    }

    // Validate distinct start/destination
    if (journey.start === journey.destination) {
      errors.start = "Start must differ from Destination.";
      errors.destination = "Destination must differ from Start.";
      isValid = false;
    }

    // Validate base distance
    if (isNaN(journey.intialDistance) || journey.intialDistance <= 0) {
      errors.intialDistance = "Distance must be a positive number.";
      isValid = false;
    }

    // Validate stops[]
    journey.stops.forEach((stop) => {
      const stopError = { name: "", distance: "" };

      if (!stop.name.trim()) {
        stopError.name = "Stop name is required.";
        isValid = false;
      }

      if (isNaN(stop.distance) || stop.distance <= 0) {
        stopError.distance = "Distance must be a positive number.";
        isValid = false;
      }

      errors.stops.push(stopError);
    });

    setValidationErrors({
      isError: !isValid,
      errors,
    });

    return isValid;
  };

  function handleSubmit(_e: React.FormEvent<HTMLFormElement>) {
    _e.preventDefault();
    if (validateAllFields()) {
      const totalDistance = calculateTotalDistance(journey);
      updateField("cost", calculateCost(totalDistance, journey.transport));
      updateField("totalDistance", totalDistance);
    }
  }
  return (
    <div className='text-center'>
      <h1 className='text-4xl font-bold my-10'>Journey Expense Calculator</h1>
      <form
        className='w-[600px] m-auto flex flex-col gap-8'
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Form */}
        <JourneyForm
          updateField={updateField}
          journey={journey}
          validationErrors={validationErrors}
          addStop={addStop}
          removeStop={removeStop}
          updateStop={updateStop}
        />
        {/* Select type of transport */}
        <Dropdown updateField={updateField} journey={journey} />
        {/* Result */}
        <Summary cost={journey.cost} distance={journey.totalDistance} />
        {/* Cheatsheet */}
        <button
          type='submit'
          className='border rounded border-black bg-black text-white h-12 hover:bg-gray-700 hover:cursor-pointer'
        >
          Calculate Cost
        </button>
      </form>
    </div>
  );
}

export default HomePage;
