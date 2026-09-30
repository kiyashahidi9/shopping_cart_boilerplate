import { z } from 'zod'

export const productSchema = z.object({
    _id: z.string(),
    title: z.string(),
    quantity: z.number().int().min(0),
    price: z.number().min(0)
})

export const newProductSchema = productSchema.pick({
    title: true,
    quantity: true,
    price: true,
})

export const cartItemSchema = z.object({
    _id: z.string(),
    productId: z.string(),
    title: z.string(),
    quantity: z.number().int().min(0),
    price: z.number().min(0),
})

export type ProductType = z.infer<typeof productSchema>
export type NewProductType = z.infer<typeof newProductSchema>
export type CartItemType = z.infer<typeof cartItemSchema>