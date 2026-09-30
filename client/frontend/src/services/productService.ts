import axios from "axios";
import { z } from 'zod'
import type { NewProductType } from "../types";
const baseURL = 'http://localhost:5001/api'

async function getAllProducts() {
    const { data } = await axios.get(`${baseURL}/products`)
    return data
}

async function postNewProduct(newProduct: NewProductType) {
    const { data } = await axios.post(`${baseURL}/products`, newProduct)
    return data
}

async function updateProduct(newProduct: NewProductType, productId: string) {
    const { data } = await axios.put(`${baseURL}/products/${productId}`, newProduct)
    return data
}

async function deleteProduct(productId: string) {
    await axios.delete(`${baseURL}/products/${productId}`)
}

async function getCartItems() {
    const { data } = await axios.get(`${baseURL}/cart`)
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