import React, { useState } from 'react';
import NovoServidor from '../pages/NovoServidor';
import { Link } from 'react-router-dom';


type Servidor = {
  "id": number,
  "siape": string,
  "nome": string,
  "campus": string,
  "cargo": string,
  "cargaHoraria": number,
  "entradaPrimeiroTurno": string,
  "saidaPrimeiroTurno": string,
  "entradaSegundoTurno": string,
  "saidaSegundoTurno": string,
  "perfil": string,
  "status": boolean
}

type Props = {
  mostraToast: () => void;
  listaDeServidores: Servidor[];
}

const TabelaDeObjetos: React.FC<Props> = ({ listaDeServidores, mostraToast }) => {
  return (
    <>
      {
        listaDeServidores.map((servidor, index) => (
            <tr className="border" key={index}>
              <td className="border p-4">{servidor.siape}</td>
              <td className="border p-4">{servidor.nome}</td>
              <td className="border p-4">{servidor.campus}</td>
              <td className="border p-4">{servidor.cargo}</td>
              <td className="border p-4">{servidor.cargaHoraria} h</td>
              <td className="border p-4">
                <div className="flex row">
                  <Link to={`/novo-servidor?i=${ encodeURIComponent(JSON.stringify(servidor)) }`}>
                    <div
                      className="bg-blue-300 w-max rounded-full p-2 hover:cursor-pointer hover:bg-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                      </svg>
                    </div>
                  </Link>
                  <div
                    onClick={mostraToast}
                    className="bg-red-300 w-max rounded-full p-2 ml-1 hover:cursor-pointer hover:bg-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                      <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
        ))
      }
    </>
  );
};

export default TabelaDeObjetos;