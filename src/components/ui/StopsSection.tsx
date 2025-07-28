/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JourneyType, StopType } from "../../type";
import InputForm from "./InputForm";

interface IStopsSection {
  stops: StopType[];
  addStop: () => void;
  removeStop: (index: number) => void;
  updateField: (
    field: keyof JourneyType,
    value: any,
    index?: number,
    fieldStop?: keyof StopType
  ) => void;
  validationErrors: { name: string; distance: string }[];
}

function StopsSection({
  stops,
  addStop,
  removeStop,
  updateField,
  validationErrors,
}: IStopsSection) {
  return (
    <section className='flex flex-col items-start'>
      {stops.map((stop, index) => (
        <div key={index} className='flex gap-8 justify-center'>
          <InputForm
            name='stops'
            label={`Stop #${index + 1} Name`}
            placeholder='Lyon'
            type='text'
            value={stop.name}
            updateField={updateField}
            validation={validationErrors[index]?.name || ""}
            index={index}
            fieldStop='name'
          />
          <InputForm
            name='stops'
            label='Distance from previous (km)'
            placeholder='1234'
            type='number'
            value={stop.distance}
            updateField={updateField}
            validation={validationErrors[index]?.distance || ""}
            index={index}
            fieldStop='distance'
          />
          <button
            type='button'
            onClick={() => removeStop(index)}
            className='h-12 m-auto pb-12 text hover:cursor-pointer hover:underline hover:underline-offset-4 transition duration-300'
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type='button'
        onClick={() => addStop()}
        className='text hover:cursor-pointer hover:underline hover:underline-offset-4 transition duration-300'
      >
        + Add Another Stop
      </button>
    </section>
  );
}

export default StopsSection;
