import React from 'react';
import { Wallet, PieChart, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

const BudgetPlanner = () => {
  const budgetCategories = [
    { name: 'Infrastructure', allocated: 45.5, spent: 32.1, color: 'bg-blue-500' },
    { name: 'Education', allocated: 25.0, spent: 18.4, color: 'bg-emerald-500' },
    { name: 'Healthcare', allocated: 30.0, spent: 28.5, color: 'bg-red-500' },
    { name: 'Sanitation', allocated: 15.0, spent: 8.2, color: 'bg-amber-500' },
  ];

  const totalAllocated = budgetCategories.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = budgetCategories.reduce((acc, curr) => acc + curr.spent, 0);
  const percentSpent = ((totalSpent / totalAllocated) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#131b2e]">Budget Planner</h2>
          <p className="text-sm text-[#57657a]">Financial overview and allocation tracking for FY 2024-25.</p>
        </div>
        <button onClick={() => alert("Downloading budget report...")} className="bg-white border border-[#eaedff] text-[#131b2e] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f2f3ff] transition-colors flex items-center gap-2">
          <PieChart className="w-4 h-4" /> Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1f108e] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <p className="text-[#a9a7ff] font-medium text-sm mb-1 uppercase tracking-wider relative z-10">Total Allocated Budget</p>
          <h3 className="text-4xl font-bold mb-4 relative z-10">₹{totalAllocated} <span className="text-xl font-normal text-[#c3c0ff]">Cr</span></h3>
          <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold relative z-10">
            <ArrowUpRight className="w-4 h-4" /> +12.5% YoY
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm">
          <p className="text-[#57657a] font-medium text-sm mb-1 uppercase tracking-wider">Total Disbursed</p>
          <h3 className="text-4xl font-bold text-[#131b2e] mb-4">₹{totalSpent.toFixed(1)} <span className="text-xl font-normal text-[#777584]">Cr</span></h3>
          <div className="w-full bg-[#f2f3ff] rounded-full h-2 mb-2">
            <div className="bg-[#1f108e] h-2 rounded-full" style={{ width: `${percentSpent}%` }}></div>
          </div>
          <p className="text-sm text-[#57657a] font-medium">{percentSpent}% of total budget</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-[#eaedff] p-6 shadow-sm">
          <p className="text-[#57657a] font-medium text-sm mb-1 uppercase tracking-wider">Available Funds</p>
          <h3 className="text-4xl font-bold text-[#059669] mb-4">₹{(totalAllocated - totalSpent).toFixed(1)} <span className="text-xl font-normal text-[#777584]">Cr</span></h3>
          <div className="flex items-center gap-2 text-amber-500 text-sm font-bold">
            <ArrowDownRight className="w-4 h-4" /> Burning faster than Q1
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm p-6 mt-8">
        <h3 className="font-bold text-lg text-[#131b2e] mb-6">Department Wise Allocation</h3>
        <div className="space-y-6">
          {budgetCategories.map((category) => (
            <div key={category.name}>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="font-bold text-[#131b2e]">{category.name}</h4>
                  <p className="text-sm text-[#57657a]">₹{category.spent} Cr spent / ₹{category.allocated} Cr total</p>
                </div>
                <span className="text-sm font-bold text-[#1f108e]">{((category.spent / category.allocated) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-[#f2f3ff] rounded-full h-3 overflow-hidden flex">
                <div className={`${category.color} h-full transition-all`} style={{ width: `${(category.spent / category.allocated) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
