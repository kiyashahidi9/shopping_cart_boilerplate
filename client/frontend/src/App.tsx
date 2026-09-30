import { useEffect, useState } from 'react'
import './App.css'
import { mockProducts, mockCart } from '../../mockData/data.ts'
import type { CartItemType, ProductType } from './types.ts'
import productService from './services/productService.ts'

import Cart from './components/Cart'
import ProductListing from './components/ProductListing'
import TogglableAddProductForm from "./components/TogglableAddProductForm.tsx"

function App() {
  const [products, setProducts] = useState<ProductType[]>(mockProducts)
  const [cart, setCart] = useState<CartItemType[]>(mockCart)

  // INITIAL RENDER //

  // GET PRODUCTS
  useEffect(() => {
    async function getAllProducts() {
      const result = await productService.getAllProducts()
      setProducts(result)
    }

    getAllProducts()
  }, [])

  // GET CART ITEMS
  useEffect(() => {
    async function getCartItems() {
      const result = await productService.getCartItems()
      setCart(result)
    }

    getCartItems()
  }, [])

  // STATE CHANGES //

  // ADD PRODUCT
  function handleAddProduct(newProduct: ProductType) {
    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
  }

  // UPDATE PRODUCT
  function handleUpdateProduct(updatedProduct: ProductType, productId: string) {
    const updatedProducts = products.map((product) => (
      product._id === productId ? updatedProduct : product
    ))
    setProducts(updatedProducts)
  }

  // DELETE PRODUCT
  function handleDeleteProduct(productId: string) {
    const updatedProducts = products.filter((product) => (
      product._id !== productId
    ))
    setProducts(updatedProducts)
  }

  // ADD TO CART
  function handleAddToCart(newCartItem: CartItemType, updatedProduct: ProductType) {
    let updated = false

    let updatedCart = cart.map((cartItem) => {
      if (cartItem._id === newCartItem._id) {
        updated = true
        return newCartItem
      } else {
        return cartItem
      }
    })

    if (!updated) {
      updatedCart = [...cart, newCartItem]
    }

    // update product quantity
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return {
          ...product,
          quantity: product.quantity - 1
        }
      } else {
        return product
      }
    })

    setCart(updatedCart)
    setProducts(updatedProducts)
  }

  // CHECKOUT
  function handleCheckout() {
    setCart([])
  }

  return (
    <div id="app">
    <header>
      <h1>The Shop!</h1>
      <Cart
        cart={cart}
        onCheckout={handleCheckout}
      />
    </header>

    <main>
      <ProductListing
        products={products}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddToCart={handleAddToCart}
      />
    
      <TogglableAddProductForm
        onAddProduct={handleAddProduct}
      />
    </main>
  </div>
  )
}

export default App