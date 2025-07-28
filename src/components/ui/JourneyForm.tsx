import type { JourneyType, StopType, ValidationErrorsType } from "../../type";
import InputForm from "./InputForm";
import StopsSection from "./StopsSection";

interface IJourneyForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof JourneyType, value: any) => void;
  journey: JourneyType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationErrors: ValidationErrorsType;
  addStop: () => void;
  removeStop: (index: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateStop: (index: number, field: keyof StopType, value: any) => void;
}

function JourneyForm({
  journey,
  updateField,
  validationErrors,
  addStop,
  removeStop,
}: IJourneyForm) {
  return (
    <>
      <section id='initial-journey' className='flex gap-8'>
        <InputForm
          name='start'
          label='Start Location'
          placeholder='Madrid'
          type='text'
          value={journey.start}
          updateField={updateField}
          validation={validationErrors.errors.start}
        />
        <InputForm
          name='destination'
          label='Primary Destination'
          placeholder='Paris'
          type='text'
          value={journey.destination}
          updateField={updateField}
          validation={validationErrors.errors.destination}
        />

        <InputForm
          name='intialDistance'
          label='Distance (km)'
          placeholder='1276'
          type='number'
          value={journey.intialDistance}
          updateField={updateField}
          validation={validationErrors.errors.intialDistance}
        />
      </section>
      <StopsSection
        stops={journey.stops}
        addStop={addStop}
        removeStop={removeStop}
        updateField={updateField}
        validationErrors={validationErrors.errors.stops}
      />
    </>
  );
}

export default JourneyForm;
