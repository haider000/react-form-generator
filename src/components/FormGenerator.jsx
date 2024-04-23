import React, { useState } from "react";

const htmlInputTypes = [
  { label: "Text Input", value: "text" },
  { label: "Password", value: "password" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Radio Button", value: "radio" },
  { label: "Date", value: "date" },
  { label: "Email", value: "email" },
  { label: "Number", value: "number" },
  { label: "Telephone", value: "tel" },
  { label: "URL", value: "url" },
  { label: "Dropdown", value: "dropdown" },
  { label: "Text Area", value: "textarea" },
];

const FormGenerator = ({ onAddField }) => {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState("");
  const [addValidations, setAddValidations] = useState(false);
  const [validations, setValidations] = useState({
    required: false,
    minLength: "",
    maxLength: "",
    pattern: "",
    min: "",
    max: "",
  });
  const [error, setError] = useState("");

  const validateField = () => {
    if (!label.trim()) {
      setError("Label is required");
      return false;
    }

    if (type === "dropdown" && !options.trim()) {
      setError("Options are required for dropdown");
      return false;
    }

    setError("");
    return true;
  };

  const handleChangeValidation = (key, value) => {
    setValidations({ ...validations, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateField()) {
      return;
    }

    onAddField({
      label,
      type,
      required: validations.required,
      ...((type === "dropdown" || type === "radio") && {
        options: options.split(",").map((opt) => opt.trim()),
      }),
      ...(validations.minLength && {
        minLength: parseInt(validations.minLength, 10),
      }),
      ...(validations.maxLength && {
        maxLength: parseInt(validations.maxLength, 10),
      }),
      ...(validations.pattern && { pattern: validations.pattern }),
      ...(validations.min && { min: parseInt(validations.min, 10) }),
      ...(validations.max && { max: parseInt(validations.max, 10) }),
    });

    setLabel("");
    setType("text");
    setOptions("");
    setValidations({
      required: false,
      minLength: "",
      maxLength: "",
      pattern: "",
      min: "",
      max: "",
    });
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <div className="flex flex-col">
          <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Label:
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="flex h-9 px-3 py-1.5 border p-2 rounded-md w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Type:
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex h-9 px-3 py-1.5 border p-2 rounded-md w-full"
          >
            {htmlInputTypes.map((inputType) => (
              <option key={inputType.value} value={inputType.value}>
                {inputType.label}
              </option>
            ))}
          </select>
        </div>

        {type === "dropdown" && (
          <div className="flex flex-col">
            <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Options (seprated by comma ","):
            </label>
            <textarea
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="border p-2 rounded-md w-full h-32"
              placeholder="Option1,Option2,Option 3"
            ></textarea>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="checkbox"
            name="addvalidations"
            id="addvalidations"
            className="peer h-4 w-4 shrink-0 rounded-md  shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
            value={addValidations}
            checked={addValidations}
            onChange={(e) => setAddValidations(e.target.checked)}
          />
          <label className="text-white flex text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Add Validations
          </label>
        </div>

        {addValidations && (
          <div className="flex flex-col gap-6 p-4 border-2 border-gray-500 rounded-md">
            <div className="flex gap-2 items-center">
              <label className="text-white flex text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Required:
              </label>

              <input
                type="checkbox"
                value={validations.required}
                onChange={(e) =>
                  handleChangeValidation("required", e.target.checked)
                }
                className="peer h-4 w-4 shrink-0 rounded-md  shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Max:
              </label>
              <input
                type="number"
                className="border p-2 rounded-md w-full"
                value={validations.max}
                onChange={(e) => handleChangeValidation("max", e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Min:
              </label>
              <input
                type="number"
                value={validations.min}
                onChange={(e) => handleChangeValidation("min", e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Minimum Length:
              </label>
              <input
                type="number"
                value={validations.minLength}
                onChange={(e) =>
                  handleChangeValidation("minLength", e.target.value)
                }
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Maximum Length:
              </label>
              <input
                type="number"
                value={validations.maxLength}
                onChange={(e) =>
                  handleChangeValidation("maxLength", e.target.value)
                }
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Pattern:
              </label>
              <input
                type="text"
                value={validations.pattern}
                onChange={(e) =>
                  handleChangeValidation("pattern", e.target.value)
                }
                className="border p-2 rounded-md w-full"
              />
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-[#ec5990] border-1 border-[#ec5990] text-white text-xl font-medium	transition-all p-2.5 my-5 rounded-md leading-tight  hover:bg-[#bf1650]"
        >
          Add Field
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
