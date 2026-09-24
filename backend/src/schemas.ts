import { z } from "zod";

const enviEnum = z.enum(['DEVELOPMENT', 'STAGING', 'PRODUCTION']);
const statusEnum = z.enum (['HEALTHY', 'DEGRADED', 'DOWN']);
const roleEnum = z.enum(['DEVELOPER', 'LEAD'])


export const loginSchema = z.object({ 
    
    email: z.email("Please input a valid email."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    role: z.string()
})

export const createMicroserviceSchema = z.object({
    id: z.string(),
    name: z.string().min(3, "Name must be 3-60 characters long").max(60),
    endpointUrl: z.string(),
    environment: z.string(),
    status: z.string(),
    version: z.string()
})


export const updateMicroserviceSchema = z.object({
    body: z
    .object({ envi: enviEnum, status: statusEnum })
    .partial()
    .refine((data) => data.status || data.envi, {
        message: "Provide at least one of: status, environment.",
    }),
    params: z.object({
        version: z.string("Version must be a string"),

    }),
});


export type LoginInput = z.infer<typeof loginSchema>;
export type CreateMicroserviceInput = z.infer<typeof createMicroserviceSchema>;
export type UpdateMicroserviceInput = z.infer<typeof updateMicroserviceSchema>;
