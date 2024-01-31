import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email({
    message: 'Email address is required.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});
