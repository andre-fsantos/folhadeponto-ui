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


export async function getServidores(): Promise<ApiResponseType> {
    try {
        const response = await fetch('http://10.30.70.127:8090/folhadeponto/servidores');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}
