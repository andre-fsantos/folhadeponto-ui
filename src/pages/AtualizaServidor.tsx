import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Info from "../components/Info.tsx";
import { PutServidor } from "../infrastructure/PutServidor.tsx";
import { useLocation } from "react-router-dom";


const EditaServidor = () => {
    const data = useLocation();
    const servidor = data.state.servidor;

    const [mostraInfo, setMostraInfo] = useState(false);
    const [info, setInfo] = useState('');
    const [bgInfo, setBgInfo] = useState('');

    const id = servidor.id;
    const [siape, setSiape] = useState(servidor.siape);
    const [nome, setNome] = useState(servidor.nome);
    const [campus, setCampus] = useState(servidor.campus);
    const [cargo, setCargo] = useState(servidor.cargo);
    const [cargaHoraria, setCargaHoraria] = useState(servidor.cargaHoraria);
    const [entradaPrimeiroTurno, setEntradaPrimeiroTurno] = useState(servidor.entradaPrimeiroTurno);
    const [saidaPrimeiroTurno, setSaidaPrimeiroTurno] = useState(servidor.saidaPrimeiroTurno);
    const [entradaSegundoTurno, setEntradaSegundoTurno] = useState(servidor.entradaSegundoTurno);
    const [saidaSegundoTurno, setSaidaSegundoTurno] = useState(servidor.saidaSegundoTurno);
    const [perfil, setPerfil] = useState(servidor.perfil);

    const [borderError1, setBorderError1] = useState({});
    const [borderError2, setBorderError2] = useState({});

    const navigate = useNavigate();

    const mostraAlerta = (msn: string, bg: string) => {
        setInfo(msn);
        setBgInfo(bg);
        setMostraInfo(true);

        setTimeout(() => {
            setMostraInfo(false);
        }, 3 * 1000);
    }


    const fetchEdita = async () => {
        const time1 = new Date(`1970-01-01T${entradaPrimeiroTurno}Z`);
        const time2 = new Date(`1970-01-01T${saidaPrimeiroTurno}Z`);
        const time3 = new Date(`1970-01-01T${entradaSegundoTurno}Z`);
        const time4 = new Date(`1970-01-01T${saidaSegundoTurno}Z`);

        const valid1 = time2 > time1;
        const valid2 = time4 > time3;
        const valid3 = time3 > time2;

        if(entradaSegundoTurno !== '' || saidaSegundoTurno !== '') {
            if(! (valid1 && valid2 && valid3)) {
                mostraAlerta('Selecione um intervalo válido de turno!', 'bg-red-200');
                setBorderError1({ border: 'red solid 1px' });
                setBorderError2({ border: 'red solid 1px' });
                setTimeout(() => {
                    setBorderError1({});
                    setBorderError2({});
                }, 3 * 1000);
                return;
            }
        } else {
            if(!valid1) {
                mostraAlerta('Selecione um intervalo válido de turno!', 'bg-red-200');
                setBorderError1({ border: 'red solid 1px' });
                setTimeout(() => { setBorderError1({}) }, 3 * 1000);
                return;
            }
        }


        try {
            const objServidor = {
                id,
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


            const response = await PutServidor(objServidor);

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
                            elmFields[i].focus();

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
                navigate('/servidores', { state: { msn: 'Cadastro atualizado com sucesso!', bg: 'bg-green-200' } });
            }

        } catch (error) {
            mostraAlerta('Erro ao tentar cadastrar o servidor!', 'bg-red-200');
        }
    };

    const onChangeCH = (event: ChangeEvent<HTMLInputElement>) => {
        setCargaHoraria(event.target.value);
        const input = event.target.value;
        const inputNumero = input.replace(/\D/g, '');

        if(input !== inputNumero) {
            mostraAlerta('Digite apenas números!', 'bg-red-200');
            event.target.style.outlineColor = 'red';
        }
        setCargaHoraria(inputNumero);
    }

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [classeDoBotao, setClasseDoBotao] = useState('p-2 bg-gray-200 rounded opacity-20');
    const novaClasseDoBotao = 'p-2 bg-green-200 rounded opacity-100 hover:bg-green-300';

    const changeButton = () => {
        setIsButtonDisabled(false);
        setClasseDoBotao(novaClasseDoBotao);
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
                <p className="text-3xl font-bold ml-4 text-slate-500">Atualizar cadastro do servidor</p>
                <hr className="mr-10 mb-4 mt-4 ml-4" />
                <span className=" text-red-500 mt-4 ml-4 block">* Campos obrigatórios</span>
            </div>

            <div className="max-w-[650px]">
                <div>
                    <div className="flex flex-wrap" onChange={changeButton}>
                        <div className="ml-4">
                            <span className="block font-bold">Siape <span className="text-red-500">*</span></span>
                            <input type="text" value={siape} name="siape" onChange={ e => setSiape(e.target.value) } className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Nome <span className="text-red-500">*</span></span>
                            <input value={nome} name="nome" onChange={ e => setNome(e.target.value) } type="text" className="p-1 rounded border-gray-400 border mb-2 w-[406px]" required />
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Campus <span className="text-red-500">*</span></span>
                            <select value={campus} name="campus" onChange={ e => setCampus(e.target.value) } className="p-[5px] border-gray-400 border rounded w-[195px]">
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
                                <span className="block font-bold">Entrada turno 1 <span className="text-red-500">*</span></span>
                                <input value={entradaPrimeiroTurno} style={borderError1} name="entradaPrimeiroTurno" onChange={ e => setEntradaPrimeiroTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                            <div className="ml-4">
                                <span className="block font-bold">Saída turno 1 <span className="text-red-500">*</span></span>
                                <input value={saidaPrimeiroTurno} style={borderError1} name="saidaPrimeiroTurno" onChange={ e => setSaidaPrimeiroTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="ml-4">
                                <span className="block font-bold">Entrada turno 2</span>
                                <input value={entradaSegundoTurno} style={borderError2} name="entradaSegundoTurno" onChange={ e => setEntradaSegundoTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                            <div className="ml-4">
                                <span className="block font-bold">Saída turno 2</span>
                                <input value={saidaSegundoTurno} style={borderError2} name="saidaSegundoTurno" onChange={ e => setSaidaSegundoTurno(e.target.value) } type="time" className="p-1 rounded border-gray-400 border mb-2 w-[195px]" required />
                            </div>
                        </div>
                        <div className="ml-4">
                            <span className="block font-bold">Perfil <span className="text-red-500">*</span></span>
                            <select value={perfil} name="perfil" onChange={ e => setPerfil(e.target.value) } className="p-1.5 border border-gray-400 rounded w-[195px]">
                                <option value='COMUM'>Comum</option>
                                <option value='PERFIL2'>Perfil 2</option>
                                <option value='PERFIL3'>Perfil 3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end mr-10">
                    <button
                        disabled={isButtonDisabled}
                        onClick={fetchEdita}
                        className={classeDoBotao}>Salvar alterações</button>
                    <Link to='/servidores'>
                        <button
                            className="p-2 bg-gray-200 rounded ml-2 hover:bg-gray-300">Cancelar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EditaServidor;