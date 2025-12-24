import { Search } from 'lucide-react';
import { LoadingSpinner, EmptyState } from '../../utils/utilities.jsx';
import { OrganizationCard } from './OrganizationCard';

export const OrganizationList = ({
  loading,
  organizations,
  searchQuery,
  onView,
  onEdit,
  onDelete,
  onAddClick,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (organizations.length === 0) {
    if (searchQuery) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600">Try adjusting your search query</p>
        </div>
      );
    }
    return <EmptyState onAdd={onAddClick} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <OrganizationCard
          key={org.id}
          organization={org}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};