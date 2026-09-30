import type { CartItemType } from "../types"

interface PopulatedCartProps {
    cart: CartItemType[]
}

function PopulatedCart({ cart }: PopulatedCartProps) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {
                cart.map(item => (
                    <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price * item.quantity}</td>
                    </tr>
                ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={cart.length} className="total">Total: {total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
    )
}

export default PopulatedCart