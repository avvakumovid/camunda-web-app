import React from "react";
import { useDispatch } from "react-redux";
import { setProcessBody } from "../../../store/slice/processSlice";

export default function Number({ id, label }) {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col p-1 mb-1'>
      <label for={id}>{label}</label>
      <input
        className='border border-purple-400'
        id={id}
        name={id}
        type='number'
        onChange={e => {
          dispatch(
            setProcessBody({
              [id]: {
                value: e.currentTarget.value,
                type: "Integer",
              },
            })
          );
        }}
      />
    </div>
  );
}
