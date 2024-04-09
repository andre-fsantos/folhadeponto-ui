import React, { useEffect, useState } from 'react';
import Table from '../components/table.tsx';
import Toast from '../components/Toast.tsx';
import Pagination from '../components/Pagination.tsx';
import BtnNovoServidor from '../components/BtnNovoServidor.tsx';

import { getServidores } from '../infrastructure/GetServidores.tsx';


function App() {
  type Servidores = {
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

  const [servidores, setServidores] = useState<Servidores[]>([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
        try {
          const data = await getServidores();
          const listaDeServidores = data.content;
          setServidores(listaDeServidores);
          // console.log(listaDeServidores);
        } catch (error) {
          // msn de erro
        }
    };

    fetchDataFromAPI();
  }, []);


  const [showToast, setShowToast] = useState(false);
  
  const showToastDel = () => {
    setShowToast(true);
  }
  
  const hiddenToastDel = () => {
    setShowToast(false);
  }

  return (
    <>

      {    
        showToast && 
        <Toast
          msn = 'Tem certeza que deseja excluir o cadastro deste servidor?'
          txtBtn = 'Excluir'
          // delServidor = {  }
          onClose = { hiddenToastDel }
        />
      }

      {/* { mostraModal && <ModalNovoServidor onClose={ hiddenModal } /> } */}

      <main className="mb-56">
      
      {/* <span className="p-2 bg-green-300 rounded-lg absolute top-3 left-1/2 -translate-x-1/2">Servidor cadastrado com sucesso!</span> */}

      <div className="ml-48 mt-20 bg-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-bold text-3xl text-slate-500">Servidores</span>
          </div>
          <div>
            <BtnNovoServidor />
          </div>
        </div>

        <div>
          <hr className="mr-10 mb-4" />
        </div>

        <div className="flex row">
            <div>
              <span className=" mt-4 text-sm font-bold text-gray-500">Matrícula</span>
              <input type="text" className="border block p-1" />
            </div>
            <div className="ml-2">
              <span className="text-sm font-bold text-gray-500">Nome</span>
              <input type="text" className="border block p-1"/>
            </div>
          <div className="flex items-end text-white">
            <button className="bg-blue-500 p-1 px-2 rounded ml-2 hover:bg-blue-600">Buscar</button>
            <button className="bg-gray-500 p-1 px-2 rounded ml-2 hover:bg-gray-600">Limpar</button>
          </div>
        </div>

        <div className="mt-6">
          <span>Total de servidores encontrados: </span>
          <span className="bg-gray-500 px-1 text-white rounded">{servidores.length}</span>
        </div>

        <div className="mt-5 w-max">
          <table className="text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-4">Siape</th>
                <th className="border p-4">Nome</th>
                <th className="border p-4">Campus</th>
                <th className="border p-4">Cargo</th>
                <th className="border p-4">CH</th>
                <th className="border p-4">Ações</th>
              </tr>
            </thead>
            <tbody>

            <Table
              mostraToast = { showToastDel }
              listaDeServidores={ servidores }
            />

            </tbody>
          </table>

          <Pagination />

        </div>
      </div>

    </main>


    </>

  );
}

export default App;
