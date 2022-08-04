import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startProcess } from "../../store/slice/processSlice";
import Form from "./../form/Form";

export default function ProcessStartModal({
  show,
  setShowModal,
  name,
  fields,
}) {
  const dispatch = useDispatch();
  const { processBody, processKey } = useSelector(state => state.process);
  useEffect(() => {
    console.log("fields", fields);
  }, [fields]);
  return show ? (
    <div className=' bg-black bg-opacity-25 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className=' bg-white rounded-xl p-4 '>
        {fields ? <Form fields={fields} /> : null}
        <div className='flex flex-row mt-4 justify-around'>
          <button
            className='bg-purple-400 rounded-md p-2 text-white min-w-[90px]'
            onClick={() => {
              console.log({ processBody, processKey });

              dispatch(startProcess({ processBody, processKey }));
              // dispatch(setShowModal());
            }}
          >
            Запустить
          </button>
          <button
            className='bg-purple-400 rounded-md p-2 text-white min-w-[90px]'
            onClick={() => {
              dispatch(setShowModal());
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
