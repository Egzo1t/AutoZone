import { UserRepository } from '../repositories/user.repository.js';
import { SignUpData } from '../types/user.types.js';

const userRepository = new UserRepository();

export class UserService {
  async register(userData: SignUpData) {
    return await userRepository.register(userData);
  }

  async findByEmail(email: string) {
    return await userRepository.findByEmail(email);
  }
}
