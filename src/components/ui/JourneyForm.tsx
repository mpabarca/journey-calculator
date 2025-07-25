import type { JourneyType, ValidationErrorsType } from "../../type";

interface IJourneyForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof JourneyType, value: any) => void;
  journey: JourneyType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // validateField: (field: keyof JourneyType, value: any) => boolean;
  validationErrors: ValidationErrorsType;
}

function JourneyForm({ journey, updateField, validationErrors }: IJourneyForm) {
  const fieldClass = 'flex flex-col gap-2 w-56 items-start rounded';
  const inputClass = 'w-full border rounded p-2';

  return (
    <section className="flex gap-8">
      <div className={fieldClass}>
        <label htmlFor="start">Start Location</label>
        <input
          name="start"
          placeholder="Madrid"
          inputMode="text"
          type="text"
          className={inputClass}
          value={journey.start}
          onChange={(e) => {
            const { value } = e.target;
            updateField('start', value);
          }}
        />
        {validationErrors.errors.start ? (
          <span className="text-red-500 text-sm h-12 w-full text-start">
            {validationErrors.errors.start}
          </span>
        ) : (
          <span className="h-12 w-full" />
        )}
      </div>
      <div className={fieldClass}>
        <label htmlFor="destination">Primary Destination</label>
        <input
          name="destination"
          placeholder="Paris"
          inputMode="text"
          type="text"
          className={inputClass}
          value={journey.destination}
          onChange={(e) => {
            const { value } = e.target;
            updateField('destination', value);
          }}
        />
        {validationErrors.errors.destination ? (
          <span className="text-red-500 text-sm  h-12 w-full text-start">
            {validationErrors.errors.destination}
          </span>
        ) : (
          <span className="h-12 w-full" />
        )}
      </div>
      <div className={fieldClass}>
        <label htmlFor="distance">Distance (km)</label>
        <input
          name="distance"
          placeholder="1276"
          type="number"
          inputMode="numeric"
          className={inputClass}
          value={journey.intialDistance}
          onChange={(e) => {
            const { value } = e.target;
            updateField('intialDistance', value);
          }}
        />
        {validationErrors.errors.intialDistance ? (
          <span className="text-red-500 text-sm  h-12 w-full text-start">
            {validationErrors.errors.intialDistance}
          </span>
        ) : (
          <span className="h-12 w-full" />
        )}
      </div>
    </section>
  );
}

export default JourneyForm;
