exports.getDashboardData = (req, res) => {
  try {
    const dashboardData = {
      stats: {
        activeComplaints: 1248,
        complaintsTrend: "+12%",
        ongoingProjects: 42,
        projectsCompletedThisWeek: 3,
        budgetUtilized: "45.2Cr",
        budgetPercentage: 65,
      },
      aiInsight: {
        title: "High priority road repair detected in Ward 4",
        action: "Generate Proposal"
      },
      recentProjects: [
        {
          id: 1,
          name: "Water Pipeline Extension",
          location: "Sector 12, Main Rd",
          status: "In Progress",
          progress: 45
        },
        {
          id: 2,
          name: "Primary School Renovation",
          location: "Village XYZ",
          status: "Completed",
          progress: 100
        },
        {
          id: 3,
          name: "Community Hospital Upgrade",
          location: "Central District",
          status: "Delayed",
          progress: 15
        }
      ],
      priorityActions: [
        {
          id: 1,
          title: "Approvals Required (3)",
          description: "Contractor bids for Ward 2 sanitation project await your review.",
          type: "approval"
        },
        {
          id: 2,
          title: "Complaint Surge Alert",
          description: "24% increase in water scarcity complaints from Northern Zone in last 48 hours.",
          type: "alert"
        }
      ]
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching dashboard data" });
  }
};
