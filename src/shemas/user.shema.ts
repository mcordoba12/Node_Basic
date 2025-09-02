import { object, string, z } from "zod";

export const userSchema : any = object({
  name: string().nonempty("Name is required"),
  email: string()
    .nonempty("Email is required")
    .email("Invalid email format"),
  password: string().nonempty("password is required"),
    role: string()
    .nonempty("Role is required")
    .refine((val) => ["admin", "user", "moderator"].includes(val), {
      message: "Role must be one of: admin, user, moderator",
    }),
});

