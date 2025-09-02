import z from "zod";

export const SaleItemSchema = z.object({
    saleId: z.string(),
    productId: z.string().uuid(),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0),
    discount: z.number().min(0).optional(),
    subTotal: z.number().min(0),
})