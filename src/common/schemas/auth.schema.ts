import z from 'zod'

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const SignUpSchema = z
    .object({
        firstName: z.string().min(1).max(50),
        lastName: z.string().min(1).max(50),
        email: z.email(),
        password: z.string().min(6).max(100),
        confirmPassword: z.string().min(6).max(100),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            })
        }
    })

export const UserSignUpSchema = SignUpSchema.omit({ confirmPassword: true })
