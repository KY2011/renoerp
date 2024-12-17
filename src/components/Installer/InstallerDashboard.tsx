import React from 'react';
import { Project } from '../../types/project';
import { User } from '../../types/user';
import ProjectUpdateForm from './ProjectUpdateForm';
import { Clock, Calendar, AlertCircle } from 'lucide-react';

interface InstallerDashboardProps {
  installer: User;
  assignedProjects: Project[];
}

const InstallerDashboard: React.FC<InstallerDashboardProps> = ({
  installer,
  assignedProjects,
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {installer.name}
        </h1>
        <p className="mt-2 text-gray-600">
          You have {assignedProjects.length} active projects
        </p>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Projects</h2>
          <div className="mt-6 space-y-6">
            {assignedProjects.map((project) => (
              <div
                key={project.id}
                className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.progress}% Complete
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mt-6">
                  <ProjectUpdateForm
                    projectId={project.id}
                    installerId={installer.id}
                    onSubmit={(update) => {
                      // Handle update submission
                      console.log('Project update:', update);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallerDashboard;