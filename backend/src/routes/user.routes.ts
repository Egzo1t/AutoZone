import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller.js';

const controller = new UserController();

export async function userRoutes(app: FastifyInstance) {
    app.post('/users/register', controller.register.bind(controller));
    app.post('/users/login', controller.login.bind(controller));
}