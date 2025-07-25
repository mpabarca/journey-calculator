import { useState } from "react";
import JourneyForm from "../ui/JourneyForm";
import Dropdown from "../ui/Dropdown";
import Summary from "../ui/Summary";
import { calculateCost } from "../../utils/calculator";
import type { JourneyType, ValidationErrorsType } from "../../type";

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
};
const defaultValidationErrors: ValidationErrorsType = {
  isError: false,
  errors: {
    start: "",
    destination: "",
    intialDistance: "",
  },
};

function HomePage() {
  const [journey, setJourney] = useState<JourneyType>(defaultJourney);
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>(defaultValidationErrors);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: keyof JourneyType, value: any) => {
    setJourney((prev) => ({ ...prev, [field]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateAllFields = (): boolean => {
    const errors: ValidationErrorsType["errors"] = {
      start: "",
      destination: "",
      intialDistance: "",
    };
    let isValid = true;

    if (!journey.start.trim()) {
      errors.start = "This field is required.";
      isValid = false;
    }
    if (!journey.destination.trim()) {
      errors.destination = "This field is required.";
      isValid = false;
    }
    if (journey.start === journey.destination) {
      errors.start = "Start must differ from Destination.";
      errors.destination = "Destination must differ from Start.";
      isValid = false;
    }
    if (isNaN(journey.intialDistance) || journey.intialDistance <= 0) {
      errors.intialDistance = "Distance must be a positive number.";
      isValid = false;
    }

    setValidationErrors({
      isError: !isValid,
      errors,
    });

    return isValid;
  };

  function handleSubmit(_e: React.FormEvent<HTMLFormElement>) {
    _e.preventDefault();
    if (validateAllFields())
      updateField(
        "cost",
        calculateCost(journey.intialDistance, journey.transport)
      );
    updateField("totalDistance", journey.intialDistance);
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
        />
        {/* Add Stops */}
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
