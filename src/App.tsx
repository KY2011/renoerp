import React from 'react';
import Layout from './components/Layout';
import StatCard from './components/Dashboard/StatCard';
import ProjectTimeline from './components/Dashboard/ProjectTimeline';
import { Users, DollarSign, Briefcase, TrendingUp } from 'lucide-react';

// Mock data - In a real app, this would come from an API
const mockProjects = [
  {
    id: 1,
    title: 'Kitchen Renovation - Smith Residence',
    status: 'in-progress',
    startDate: '2024-03-01',
    progress: 65,
  },
  {
    id: 2,
    title: 'Bathroom Remodel - Johnson Home',
    status: 'completed',
    startDate: '2024-02-15',
    progress: 100,
  },
  {
    id: 3,
    title: 'Basement Finishing - Davis Project',
    status: 'pending',
    startDate: '2024-03-15',
    progress: 0,
  },
];

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Customers"
            value="156"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Projects"
            value="23"
            icon={Briefcase}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Monthly Revenue"
            value="$45,678"
            icon={DollarSign}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Sales Growth"
            value="24%"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectTimeline projects={mockProjects} />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            {/* Activity feed would go here */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;