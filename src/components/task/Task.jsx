import React from "react";
import { Link } from "react-router-dom";

export default function Task({ name, taskId }) {
  return (
    <div className='h-16 border-2 p-2 border-purple-400 rounded-md flex flex-row justify-between items-center mb-1'>
      <span>{name}</span>
      <Link
        className='bg-slate-400 p-1 rounded-lg text-white'
        to={`/taskInstance${taskId}`}
      >
        Открыть
      </Link>
    </div>
  );
}
