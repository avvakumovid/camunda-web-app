import React from "react";
import { useDispatch } from "react-redux";
import { setProcessBody } from "../../../store/slice/processSlice";

export default function Select({ name, id, options, label }) {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col p-1 mb-1'>
      <label for={id}>{label}</label>
      <select
        onChange={e => {
          dispatch(
            setProcessBody({
              [name]: {
                value: e.currentTarget.value,
                type: typeof e.currentTarget.value,
              },
            })
          );
        }}
        name={name}
        id={id}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
