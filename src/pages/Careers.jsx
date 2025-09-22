import React, { useState } from 'react';
import "../css/Career.css";

const Careers = () => {
  // Dummy data for existing careers
  const [careers, setCareers] = useState([
    { id: 1, type: 'Job', title: 'Software Engineer', description: 'Full-time position', location: 'Remote', salary: '$100k' },
    { id: 2, type: 'Internship', title: 'Marketing Intern', description: 'Summer internship', location: 'New York', duration: '3 months' },
    { id: 3, type: 'Training', title: 'Data Science Training', description: 'Online course', location: 'Virtual', duration: '6 weeks' },
    { id: 4, type: 'Job', title: 'Product Manager', description: 'Senior role', location: 'San Francisco', salary: '$150k' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCareer, setCurrentCareer] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
    salary: '',
    duration: '',
  });

  const openModal = (career = null) => {
    if (career) {
      setIsEditMode(true);
      setCurrentCareer(career);
      setFormData({
        type: career.type,
        title: career.title,
        description: career.description,
        location: career.location,
        salary: career.salary || '',
        duration: career.duration || '',
      });
    } else {
      setIsEditMode(false);
      setCurrentCareer(null);
      setFormData({ type: '', title: '', description: '', location: '', salary: '', duration: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentCareer(null);
    setFormData({ type: '', title: '', description: '', location: '', salary: '', duration: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update existing career
      setCareers(careers.map(c => c.id === currentCareer.id ? { ...c, ...formData } : c));
    } else {
      // Add new career
      const newCareer = { id: Date.now(), ...formData };
      setCareers([...careers, newCareer]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setCareers(careers.filter(c => c.id !== id));
  };

  return (
    <div className="careers-container">
      <div className="careers-header">
        <h1>Careers Management</h1>
        <button className="add-btn" onClick={() => openModal()}>Add Career</button>
      </div>

      <div className="careers-list">
        <table className="careers-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Salary/Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr key={career.id}>
                <td>{career.type}</td>
                <td>{career.title}</td>
                <td>{career.description}</td>
                <td>{career.location}</td>
                <td>{career.salary} / {career.duration}</td>
                <td>
                  <button className="edit-btn" onClick={() => openModal(career)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(career.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditMode ? 'Edit Career' : 'Add New Career'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="career-form">
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select id="type" name="type" value={formData.type} onChange={handleInputChange} required>
                  <option value="">Select Type</option>
                  <option value="Job">Job</option>
                  <option value="Internship">Internship</option>
                  <option value="Training">Training</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary (for Jobs):</label>
                <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration (for Internships/Trainings):</label>
                <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-btn">{isEditMode ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;