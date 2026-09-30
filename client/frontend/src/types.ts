export interface ProductType {
    _id: string
    title: string
    quantity: number
    price: number
}

export type NewProductType = Pick<ProductType, "title" | 'quantity' | 'price'>

export interface CartItemType {
    _id: string
    productId: string
    title: string
    quantity: number
    price: number
}