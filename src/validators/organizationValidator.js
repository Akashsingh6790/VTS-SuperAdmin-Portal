export const validateOrganizationForm = (data, isEditMode = false) => {
  const errors = {};

  if (!data.name?.trim()) errors.name = "Organization name is required";
  if (!data.type?.trim()) errors.type = "Organization type is required";
  if (!data.address?.trim()) errors.address = "Address is required";

  if (!data.adminName?.trim()) errors.adminName = "Admin name is required";
  if (!data.adminEmail?.trim()) errors.adminEmail = "Admin email is required";
  if (!data.adminPhone?.trim()) errors.adminPhone = "Admin phone is required";


  if (!isEditMode) {
    if (!data.adminPassword?.trim()) {
      errors.adminPassword = "Password is required";
    } else if (data.adminPassword.length < 6) {
      errors.adminPassword = "Password must be at least 6 characters";
    }
  }

  if (!data.facilityName?.trim()) errors.facilityName = "Facility name is required";
  if (!data.facilityAddress?.trim()) errors.facilityAddress = "Facility address is required";

  return errors;
};
