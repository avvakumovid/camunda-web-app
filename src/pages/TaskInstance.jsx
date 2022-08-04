import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/form/Form";
import { useGetTaskFormQuery } from "../store/processes/processes.api";
import { useSelector, useDispatch } from "react-redux";
import { startProcess } from "../store/slice/processSlice";

export default function TaskInstance() {
  const { taskId } = useParams();
  const { isError, error, isLoading, data, isSuccess } =
    useGetTaskFormQuery(taskId);
  const { processBody, processKey } = useSelector(state => state.process);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(error);
  }, [error]);
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className='p-3'>
      {/* <Form fields={data.components} /> */}
      {error?.originalStatus == 200 ? (
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: error.data }}
        ></div>
      ) : (
        <span>Ошибка при загрузки формы</span>
      )}

      <button
        className='bg-purple-400 rounded-md p-2 text-white min-w-[90px]'
        onClick={() => {
          //console.log({ processBody, processKey });
          // dispatch(startProcess({ processBody, processKey }));
          // dispatch(setShowModal());
        }}
      >
        Запустить
      </button>
    </div>
  );
}
