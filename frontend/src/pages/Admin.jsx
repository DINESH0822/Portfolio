import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../context/AuthContext';
import { 
  Lock, LogOut, MessageSquare, Briefcase, Plus, Edit, Trash2, 
  ExternalLink, ChevronRight, X, Layout, ShieldAlert
} from 'lucide-react';
import { Github } from '../components/BrandIcons';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { isAuthenticated, login, logout, loading: authLoading } = useAuth();
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard content state
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Project Modal/CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    tech_stack: '',
    features: '',
    live_url: '',
    github_url: '',
    is_featured: false,
    image_placeholder_type: 'code',
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchDashboardData = async () => {
    setLoadingContent(true);
    setErrorMsg('');
    try {
      if (activeTab === 'projects') {
        const res = await api.get('/api/projects');
        setProjects(res.data);
      } else {
        const res = await api.get('/api/contacts');
        setContacts(res.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to query dashboard database values.');
    } finally {
      setLoadingContent(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const result = await login(username, password);
    setLoginLoading(false);
    if (!result.success) {
      setLoginError(result.error);
    }
  };

  // Delete project trigger
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      fetchDashboardData();
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  // Delete message submission trigger
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this contact message submission?')) return;
    try {
      await api.delete(`/api/contacts/${id}`);
      fetchDashboardData();
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  // Open modal for project creation
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedProjectId(null);
    setProjectForm({
      title: '',
      subtitle: '',
      description: '',
      tech_stack: '',
      features: '',
      live_url: '',
      github_url: '',
      is_featured: false,
      image_placeholder_type: 'code',
    });
    setIsModalOpen(true);
  };

  // Open modal for project modification
  const handleOpenEditModal = (project) => {
    setModalMode('edit');
    setSelectedProjectId(project.id);
    setProjectForm({
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      tech_stack: project.tech_stack.join(', '),
      features: project.features.join(', '),
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      is_featured: project.is_featured,
      image_placeholder_type: project.image_placeholder_type || 'code',
    });
    setIsModalOpen(true);
  };

  // Modal save trigger
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    // Parse comma separated strings into arrays
    const formattedData = {
      ...projectForm,
      tech_stack: projectForm.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
      features: projectForm.features.split(',').map(s => s.trim()).filter(Boolean),
      live_url: projectForm.live_url.trim() || null,
      github_url: projectForm.github_url.trim() || null,
    };

    try {
      if (modalMode === 'create') {
        await api.post('/api/projects', formattedData);
      } else {
        await api.put(`/api/projects/${selectedProjectId}`, formattedData);
      }
      setIsModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      alert('Error saving project. Verify credentials.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. UNAUTHENTICATED RENDER STATE (Login Form)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#E2E8F0] card-shadow relative z-10">
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-indigo-600 flex items-center justify-center mb-4 shadow-md shadow-blue-200">
              <span className="text-white font-bold text-xl tracking-tighter">D</span>
            </Link>
            <h1 className="text-xl font-black text-[#111827] tracking-tight">Secure Admin Portal</h1>
            <p className="text-xs text-[#6B7280] mt-1 uppercase tracking-wider font-bold">
              Enter Credentials to Manage Portfolio
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#374151] uppercase tracking-wider block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] outline-none focus:border-[#2563EB] bg-white text-sm"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#374151] uppercase tracking-wider block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] outline-none focus:border-[#2563EB] bg-white text-sm"
                placeholder="Enter password"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-800 text-xs rounded-xl border border-red-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full btn-primary"
            >
              {loginLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-xs font-semibold text-[#6B7280] hover:text-[#2563EB] transition-colors">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED RENDER STATE (Dashboard)
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Panel */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">D</span>
            </Link>
            <div>
              <h1 className="font-extrabold text-[#111827] tracking-tight">Admin Dashboard</h1>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase border border-emerald-100">
                Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
              View Website
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E2E8F0] text-[#6B7280] hover:text-red-600 hover:border-red-100 rounded-xl text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel tabs navigation */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-200'
                  : 'bg-white text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Manage Projects</span>
            </button>
            
            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-200'
                  : 'bg-white text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submissions</span>
            </button>
          </div>

          {/* Right panel detailed table / lists */}
          <div className="lg:col-span-9 bg-white border border-[#E2E8F0] card-shadow rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-6 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">
                  {activeTab === 'projects' ? 'Project Repositories' : 'Client Messages'}
                </h2>
                <p className="text-xs text-[#6B7280] mt-1">
                  {activeTab === 'projects' ? 'Create, edit, or remove project showcase cards' : 'List received inquiries and details'}
                </p>
              </div>

              {activeTab === 'projects' && (
                <button
                  onClick={handleOpenCreateModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm shadow-blue-100"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-800 text-sm rounded-xl border border-red-100 mb-6">
                {errorMsg}
              </div>
            )}

            {/* Dashboard Contents lists loader indicator */}
            {loadingContent ? (
              <div className="py-20 flex items-center justify-center">
                <span className="w-7 h-7 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : activeTab === 'projects' ? (
              // TAB A: Projects Manager
              projects.length === 0 ? (
                <div className="text-center py-16">
                  <Layout className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                  <p className="text-[#6B7280] text-sm font-medium">No project listings available in DB.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#F1F5F9]">
                  {projects.map((p) => (
                    <div key={p.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#111827] text-base">{p.title}</h3>
                          {p.is_featured && (
                            <span className="text-[9px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B7280] mt-0.5">{p.subtitle}</p>
                        <p className="text-xs font-medium text-[#374151] mt-1.5">{p.tech_stack.slice(0, 5).join(' | ')}</p>
                      </div>

                      <div className="flex items-center gap-2 self-stretch sm:self-center justify-end">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 border border-[#E2E8F0] text-[#6B7280] hover:text-[#2563EB] hover:bg-[#F8FAFC] rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-2 border border-[#E2E8F0] text-[#6B7280] hover:text-red-600 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              // TAB B: Submissions Messages Manager
              contacts.length === 0 ? (
                <div className="text-center py-16">
                  <MessageSquare className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                  <p className="text-[#6B7280] text-sm font-medium">No client messages received yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {contacts.map((c) => (
                    <div key={c.id} className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] flex flex-col justify-between space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
                        <div>
                          <h3 className="font-bold text-[#111827] text-base">{c.name}</h3>
                          <a href={`mailto:${c.email}`} className="text-xs text-[#2563EB] hover:underline">{c.email}</a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-[#6B7280]">
                            {new Date(c.timestamp).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-1.5 text-[#6B7280] hover:text-red-600 rounded-md hover:bg-white border border-transparent hover:border-[#E2E8F0] transition-all"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-[#374151] block">Subject: {c.subject}</span>
                        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mt-2 bg-white p-4 rounded-xl border border-[#E2E8F0]">
                          {c.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </main>

      {/* CRUD PROJECT MODAL COMPONENT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111827]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden my-8">
            <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#F1F5F9] flex items-center justify-between">
              <h3 className="font-bold text-[#111827] text-lg">
                {modalMode === 'create' ? 'Add Showcase Project' : 'Edit Showcase Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#F1F5F9] text-[#6B7280] hover:text-[#111827] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Project Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]"
                    placeholder="e.g. EcoShare AI"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Subtitle / Short description</label>
                  <input
                    type="text"
                    value={projectForm.subtitle}
                    onChange={(e) => setProjectForm({...projectForm, subtitle: e.target.value})}
                    className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]"
                    placeholder="e.g. Sustainable Resource Sharing Platform"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Detailed Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm resize-none outline-none focus:border-[#2563EB]"
                  placeholder="Explain scope, features, design choices..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.tech_stack}
                    onChange={(e) => setProjectForm({...projectForm, tech_stack: e.target.value})}
                    className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]"
                    placeholder="React, FastAPI, MongoDB Atlas"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Highlights / Features (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.features}
                    onChange={(e) => setProjectForm({...projectForm, features: e.target.value})}
                    className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]"
                    placeholder="Secure JWT Login, AI Recommendations"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectForm.live_url}
                    onChange={(e) => setProjectForm({...projectForm, live_url: e.target.value})}
                    className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({...projectForm, github_url: e.target.value})}
                    className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#2563EB]"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Visual Image Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">Mockup SVG Type</label>
                  <select
                    value={projectForm.image_placeholder_type}
                    onChange={(e) => setProjectForm({...projectForm, image_placeholder_type: e.target.value})}
                    className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm bg-white outline-none focus:border-[#2563EB]"
                  >
                    <option value="code">Dashboard layout (code)</option>
                    <option value="database">Database diagrams</option>
                    <option value="network">LAN networking tree</option>
                    <option value="security">Security / Lock indicator</option>
                  </select>
                </div>

                {/* Featured project toggler */}
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={projectForm.is_featured}
                    onChange={(e) => setProjectForm({...projectForm, is_featured: e.target.checked})}
                    className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB] rounded border-gray-300"
                  />
                  <label htmlFor="is_featured" className="text-sm font-semibold text-[#111827] select-none">
                    Feature project at the top
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-[#F1F5F9] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-[#E2E8F0] text-[#6B7280] hover:text-[#111827] rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Save Showcase Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
