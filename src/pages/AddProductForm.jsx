import React, { useState, useEffect } from "react";
import "../css/AddProductForm.css";

export default function ProductForm({ onAdd, onClose, product }) {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    status: "Live",
    tech: "",
    stars: 0,
    action: "View Demo",
    domain: "AI",
  });

  // Prefill form if editing
  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>

        <label>Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="desc"
          placeholder="Enter product description"
          value={form.desc}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Live">Live</option>
          <option value="Beta">Beta</option>
          <option value="New">New</option>
        </select>

        <label>Technology</label>
        <input
          type="text"
          name="tech"
          placeholder="e.g. Python, TensorFlow"
          value={form.tech}
          onChange={handleChange}
        />

        <label>Domain</label>
        <select name="domain" value={form.domain} onChange={handleChange}>
          <option value="AI">AI</option>
          <option value="ML">ML</option>
          <option value="Cloud">Cloud</option>
          <option value="Web Dev">Web Dev</option>
        </select>

        <label>Stars</label>
        <input
          type="number"
          name="stars"
          value={form.stars}
          onChange={handleChange}
        />

        <label>Action Button Text</label>
        <input
          type="text"
          name="action"
          value={form.action}
          onChange={handleChange}
        />

        <button type="submit">{product ? "Update Product" : "Add Product"}</button>
      </form>
    </div>
  );
}
