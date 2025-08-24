const CartItem = ({ product, onRemove, onQtyChange }) => {
  // increate product quantity
  const handleIncrease = () => {
    if (product.qty < product.stock) {
      onQtyChange(product.id, product.qty + 1);
    }
  };

  // decrease product quantity
  const handleDecrease = () => {
    if (product.qty > 1) {
      onQtyChange(product.id, product.qty - 1);
    }
  };

  return (
    <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={product.img}
          alt="Gradient Graphic T-shirt"
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{product.title}</h3>
          <span
            onClick={() => onRemove(product.id)}
            className="text-red-500 text-xl cursor-pointer"
          >
            ×
          </span>
        </div>
        <p className="text-sm text-gray-500">Size: {product.size}</p>
        <p className="text-sm text-gray-500">Color: {product.color}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">
            ${(product.price * product.qty).toFixed(2)}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center cursor-pointer"
            >
              −
            </button>
            <span className="text-sm">{product.qty}</span>
            <button
              onClick={handleIncrease}
              disabled={product.qty >= product.stock}
              className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer ${
                product.qty >= product.stock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              +
            </button>
            <span className="text-xs text-gray-500 ml-1">
              ({product.stock - product.qty} left)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
