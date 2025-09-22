import React from "react";
import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <main className="dashboard-main">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="welcome-text">
          Welcome back! Here's what's happening with your platform today.
        </p>

        {/* Cards Section */}
        <div className="card-grid">
          <div className="card">
            <div className="card-icon">👁️</div>
            <h2>12,847</h2>
            <p>Page Views</p>
            <span className="card-change up">+12% from last week</span>
          </div>
          <div className="card">
            <div className="card-icon">👥</div>
            <h2>3,421</h2>
            <p>New Visitors</p>
            <span className="card-change up">+8% from last week</span>
          </div>
          <div className="card">
            <div className="card-icon">💬</div>
            <h2>47</h2>
            <p>Inquiries</p>
            <span className="card-change up">+23% from last week</span>
          </div>
          <div className="card">
            <div className="card-icon">✅</div>
            <h2>15</h2>
            <p>Projects Active</p>
            <span className="card-change neutral">3 launching soon</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Recent Activity */}
          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <ul>
              <li><span className="dot green"></span> New blog post published - 2 hours ago</li>
              <li><span className="dot orange"></span> Team member added - 5 hours ago</li>
              <li><span className="dot blue"></span> Product update - 1 day ago</li>
              <li><span className="dot gold"></span> Achievement unlocked - 2 days ago</li>
            </ul>
          </div>

          {/* Quick Updates */}
          <div className="quick-updates">
            <h3>Quick Updates</h3>
            <select>
              <option>News</option>
              <option>Alert</option>
              <option>Product</option>
            </select>
            <textarea className="update-textarea1" placeholder="Share your latest update..." />
            <button className="post-update-btn">Post Update</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
