import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/ProcessesDefinition";
import TaskInstance from "../pages/TaskInstance";
import Tasks from "../pages/Tasks";
import Diagram from "./../pages/Diagram";

export default function Navigation() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/tasks' element={<Tasks />} />
      <Route path='/diargam:processId' element={<Diagram />} />
      <Route path='/taskInstance:taskId' element={<TaskInstance />} />
    </Routes>
  );
}
