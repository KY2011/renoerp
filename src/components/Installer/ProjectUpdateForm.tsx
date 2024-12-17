import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { ProjectUpdate, PhotoUpdate } from '../../types/project';

interface ProjectUpdateFormProps {
  projectId: string;
  installerId: string;
  onSubmit: (update: Omit<ProjectUpdate, 'id' | 'timestamp'>) => void;
}

const ProjectUpdateForm: React.FC<ProjectUpdateFormProps> = ({
  projectId,
  installerId,
  onSubmit,
}) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectUpdate['status']>('in-progress');
  const [photos, setPhotos] = useState<PhotoUpdate[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotos((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substr(2, 9),
              url: reader.result as string,
              caption: '',
              timestamp: new Date(),
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      projectId,
      installerId,
      description,
      status,
      photos,
    });
    setDescription('');
    setPhotos([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Status Update</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectUpdate['status'])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="started">Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe the progress made..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Photos</label>
        <div className="mt-1 flex items-center space-x-4">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Camera className="w-5 h-5 mr-2" />
            Add Photos
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        {/* Photo Preview */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative">
              <img
                src={photo.url}
                alt="Update"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setPhotos(photos.filter((p) => p.id !== photo.id))}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Update
      </button>
    </form>
  );
};

export default ProjectUpdateForm;