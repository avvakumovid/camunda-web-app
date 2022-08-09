import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const processesApi = createApi({
  reducerPath: "processes/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/engine-rest/",
  }),
  endpoints: build => ({
    allProcesses: build.query({
      query: () => ({
        url: "/process-definition",
      }),
    }),
    allTasks: build.query({
      query: () => ({
        url: "/task",
      }),
    }),
    getProcessForm: build.query({
      query: processId => ({
        url: `/process-definition/${processId}/deployed-start-form`,
      }),
    }),
    getTaskForm: build.query({
      query: taskId => ({
        url: `/task/${taskId}/deployed-form`,
      }),
      transformResponse: (...arg) => console.log(arg),
    }),
    getTaskFormVariables: build.query({
      query: taskId => ({
        url: `/task/${taskId}/form-variables?deserializeValues=true`,
      }),
    }),
    getProccesXML: build.query({
      query: processId => ({
        url: `/process-definition/${processId}/xml`,
      }),
    }),
  }),
});

export const {
  useAllProcessesQuery,
  useAllTasksQuery,
  useGetTaskFormQuery,
  useGetProcessFormQuery,
  useGetTaskFormVariablesQuery,
  useGetProccesXMLQuery,
} = processesApi;
