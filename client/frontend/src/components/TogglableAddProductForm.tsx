import { useState, type SyntheticEvent } from "react"
import productService from "../services/productService"
import type { ProductType } from "../types"

interface TogglableAddProductFormProps {
    onAddProduct: (newProduct: ProductType) => void
}

function TogglableAddProductForm({ onAddProduct }: TogglableAddProductFormProps) {
  const [formOpened, setFormOpened] = useState(false)
  // make state generic
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  // CREATE NEW PRODUCT
  async function handleFormSubmit(e: SyntheticEvent) {
    e.preventDefault()

    const newProduct = {
      title,
      price: Number(price),
      quantity: Number(quantity),
    }

    const createdProduct = await productService.postNewProduct(newProduct)
    onAddProduct(createdProduct)
    setFormOpened(false)
    clearForm()
  }

  // CLEAR FORM
  function clearForm() {
    setPrice('')
    setTitle('')
    setQuantity('')
  }

  if (!formOpened) {
    return (
      <div>
        <button 
          className='add-product-button' 
          onClick={() => setFormOpened(true)}
        >
          Add Product
        </button>
      </div>
    )

  } else {
    return (
      <div className="add-form">
          <form onSubmit={handleFormSubmit}>
            <div className="input-group">
              <label htmlFor="product-name">Product Name:</label>
              <input
                type="text"
                id="product-name"
                name="product-name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="product-price">Price:</label>
              <input
                type="number"
                id="product-price"
                name="product-price"
                min="0"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="product-quantity">Quantity:</label>
              <input
                type="number"
                id="product-quantity"
                name="product-quantity"
                min="0"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                required
              />
            </div>
            <div className="actions form-actions">
              <button type="submit">Add</button>
              <button type="button" onClick={() => setFormOpened(false)}>Cancel</button>
            </div>
          </form>
        </div>
    )
  }

}

export default TogglableAddProductForm