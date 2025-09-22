import React, { useState } from "react";
import "../css/Product.css";
import ProductForm from "./AddProductForm";

const initialProducts = [
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  {
    name: "SmartAnalytics AI",
    desc: "Real-time data analysis platform with predictive insights wkmrkqw rqwkr wqe wqeqw ewqe weqw ewq eqw e eqwn qw;kr k;qw rwq r;qw r;qw ",
    status: "Live",
    tech: "Python, TensorFlow",
    stars: 127,
    domain: "AI",
    action: "View Demo",
  },
  // ... more products
];

export default function ProductPage() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [editingIndex, setEditingIndex] = useState(null); // track product being edited

  const handleAddProduct = (newProduct) => {
    if (editingIndex !== null) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = newProduct;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.status === filter);

  const getStatusClass = (status) => {
    switch (status) {
      case "Live":
        return "status-live";
      case "New":
        return "status-new";
      case "Beta":
        return "status-beta";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Products Management</h1>

        <div className="header-actions">
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Live">Live</option>
            <option value="Beta">Beta</option>
            <option value="New">New</option>
          </select>

          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Product
          </button>
        </div>
      </div>

      <p className="subtitle">Manage AI solutions and project showcases</p>

      <div className="grid">
        {filteredProducts.map((p, i) => (
          <div key={i} className="card">
            {/* Domain Badge */}
            <span className={`domain-badge domain-${p.domain.replace(" ", "-")}`}>
              {p.domain}
            </span>

            <h2>{p.name}</h2>
            <p className="desc">{p.desc}</p>
            <div className="meta">
              <span className={`status ${getStatusClass(p.status)}`}>
                {p.status}
              </span>
              <span className="tech">{p.tech}</span>
              <span className="stars">⭐ {p.stars}</span>
            </div>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEdit(i)}>
                Edit
              </button>
              <button className="action-btn">{p.action}</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ProductForm
          onAdd={handleAddProduct}
          onClose={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          product={editingIndex !== null ? products[editingIndex] : null} // pass product to edit
        />
      )}
    </div>
  );
}
