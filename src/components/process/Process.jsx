import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setProcessKey } from "../../store/slice/processSlice";
import { getProcessFields } from "./../../store/slice/processSlice";

export default function Process({
  name,
  deploymentId,
  id,
  pkey,
  setShowModal,
}) {
  const dispatch = useDispatch();
  return (
    <div className='h-16 border-2 p-2 border-purple-400 rounded-md flex flex-row justify-between items-center mb-1'>
      <span>{name}</span>
      <button
        className='bg-slate-400 p-1 rounded-lg text-white'
        onClick={async () => {
          dispatch(getProcessFields(pkey));
          dispatch(setShowModal());
        }}
      >
        Запустить
      </button>
    </div>
  );
}
