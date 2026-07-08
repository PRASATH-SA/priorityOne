import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PublicComplaint = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [complaint, setComplaint] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [trackingId, setTrackingId] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !complaint.trim()) return;
    
    setLoading(true);
    try {
      const fullComplaintText = `Title: ${title}\nLocation: ${location}\nDescription: ${complaint}`;
      
      const res = await fetch('http://localhost:5000/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintText: fullComplaintText })
      });
      const data = await res.json();
      setResult(data);
      
      const newTrackingId = `PRY1-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingId(newTrackingId);

      // Save to database
      await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({
          trackingId: newTrackingId,
          title: title,
          location: location,
          description: complaint,
          category: data.category || 'General',
          priority: data.priority || 'Medium',
          aiAnalysis: data.analysis,
          submittedBy: user._id || null
        })
      });

    } catch (err) {
      alert("Error submitting complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1f108e]">Public Grievance Portal</h1>
            <p className="text-[#57657a] mt-2">Submit your complaint. Our AI will automatically categorize and prioritize it.</p>
          </div>
          {user.name ? (
            <div className="text-right">
              <p className="text-sm font-bold text-[#131b2e]">Welcome, {user.name}</p>
              <button onClick={handleLogout} className="text-xs text-red-600 font-bold hover:underline">Sign Out</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="text-[#1f108e] font-bold hover:underline">Login to Submit</button>
          )}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#eaedff]">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#131b2e] mb-2">Subject / Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-[#f2f3ff] rounded-xl outline-none focus:ring-2 focus:ring-[#1f108e]"
                  placeholder="E.g., Broken Streetlight"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#131b2e] mb-2">Location / Address <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-[#f2f3ff] rounded-xl outline-none focus:ring-2 focus:ring-[#1f108e]"
                  placeholder="E.g., 5th Avenue, near Central Park"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#131b2e] mb-2">Describe your issue in detail <span className="text-red-500">*</span></label>
                <textarea 
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-[#f2f3ff] rounded-xl outline-none focus:ring-2 focus:ring-[#1f108e] resize-none"
                  placeholder="E.g., The streetlight has been broken for 3 weeks and it's causing safety concerns..."
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-[#1f108e] text-white rounded-xl font-bold hover:bg-[#3730a3] transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {loading ? 'AI Analyzing...' : 'Submit Grievance'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#131b2e] mb-2">Complaint Submitted Successfully!</h2>
              <p className="text-[#57657a] mb-2">Our AI has processed your request and routed it to the appropriate department.</p>
              <div className="mb-8 inline-block px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-emerald-800 font-medium text-sm">Your Tracking ID: </span>
                <span className="text-emerald-900 font-bold text-lg tracking-wide">{trackingId}</span>
              </div>
              
              <div className="bg-[#f2f3ff] rounded-xl p-6 text-left mx-auto max-w-md w-full">
                <p className="text-sm font-bold text-[#1f108e] uppercase mb-4 tracking-wider">AI Analysis Result</p>
                <div className="space-y-3">
                  <div><span className="text-[#57657a] font-medium">Category:</span> <span className="font-bold text-[#131b2e] ml-2">{result.category}</span></div>
                  <div><span className="text-[#57657a] font-medium">Priority:</span> <span className={`font-bold ml-2 ${result.priority === 'High' ? 'text-red-600' : 'text-amber-600'}`}>{result.priority}</span></div>
                  <div><span className="text-[#57657a] font-medium block mb-1">Insights:</span> <span className="text-[#131b2e]">{result.analysis}</span></div>
                </div>
              </div>
              
              <div className="mt-8">
                <button onClick={() => {setResult(null); setComplaint(''); setTrackingId('');}} className="text-[#1f108e] font-bold hover:underline">Submit Another Complaint</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicComplaint;
