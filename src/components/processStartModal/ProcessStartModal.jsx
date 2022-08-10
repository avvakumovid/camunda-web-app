import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startProcess } from "../../store/slice/processSlice";

export default function ProcessStartModal({
  show,
  setShowModal,
  name,
  fields,
  processHtmlForm,
}) {
  const dispatch = useDispatch();
  const { processKey } = useSelector(state => state.process);
  useEffect(() => {}, [processHtmlForm]);
  return show ? (
    <div className=' bg-black bg-opacity-25 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className=' bg-white rounded-xl p-4 '>
        <form
          onSubmit={e => {
            const processBody = {};
            e.preventDefault();
            for (const target of e.target) {
              if (target.value && target.id) {
                processBody[target.id] = {
                  value:
                    target.type === "checkbox" ? target.checked : target.value,
                  type: target.name,
                };
              }
            }
            console.log(processBody);
            dispatch(startProcess({ processBody, processKey }));
          }}
        >
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: processHtmlForm }}
          ></div>

          <div className='flex flex-row mt-4 justify-around'>
            <button
              className='bg-purple-400 rounded-md p-2 text-white min-w-[90px]'
              onClick={() => {
                const list = document.getElementsByClassName("myComponent");
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
        </form>
      </div>
    </div>
  ) : null;
}
