import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaBox,
  FaUsers,
  FaChartBar,
  FaImage,
  FaCog,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Function to close sidebar (used for mobile)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="logo">My Admin Panel</span>
        </div>

        <nav className="menu">
          <ul>
            <li>
              <Link to="/dashboard" onClick={handleLinkClick}>
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/content" onClick={handleLinkClick}>
                <FaFileAlt /> Content
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={handleLinkClick}>
                <FaBox /> Products
              </Link>
            </li>
            <li>
              <Link to="/team" onClick={handleLinkClick}>
                <FaUsers /> Team
              </Link>
            </li>

            <li>
              <Link to="/media" onClick={handleLinkClick}>
                <FaImage /> Media
              </Link>
            </li>
            <li>
              <Link to="/career" onClick={handleLinkClick}>
                <FaImage /> Career
              </Link>
            </li>

            {/* Settings with Dropdown */}
            <li className="dropdown">
              <div
                className="dropdown-toggle"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <FaCog /> Settings {isSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {isSettingsOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/settings/user-management"
                      onClick={handleLinkClick}
                    >
                      User Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings/media-management"
                      onClick={handleLinkClick}
                    >
                      Media Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings/security" onClick={handleLinkClick}>
                      Security Settings
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings/customization" onClick={handleLinkClick}>
                      Customization
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings/system-integration"
                      onClick={handleLinkClick}
                    >
                      System Integration
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings/profile" onClick={handleLinkClick}>
                      Profile Settings
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
