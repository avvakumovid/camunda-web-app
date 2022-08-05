import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/form/Form";
import {
  useGetTaskFormQuery,
  useGetTaskFormVariablesQuery,
} from "../store/processes/processes.api";
import { useSelector } from "react-redux";

export default function TaskInstance() {
  const { taskId } = useParams();
  const { error, isLoading } = useGetTaskFormQuery(taskId);
  const { variableserror, variablesIsLoading, data } =
    useGetTaskFormVariablesQuery(taskId);
  const obj = (
    <div
      className='content'
      dangerouslySetInnerHTML={{ __html: error?.data }}
    ></div>
  );
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className='p-3'>
      {/* <Form fields={data.components} /> */}

      {error?.originalStatus == 200 ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            for (const target of e.target) {
              if (target.type == "checkbox") {
                console.log(target.checked);
              }
              // console.log(target);
            }
            const el = document.createElement("html");
            el.innerHTML(obj);
            console.log(el);
            // console.log(JSON.stringify(obj));
          }}
        >
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: error.data }}
          ></div>
          <input
            className='bg-purple-400 mt-2 rounded-md p-2 text-white min-w-[90px]'
            type='submit'
            value='Send Request'
            // onClick={e => {
            //   e.preventDefault();
            //   //console.log(e.target.summa);
            //   // dispatch(startProcess({ processBody, processKey }));
            //   // dispatch(setShowModal());
            // }}
          />
        </form>
      ) : (
        <span>Ошибка при загрузки формы</span>
      )}
    </div>
  );
}
