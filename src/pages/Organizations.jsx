import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../utils/utilities';
import { useOrganizations, useOrganizationForm } from '../hooks/useOrganisation.js';
import { OrganizationHeader } from '../components/organizations/OrganizationHeader';
import { OrganizationSearch } from '../components/organizations/OrganizationSearch';
import { OrganizationList } from '../components/organizations/OrganizationList';
import { OrganizationFormModal } from '../components/organizations/OrganizationFormModal';
import { organizationService } from '../services/organizationService.js';
import StatusModal from '../utils/StatusModal.jsx';

const Organizations = () => {
  const [showModal, setShowModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [statusModal, setStatusModal] = useState({
    open: false,
    type: 'success',
    message: '',
    onConfirm: null,
  });

  const navigate = useNavigate();

  const {
    organizations,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    loadOrganizations,
    deleteOrganization,
    modalState: listModalState,
    closeModal: closeListModal,
  } = useOrganizations();

  const {
    formData,
    setFormData,
    formErrors,
    submitLoading,
    handleChange,
    handleSubmit,
    resetForm,
    isEditMode,
    setIsEditMode,
    setEditingOrgId,
    modalState: formModalState,
    closeModal: closeFormModal,
  } = useOrganizationForm(() => {
    loadOrganizations();
    setShowModal(false);
  });

  // Helper to show status modal
  const showStatusModal = (type, message, onConfirm = null) => {
    setStatusModal({
      open: true,
      type,
      message,
      onConfirm,
    });
  };

  // Helper to close status modal
  const closeStatusModal = () => {
    setStatusModal({
      open: false,
      type: 'success',
      message: '',
      onConfirm: null,
    });
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
  };

  // Handle view organization
  const handleView = (orgId) => {
    if (!orgId) {
      showStatusModal('error', 'Invalid organization ID');
      return;
    }
    navigate(`/dashboard/organizations/${orgId}`);
  };

  // Handle edit organization
  const handleEdit = async (org) => {
    if (!org || !org.id) {
      showStatusModal('error', 'Invalid organization data');
      return;
    }

    try {
      setEditLoading(true);
      const orgId = org.id;
      const response = await organizationService.getById(orgId);
      const data = response.data;

      // Populate form with organization data
      setFormData({
        name: data.name || '',
        type: data.type || '',
        address: data.address || '',
        timezone: data.timezone || 'Asia/Kolkata',
        adminName: data.users?.[0]?.name || '',
        adminEmail: data.users?.[0]?.email || '',
        adminPhone: data.users?.[0]?.phone || '',
        adminPassword: '', // Don't populate password for security
        facilityName: data.facilities?.[0]?.name || '',
        facilityAddress: data.facilities?.[0]?.address || '',
      });

      setEditingOrgId(orgId);
      setIsEditMode(true);
      setShowModal(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to load organization details';
      showStatusModal('error', errorMessage);
    } finally {
      setEditLoading(false);
    }
  };

  // Handle add new organization
  const handleAddNew = () => {
    resetForm();
    setIsEditMode(false);
    setShowModal(true);
  };

  
  const handleDelete = (orgId) => {

    deleteOrganization(orgId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <OrganizationHeader onAddClick={handleAddNew} />

      {/* Global Error Display */}
      {error && <ErrorMessage message={error} />}

      {/* Search */}
      <OrganizationSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Organization List */}
      <OrganizationList
        loading={loading || editLoading}
        organizations={organizations}
        searchQuery={searchQuery}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Organization Form Modal */}
      <OrganizationFormModal
        showModal={showModal}
        formData={formData}
        formErrors={formErrors}
        submitLoading={submitLoading}
        onClose={handleModalClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
      />

      {/* Status Modal for List Operations (Delete confirmations) */}
      <StatusModal
        open={listModalState.open}
        type={listModalState.type}
        message={listModalState.message}
        onClose={closeListModal}
        onConfirm={listModalState.onConfirm}
        confirmText={listModalState.type === 'warning' ? 'Delete' : 'OK'}
        cancelText="Cancel"
      />

      {/* Status Modal for Form Operations (Create/Update success/error) */}
      <StatusModal
        open={formModalState.open}
        type={formModalState.type}
        message={formModalState.message}
        onClose={closeFormModal}
      
      />


      <StatusModal
        open={statusModal.open}
        type={statusModal.type}
        message={statusModal.message}
        onClose={closeStatusModal}
        onConfirm={statusModal.onConfirm}
      />
    </div>
  );
};

export default Organizations;