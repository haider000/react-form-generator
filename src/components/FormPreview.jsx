import React from "react";
import FormField from "./FormField";

const FormPreview = ({ formData, showRemoveButton = false, onRemoveField }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Form Data:", Object.fromEntries(data));
    alert(`Form Data: ${JSON.stringify(Object.fromEntries(data))}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {formData.map((field, index) => (
        <div key={index} className="flex gap-2 items-end w-full pb-6">
          <FormField field={field} />
          {showRemoveButton && (
            <button
              type="button"
              onClick={() => showRemoveButton && onRemoveField(index)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      {formData.length > 0 && (
        <button
          type="submit"
          className="bg-green-500 flex w-full justify-center font-bold text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default FormPreview;
