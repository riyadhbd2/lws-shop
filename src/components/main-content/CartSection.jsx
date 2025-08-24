import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import PromoCode from "./PromoCode";

const CartSection = ({ onRemove, onQtyChange }) => {
  const { cartData, totalPrice } = useContext(CartContext);
  
  // Calculate order summary values
  const subtotal = totalPrice;
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>

        {/* <!-- All Cart Item Map Here --> */}

        {cartData.map((product) => (
          <CartItem 
            key={product.id} 
            product={product} 
            onRemove={onRemove} 
            onQtyChange={onQtyChange}
          />
        ))}

        {/* <!-- Order Summary --> */}
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (-20%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* <!-- Promo Code --> */}
          <PromoCode />

          {/* <!-- Checkout Button --> */}
          <a
            href="#"
            className="block bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Go to Checkout
            <span className="inline-block ml-2">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
