import { z } from 'zod';

export const referralValidator = z.object({
  name: z.string({ message: 'Name is required' }).min(3, { message: 'Name must be at least 3 characters long' }).max(32, { message: 'Name must be less then 32 characters long' }).trim(),
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }).trim(),
});
