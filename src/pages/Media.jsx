import React, { useState } from 'react';
import '../css/media.css';

const mediaData = [
  { id: 1, image: 'team-collaboration.jpg', title: 'team-collaboration.jpg', size: '2.4 MB', date: 'Jan 15, 2025' },
  { id: 2, image: 'ai-dashboard-demo.png', title: 'ai-dashboard-demo.png', size: '1.8 MB', date: 'Jan 12, 2025' },
  { id: 3, image: 'voice-assistant.jpg', title: 'voice-assistant.jpg', size: '3.1 MB', date: 'Jan 10, 2025' },
  { id: 4, image: 'ml-pipeline-diagram.png', title: 'ml-pipeline-diagram.png', size: '2.7 MB', date: 'Jan 8, 2025' },
];

const MediaCard = ({ image, title, size, date }) => (
  <div className="card">
    <img src={image} alt={title} className="card-image" />
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-meta">{size} • {date}</p>
    </div>
  </div>
);

const MediaUploadPopup = ({ onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(''); // New state for custom title
  const [publishedDate, setPublishedDate] = useState('');
  const [fileSizeMB, setFileSizeMB] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Auto-calculate file size in MB
      const sizeInMB = (uploadedFile.size / (1024 * 1024)).toFixed(2);
      setFileSizeMB(sizeInMB);
      // Auto-calculate and format date
      const now = new Date();
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      setPublishedDate(now.toLocaleDateString('en-US', options));
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Update title state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const newMedia = {
        id: Date.now(),
        image: URL.createObjectURL(file), // Create a temporary URL for the image preview
        title: title.trim() || file.name, // Use custom title or fallback to file name
        size: `${fileSizeMB} MB`,
        date: publishedDate,
      };
      onSubmit(newMedia);
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Upload Media</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="media-title">Title</label>
            <input
              type="text"
              id="media-title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter media title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="media-file">Choose Image</label>
            <input
              type="file"
              id="media-file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          {file && (
            <div className="form-info">
              <p><strong>Filename:</strong> {file.name}</p>
              <p><strong>Size:</strong> {fileSizeMB} MB</p>
              <p><strong>Published Date:</strong> {publishedDate}</p>
            </div>
          )}
          <button type="submit" className="submit-button">Add Media</button>
        </form>
      </div>
    </div>
  );
};

const MediaPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mediaItems, setMediaItems] = useState(mediaData);

  const handleAddMedia = (newMedia) => {
    setMediaItems([newMedia, ...mediaItems]);
  };

  return (
    <div className="media-page">
      <header className="media-header">
        <div>
          <h1 className="media-title">Media Library</h1>
          <p className="media-subtitle">Organize photos, videos, and documents</p>
        </div>
        <button onClick={() => setShowPopup(true)} className="upload-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Upload Media
        </button>
      </header>
      <div className="media-grid">
        {mediaItems.map((media) => (
          <MediaCard key={media.id} {...media} />
        ))}
      </div>
      {showPopup && (
        <MediaUploadPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleAddMedia}
        />
      )}
    </div>
  );
};

export default MediaPage;