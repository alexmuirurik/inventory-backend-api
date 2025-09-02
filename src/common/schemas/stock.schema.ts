import z from "zod";

export const StockSchema = z.object({
    productId: z.string().max(100),
    quantity: z.number().min(0),
    locationId: z.string().max(100),
});

export const ProductCheckinItemSchema = z.object({
    productCheckInId: z.string().max(100),
    productId: z.string().max(100),
    quantity: z.number().min(0),
    costPrice: z.number().min(0),
});

export const ProductCheckInSchema = z.object({
    supplierId: z.string().max(100),
    status: z.enum(["PENDING", "RECEIVED", "CANCELLED"]),
    totalCost: z.number().min(0),
});
