import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getProcessHtmlForm,
  setProcessKey,
} from "../../store/slice/processSlice";
import { getProcessFields } from "./../../store/slice/processSlice";
import { Link } from "react-router-dom";

export default function Process({ setShowModal, process }) {
  const dispatch = useDispatch();
  process?.versions.sort((a, b) => b.version - a.version);
  const [selected, selectedOnChange] = useState(process?.versions[0].id);
  return (
    <div className='h-16 border-2 p-2 border-purple-400 rounded-md flex flex-row justify-between items-center mb-1'>
      <span>{process?.name}</span>
      <select
        name='processes'
        onChange={e => {
          selectedOnChange(e.currentTarget.value);
        }}
      >
        {process?.versions.map(v => (
          <option value={v.id}>{v.version}</option>
        ))}
      </select>
      <div>
        <Link
          className='bg-slate-400 p-1 rounded-lg text-white mr-2'
          to={`/diargam${selected}`}
        >
          Диаграмма
        </Link>
        <button
          className='bg-slate-400 p-1 rounded-lg text-white'
          onClick={async () => {
            // dispatch(getProcessFields(pkey));
            console.log(selected);
            dispatch(getProcessHtmlForm(selected));
            dispatch(setShowModal());
          }}
        >
          Запустить
        </button>
      </div>
    </div>
  );
}
