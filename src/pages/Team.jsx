import React, { useState } from "react";
import "../css/Team.css";
import B1 from "/images/b1.jpg";
import B2 from "/images/b2.jpg";
import B3 from "/images/b3.jpg";
import AddTeamMembers from "./AddTeamMember";

const initialTeamMembers = [
  {
    name: "Arjun Krishnan",
    role: "Founder & AI Lead",
    desc: "Final Year CSE, ESEC",
    status: "Active",
    tag: "Admin",
    img: B1,
  },
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    desc: "Expert in React & UI Design",
    status: "Active",
    tag: "Web Dev",
    img: B2,
  },
  {
    name: "Sneha Iyer",
    role: "UI/UX Designer",
    desc: "Passionate about creating user-friendly interfaces",
    status: "Inactive",
    tag: "Web Dev",
    img: B3,
  },
];

function Team() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // track which member is being edited
  const [filterTag, setFilterTag] = useState("All"); // filter state

  const handleAddOrUpdateMember = (member) => {
    if (member.img && typeof member.img !== "string") {
      member.img = URL.createObjectURL(member.img);
    }

    if (editingIndex !== null) {
      // Update existing member
      const updatedMembers = [...teamMembers];
      updatedMembers[editingIndex] = member;
      setTeamMembers(updatedMembers);
      setEditingIndex(null);
    } else {
      // Add new member
      setTeamMembers([...teamMembers, member]);
    }
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  // Filtered members based on dropdown
  const filteredMembers =
    filterTag === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.tag === filterTag);

  return (
    <div className="team-section" style={{ position: "relative" }}>
      <div className="team-header">
        <h2 className="team-title">Team Management</h2>
        <div className="team-actions">
          {/* Filter Dropdown */}
          <select
            className="filter-dropdown"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="All">All Tags</option>
            <option value="Admin">Admin</option>
            <option value="Web Dev">Web Dev</option>
            <option value="Backend">Backend</option>
            <option value="AI">AI</option>
          </select>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Member
          </button>
        </div>
      </div>

      <div className="team-grid">
        {filteredMembers.map((member, index) => (
          <div key={index} className="team-card">
            <span className={`team-tag ${member.tag.toLowerCase()}`}>
              {member.tag}
            </span>
            <img src={member.img} alt={member.name} className="team-img" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p className="team-desc">{member.desc}</p>
            <span className="team-status">{member.status}</span>
            <div className="team-buttons">
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Edit Profile
              </button>
              <button className="view-btn">View Public</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <AddTeamMembers
          onAdd={handleAddOrUpdateMember}
          onClose={() => {
            setShowModal(false);
            setEditingIndex(null);
          }}
          memberData={editingIndex !== null ? teamMembers[editingIndex] : null}
        />
      )}
    </div>
  );
}

export default Team;
