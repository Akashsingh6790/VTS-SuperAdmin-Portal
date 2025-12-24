import { Search } from 'lucide-react';

export const OrganizationSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full md:w-96">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search organizations..."
          className="bg-transparent outline-none text-sm w-full text-gray-700"
        />
      </div>
    </div>
  );
};