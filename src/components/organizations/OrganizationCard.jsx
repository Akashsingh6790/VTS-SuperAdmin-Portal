import { Building2, Edit, Trash2, Eye } from 'lucide-react';
import { formatDate } from '../../utils/utilities';

export const OrganizationCard = ({ organization, onView, onEdit, onDelete }) => {
  const { id, name, type, address, createdAt, facilityCount, admin, facilities } = organization;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onView(organization.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={() => onEdit(organization)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Edit"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(organization.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-blue-600 font-medium mb-3">{type}</p>
      <p className="text-sm text-gray-600 mb-4">{address}</p>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Admin</p>
          <p className="text-sm font-medium text-gray-900">{admin.name}</p>
          <p className="text-xs text-gray-600">{admin.email}</p>
          <p className="text-xs text-gray-600">{admin.phone}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Facilities ({facilityCount})</p>
          {facilities && facilities.length > 0 ? (
            <div className="space-y-1">
              {facilities.slice(0, 2).map((facility) => (
                <p key={facility.id} className="text-sm font-medium text-gray-900">
                  {facility.name}
                </p>
              ))}
              {facilities.length > 2 && (
                <p className="text-xs text-gray-500">+{facilities.length - 2} more</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No facilities</p>
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500">Created: {formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
