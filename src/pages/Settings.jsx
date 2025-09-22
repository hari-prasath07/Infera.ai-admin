import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../css/settings.css";

const Settings = () => {
  const { tab } = useParams() || { tab: "user-management" };
  const [activeTab, setActiveTab] = useState(tab);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // User Management States
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    notes: "",
  });

  // Media Management States
  const [uploadLimits, setUploadLimits] = useState({
    maxSize: 10,
    fileTypes: "jpg,png,mp4",
  });
  const [displaySettings, setDisplaySettings] = useState({
    layout: "grid",
    sortOrder: "name-asc",
  });

  // Security States
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireSpecial: true,
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: "User Added", user: "admin@example.com", timestamp: "2025-09-15T10:00:00Z" },
    { id: 2, action: "Password Changed", user: "user@example.com", timestamp: "2025-09-14T15:30:00Z" },
  ]);

  // Customization States
  const [language, setLanguage] = useState("en");

  // System Integration States
  const [backupSettings, setBackupSettings] = useState({
    frequency: "weekly",
  });
  const [apiKeys, setApiKeys] = useState([
    { id: 1, key: "abc123", created: "2025-09-01T12:00:00Z" },
  ]);

  // Profile States
  const [profile, setProfile] = useState({
    name: "Current User",
    email: "user@example.com",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const updateHasChanges = () => setHasChanges(true);

  // User Management Functions
  const handleEditUser = (id) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    updateHasChanges();
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.email.includes("@")) {
      setError("Invalid email address");
      return;
    }
    setError("");
    const user = {
      id: Date.now(),
      ...newUser,
      status: "Active",
    };
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "User", notes: "" });
    updateHasChanges();
  };

  // Media Management Functions
  const handleSaveUploadLimits = (e) => {
    e.preventDefault();
    console.log("Upload Limits Saved:", uploadLimits);
    updateHasChanges();
  };

  const handleSaveDisplaySettings = (e) => {
    e.preventDefault();
    console.log("Display Settings Saved:", displaySettings);
    updateHasChanges();
  };

  // Security Functions
  const handleSavePasswordPolicy = (e) => {
    e.preventDefault();
    console.log("Password Policy Saved:", passwordPolicy);
    updateHasChanges();
  };

  // System Integration Functions
  const handleSaveBackupSettings = (e) => {
    e.preventDefault();
    console.log("Backup Settings Saved:", backupSettings);
    updateHasChanges();
  };

  const handleManualBackup = () => {
    console.log("Initiating manual backup...");
    updateHasChanges();
  };

  const handleGenerateApiKey = () => {
    const newKey = {
      id: Date.now(),
      key: `key-${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toISOString(),
    };
    setApiKeys([...apiKeys, newKey]);
    updateHasChanges();
  };

  const handleDeleteApiKey = (id) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
    updateHasChanges();
  };

  // Profile Functions
  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Profile Saved:", profile);
    updateHasChanges();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setError("New passwords do not match");
      return;
    }
    setError("");
    console.log("Password Change Requested:", password);
    setPassword({ current: "", new: "", confirm: "" });
    updateHasChanges();
  };

  // Global Functions
  const handleSaveChanges = () => {
    console.log("Saving all changes...");
    setHasChanges(false);
  };

  const handleCancelChanges = () => {
    setNewUser({ name: "", email: "", role: "User", notes: "" });
    setUploadLimits({ maxSize: 10, fileTypes: "jpg,png,mp4" });
    setDisplaySettings({ layout: "grid", sortOrder: "name-asc" });
    setPasswordPolicy({ minLength: 8, requireSpecial: true });
    setIs2FAEnabled(false);
    setBackupSettings({ frequency: "weekly" });
    setProfile({ name: "Current User", email: "user@example.com" });
    setPassword({ current: "", new: "", confirm: "" });
    setHasChanges(false);
    setError("");
  };

  const renderSection = () => {
    if (isLoading)
      return (
        <p className="loading-text">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </p>
      );

    switch (activeTab) {
      case "user-management":
        return (
          <div className="settings-section">
            <h2>
              <i className="fas fa-users"></i> User Management
            </h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>
                  <i className="fas fa-list"></i> User List
                </h3>
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.status}</td>
                        <td>
                          <button onClick={() => handleEditUser(user.id)}>
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="settings-card">
                <h3>
                  <i className="fas fa-user-plus"></i> Add New User
                </h3>
                {error && (
                  <p className="error-message">
                    <i className="fas fa-exclamation-circle"></i> {error}
                  </p>
                )}
                <form onSubmit={handleAddUser} className="user-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user"></i> Name
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-envelope"></i> Email
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user-tag"></i> Role
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-sticky-note"></i> Notes
                    </label>
                    <textarea
                      value={newUser.notes}
                      onChange={(e) => setNewUser({ ...newUser, notes: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="save-btn">
                    <i className="fas fa-save"></i> Add User
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case "media-management":
        return (
          <div className="settings-section">
            <h2>
              <i className="fas fa-photo-video"></i> Media Management Settings
            </h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>
                  <i className="fas fa-upload"></i> Upload Limits
                </h3>
                <form onSubmit={handleSaveUploadLimits} className="media-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-weight"></i> Max File Size (MB)
                    </label>
                    <input
                      type="number"
                      value={uploadLimits.maxSize}
                      onChange={(e) => setUploadLimits({ ...uploadLimits, maxSize: e.target.value })}
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-file-alt"></i> Allowed File Types
                    </label>
                    <input
                      type="text"
                      value={uploadLimits.fileTypes}
                      onChange={(e) => setUploadLimits({ ...uploadLimits, fileTypes: e.target.value })}
                      placeholder="e.g., jpg,png,mp4"
                    />
                  </div>
                  <button type="submit" className="save-btn">
                    <i className="fas fa-save"></i> Save
                  </button>
                </form>
              </div>
              <div className="settings-card">
                <h3>
                  <i className="fas fa-th"></i> Default Display Settings
                </h3>
                <form onSubmit={handleSaveDisplaySettings} className="media-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-th-large"></i> Layout
                    </label>
                    <select
                      value={displaySettings.layout}
                      onChange={(e) => setDisplaySettings({ ...displaySettings, layout: e.target.value })}
                    >
                      <option value="grid">Grid</option>
                      <option value="list">List</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-sort"></i> Sort Order
                    </label>
                    <select
                      value={displaySettings.sortOrder}
                      onChange={(e) => setDisplaySettings({ ...displaySettings, sortOrder: e.target.value })}
                    >
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="date-asc">Date (Oldest First)</option>
                      <option value="date-desc">Date (Newest First)</option>
                    </select>
                  </div>
                  <button type="submit" className="save-btn">
                    <i className="fas fa-save"></i> Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="settings-section">
            <h2>
              <i className="fas fa-shield-alt"></i> Security Settings
            </h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>
                  <i className="fas fa-key"></i> Password Policy
                </h3>
                <form onSubmit={handleSavePasswordPolicy} className="security-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-ruler"></i> Minimum Length
                    </label>
                    <input
                      type="number"
                      value={passwordPolicy.minLength}
                      onChange={(e) => setPasswordPolicy({ ...passwordPolicy, minLength: e.target.value })}
                      min="6"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-check-square"></i> Require Special Characters
                    </label>
                    <input
                      type="checkbox"
                      checked={passwordPolicy.requireSpecial}
                      onChange={(e) => setPasswordPolicy({ ...passwordPolicy, requireSpecial: e.target.checked })}
                    />
                  </div>
                  <button type="submit" className="save-btn">
                    <i className="fas fa-save"></i> Save
                  </button>
                </form>
              </div>
              <div className="settings-card">
                <h3>
                  <i className="fas fa-lock"></i> Two-Factor Authentication (2FA)
                </h3>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={is2FAEnabled}
                    onChange={() => setIs2FAEnabled(!is2FAEnabled)}
                  />
                  <span className="slider round"></span>
                </label>
                <p>{is2FAEnabled ? "2FA is enabled" : "2FA is disabled"}</p>
              </div>
              <div className="settings-card">
                <h2>
                  <i className="fas fa-history"></i> Audit Logs
                </h2>
                <table className="audit-table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>User</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.action}</td>
                        <td>{log.user}</td>
                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "customization":
        return (
          <div className="settings-section">
            <h2>
              <i className="fas fa-paint-brush"></i> Customization Settings
            </h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>
                  <i className="fas fa-moon"></i> Theme Settings
                </h3>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={() => setIsDarkMode(!isDarkMode)}
                  />
                  <span className="slider round"></span>
                </label>
                <p>Toggle Dark Mode</p>
              </div>
              <div className="settings-card">
                <h3>
                  <i className="fas fa-language"></i> Language Preferences
                </h3>
                <div className="form-group">
                  <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case "system-integration":
        return (
          <div className="settings-section">
            <h2>
              <i className="fas fa-cogs"></i> System and Integration Settings
            </h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>
                  <i className="fas fa-database"></i> Backup Settings
                </h3>
                <form onSubmit={handleSaveBackupSettings} className="backup-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-clock"></i> Backup Frequency
                    </label>
                    <select
                      value={backupSettings.frequency}
                      onChange={(e) => setBackupSettings({ ...backupSettings, frequency: e.target.value })}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <button type="button" className="save-btn" onClick={handleManualBackup}>
                    <i className="fas fa-download"></i> Manual Backup
                  </button>
                </form>
              </div>
              <div className="settings-card">
                <h3>
                  <i className="fas fa-key"></i> API Keys
                </h3>
                <table className="api-key-table">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id}>
                        <td>{key.key}</td>
                        <td>{new Date(key.created).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => handleDeleteApiKey(key.id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="save-btn" onClick={handleGenerateApiKey}>
                  <i className="fas fa-plus"></i> Generate New Key
                </button>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="settings-section">
            <h2>
              <i className="fas fa-user-circle"></i> Profile Settings
            </h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>
                  <i className="fas fa-info-circle"></i> Personal Info
                </h3>
                <form onSubmit={handleSaveProfile} className="profile-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user"></i> Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-envelope"></i> Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="save-btn">
                    <i className="fas fa-save"></i> Save
                  </button>
                </form>
              </div>
              <div className="settings-card">
                <h3>
                  <i className="fas fa-lock"></i> Change Password
                </h3>
                {error && (
                  <p className="error-message">
                    <i className="fas fa-exclamation-circle"></i> {error}
                  </p>
                )}
                <form onSubmit={handleChangePassword} className="password-form">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-key"></i> Current Password
                    </label>
                    <input
                      type="password"
                      value={password.current}
                      onChange={(e) => setPassword({ ...password, current: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-key"></i> New Password
                    </label>
                    <input
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword({ ...password, new: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-key"></i> Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="save-btn">
                    <i className="fas fa-save"></i> Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <i className="fas fa-info-circle"></i> Select a section from the menu.
          </div>
        );
    }
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <nav>
          <ul>
            <li
              className={activeTab === "user-management" ? "active" : ""}
              onClick={() => setActiveTab("user-management")}
            >
              <i className="fas fa-users"></i> User Management
            </li>
            <li
              className={activeTab === "media-management" ? "active" : ""}
              onClick={() => setActiveTab("media-management")}
            >
              <i className="fas fa-photo-video"></i> Media Management
            </li>
            <li
              className={activeTab === "security" ? "active" : ""}
              onClick={() => setActiveTab("security")}
            >
              <i className="fas fa-shield-alt"></i> Security Settings
            </li>
            <li
              className={activeTab === "customization" ? "active" : ""}
              onClick={() => setActiveTab("customization")}
            >
              <i className="fas fa-paint-brush"></i> Customization
            </li>
            <li
              className={activeTab === "system-integration" ? "active" : ""}
              onClick={() => setActiveTab("system-integration")}
            >
              <i className="fas fa-cogs"></i> System Integration
            </li>
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              <i className="fas fa-user-circle"></i> Profile Settings
            </li>
          </ul>
        </nav>
      </header>
      <main className="settings-main-content">
        {renderSection()}
        <div className="settings-footer">
          <button className="save-btn" onClick={handleSaveChanges} disabled={!hasChanges}>
            <i className="fas fa-save"></i> Save Changes
          </button>
          <button className="cancel-btn" onClick={handleCancelChanges} disabled={!hasChanges}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;