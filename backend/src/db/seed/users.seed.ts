import bcrypt from 'bcrypt';
import { db } from '../index.js';
import { user } from '../schema/user.js';

async function seedUsers() {
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin123!',
      role: 'admin' as const,
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'Michael Brown',
      email: 'michael@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'Emily Johnson',
      email: 'emily@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'David Wilson',
      email: 'david@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'Daniel Miller',
      email: 'daniel@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'Olivia Taylor',
      email: 'olivia@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
    {
      name: 'James Anderson',
      email: 'james@example.com',
      password: 'User123!',
      role: 'user' as const,
    },
  ];

  const usersWithHashedPasswords = await Promise.all(
    users.map(async (userData) => ({
      ...userData,
      password: await bcrypt.hash(userData.password, 10),
    })),
  );

  await db.insert(user).values(usersWithHashedPasswords).onConflictDoNothing();

  console.log('10 users seeded successfully!');
}

seedUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding users:', error);
    process.exit(1);
  });
