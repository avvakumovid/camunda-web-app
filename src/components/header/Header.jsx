import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='h-14 bg-gray-500 flex flex-row justify-end items-center'>
      <Link className='mr-2 text-white text-xl' to='/'>
        Процесы
      </Link>
      <Link className='mr-2 text-white text-xl' to='/tasks'>
        Задачи
      </Link>
    </div>
  );
}
