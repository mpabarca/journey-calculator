import type { JourneyType } from "../../type";

interface IDropdown {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: keyof JourneyType, value: any) => void;
  journey: JourneyType;
}

function Dropdown({ journey, updateField }: IDropdown) {
  return (
    <div className='flex flex-col gap-2 w-52 items-start'>
      <label htmlFor='transport'>Transport Method:</label>
      <select
        name='transport'
        id='transport'
        className='border rounded p-2 w-full'
        value={journey.transport}
        onChange={(e) => updateField("transport", e.target.value)}
      >
        <option value='' disabled>
          Select transport
        </option>
        <option value='car'>Car</option>
        <option value='train'>Train</option>
        <option value='plane'>Plane</option>
      </select>
    </div>
  );
}

export default Dropdown;
