import React from 'react';
import { Link } from 'react-router-dom';

const BtnNovoServidor: React.FC = () => {
  return (
    <Link to='/novo-servidor'>
      <button
        className="bg-green-500 p-1 rounded-md text-white flex items-center mr-10 hover:bg-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span className="mr-1">Novo</span>
      </button>
    </Link>
  )
}

export default BtnNovoServidor;