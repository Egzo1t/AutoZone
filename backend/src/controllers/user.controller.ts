import { UserService } from '../services/user.service.js';
import { SignUpData, LoginData } from '../types/user.types.js';
import { FastifyRequest, FastifyReply } from 'fastify';
import { HttpError } from '../utils/httpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const service = new UserService();

export class UserController {
  async register(req: FastifyRequest<{ Body: SignUpData }>, reply: FastifyReply) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new HttpError('Missing required fields', 400);
    }

    const existingUser = await service.findByEmail(email);

    if (existingUser.length > 0) {
      throw new HttpError('User with this email already exists', 409);
    }

    const newUser = await service.register({
      name,
      email,
      password,
    });

    const { password: _, ...userWithoutPassword } = newUser[0];

    return reply.code(201).send({
      success: true,
      user: userWithoutPassword,
    });
  }

  async login(req: FastifyRequest<{ Body: LoginData }>, reply: FastifyReply) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpError('Missing required fields', 400);
    }

    const users = await service.findByEmail(email);

    if (users.length === 0) {
      throw new HttpError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, users[0].password);

    if (!isPasswordValid) {
      throw new HttpError('Invalid password', 401);
    }

    const token = jwt.sign({ id: users[0].id, email: users[0].email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return reply.code(200).send({
      success: true,
      token,
    });
  }
}
