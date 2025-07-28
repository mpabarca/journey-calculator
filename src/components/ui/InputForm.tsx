/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JourneyType, StopType } from "../../type";

interface IInputForm {
  name: keyof JourneyType;
  placeholder: string;
  value: string | number;
  label: string;
  type: string;
  updateField: (
    field: keyof JourneyType,
    value: any,
    index?: number,
    fieldStop?: keyof StopType
  ) => void;
  validation: string;
  index?: number;
  fieldStop?: keyof StopType;
}

function InputForm({
  name,
  label,
  placeholder,
  type,
  value,
  updateField,
  validation,
  index,
  fieldStop,
}: IInputForm) {
  return (
    <div className='flex flex-col gap-2 w-56 items-start rounded'>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        className='w-full border rounded p-2'
        value={value}
        onChange={(e) => {
          const { value } = e.target;
          if (name === "stops" && index !== undefined && fieldStop)
            updateField(name, value, index, fieldStop);
          else {
            updateField(name, value);
          }
        }}
      />
      {validation ? (
        <span className='text-red-500 text-sm  h-12 w-full text-start'>
          {validation}
        </span>
      ) : (
        <span className='h-12 w-full' />
      )}
    </div>
  );
}

export default InputForm;
