import z from "zod";

export const StoreLocationSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2).max(100),
    address: z.string().min(5).max(200),
    currency: z.string().min(3).max(3),
    taxRate: z.coerce.number().min(0).max(100).optional(),
    phone: z.string().min(7).max(15).optional(),
});