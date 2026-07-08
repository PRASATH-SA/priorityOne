import React, { useState, useEffect } from 'react';
import { AlertTriangle, Search, Filter, MessageSquare, Loader2 } from 'lucide-react';

const Complaints = () => {
  const [complaintsList, setComplaintsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/complaints');
        const data = await res.json();
        setComplaintsList(data);
      } catch (err) {
        console.error("Error fetching complaints", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#131b2e]">Complaints Management</h2>
          <p className="text-sm text-[#57657a]">Track and manage citizen grievances.</p>
        </div>
        <button onClick={() => alert("Exporting report to CSV...")} className="bg-[#1f108e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3730a3] transition-colors">
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm p-4 flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-[#777584]" />
          <input type="text" placeholder="Search complaints by ID or keyword..." className="w-full pl-10 pr-4 py-2 bg-[#f2f3ff] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#1f108e] outline-none" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#eaedff] rounded-lg text-sm font-medium text-[#464553] hover:bg-[#f2f3ff]">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f2f3ff] text-[#57657a] text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Complaint ID</th>
              <th className="p-4 font-semibold">Category & Title</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Priority</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#eaedff]">
            {loading ? (
              <tr><td colSpan="6" className="text-center py-8 text-[#57657a]"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading complaints...</td></tr>
            ) : complaintsList.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-[#57657a]">No complaints found.</td></tr>
            ) : (
              complaintsList.map((complaint) => (
                <tr key={complaint._id} className="hover:bg-[#faf8ff] transition-colors">
                  <td className="p-4 font-medium text-[#1f108e]">{complaint.trackingId}</td>
                  <td className="p-4">
                    <p className="font-semibold text-[#131b2e]">{complaint.title}</p>
                    <p className="text-xs text-[#57657a]">{complaint.category}</p>
                  </td>
                  <td className="p-4 text-[#57657a]">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      complaint.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                      complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1 text-xs font-bold ${
                      complaint.priority === 'High' ? 'text-red-600' :
                      complaint.priority === 'Medium' ? 'text-amber-600' :
                      'text-emerald-600'
                    }`}>
                      <AlertTriangle className="w-3 h-3" /> {complaint.priority}
                    </span>
                  </td>
                <td className="p-4">
                  <button className="p-2 text-[#464553] hover:bg-[#eaedff] rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaints;
