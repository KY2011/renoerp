import React, { useState } from 'react';
import { Task } from '../../types/project';
import { User } from '../../types/user';
import { AlertCircle, ChevronRight, Users } from 'lucide-react';

interface GanttChartProps {
  tasks: Task[];
  startDate: Date;
  endDate: Date;
  users: User[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, startDate, endDate, users }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const getTaskPosition = (task: Task) => {
    const taskStart = new Date(task.startDate).getTime();
    const taskEnd = new Date(task.endDate).getTime();
    
    const left = ((taskStart - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100;
    const width = ((taskEnd - taskStart) / (endDate.getTime() - startDate.getTime())) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  const getAssignedUsers = (task: Task) => {
    return users.filter(user => task.assignedTo.includes(user.id));
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1 bg-white rounded-lg shadow p-6 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Project Timeline</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              In Progress
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              Completed
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              Blocked
            </span>
          </div>
        </div>
        
        {/* Timeline Header */}
        <div className="flex border-b border-gray-200 mb-4">
          <div className="w-64 flex-shrink-0">Task</div>
          <div className="flex-1 flex">
            {Array.from({ length: totalDays }).map((_, index) => {
              const date = new Date(startDate);
              date.setDate(date.getDate() + index);
              return (
                <div key={index} className="flex-1 text-center text-xs text-gray-500">
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <div className="w-64 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <div className="flex -space-x-1">
                      {getAssignedUsers(task).map((user) => (
                        <div
                          key={user.id}
                          className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                          title={user.name}
                        >
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <span className="text-xs font-medium">
                              {user.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative h-8">
                <div
                  className={`absolute h-full rounded ${
                    task.progress === 100
                      ? 'bg-green-500'
                      : task.status === 'blocked'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                  style={getTaskPosition(task)}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-opacity-50 bg-white"
                    style={{ width: `${100 - task.progress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                    {task.progress}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Details Panel */}
      {selectedTask && (
        <div className="w-80 bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedTask.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned To</h4>
              <div className="flex flex-wrap gap-2">
                {getAssignedUsers(selectedTask).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center px-3 py-1 bg-gray-100 rounded-full"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-5 h-5 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-sm">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">
                  {selectedTask.startDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium">
                  {selectedTask.endDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{selectedTask.progress}%</span>
              </div>
            </div>

            {selectedTask.dependencies && selectedTask.dependencies.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Dependencies</h4>
                <div className="space-y-1">
                  {selectedTask.dependencies.map((depId) => {
                    const depTask = tasks.find((t) => t.id === depId);
                    return (
                      <div
                        key={depId}
                        className="text-sm flex items-center text-gray-600"
                      >
                        <ChevronRight className="w-4 h-4 mr-1" />
                        {depTask?.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;