import productService from "../services/productService"
import { useState } from "react"
import type { ProductType } from "../types"

interface EditProductFormProps {
  onClose: () => void
  product: ProductType
  onUpdateProduct: (updatedProduct: ProductType, productId: string) => void
}

function EditProductForm({ onClose, product, onUpdateProduct }: EditProductFormProps) {
  const [newTitle, setNewTitle] = useState(product.title)
  const [newPrice, setNewPrice] = useState(String(product.price))
  const [newQuantity, setNewQuantity] = useState(String(product.quantity))

  async function handleUpdateProductSubmit() {
    const updatedProduct = {
      title: newTitle,
      price: Number(newPrice),
      quantity: Number(newQuantity),
    }

    const result = await productService.updateProduct(updatedProduct, product._id)
    onUpdateProduct(result, product._id)
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleUpdateProductSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => onClose()}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm
