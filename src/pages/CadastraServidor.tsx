import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { PostServidor } from '../infrastructure/PostServidor.tsx';
import Info from "../components/Info.tsx";


const CadastraServidor = () => {
    const navigate = useNavigate();

    const [mostraInfo, setMostraInfo] = useState(false);
    const [info, setInfo] = useState('');
    const [bgInfo, setBgInfo] = useState('');

    const [siape, setSiape] = useState('');
    const [nome, setNome] = useState('');
    const [campus, setCampus] = useState('');
    const [cargo, setCargo] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('');
    const [entradaPrimeiroTurno, setEntradaPrimeiroTurno] = useState('');
    const [saidaPrimeiroTurno, setSaidaPrimeiroTurno] = useState('');
    const [entradaSegundoTurno, setEntradaSegundoTurno] = useState('');
    const [saidaSegundoTurno, setSaidaSegundoTurno] = useState('');
    const [perfil, setPerfil] = useState('');



    const fetchCadastro = async () => {
        try {
            const servidor = {
                siape,
                nome,
                campus,
                cargo,
                cargaHoraria,
                entradaPrimeiroTurno,
                saidaPrimeiroTurno,
                entradaSegundoTurno,
                saidaSegundoTurno,
                perfil
            }


            const response = await PostServidor(servidor);

            if (response.errorMessage !== undefined) {
                
                if(response.errors.length > 0) {
                    const msn = response.errors[0].message;
                    setBgInfo('bg-red-200');
                    setInfo(msn);

                    const elmInputs = document.querySelectorAll('input');
                    const elmSelect = document.querySelectorAll('select');

                    const elmFields = [...elmInputs, ...elmSelect];

                    for(let i = 0; i < elmFields.length; i++) {
                        const hasErro = elmFields[i].name === response.errors[0].fieldName;
    
                        if(hasErro) {
                            elmFields[i].style.borderColor = 'red';
                            elmFields[i].style.outlineColor = 'red';

                            setTimeout(() => {
                                elmFields[i].style.borderColor = '';
                                elmFields[i].style.outlineColor = '';
                                setMostraInfo(false);
                            }, 3 * 1000);

                            break;
                        }
                    }
                }

                setMostraInfo(true);
                
            } else {
                navigate('/servidores', { state: { msn: 'Cadastro realizado com sucesso!', bg: 'bg-green-200' } });
            }


        } catch (error) {
            setInfo('Erro ao tentar cadastrar o servidor!');
            setBgInfo('bg-red-200');
            setMostraInfo(true);

            setTimeout(() => {
                setMostraInfo(false);
            }, 3 * 1000);
        }
    };

    const onChangeCH = (event: ChangeEvent<HTMLInputElement>) => {
        setCargaHoraria(event.target.value);
        const input = event.target.value;
        const inputNumero = input.replace(/\D/g, '');

        if(input !== inputNumero) {
            setInfo('Digite apenas números!');
            setBgInfo('bg-red-200');
            setMostraInfo(true);

            event.target.style.outlineColor = 'red';
            
            setTimeout(() => {
                setMostraInfo(false);
                event.target.style.outlineColor = '';
            }, 3 * 1000);
        }
        setCargaHoraria(inputNumero);
    }




    return (
        <div className="bg-white p-6 rounded-lg">
            {
                mostraInfo &&
                (
                    <Info
                        bg={bgInfo}
                        msn={info}
                    />
                )
            }

            <div className="mb-6">
                <p className="text-3xl font-bold ml-4 text-slate-500">Cadastrar servidor</p>
                <hr className="mr-10 mb-4 mt-4 ml-4" />
                <span className=" text-red-500 mt-4 ml-4 block">* Campos obrigatórios</span>
            </div>

            <div className="max-w-[650px]">
                <div>
                    <div className="flex flex-wrap">
                        <div className="ml-4">
                            <span className="block font-bold">Siape <span className="text-red-500">*</span></span>
                            <input type="text" autoFocus name="siape" value={siape} onChange={ e => setSiape(e.target.value) } className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Nome <span className="text-red-500">*</span></span>
                            <input value={nome} name="nome" onChange={ e => setNome(e.target.value) } type="text" className="p-1 rounded border-gray-400 border mb-2 w-[406px]" required />
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Campus <span className="text-red-500">*</span></span>
                            <select value={campus} name="campus" onChange={ e => setCampus(e.target.value) } className="p-[5px] border-gray-400 border rounded w-[195px]">
                                <option value=""></option>
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
                            <span className="block font-bold">Cargo <span className="text-red-500">*</span></span>
                            <input value={cargo} name="cargo" onChange={ e => setCargo(e.target.value) } type="text" className="p-1 rounded border-gray-400 border mb-2 w-[406px]" required />
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Carga horária <span className="text-red-500">*</span></span>
                            <input value={cargaHoraria} name="cargaHoraria" onChange={ onChangeCH } type="text" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                        </div>
                        <div className="flex">
                            <div className="ml-4">
                                <span className="block font-bold">Entrada primeiro turno <span className="text-red-500">*</span></span>
                                <input value={entradaPrimeiroTurno} name="entradaPrimeiroTurno" onChange={ e => setEntradaPrimeiroTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                            <div className="ml-4">
                                <span className="block font-bold">Saída primeiro turno <span className="text-red-500">*</span></span>
                                <input value={saidaPrimeiroTurno} name="saidaPrimeiroTurno" onChange={ e => setSaidaPrimeiroTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="ml-4">
                                <span className="block font-bold">Entrada segundo turno</span>
                                <input value={entradaSegundoTurno} name="entradaSegundoTurno" onChange={ e => setEntradaSegundoTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                            <div className="ml-4">
                                <span className="block font-bold">Saída segundo turno</span>
                                <input value={saidaSegundoTurno} name="saidaSegundoTurno" onChange={ e => setSaidaSegundoTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Perfil <span className="text-red-500">*</span></span>
                            <select value={perfil} name="perfil" onChange={ e => setPerfil(e.target.value) } className="p-1.5 border border-gray-400 rounded w-[195px]">
                                <option value=''></option>
                                <option value='COMUM'>Comum</option>
                                <option value='PERFIL2'>Perfil 2</option>
                                <option value='PERFIL3'>Perfil 3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end mr-10">
                    <button
                        onClick={fetchCadastro}// trocar
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