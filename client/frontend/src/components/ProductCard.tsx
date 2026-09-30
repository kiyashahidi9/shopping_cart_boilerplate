import { useState } from "react"
import EditProductForm from "./EditProductForm"
import type { CartItemType, ProductType } from "../types"
import productService from "../services/productService"

interface ProductCardProps {
    product: ProductType
    onUpdateProduct: (updatedProduct: ProductType, productId: string) => void
    onDeleteProduct: (productId: string) => void
    onAddToCart: (newCartItem: CartItemType, updatedProduct: ProductType) => void
}

function ProductCard({ product, onUpdateProduct, onDeleteProduct, onAddToCart }: ProductCardProps) {
    const [editFormOpened, setEditFormOpened] = useState(false)

    // DELETE PRODUCT
    async function handleDeleteProduct() {
        const confirmed = window.confirm(`Are you sure you want to delete "${product.title}"?`)
        if (confirmed) {
            await productService.deleteProduct(product._id)
            onDeleteProduct(product._id)
        }
    }

    // ADD TO CART
    async function addToCart() {
        const result = await productService.addToCart(product._id)
        const addedItem: CartItemType = {
            _id: result.item._id,
            productId: result.item.productId,
            title: result.item.title,
            quantity: result.item.quantity,
            price: result.item.price
        }

        onAddToCart(addedItem, product)
    }

    return (
        <div className="product-details">
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <p className="quantity">{product.quantity} left in stock</p>
            <div className="actions product-actions">
                <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>

                {
                    editFormOpened
                    ? <EditProductForm
                        product={product}
                        onClose={() => setEditFormOpened(false)}
                        onUpdateProduct={onUpdateProduct}
                      />
                    : <button 
                        type='button' 
                        onClick={() => setEditFormOpened(true)}
                      >
                        Edit
                    </button>
                }
                
            </div>
            <button className="delete-button" onClick={handleDeleteProduct}><span>X</span></button>
        </div>
    )
}

export default ProductCard