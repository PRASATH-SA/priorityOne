import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Clock, XCircle, Search, X, Loader2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', budget: '', dueDate: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener('open-new-project', handleOpen);
    return () => window.removeEventListener('open-new-project', handleOpen);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = { ...formData, createdBy: user._id };
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchProjects();
        setIsModalOpen(false);
        setFormData({ title: '', category: '', budget: '', dueDate: '' });
      }
    } catch (err) {
      alert("Error creating project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#131b2e]">Project Management</h2>
          <p className="text-sm text-[#57657a]">Track ongoing, completed, and upcoming projects.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#1f108e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3730a3] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-sm flex items-center gap-4">
           <div className="p-3 bg-[#e2dfff] text-[#1f108e] rounded-lg"><Clock className="w-6 h-6" /></div>
           <div>
             <p className="text-sm text-[#57657a]">Total Active</p>
             <p className="text-xl font-bold">{projects.filter(p => p.status === 'In Progress').length}</p>
           </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-sm flex items-center gap-4">
           <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg"><CheckCircle className="w-6 h-6" /></div>
           <div>
             <p className="text-sm text-[#57657a]">Completed</p>
             <p className="text-xl font-bold">{projects.filter(p => p.status === 'Completed').length}</p>
           </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-sm flex items-center gap-4">
           <div className="p-3 bg-red-100 text-red-700 rounded-lg"><XCircle className="w-6 h-6" /></div>
           <div>
             <p className="text-sm text-[#57657a]">Delayed / On Hold</p>
             <p className="text-xl font-bold">{projects.filter(p => ['Delayed', 'On Hold'].includes(p.status)).length}</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#eaedff] flex justify-between items-center bg-[#faf8ff]">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#777584]" />
            <input type="text" placeholder="Search projects..." className="w-full pl-9 pr-4 py-1.5 bg-white border border-[#eaedff] rounded-lg text-sm outline-none" />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-[#57657a] text-xs uppercase tracking-wider border-b border-[#eaedff]">
              <th className="p-4 font-semibold">Project Details</th>
              <th className="p-4 font-semibold">Budget</th>
              <th className="p-4 font-semibold">Timeline</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Progress</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#eaedff]">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-8 text-[#57657a]"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading projects...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-[#57657a]">No projects found.</td></tr>
            ) : (
              projects.map((p) => (
                <tr key={p._id} className="hover:bg-[#faf8ff] transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-[#131b2e]">{p.title}</p>
                    <p className="text-xs text-[#57657a]">{p.category}</p>
                  </td>
                  <td className="p-4 font-medium">{p.budget}</td>
                  <td className="p-4 text-[#57657a]">Est. {p.dueDate || 'TBD'}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-[#f2f3ff] rounded-full h-2 max-w-[120px]">
                        <div className={`h-2 rounded-full ${
                          p.progress === 100 ? 'bg-emerald-500' : 'bg-[#1f108e]'
                        }`} style={{ width: `${p.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-medium w-8 text-right">{p.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-[#eaedff] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#131b2e]">Add New Project</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#57657a] hover:bg-[#f2f3ff] p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#131b2e] mb-2">Project Title</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-[#f2f3ff] rounded-xl outline-none focus:ring-2 focus:ring-[#1f108e]" placeholder="E.g., Highway Expansion" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#131b2e] mb-2">Category</label>
                <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 bg-[#f2f3ff] rounded-xl outline-none focus:ring-2 focus:ring-[#1f108e]">
                  <option value="">Select Category</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Sanitation">Sanitation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#131b2e] mb-2">Budget</label>
                <input required type="text" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full px-4 py-2 bg-[#f2f3ff] rounded-xl outline-none focus:ring-2 focus:ring-[#1f108e]" placeholder="E.g., ₹15.5 Cr" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#131b2e] mb-2">Due Date (Optional)</label>
                <input type="text" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-2 bg-[#f2f3ff] rounded-xl outline-none focus:ring-2 focus:ring-[#1f108e]" placeholder="E.g., Dec 2025" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 font-bold text-[#57657a] bg-[#f2f3ff] hover:bg-[#eaedff] rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 font-bold text-white bg-[#1f108e] hover:bg-[#3730a3] rounded-xl transition-colors flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} {submitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
