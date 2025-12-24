import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

const STATUS_CONFIG = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
    confirmBtn: "bg-green-600 hover:bg-green-700",
    title: "Success",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
    confirmBtn: "bg-red-600 hover:bg-red-700",
    title: "Error",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-300",
    confirmBtn: "bg-orange-600 hover:bg-orange-700",
    title: "Confirm Action",
  },
};

const StatusModal = ({
  open,
  type = "success",
  message,
  onClose,
  onConfirm,      
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!open) return null;

  const config = STATUS_CONFIG[type];
  const Icon = config.icon;
  const isConfirm = Boolean(onConfirm);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`w-full max-w-md bg-white rounded-xl shadow-xl border ${config.border} animate-scaleIn`}>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 rounded-t-xl ${config.bg}`}>
          <div className="flex items-center space-x-2">
            <Icon className={`w-6 h-6 ${config.text}`} />
            <h3 className={`font-semibold ${config.text}`}>
              {config.title}
            </h3>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 text-gray-700">
          <p>{message}</p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex justify-end space-x-3">
          {isConfirm && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={isConfirm ? onConfirm : onClose}
            className={`px-5 py-2 text-white rounded-lg transition ${config.confirmBtn}`}
          >
            {isConfirm ? confirmText : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
