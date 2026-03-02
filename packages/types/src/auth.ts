import z from "zod";

export interface CustomJwtSessionClaims{
    metadata?:{
        role?: "user"| "admin",
    }
}

export const UserFormSchema = z.object({
  firstName: z
    .string("First name is required!")
    .min(2, { message: "First name must be at least 2 characters!" })
    .max(50),
  lastName: z
    .string("Last name is required!")
    .min(2, { message: "Last name must be at least 2 characters!" })
    .max(50),
   userName: z
    .string("User name is required!")
    .min(2, { message: "User name must be at least 2 characters!" })
    .max(50),
  emailAdderss: z.array(z.string({message:"Email is required!"})),
  password: z
    .string("Password is required!")
    .min(8, { message: "Password must be at least 8 characters!" })
    .max(50),
});