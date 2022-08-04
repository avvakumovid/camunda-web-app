import React from "react";
import { useDispatch } from "react-redux";
import { setProcessBody } from "../../../store/slice/processSlice";

export default function Radio({ name, values, label, required }) {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col p-1 mb-1'>
      <span>{label}</span>
      <div>
        {values.map(value => {
          return (
            <>
              <input
                key={value.value}
                className='mr-1'
                type='radio'
                id={value.value}
                name={name}
                value={value.value}
                onChange={e => {
                  //console.log(e.currentTarget.value);
                  dispatch(
                    setProcessBody({
                      [name]: {
                        value: e.currentTarget.value,
                        type: typeof e.currentTarget.value,
                      },
                    })
                  );
                }}
              />
              <label
                key={value.value + "lable"}
                className='mr-2'
                for={value.value}
              >
                {value.label}
              </label>
            </>
          );
        })}
      </div>
    </div>
  );
}
