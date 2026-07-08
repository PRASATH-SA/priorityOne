import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full text-[#1f108e] text-xl font-bold">Loading dashboard...</div>;
  }
  
  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500 text-xl font-bold">Error: {error}</div>;
  }
  
  if (!dashboardData) return null;

  const { stats, aiInsight, recentProjects, priorityActions } = dashboardData;

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-[#eaedff] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-[#57657a] uppercase tracking-wider">Active Complaints</p>
              <h3 className="text-3xl font-bold text-[#131b2e] mt-1">{stats.activeComplaints}</h3>
            </div>
            <div className="p-3 bg-[#ffdad6] rounded-xl text-[#93000a]">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-[#ba1a1a] font-medium flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {stats.complaintsTrend} from last month
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-[#eaedff] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-[#57657a] uppercase tracking-wider">Ongoing Projects</p>
              <h3 className="text-3xl font-bold text-[#131b2e] mt-1">{stats.ongoingProjects}</h3>
            </div>
            <div className="p-3 bg-[#e2dfff] rounded-xl text-[#1f108e]">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-[#059669] font-medium flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {stats.projectsCompletedThisWeek} completed this week
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eaedff] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-[#57657a] uppercase tracking-wider">Budget Utilized</p>
              <h3 className="text-3xl font-bold text-[#131b2e] mt-1">₹{stats.budgetUtilized}</h3>
            </div>
            <div className="p-3 bg-[#d5e3fc] rounded-xl text-[#0d1c2e]">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full bg-[#f2f3ff] rounded-full h-2 mt-2">
            <div className="bg-[#1f108e] h-2 rounded-full" style={{ width: `${stats.budgetPercentage}%` }}></div>
          </div>
          <p className="text-sm text-[#57657a] font-medium mt-2">{stats.budgetPercentage}% of allocated budget</p>
        </div>
        
        <div 
          onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
          className="bg-white p-6 rounded-2xl border border-[#eaedff] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f108e] to-[#3730a3] opacity-5 group-hover:opacity-10 transition-opacity"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-sm font-semibold text-[#57657a] uppercase tracking-wider">AI Copilot Insight</p>
              <h3 className="text-lg font-bold text-[#131b2e] mt-2 leading-tight">{aiInsight.title}</h3>
            </div>
            <div className="p-3 bg-[#eef0ff] rounded-xl text-[#3730a3]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-[#1f108e] font-semibold mt-2 relative z-10">{aiInsight.action} →</p>
        </div>
      </div>

      {/* Main Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Project List */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#eaedff] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-[#eaedff] flex justify-between items-center bg-[#faf8ff]">
            <h3 className="text-lg font-bold text-[#131b2e]">Recent Projects</h3>
            <Link to="/projects" className="text-sm font-semibold text-[#1f108e] hover:underline">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f3ff] text-[#57657a] text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold rounded-tl-lg">Project Name</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-[#eaedff]">
                {recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#faf8ff] transition-colors group">
                    <td className="p-4 font-medium text-[#131b2e]">{project.name}</td>
                    <td className="p-4 text-[#57657a]">{project.location}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        project.status === 'In Progress' ? 'bg-[#e2dfff] text-[#1f108e]' :
                        'bg-[#ffdad6] text-[#93000a]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          project.status === 'Completed' ? 'bg-emerald-600' :
                          project.status === 'In Progress' ? 'bg-[#1f108e]' :
                          'bg-[#93000a]'
                        }`}></span> {project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-[#f2f3ff] rounded-full h-1.5 max-w-[100px]">
                          <div className={`h-1.5 rounded-full ${
                            project.status === 'Completed' ? 'bg-emerald-500' :
                            project.status === 'In Progress' ? 'bg-[#1f108e]' :
                            'bg-[#ba1a1a]'
                          }`} style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-[#57657a]">{project.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-b from-[#1f108e] to-[#0f0069] rounded-2xl text-white shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <TrendingUp className="w-32 h-32" />
          </div>
          
          <div className="p-6 relative z-10 h-full flex flex-col">
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#a9a7ff]" />
              Priority Actions
            </h3>
            <p className="text-sm text-[#c3c0ff] mb-6">Generated by PriorityOne AI</p>
            
            <div className="space-y-4 flex-1">
              {priorityActions.map((action) => (
                <div key={action.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-2 h-2 rounded-full ${action.type === 'alert' ? 'bg-amber-400' : 'bg-red-400'}`}></div>
                    <div>
                      <p className="font-semibold text-sm">{action.title}</p>
                      <p className="text-xs text-[#e2dfff] mt-1 line-clamp-2">{action.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
              className="w-full py-3 mt-6 bg-white text-[#1f108e] rounded-xl font-bold text-sm hover:bg-[#f2f3ff] transition-colors shadow-[0_4px_14px_0_rgba(255,255,255,0.2)]">
              Ask AI Copilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
