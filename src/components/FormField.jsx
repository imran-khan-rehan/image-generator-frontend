import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label
        htmlFor={name}
        className="block text-[18px] text-black font-bold"
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="dark:bg-cyan-700 dark:border-cyan-600 border-cyan-100 dark:hover:bg-black hover:bg-black font-semibold mb-2 flex  items-center justify-center rounded-full border-2 bg-white py-2 px-8 text-center transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent uppercase"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
  type={type}
  id={name}
  name={name}
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 transition-colors duration-300 hover:bg-gray-100 hover:text-black"
  placeholder={placeholder}
  value={value}
  onChange={handleChange}
  required
/>


  </div>
);

export default FormField;
