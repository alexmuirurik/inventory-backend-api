import z from 'zod'

export const StockSchema = z.object({
    id: z.string().max(100).optional(),
    productId: z.string().max(100),
    quantity: z.coerce.number().min(0),
    locationId: z.string().max(100),
})

export const ProductCheckinItemSchema = z.object({
    productCheckInId: z.string().max(100),
    productId: z.string().max(100),
    quantity: z.coerce.number().min(0),
    costPrice: z.coerce.number().min(0),
})

export const ProductCheckInSchema = z.object({
    userId: z.string().max(100),
    locationId: z.string().max(100),
})
