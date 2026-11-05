import { db } from '../db/index.js';
import { user } from '../db/schema/user.js';
import { SignUpData } from '../types/user.types.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export class UserRepository {
  async register(userData: SignUpData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await db
      .insert(user)
      .values({ ...userData, password: hashedPassword })
      .returning();
  }

  async findByEmail(email: string) {
    return await db.select().from(user).where(eq(user.email, email));
  }
}
