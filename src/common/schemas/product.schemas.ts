import z from 'zod'

export const IdSchema = z.object({
    id: z.string(),
})

export const ProductSchema = z.object({
    name: z.string().min(2).max(100),
    locationId: z.string(),
    categoryId: z.string().max(100),
    unit: z.string().max(50),
    costPrice: z.coerce.number().min(0),
    sellingPrice: z.coerce.number().min(0),
    reorderLevel: z.coerce.number().min(0).optional(),
    sku: z.string().max(50),
    quantity: z.coerce.number().default(0),
})

