export async function DeleteServidor(id: number): Promise<any> {
    try {
        const response = await fetch(`http://10.30.70.127:8090/folhadeponto/servidores/${ id }`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}