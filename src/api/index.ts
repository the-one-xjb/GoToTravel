import axios from 'axios';

// Backend URL - can be overridden by Vite env variable VITE_BACKEND_URL
const backendUrl = (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:3000';

async function getCozeData(content: string): Promise<any> {
    try {
        // POST a minimal payload to the backend which will proxy to Coze
        const response = await axios.post(`${backendUrl}/api/coze`, { content });
        // return the data from backend (which is the Coze response body)
        return response.data;
    } catch (error) {
        console.error('Error calling backend /api/coze:', error);
        throw error;
    }
}

export default getCozeData;