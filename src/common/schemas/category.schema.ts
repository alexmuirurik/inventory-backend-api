import z from "zod";

export const CategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
});