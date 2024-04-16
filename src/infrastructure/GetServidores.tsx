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

type ApiResponseType = {
    content: Servidor[]
}

export async function GetServidores(matricula?: string, nome?: string): Promise<ApiResponseType> {
    try {
        let parametro = '';
        if(matricula !== undefined && nome !== undefined) parametro = `?matricula=${ matricula }&nome=${ nome }`;
        if(matricula !== undefined && nome === undefined) parametro = `?matricula=${ matricula }`;
        if(matricula === undefined && nome !== undefined) parametro = `?nome=${ nome }`;

        const url = `http://10.30.70.127:8090/folhadeponto/servidores${ parametro }`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao tentar listar servidores');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}