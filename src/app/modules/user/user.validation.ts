import z from 'zod';

export const validateCreateUser = z.object({
  body: z.object({
    password: z
      .string({ message: 'Must be string' })
      .max(20, { message: 'must not upper than 20' }),
  }),
});

export const validateUser = { validateCreateUser };
