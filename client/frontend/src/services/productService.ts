import axios from "axios";
import { z } from 'zod'
import { cartItemSchema, productSchema, type NewProductType } from "../types";
const baseURL = 'http://localhost:5001/api'

async function getAllProducts() {
    const { data } = await axios.get(`${baseURL}/products`)
    const parsed = z.array(productSchema).safeParse(data)

    if (!parsed.success) {
        console.error('Invalid API response:', parsed.error.issues)
        return
    }

    return data
}

async function postNewProduct(newProduct: NewProductType) {
    const { data } = await axios.post(`${baseURL}/products`, newProduct)
    const parsed = productSchema.safeParse(data)

    if (!parsed.success) {
        console.error('Invalid API response:', parsed.error.issues)
        return
    }

    return data
}

async function updateProduct(newProduct: NewProductType, productId: string) {
    const { data } = await axios.put(`${baseURL}/products/${productId}`, newProduct)
    const parsed = productSchema.safeParse(data)

    if (!parsed.success) {
        console.error('Invalid API response:', parsed.error.issues)
        return
    }

    return data
}

async function deleteProduct(productId: string) {
    await axios.delete(`${baseURL}/products/${productId}`)
}

async function getCartItems() {
    const { data } = await axios.get(`${baseURL}/cart`)
    const parsed = z.array(cartItemSchema).safeParse(data)

    if (!parsed.success) {
        console.error('Invalid API response:', parsed.error.issues)
    }
    
    return data
}

async function addToCart(productId: string) {
    const { data } = await axios.post(`${baseURL}/add-to-cart`, { productId })
    return data
}

async function checkout() {
    await axios.post(`${baseURL}/checkout`)
}

export default {
    getAllProducts,
    postNewProduct,
    updateProduct,
    deleteProduct,
    getCartItems,
    addToCart,
    checkout,
}