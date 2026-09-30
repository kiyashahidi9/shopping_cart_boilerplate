import productService from "../services/productService"
import type { CartItemType } from "../types"
import PopulatedCart from "./PopulatedCart"

interface CartProps {
    cart: CartItemType[]
    onCheckout: () => void
}

function Cart({ cart, onCheckout }: CartProps) {
    async function handleCheckout() {
        await productService.checkout()
        onCheckout()
    }


    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {
                cart.length === 0
                ? <div>
                    <p>Your cart is empty</p>
                    <p>Total: 0$</p>
                  </div>
                : <PopulatedCart cart={cart} />
            }
            <button className="checkout" onClick={handleCheckout}>Checkout</button>
        </div>
    )
}

export default Cart