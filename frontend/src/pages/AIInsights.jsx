import React from 'react';
import { BrainCircuit, TrendingUp, AlertOctagon, Lightbulb, BarChart2 } from 'lucide-react';

const AIInsights = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#131b2e]">AI Predictive Insights</h2>
          <p className="text-sm text-[#57657a]">Machine learning predictions based on historical and real-time data.</p>
        </div>
        <button onClick={() => alert("Running fresh analysis... This might take a few moments.")} className="bg-gradient-to-r from-[#1f108e] to-[#3730a3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <BrainCircuit className="w-4 h-4" /> Run Fresh Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Insight Card 1 */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full -z-0"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#131b2e] mb-1">Dengue Outbreak Risk</h3>
              <p className="text-sm text-[#57657a] mb-4">Predictive models indicate a 78% probability of a dengue outbreak in Sector 4 within 14 days due to stagnant water complaints.</p>
              <button className="text-sm font-bold text-[#1f108e] hover:underline">View Mitigation Plan →</button>
            </div>
          </div>
        </div>

        {/* Insight Card 2 */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -z-0"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#131b2e] mb-1">Solar Panel Subsidy</h3>
              <p className="text-sm text-[#57657a] mb-4">Redirecting 5% of the power budget to solar subsidies for Ward 2 could reduce grid load by 15% in peak summer.</p>
              <button className="text-sm font-bold text-[#1f108e] hover:underline">Analyze Impact →</button>
            </div>
          </div>
        </div>

        {/* Insight Card 3 */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -z-0"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#131b2e] mb-1">Education Fund Reallocation</h3>
              <p className="text-sm text-[#57657a] mb-4">Current burn rate on school supplies is 20% below estimate. Suggest reallocating ₹1.2Cr to IT infrastructure in rural schools.</p>
              <button className="text-sm font-bold text-[#1f108e] hover:underline">Draft Proposal →</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-2xl border border-[#eaedff] p-8 text-center shadow-sm">
        <BarChart2 className="w-12 h-12 text-[#1f108e] mx-auto mb-4 opacity-50" />
        <h3 className="font-bold text-lg text-[#131b2e] mb-2">Detailed Analytics Dashboard</h3>
        <p className="text-[#57657a] max-w-md mx-auto mb-6">Connect to more data sources to unlock deep-dive analytics, citizen sentiment analysis, and long-term trend forecasting.</p>
        <button className="bg-[#f2f3ff] text-[#1f108e] px-6 py-2 rounded-lg font-bold hover:bg-[#e2dfff] transition-colors">Configure Data Sources</button>
      </div>
    </div>
  );
};

export default AIInsights;
