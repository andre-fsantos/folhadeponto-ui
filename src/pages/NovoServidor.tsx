import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

// interface IProps {
//     onClose(): void;
// }

// const CadastraServidor: React.FC<IProps> = ({ onClose }) => {

// interface IServidor {
//     siape: string,
//     nome: string,
//     campus: string,
//     cargo: string,
//     cargaHoraria: number,
//     entradaPrimeiroTurno: string,
//     saidaPrimeiroTurno: string,
//     entradaSegundoTurno: string | null,
//     saidaSegundoTurno: string | null,
//     perfil: string,
//     status: boolean
// }


const CadastraServidor = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dadosSerializados = queryParams.get('i');

    let servidor = {
        siape: '',
        nome: '',
        campus: '',
        cargo: '',
        cargaHoraria: 0,
        entradaPrimeiroTurno: '',
        saidaPrimeiroTurno: '',
        entradaSegundoTurno: '',
        saidaSegundoTurno: '',
        perfil: '',
        status: false
    };

    if (dadosSerializados !== null) {
        servidor = JSON.parse(decodeURIComponent(dadosSerializados));
    }

    const elmSelectCampus = useRef<HTMLSelectElement>(null);
    
    useEffect(() => {
        if(elmSelectCampus.current !== null) elmSelectCampus.current.value = servidor.campus;
    }, [elmSelectCampus]);


    const elmSelectPerfil = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if(elmSelectPerfil.current !== null) elmSelectPerfil.current.value = servidor.perfil;
    }, [elmSelectPerfil]);


    return (
        <div className="bg-white p-6 rounded-lg">
            {/* <span className="p-2 bg-yellow-200 rounded-lg absolute top-3 left-1/2 -translate-x-1/2">Preencha os campos obrigatórios!</span> */}

            

            <div className="mb-6">
                <p className="text-3xl font-bold ml-4 text-slate-500">Cadastro de Servidor</p>
                <hr className="mr-10 mb-4 mt-4 ml-4" />
                <span className=" text-red-500 mt-4 ml-4 block">* Campos obrigatórios</span>
            </div>

            <div className="max-w-[650px]">
                <div>
                    <div className="flex flex-wrap">
                        <div className="ml-4">
                            <span className="block font-bold">Siape *</span>
                            <input type="text" className="p-1 rounded border-gray-400 border mb-2 w-25" required value={servidor.siape}/>
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Nome *</span>
                            <input type="text" className="p-1 rounded border-gray-400 border mb-2 w-96" required value={servidor.nome}/>
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Campus *</span>
                            <select ref={elmSelectCampus} className="p-[5px] border-gray-400 border rounded">
                                <option value='CAANG'>Angical</option>
                                <option value='CACAM'>Campo Maior</option>
                                <option value='CACOC'>Cocal</option>
                                <option value='CACOR'>Corrente</option>
                                <option value='CADIR'>Dirceu</option>
                                <option value='CAFLO'>Floriano</option>
                                <option value='CAJFR'>José de Freitas</option>
                                <option value='CAOEI'>Oeiras</option>
                                <option value='CAPAR'>Parnaiba</option>
                                <option value='CAPAU'>Paulistana</option>
                                <option value='CAPEDII'>Pedro II</option>
                                <option value='CAPIC'>Picos</option>
                                <option value='CAPIR'>Piripiri</option>
                                <option value='CAPIX'>Pio IX</option>
                                <option value='CASJP'>São João do Piauí</option>
                                <option value='CASRN'>São Raimundo Nonato</option>
                                <option value='CATCE'>Teresina Central</option>
                                <option value='CATZS'>Teresina Zona Sul</option>
                                <option value='CAURU'>Uruçuí</option>
                                <option value='CAVAL'>Valença</option>
                                <option value='REI'>Reitoria</option>
                            </select>
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Cargo *</span>
                            <input type="text" className="p-1 rounded border-gray-400 border mb-2 w-[380px]" required value={servidor.cargo}/>
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Carga horária *</span>
                            <input type="text" className="p-1 rounded border-gray-400 border mb-2 w-[120px]" required value={servidor.cargaHoraria}/>
                        </div>
                        <div className="flex">
                            <div className="ml-4">
                                <span className="block font-bold">Entrada turno 1 *</span>
                                <input type="time" className="p-1 rounded border-gray-400 border mb-2 w-32" required value={servidor.entradaPrimeiroTurno}/>
                            </div>
                            <div className="ml-4">
                                <span className="block font-bold">Saída turno 1 *</span>
                                <input type="time" className="p-1 rounded border-gray-400 border mb-2 w-32" required value={servidor.saidaPrimeiroTurno}/>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="ml-4">
                                <span className="block font-bold">Entrada turno 2</span>
                                <input type="time" className="p-1 rounded border-gray-400 border mb-2 w-32" required value={servidor.entradaSegundoTurno}/>
                            </div>
                            <div className="ml-4">
                                <span className="block font-bold">Saída turno 2</span>
                                <input type="time" className="p-1 rounded border-gray-400 border mb-2 w-32" required value={servidor.saidaSegundoTurno}/>
                            </div>
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Perfil *</span>
                            <select ref={elmSelectPerfil} className="p-1.5 border border-gray-400 rounded">
                                <option value='COMUM'>Comum</option>
                                <option value='PERFIL2'>Perfil 2</option>
                                <option value='PERFIL3'>Perfil 3</option>
                            </select>
                        </div>
                        
                        
                    </div>

                    
                </div>

                <div className="mt-6 flex justify-end mr-10">
                    <button
                        className="p-2 bg-green-200 rounded hover:bg-green-300">Cadastrar</button>
                    <Link to='/servidores'>
                    <button
                        className="p-2 bg-gray-200 rounded ml-2 hover:bg-gray-300">Cancelar</button>
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default CadastraServidor;