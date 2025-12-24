import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, MapPin, Clock, User, Mail, ArrowLeft } from "lucide-react";
import { organizationService } from "../../services/organizationService";

const OrganizationDetailPage = () => {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const [organisation, setOrganisation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const response = await organizationService.getById(orgId);
        setOrganisation(response.data);
      } catch (err) {
        setError(err.message || "Failed to load organisation");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisation();
  }, [orgId]);

  if (loading) {
    return (
      <div className="p-6 text-gray-600">Loading organisation details...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">{error}</div>
    );
  }

  if (!organisation) return null;

  const {
    name,
    type,
    address,
    timezone,
    facilities = [],
    users = [],
    createdAt,
  } = organisation;

  const admin = users[0];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-sm text-blue-600 font-medium">{type}</p>
            </div>
          </div>
        </div>

        {/* Organisation Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Organisation Information
            </h2>

            <div className="flex items-start space-x-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <span>{address}</span>
            </div>

            <div className="flex items-center space-x-3 text-gray-700">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{timezone}</span>
            </div>

            <p className="text-sm text-gray-500">
              Created on {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Admin */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Organisation Admin
            </h2>

            {admin ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {admin.name}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{admin.email}</span>
                </div>

                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  ORG ADMIN
                </span>
              </div>
            ) : (
              <p className="text-gray-500">No admin assigned</p>
            )}
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Facilities
            </h2>
            <span className="text-sm text-gray-500">
              {facilities.length} total
            </span>
          </div>

          {facilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-900">
                    {facility.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {facility.address}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No facilities found</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrganizationDetailPage;
