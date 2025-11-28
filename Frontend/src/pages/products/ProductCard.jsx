import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <div className="product-prices">
        {product.discountPrice ? (
          <>
            <span className="old-price">${product.price}</span>
            <span className="discount-price">${product.discountPrice}</span>
          </>
        ) : (
          <span className="price">${product.price}</span>
        )}
      </div>

      <button onClick={() => onAddToCart(product)}>Agregar al carrito 🛒</button>
    </div>
  );
};

export default ProductCard;
