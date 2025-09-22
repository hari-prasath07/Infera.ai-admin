import React, { useState } from "react";
import "../css/AddTeamMembers.css";

export default function AddTeamMembers({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    desc: "",
    status: "Active",
    tag: "Web Dev",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setForm({ ...form, img: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd) onAdd(form); // Add member to parent state
  };

  return (
    <div className="overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        {/* Cross button */}
        <span className="close-btn" onClick={onClose}>
          ×
        </span>

        <h2>Add New Team Member</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Role</label>
        <input
          type="text"
          name="role"
          placeholder="Enter role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="desc"
          placeholder="Enter description"
          value={form.desc}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <label>Tag</label>
        <select name="tag" value={form.tag} onChange={handleChange}>
          <option value="Admin">Admin</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Backend">Backend</option>
          <option value="AI">AI</option>
        </select>

        <label>Upload Image</label>
        <input type="file" name="img" accept="image/*" onChange={handleChange} />

        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}
