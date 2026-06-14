import dotenv from 'dotenv';
import { buildApp } from './app.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    try {
        const app = await buildApp();
        await app.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();