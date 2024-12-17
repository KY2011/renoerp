import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const ProjectTimeline: React.FC<{ projects: any[] }> = ({ projects }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Project Timeline</h2>
        <div className="mt-4 space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="relative">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${
                  project.status === 'completed' ? 'bg-green-500' :
                  project.status === 'in-progress' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`} />
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{project.title}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
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
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;