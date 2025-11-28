import React, { useState } from "react";

const ProductForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      stock: "",
      currency: "USD",
      images: [""],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Editar producto" : "Crear producto"}</h2>

      <label>Nombre</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Descripción</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Precio</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Precio con descuento</label>
      <input
        type="number"
        name="discountPrice"
        value={formData.discountPrice}
        onChange={handleChange}
      />

      <label>Stock</label>
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
      />

      <label>Moneda</label>
      <select
        name="currency"
        value={formData.currency}
        onChange={handleChange}
      >
        <option value="USD">USD</option>
        <option value="ARS">ARS</option>
        <option value="EUR">EUR</option>
      </select>

      <label>Imagen (URL)</label>
      <input
        type="text"
        name="images"
        value={formData.images[0]}
        onChange={(e) =>
          setFormData({ ...formData, images: [e.target.value] })
        }
      />

      <button type="submit">
        {initialData ? "Guardar cambios" : "Crear producto"}
      </button>
    </form>
  );
};

export default ProductForm;
