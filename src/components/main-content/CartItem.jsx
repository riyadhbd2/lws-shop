
import { CartContext } from "../../context/CartContext";

const CartItem = ({ product, onRemove }) => {
  
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
          <p className="font-bold">$145</p>
          <div className="flex items-center space-x-2">
            <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              −
            </button>
            <span className="text-sm">1</span>
            <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
