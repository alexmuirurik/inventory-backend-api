import z from 'zod'

export const SaleSchema = z.object({
    checkoutSessionId: z.string(),
    customerId: z.string(),
    paymentStatus: z.enum(['PAID', 'PENDING', 'REFUNDED']),
    paymentMethod: z.enum([
        'CASH',
        'CARD',
        'MOBILE_MONEY',
        'BANK_TRANSFER',
        'SPLIT_PAYMENT',
    ]),
    status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']),
    totalAmount: z.number().min(0),
})

export const SaleItemSchema = z.object({
    saleId: z.string(),
    productId: z.string(),
    quantity: z.coerce.number().min(1),
    unitPrice: z.coerce.number().min(0),
    discount: z.coerce.number().min(0).optional(),
    subTotal: z.coerce.number().min(0),
})
