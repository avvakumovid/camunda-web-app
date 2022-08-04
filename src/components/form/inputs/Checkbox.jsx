import React from "react";
import { useDispatch } from "react-redux";
import { setProcessBody } from "../../../store/slice/processSlice.js";

export default function Checkbox({ value, label, required }) {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-row items-center p-1 mb-1'>
      <input
        className='mr-1'
        type='checkbox'
        id={value}
        name={value}
        value={value}
        required={required}
        onChange={e => {
          dispatch(
            setProcessBody({
              [e.currentTarget.value]: {
                value: e.currentTarget.checked,
                type: "Boolean",
              },
            })
          );
        }}
      />
      <label for={value}>{label}</label>
    </div>
  );
}
