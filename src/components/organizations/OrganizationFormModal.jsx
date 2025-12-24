import { Building2 } from 'lucide-react';
import { TIMEZONES, ORGANIZATION_TYPES } from '../../utils/constants';
import { InputField, SelectField } from '../common/FormFields';

export const OrganizationFormModal = ({
  showModal,
  formData,
  formErrors,
  submitLoading,
  onClose,
  onChange,
  onSubmit,
  isEditMode
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">
  {isEditMode ? 'Edit Organization' : 'Add New Organization'}
</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Organization Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Organization Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Organization Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                error={formErrors.name}
                placeholder="Apollo Hospitals"
                required
              />
              <SelectField
                label="Organization Type"
                name="type"
                value={formData.type}
                onChange={onChange}
                error={formErrors.type}
                options={ORGANIZATION_TYPES}
                required
              />
              <div className="md:col-span-2">
                <InputField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={onChange}
                  error={formErrors.address}
                  placeholder="123 MG Road, Delhi"
                  required
                />
              </div>
              <SelectField
                label="Timezone"
                name="timezone"
                value={formData.timezone}
                onChange={onChange}
                options={TIMEZONES}
                required
              />
            </div>
          </div>

          {/* Admin Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Admin Name"
                name="adminName"
                value={formData.adminName}
                onChange={onChange}
                error={formErrors.adminName}
                placeholder="Dr. Rajesh Kumar"
                required
              />
              <InputField
                label="Admin Email"
                name="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={onChange}
                error={formErrors.adminEmail}
                placeholder="rajesh@apollo.com"
                required
              />
            {!isEditMode && (
  <InputField
    label="Admin Password"
    name="adminPassword"
    type="password"
    value={formData.adminPassword}
    onChange={onChange}
    error={formErrors.adminPassword}
    placeholder="Minimum 8 characters"
    required
  />
)}
              <InputField
                label="Admin Phone"
                name="adminPhone"
                type="tel"
                value={formData.adminPhone}
                onChange={onChange}
                error={formErrors.adminPhone}
                placeholder="9876543210"
                required
              />
            </div>
          </div>

          {/* Facility Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Facility Name"
                name="facilityName"
                value={formData.facilityName}
                onChange={onChange}
                error={formErrors.facilityName}
                placeholder="Apollo Delhi"
                required
              />
              <InputField
                label="Facility Address"
                name="facilityAddress"
                value={formData.facilityAddress}
                onChange={onChange}
                error={formErrors.facilityAddress}
                placeholder="123 MG Road, Delhi"
                required
              />
            </div>
          </div>

          {/* Form Actions */}
 <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
  <button
    type="button"
    onClick={onClose}
    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
    disabled={submitLoading}
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={submitLoading}
    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
  >
    {submitLoading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        {isEditMode ? 'Updating...' : 'Creating...'}
      </>
    ) : (
      isEditMode ? 'Update Organization' : 'Create Organization'
    )}
  </button>
</div>
        </form>
      </div>
    </div>
  );
};