import z from 'zod'

export const IdSchema = z.object({
    id: z.string(),
})

export const ProductSchema = z.object({
    name: z.string().min(2).max(100),
    categoryId: z.string().max(100),
    unit: z.string().max(50),
    costPrice: z.number().min(0),
    sellingPrice: z.number().min(0),
    reorderLevel: z.number().min(0).optional(),
    isActive: z.boolean().default(true),
    description: z.string().max(500).optional(),
    sku: z.string().max(50),
    images: z.array(z.url()).optional(),
})

