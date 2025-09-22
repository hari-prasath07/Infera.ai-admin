import React, { useState } from "react";
import "../css/Content.css";
import blogImage from "../assets/Profile.jpg"; // Fallback image
import pagesImage from "../assets/Profile.jpg";
import achievementImage from "../assets/Profile.jpg";
import aiEducationImage from "../assets/Profile.jpg";
import mlPipelinesImage from "../assets/Profile.jpg";
import openSourceImage from "../assets/Profile.jpg";

const ContentManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      type: "Blog",
      title: "The Future of AI in Education",
      description: "Exploring how AI is reshaping education worldwide.",
      image: aiEducationImage,
      alt: "AI in Education",
      published: "Jan 15, 2025",
      views: 1247,
      status: "Published",
    },
    {
      id: 2,
      type: "Page",
      title: "Building Scalable ML Pipelines",
      description: "Step-by-step guide to scalable ML pipelines.",
      image: mlPipelinesImage,
      alt: "ML Pipelines",
      published: "Jan 10, 2025",
      views: 89,
      readTime: "8 min read",
      status: "Published",
    },
    {
      id: 3,
      type: "Achievement",
      title: "Open Source Contributions",
      description: "How to start contributing to open source projects.",
      image: openSourceImage,
      alt: "Open Source",
      created: "Jan 5, 2025",
      status: "Draft",
    },
    {
      id: 1,
      type: "Blog",
      title: "The Future of AI in Education",
      description: "Exploring how AI is reshaping education worldwide.",
      image: aiEducationImage,
      alt: "AI in Education",
      published: "Jan 15, 2025",
      views: 1247,
      status: "Published",
    },
    {
      id: 2,
      type: "Page",
      title: "Building Scalable ML Pipelines",
      description: "Step-by-step guide to scalable ML pipelines.",
      image: mlPipelinesImage,
      alt: "ML Pipelines",
      published: "Jan 10, 2025",
      views: 89,
      readTime: "8 min read",
      status: "Published",
    },
    {
      id: 3,
      type: "Achievement",
      title: "Open Source Contributions",
      description: "How to start contributing to open source projects.",
      image: openSourceImage,
      alt: "Open Source",
      created: "Jan 5, 2025",
      status: "Draft",
    },
    {
      id: 1,
      type: "Blog",
      title: "The Future of AI in Education",
      description: "Exploring how AI is reshaping education worldwide.",
      image: aiEducationImage,
      alt: "AI in Education",
      published: "Jan 15, 2025",
      views: 1247,
      status: "Published",
    },
    {
      id: 2,
      type: "Page",
      title: "Building Scalable ML Pipelines",
      description: "Step-by-step guide to scalable ML pipelines.",
      image: mlPipelinesImage,
      alt: "ML Pipelines",
      published: "Jan 10, 2025",
      views: 89,
      readTime: "8 min read",
      status: "Published",
    },
    {
      id: 3,
      type: "Achievement",
      title: "Open Source Contributions",
      description: "How to start contributing to open source projects.",
      image: openSourceImage,
      alt: "Open Source",
      created: "Jan 5, 2025",
      status: "Draft",
    },
    {
      id: 1,
      type: "Blog",
      title: "The Future of AI in Education",
      description: "Exploring how AI is reshaping education worldwide.",
      image: aiEducationImage,
      alt: "AI in Education",
      published: "Jan 15, 2025",
      views: 1247,
      status: "Published",
    },
    {
      id: 2,
      type: "Page",
      title: "Building Scalable ML Pipelines",
      description: "Step-by-step guide to scalable ML pipelines.",
      image: mlPipelinesImage,
      alt: "ML Pipelines",
      published: "Jan 10, 2025",
      views: 89,
      readTime: "8 min read",
      status: "Published",
    },
    {
      id: 3,
      type: "Achievement",
      title: "Open Source Contributions",
      description: "How to start contributing to open source projects.",
      image: openSourceImage,
      alt: "Open Source",
      created: "Jan 5, 2025",
      status: "Draft",
    },
  ]);

  const [newContent, setNewContent] = useState({
    type: "Blog",
    title: "",
    description: "",
    image: "",
    alt: "",
  });

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContent((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload (Base64)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewContent((prev) => ({
          ...prev,
          image: reader.result,
          alt: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit new or edited content
  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (editingId) {
      setContentItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...newContent, alt: newContent.alt || item.alt }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newItem = {
        id: contentItems.length + 1,
        type: newContent.type,
        title: newContent.title,
        description: newContent.description,
        image: newContent.image,
        alt: newContent.alt,
        published: today,
        views: 0,
        status: "Draft",
      };
      setContentItems([...contentItems, newItem]);
    }

    setNewContent({ type: "Blog", title: "", description: "", image: "", alt: "" });
    setShowForm(false);
  };

  // Edit content
  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewContent({
      type: item.type,
      title: item.title,
      description: item.description || "",
      image: item.image,
      alt: item.alt,
    });
    setShowForm(true);
  };

  // Publish content
  const handlePublish = (id) => {
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setContentItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Published", published: today, views: item.views || 0 }
          : item
      )
    );
  };

  // Fallback image
  const handleImageError = (e) => {
    e.target.src = blogImage;
  };

  // Filtered items
  const filteredItems =
    activeFilter === "All"
      ? contentItems
      : contentItems.filter((item) => item.type === activeFilter);

  return (
    <div className="content-management">
      <div className="main-content">
        {/* Header with filter dropdown and add button */}
        <div className="header">
          <div className="header-left">
            <h2>Content Management</h2>
            <p>Manage blog posts, pages, and site content</p>
          </div>
          <div className="header-right">
            <select
              className="filter-select"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Blog">Blog</option>
              <option value="Page">Page</option>
              <option value="Achievement">Achievement</option>
            </select>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              New Content
            </button>
          </div>
        </div>

        {/* Popup Form */}
        {showForm && (
          <div className="popup-overlay">
            <div className="popup">
              <button className="close-button" onClick={() => setShowForm(false)}>
                &times;
              </button>
              <h3>{editingId ? "Edit Content" : "Create New Content"}</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Type:</label>
                  <select
                    name="type"
                    value={newContent.type}
                    onChange={handleInputChange}
                  >
                    <option value="Blog">Blog</option>
                    <option value="Page">Page</option>
                    <option value="Achievement">Achievement</option>
                  </select>
                </div>
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newContent.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={newContent.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Image:</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
    
                </div>
                <div className="form-buttons">
                  <button type="submit">{editingId ? "Update" : "Save"}</button>
                  <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content Cards */}
        <div className="content-cards">
          <div className="card-grid">
            {filteredItems.map((item) => (
              <div className="card" key={item.id}>
                <img src={item.image} alt={item.alt} onError={handleImageError} />
                <h3>{item.title}</h3>
                <p>
                  {item.status === "Published"
                    ? `Published ${item.published} | ${item.views} views${
                        item.readTime ? ` | ${item.readTime}` : ""
                      }`
                    : `Draft | Created ${item.created || "Recently"} | Ready for review`}
                </p>
                <div className="button-group">
                  {item.status === "Draft" && (
                    <button
                      className="publish-button"
                      onClick={() => handlePublish(item.id)}
                    >
                      Publish
                    </button>
                  )}
                  <button className="edit-button" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
