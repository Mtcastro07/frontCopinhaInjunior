import { z } from "zod";

const SENHA_SEED_TEMPORARIA = "1234567890";

function senhaForte(value: string): boolean {
  return (
    value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /[0-9]/.test(value) &&
    /[^A-Za-z0-9\s]/.test(value) &&
    /^\S+$/.test(value) &&
    /^[\x00-\x7F]+$/.test(value)
  );
}

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .refine(
      (value) => value === SENHA_SEED_TEMPORARIA || senhaForte(value),
      "Senha inválida",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
