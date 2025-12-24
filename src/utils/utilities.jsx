import { AlertCircle,Building2,Plus } from "lucide-react";



export const getAuthToken = () => {
  const superAdmin = JSON.parse(localStorage.getItem('superAdmin') || '{}');
  return superAdmin.token || '';
};

 export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};


export const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
    <p className="text-red-700 text-sm">{message}</p>
  </div>
);

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export const EmptyState = ({ onAdd }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
    <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Organizations Yet</h3>
    <p className="text-gray-600 mb-6">Get started by creating your first organization</p>
    <button
      onClick={onAdd}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition"
    >
      <Plus className="w-5 h-5" />
      <span>Add Organization</span>
    </button>
  </div>
);