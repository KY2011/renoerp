import React from 'react';
import { Project, Task } from '../types/project';
import { User } from '../types/user';
import GanttChart from '../components/Projects/GanttChart';

// Mock users data
const mockUsers: User[] = [
  {
    id: 'installer1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'installer',
  },
  {
    id: 'installer2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'installer',
  },
  {
    id: 'installer3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    role: 'installer',
  },
];

// Mock tasks data with dependencies
const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Site Preparation',
    description: 'Clear the area and prepare for renovation. Initial assessment and safety checks.',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-03'),
    progress: 100,
    assignedTo: ['installer1'],
    status: 'completed',
  },
  {
    id: '2',
    projectId: '1',
    title: 'Demolition',
    description: 'Remove existing structures and prepare for new installations',
    startDate: new Date('2024-03-04'),
    endDate: new Date('2024-03-07'),
    progress: 75,
    assignedTo: ['installer1', 'installer2'],
    dependencies: ['1'],
    status: 'in-progress',
  },
  {
    id: '3',
    projectId: '1',
    title: 'Installation',
    description: 'Install new components and fixtures according to specifications',
    startDate: new Date('2024-03-08'),
    endDate: new Date('2024-03-15'),
    progress: 30,
    assignedTo: ['installer3'],
    dependencies: ['2'],
    status: 'in-progress',
  },
  {
    id: '4',
    projectId: '1',
    title: 'Electrical Work',
    description: 'Update and install new electrical systems',
    startDate: new Date('2024-03-10'),
    endDate: new Date('2024-03-14'),
    progress: 0,
    assignedTo: ['installer2'],
    dependencies: ['2'],
    status: 'blocked',
  },
];

const ProjectDetails: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
        <p className="mt-2 text-gray-600">{project.description}</p>
      </div>

      <GanttChart
        tasks={mockTasks}
        users={mockUsers}
        startDate={new Date('2024-03-01')}
        endDate={new Date('2024-03-31')}
      />
    </div>
  );
};

export default ProjectDetails;