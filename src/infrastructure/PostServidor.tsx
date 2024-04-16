export async function PostServidor(data: object): Promise<any> {
    try {
        const url = `http://10.30.70.127:8090/folhadeponto/servidores`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);//////
    }
}