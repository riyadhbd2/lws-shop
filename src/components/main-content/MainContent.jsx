import { useContext } from "react";
import { products } from "../../assets/data";
import CartSection from "./CartSection";
import ProductCard from "./ProductCard";
import { CartContext } from "../../context/CartContext";

const MainContent = () => {
  const { addItem, removeItem, cartData } = useContext(CartContext);
  
  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleRemoveFromCart = (id) => {
    removeItem(id);
  };

  // Check if a product is in cart
  const isProductInCart = (productId) => {
    return cartData.some(item => item.id === productId);
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <!-- Products Section (2/3 width on large screens) --> */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Products</h2>

            {/* sort option */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* <!-- Products Grid --> */}
          <div className="grid grid-cols-3 gap-5">
            {/* <!-- All Products Map --> */}
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={handleAddToCart} 
                onRemove={handleRemoveFromCart} 
                available={isProductInCart(product.id)} 
              />
            ))}
          </div>
        </div>

        {/* <!-- Cart Section (1/3 width on large screens) --> */}
        <CartSection onRemove={handleRemoveFromCart} />
      </div>
    </main>
  );
};

export default MainContent;
