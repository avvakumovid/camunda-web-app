import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const processesApi = createApi({
  reducerPath: "processes/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/engine-rest/",
  }),
  endpoints: build => ({
    allProcesses: build.query({
      query: () => ({
        url: "/process-definition?latestVersion=true",
      }),
    }),
    allTasks: build.query({
      query: () => ({
        url: "/task",
      }),
    }),
    getTaskForm: build.query({
      query: taskId => ({
        url: `/task/${taskId}/deployed-form`,
      }),
    }),
  }),
});

export const { useAllProcessesQuery, useAllTasksQuery, useGetTaskFormQuery } =
  processesApi;
