import { z } from 'zod';

export const loginDefaultValues = {
  email: 'serifcolakel0@gmail.com',
  password: '12345678',
};

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
