import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/form/Form";
import {
  useGetTaskFormQuery,
  useGetTaskFormVariablesQuery,
} from "../store/processes/processes.api";
import { useSelector } from "react-redux";
import FormAlt from "../components/form/FormAlt";

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
          <FormAlt data={data} />
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: error.data }}
          ></div>
        </form>
      ) : (
        <>
          <span>Ошибка при загрузки формы</span>
          <FormAlt data={data} />
        </>
      )}
    </div>
  );
}
