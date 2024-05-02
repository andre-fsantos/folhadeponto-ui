import { useEffect, useState } from 'react';
import Table from '../components/table.tsx';
import Pagination from '../components/Pagination.tsx';
import BtnNovoServidor from '../components/BtnNovoServidor.tsx';
import { GetServidores } from '../infrastructure/GetServidores.tsx';
import { DeleteServidor } from '../infrastructure/DeleteServidor.tsx';
import { useLocation } from 'react-router-dom';
import Info from '../components/Info.tsx';

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

  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');

  const limpaCampos = () => {
    setMatricula('');
    setNome('');
  }

  const buscaServidor = () => {
    fetchDataFromAPI(matricula, nome);
  }

  const [servidores, setServidores] = useState<Servidores[]>([]);

  const mostraAlerta = (msn: string, bg: string) => {
    setIsInfo(true);
    setBgInfo(bg);
    setMensagem(msn);

    setTimeout(() => {
      setIsInfo(false);
    }, 3 * 1000);
  }

  const fetchDataFromAPI = async (matricula?: string, nome?: string) => {
    try {
      const data = await GetServidores(matricula, nome);
      const listaDeServidores = data.content;
      setServidores(listaDeServidores);
    } catch (error) {
      mostraAlerta('Erro ao tentar listar os servidores!', 'bg-red-200');
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);


  const [idServidor, setIdServidor] = useState(0);


  const apagaCadastroServidor = async () => {
    try {
      const data = await DeleteServidor(idServidor);
      if (data) {
        setShowToast(false);

        if (matricula === '' && nome === '') {
          fetchDataFromAPI();
        } else {
          fetchDataFromAPI(matricula, nome);
        }

        mostraAlerta('Cadastro excluído com sucesso!', 'bg-green-200');

      } else {
        mostraAlerta('Erro ao tentar excluir o cadastro do servidor!', 'bg-red-200');
      }
    } catch (error) {
      mostraAlerta('Erro ao tentar excluir o cadastro do servidor!', 'bg-red-200');
    }
  };


  const [showToast, setShowToast] = useState(false);

  const showToastDel = (id: number) => {
    setShowToast(true);
    setIdServidor(id);
  }

  const hiddenToastDel = () => {
    setShowToast(false);
  }


  const location = useLocation();
  const hasMensagem = location.state !== null ? true : false;

  const [mensagem, setMensagem] = useState('');
  const [isInfo, setIsInfo] = useState(false);
  const [bgInfo, setBgInfo] = useState('');

  useEffect(() => {
    if (hasMensagem) {
      const info = location.state.msn;
      const bgMsn = location.state.bg;
      mostraAlerta(info, bgMsn);
    }
  }, [hasMensagem]);


  useEffect(() => {
    if (matricula.trim() === '' && nome.trim() === '') {
      fetchDataFromAPI();
    }
  }, [matricula, nome]);


  return (
    <>
      {
        isInfo &&
        <Info
          bg={bgInfo}
          msn={mensagem}
        />
      }

      {
        showToast &&
        (
          <div className="fixed top-0 left-0 h-screen w-screen bg-gray-900/80 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg flex w-max h-max flex-col max-w-[600px]">
              <p className=" text-lg font-bold mb-3">Tem certeza que deseja excluir o cadastro deste servidor?</p>
              <div className="flex justify-end">
                <button
                  onClick={apagaCadastroServidor}
                  className="bg-red-400 p-2 rounded hover:bg-red-500 text-white"
                >Excluir</button>
                <button
                  onClick={hiddenToastDel}
                  className="bg-gray-200 p-2 ml-2 rounded hover:bg-gray-300">Cancelar</button>
              </div>
            </div>
          </div>
        )
      }


      <main className="mb-56">
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
              <input type="text" value={matricula} onChange={e => setMatricula(e.target.value)} onFocus={e => e.target.select()} className="border block p-1" />
            </div>
            <div className="ml-2">
              <span className="text-sm font-bold text-gray-500">Nome</span>
              <input type="text" value={nome} onChange={e => setNome(e.target.value)} onFocus={e => e.target.select()} className="border block p-1" />
            </div>
            <div className="flex items-end text-white">
              <button
                onClick={buscaServidor}
                className="bg-blue-500 p-1 px-2 rounded ml-2 hover:bg-blue-600">Buscar</button>

              {
                (matricula || nome) &&
                (
                  <button
                    onClick={() => {
                      limpaCampos();
                      fetchDataFromAPI();
                    }}
                    className="bg-gray-500 p-1 px-2 rounded ml-2 hover:bg-gray-600">Limpar</button>
                )
              }
            </div>
          </div>

          <div className="mt-6">
            <span>Total de servidores encontrados: </span>
            <span className="bg-gray-500 px-1 text-white rounded">{servidores.length}</span>
          </div>

          {
            servidores.length > 0 && (
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
                      mostraToast={showToastDel}
                      listaDeServidores={servidores}
                    />

                  </tbody>
                </table>

                <Pagination />

              </div>
            )
          }

        </div>

      </main>


    </>

  );
}

export default App;