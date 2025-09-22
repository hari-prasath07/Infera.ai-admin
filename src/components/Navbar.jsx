import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import Logo from "../assets/Logo.png"; // your logo
import ProfilePic from "../assets/Profile.jpg"; // your profile image

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state (e.g., tokens, session)
    // Example: localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="navbar">
      {/* Left side: Logo + Title */}
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-logo-link">
          <img src={Logo} alt="logo" className="navbar-logo" />
        </Link>
        <Link to="/dashboard" className="navbar-title">
          Infera.Ai
        </Link>
      </div>

      {/* Right side: Profile + Name + Logout */}
      <div className="navbar-right">
        <img src={ProfilePic} alt="profile" className="profile-img" />
        <span className="admin-name">Admin</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;