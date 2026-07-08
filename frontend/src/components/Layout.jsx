import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, Briefcase, Map, BrainCircuit, Wallet, UserCircle, Bell } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
        isActive
          ? 'bg-[#eaedff] text-[#1f108e]'
          : 'text-[#464553] hover:bg-[#f2f3ff]'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    {children}
  </NavLink>
);

const Layout = () => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = React.useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [editFormData, setEditFormData] = React.useState({ name: user.name, email: user.email });
  const navigate = useNavigate();
  
  const userInitials = user.name ? user.name.substring(0, 2).toUpperCase() : 'U';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editFormData, id: user._id })
      });
      if (res.ok) {
        const updatedUser = await res.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditProfileModalOpen(false);
        setIsProfileOpen(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <div className="app-container font-sans bg-[#faf8ff] text-[#131b2e] min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[#eaedff] flex flex-col hidden md:flex shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] z-10 relative">
        <div className="p-6 border-b border-[#eaedff]">
          <h1 className="text-2xl font-bold text-[#1f108e] tracking-tight">PriorityOne AI</h1>
          <p className="text-xs text-[#57657a] mt-1 uppercase tracking-wider font-semibold">Governance Platform</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-[#777584] uppercase tracking-wider mb-2">Main Menu</p>
            <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
            <SidebarLink to="/complaints" icon={AlertCircle}>Complaints</SidebarLink>
            <SidebarLink to="/projects" icon={Briefcase}>Projects</SidebarLink>
            <SidebarLink to="/map" icon={Map}>Geo-Spatial View</SidebarLink>
          </div>
          
          <div>
            <p className="px-3 text-xs font-semibold text-[#777584] uppercase tracking-wider mb-2 mt-6">Analytics</p>
            <SidebarLink to="/insights" icon={BrainCircuit}>AI Insights</SidebarLink>
            <SidebarLink to="/budget" icon={Wallet}>Budget Planner</SidebarLink>
          </div>
        </nav>
        
        <div className="p-4 border-t border-[#eaedff] relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center gap-3 p-2 bg-[#f2f3ff] hover:bg-[#e2dfff] rounded-lg transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-full bg-[#3730a3] flex items-center justify-center text-white font-bold flex-shrink-0">
              {userInitials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#131b2e] truncate">{user.name || 'Hon. Member'}</p>
              <p className="text-xs text-[#57657a] capitalize truncate">{user.role || 'Official'}</p>
            </div>
          </button>
          
          {isProfileOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-[#eaedff] p-4 z-50">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#1f108e] flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                  {userInitials}
                </div>
                <h3 className="font-bold text-[#131b2e]">{user.name}</h3>
                <p className="text-xs text-[#57657a]">{user.email}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#e2dfff] text-[#1f108e] text-xs font-bold rounded-full capitalize">
                  {user.role} Account
                </span>
              </div>
              <div className="space-y-2 border-t border-[#eaedff] pt-4">
                <button onClick={() => {setIsEditProfileModalOpen(true); setIsProfileOpen(false);}} className="w-full text-left px-3 py-2 text-sm font-medium text-[#464553] hover:bg-[#f2f3ff] rounded-lg transition-colors">
                  Edit Profile
                </button>
                <button onClick={() => {setIsSettingsModalOpen(true); setIsProfileOpen(false);}} className="w-full text-left px-3 py-2 text-sm font-medium text-[#464553] hover:bg-[#f2f3ff] rounded-lg transition-colors">
                  Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#eaedff] flex items-center justify-between px-8 z-0">
          <div>
            <h2 className="text-2xl font-semibold text-[#131b2e]">Platform Operations</h2>
            <p className="text-sm text-[#57657a]">Welcome back. Here's what's happening in your constituency today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#464553] hover:bg-[#f2f3ff] rounded-full transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
            </button>
            <button 
              onClick={() => {
                navigate('/projects');
                setTimeout(() => window.dispatchEvent(new Event('open-new-project')), 100);
              }} 
              className="bg-[#1f108e] hover:bg-[#3730a3] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              New Project
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
          
          {/* Modals placed inside main content area to cover it */}
          {isEditProfileModalOpen && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-[#eaedff]">
                <h2 className="text-2xl font-bold text-[#1f108e] mb-4">Edit Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#57657a] mb-1">Name</label>
                    <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-4 py-2 bg-[#f2f3ff] rounded-lg outline-none focus:ring-2 focus:ring-[#1f108e]" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#57657a] mb-1">Email</label>
                    <input type="email" value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})} className="w-full px-4 py-2 bg-[#f2f3ff] rounded-lg outline-none focus:ring-2 focus:ring-[#1f108e]" required />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setIsEditProfileModalOpen(false)} className="flex-1 py-2 bg-gray-100 text-[#464553] rounded-lg font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-2 bg-[#1f108e] text-white rounded-lg font-bold hover:bg-[#3730a3] transition-colors">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isSettingsModalOpen && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-[#eaedff]">
                <h2 className="text-2xl font-bold text-[#1f108e] mb-4">Platform Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-lg">
                    <span className="font-medium text-[#131b2e]">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#1f108e]" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-lg">
                    <span className="font-medium text-[#131b2e]">Dark Mode (Beta)</span>
                    <input type="checkbox" className="w-5 h-5 accent-[#1f108e]" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-lg">
                    <span className="font-medium text-[#131b2e]">Auto-Categorize Complaints</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#1f108e]" />
                  </div>
                </div>
                <button onClick={() => setIsSettingsModalOpen(false)} className="w-full mt-6 py-2 bg-[#1f108e] text-white rounded-lg font-bold hover:bg-[#3730a3] transition-colors">Close</button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Layout;
