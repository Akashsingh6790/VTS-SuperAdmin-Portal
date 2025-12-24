import { Plus } from 'lucide-react';

export const OrganizationHeader = ({ onAddClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
        <p className="text-gray-600 mt-1">Manage healthcare organizations</p>
      </div>
      <button
        onClick={onAddClick}
        className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center space-x-2 transition"
      >
        <Plus className="w-5 h-5" />
        <span>Add Organization</span>
      </button>
    </div>
  );
};