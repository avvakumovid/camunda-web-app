import React, { useEffect } from "react";
import { useAllTasksQuery } from "../store/processes/processes.api";
import Task from "../components/task/Task";

export default function Tasks() {
  const { isLoading, isError, data } = useAllTasksQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className='p-3'>
      {data.map(t => (
        <Task deploymentId={t.deploymentId} name={t.name} taskId={t.id} />
      ))}
    </div>
  );
}
