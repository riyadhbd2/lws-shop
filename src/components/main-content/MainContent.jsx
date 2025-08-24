import { useContext, useState, useMemo } from "react";
import { products } from "../../assets/data";
import CartSection from "./CartSection";
import ProductCard from "./ProductCard";
import { CartContext } from "../../context/CartContext";

const MainContent = ({ searchTerm = "" }) => {
  const { addItem, removeItem, cartData, setQty } = useContext(CartContext);
  const [sortBy, setSortBy] = useState("Most Popular");
  
  const handleAddToCart = (product) => {
    addItem(product);
  };

  const handleRemoveFromCart = (id) => {
    removeItem(id);
  };

  const handleQtyChange = (id, newQty) => {
    setQty(id, newQty);
  };

  // Check if a product is in cart
  const isProductInCart = (productId) => {
    return cartData.some(item => item.id === productId);
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter(product => 
      product.title.toLowerCase().includes(searchLower) ||
      product.color.toLowerCase().includes(searchLower) ||
      product.size.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  // Sort products based on selected criteria
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    
    switch (sortBy) {
      case "Most Popular":
        return productsToSort.sort((a, b) => b.rating - a.rating);
      case "Newest":
        return productsToSort.sort((a, b) => b.date - a.date);
      case "Price: Low to High":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return productsToSort.sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  }, [filteredProducts, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <!-- Products Section (2/3 width on large screens) --> */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchTerm.trim() ? `Search Results for "${searchTerm}"` : "Your Products"}
            </h2>

            {/* sort option */}
            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value="Most Popular">Most Popular</option>
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Search results count */}
          {searchTerm.trim() && (
            <div className="mb-4 text-sm text-gray-600">
              Found {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
            </div>
          )}

          {/* <!-- Products Grid --> */}
          <div className="grid grid-cols-3 gap-5">
            {/* <!-- All Products Map --> */}
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAdd={handleAddToCart} 
                  onRemove={handleRemoveFromCart} 
                  available={isProductInCart(product.id)} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">
                {searchTerm.trim() ? (
                  <>
                    <p className="text-lg mb-2">No products found for "{searchTerm}"</p>
                    <p className="text-sm">Try adjusting your search terms or browse all products</p>
                  </>
                ) : (
                  <p className="text-lg">No products available</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* <!-- Cart Section (1/3 width on large screens) --> */}
        <CartSection onRemove={handleRemoveFromCart} onQtyChange={handleQtyChange} />
      </div>
    </main>
  );
};

export default MainContent;
