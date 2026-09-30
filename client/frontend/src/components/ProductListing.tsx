import type { CartItemType, ProductType } from "../types"
import ProductCard from "./ProductCard"

interface ProductListingProps {
    products: ProductType[]
    onUpdateProduct: (updatedProduct: ProductType, productId: string) => void
    onDeleteProduct: (productId: string) => void
    onAddToCart: (newCartItem: CartItemType, updatedProduct: ProductType) => void
}

function ProductListing({ products, onUpdateProduct, onDeleteProduct, onAddToCart }: ProductListingProps) {

    return (
        <div className="product-listing">
            <h2>Products</h2>
            <ul className='product-list'>

                {
                    products.map((product) => (
                        <li className="product" key={product._id}>
                            <ProductCard
                                product={product}
                                onUpdateProduct={onUpdateProduct}
                                onDeleteProduct={onDeleteProduct}
                                onAddToCart={onAddToCart}
                            />
                        </li>
                    ))
                }

            </ul>

        </div>
    )
}

export default ProductListing