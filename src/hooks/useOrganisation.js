import { useState, useEffect, useCallback } from 'react';
import { organizationService } from '../services/organizationService';
import { validateOrganizationForm } from '../validators/organizationValidator';

const INITIAL_FORM_STATE = {
  name: '',
  type: '',
  address: '',
  timezone: 'Asia/Kolkata',
  adminName: '',
  adminEmail: '',
  adminPassword: '',
  adminPhone: '',
  facilityName: '',
  facilityAddress: '',
};

const INITIAL_MODAL_STATE = {
  open: false,
  type: 'success',
  message: '',
  onConfirm: null,
};

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

  // Load organizations on mount
  useEffect(() => {
    loadOrganizations();
  }, []);

  // Filter organizations based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrgs(organizations);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredOrgs(
        organizations.filter(
          (org) =>
            org.name.toLowerCase().includes(query) ||
            org.type.toLowerCase().includes(query) ||
            org.address.toLowerCase().includes(query) ||
            org.admin.name.toLowerCase().includes(query) ||
            org.admin.email.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, organizations]);

  const showModal = useCallback((type, message, onConfirm = null) => {
    setModalState({
      open: true,
      type,
      message,
      onConfirm,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(INITIAL_MODAL_STATE);
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await organizationService.fetchAll();
      setOrganizations(response.data || []);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load organizations';
      setError(errorMessage);
      showModal('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrganization = async (id) => {
   

    showModal(
      'warning',
      'Are you sure you want to delete this organization? This action cannot be undone.',
      async () => {
        try {
          closeModal();
          setLoading(true);
          await organizationService.delete(id);
          setOrganizations((prev) => prev.filter((org) => org.id !== id));
          showModal('success', 'Organization deleted successfully');
        } catch (err) {
          const errorMessage = err.message || 'Failed to delete organization';
          showModal('error', errorMessage);
        } finally {
          setLoading(false);
        }
      }
    )
  };

  return {
    organizations: filteredOrgs,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    loadOrganizations,
    deleteOrganization,
    modalState,
    closeModal,
  };
};

export const useOrganizationForm = (onSuccess) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOrgId, setEditingOrgId] = useState(null);
  const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

  const showModal = useCallback((type, message, onConfirm = null) => {
    setModalState({
      open: true,
      type,
      message,
      onConfirm,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(INITIAL_MODAL_STATE);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field if it exists
    setFormErrors((prev) => {
      if (prev[name]) {
        const { [name]: removed, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setFormErrors({});
    setIsEditMode(false);
    setEditingOrgId(null);
  }, []);

  const loadOrganizationForEdit = useCallback((organization) => {
    setFormData({
      name: organization.name || '',
      type: organization.type || '',
      address: organization.address || '',
      timezone: organization.timezone || 'Asia/Kolkata',
      adminName: organization.admin?.name || '',
      adminEmail: organization.admin?.email || '',
      adminPassword: '', // Don't populate password for security
      adminPhone: organization.admin?.phone || '',
      facilityName: organization.facility?.name || '',
      facilityAddress: organization.facility?.address || '',
    });
    setIsEditMode(true);
    setEditingOrgId(organization.id);
    setFormErrors({});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateOrganizationForm(formData, isEditMode);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstError = Object.values(errors)[0];
      showModal('error', firstError);
      return;
    }

    setSubmitLoading(true);

    // Prepare payload
    const payload = {
      name: formData.name,
      type: formData.type,
      address: formData.address,
      timezone: formData.timezone,
      admin: {
        name: formData.adminName,
        email: formData.adminEmail,
        phone: formData.adminPhone,
        ...(formData.adminPassword && { password: formData.adminPassword }),
      },
      facility: {
        name: formData.facilityName,
        address: formData.facilityAddress,
      },
    };

    try {
      if (isEditMode) {
        if (!editingOrgId) {
          throw new Error('Organization ID is missing');
        }
        await organizationService.update(editingOrgId, payload);
        showModal('success', 'Organization updated successfully', () => {
          closeModal();
          resetForm();
          onSuccess?.();
        });
      } else {
        await organizationService.create(payload);
        showModal('success', 'Organization created successfully', () => {
          closeModal();
          resetForm();
          onSuccess?.();
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `Failed to ${isEditMode ? 'update' : 'create'} organization`;
      showModal('error', errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    formErrors,
    submitLoading,
    handleChange,
    handleSubmit,
    resetForm,
    isEditMode,
    setIsEditMode,
    editingOrgId,
    setEditingOrgId,
    loadOrganizationForEdit,
    modalState,
    closeModal,
  };
};