import { z } from 'zod';

export const referralValidator = z.object({
  name: z.string({ message: 'Name is required' }).min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  phone: z.string({ message: 'Phone is required' }).min(10, { message: 'Phone must be at least 10 digits long' }).max(13, { message: 'Phone must be at most 13 digits long' }).refine((phone) => /^\d+$/.test(phone),{ message: 'Phone must contain only numbers' }),
  referralCode: z.string({ message: 'Referral code is required' }).min(1, { message: 'Referral code must be at least 1 character long' }),
});
