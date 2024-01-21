import { UserRole } from "@prisma/client";
import * as z from "zod";

export const TaskSchema = z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }).min(1, "Title cannot be empty"),
    description: z.string().optional(),
    total_time: z.number().int().nonnegative().optional().default(0),
    userId: z.string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    }),
    // createdAt: z.date(),
    // updatedAt: z.date(),
  });
  
export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
.refine((data)=> {
    if (data.password && !data.newPassword) {
        return false;
    }
    return true;
}, {
    message: "New password is required.",
    path: ["newPassword"]
})
.refine((data)=> {
    if (data.newPassword && !data.password) {
        return false;
    }
    return true;
}, {
    message: "Password is required.",
    path: ["password"]
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required"
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
});