type ServidorType = {
    id: string,
    siape: string,
    nome: string,
    campus: string,
    cargo: string,
    cargaHoraria: number,
    entradaPrimeiroTurno: string,
    saidaPrimeiroTurno: string,
    entradaSegundoTurno: string,
    saidaSegundoTurno: string,
    perfil: string
}

export async function PutServidor(data: ServidorType): Promise<any> {
    try {
        const url = `http://10.30.70.127:8090/folhadeponto/servidores/${data.id}`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...data, id: null})
        }
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);//////
        throw error;
    }
}