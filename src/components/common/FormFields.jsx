export const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  options, 
  required = false 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition`}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
