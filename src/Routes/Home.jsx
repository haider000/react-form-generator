import React, { useState, useEffect } from "react";
import FormGenerator from "../components/FormGenerator";
import FormPreview from "../components/FormPreview";
import { v4 as uuidv4 } from "uuid";
import { saveToLocalStorage } from "../utils";

import { Link2Icon } from "@radix-ui/react-icons";

const Home = () => {
  const [formData, setFormData] = useState({
    formId: uuidv4(),
    data: [],
  });

  const loadFormConfig = () => {
    const allForms = localStorage.getItem("allforms");
    if (allForms) {
      const parsedData = JSON.parse(allForms);
      setFormData(parsedData[parsedData.length - 1]);
    }
  };

  // Load form configurations from localStorage on initial mount
  useEffect(() => {
    loadFormConfig();
  }, []);

  const handleAddField = (field) => {
    setFormData({ ...formData, data: [...formData.data, field] });
  };

  const handleRemoveField = (index) => {
    setFormData({
      ...formData,
      data: formData.data.filter((_, i) => i !== index),
    });
  };

  const startDownloadJson = () => {
    if (formData.data.length === 0) {
      alert("Add fields to download form data");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "form-data.json";
    document.body.appendChild(element);
    element.click();
  };

  const openNewTab = () => {
    if (formData.data.length === 0) {
      alert("Add fields to preview form");
      return;
    }

    saveToLocalStorage(formData);

    const url = `${window.location.href}form?formId=${formData.formId}`;

    Object.assign(document.createElement("a"), {
      target: "_blank",
      rel: "noopener noreferrer",
      href: url,
    }).click();
  };

  return (
    <div className="container flex flex-col mx-auto p-4">
      <h1 className="text-4xl text-white text-center font-bold mt-4 mb-12 p-4">
        Dynamic Form Generator
      </h1>
      <div className="flex">
        <div className="w-[30%]">
          <h2 className="text-2xl text-[#bf1650] font-semibold mb-4">
            Add Form Fields
          </h2>
          <div className="flex flex-col gap-2 pb-4 mb-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={startDownloadJson}
            >
              Download Form JSON
            </button>
            <div className="flex gap-2 pt-4">
              <button
                onClick={loadFormConfig}
                className="w-[50%] bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Load Last Form
              </button>
              <button
                onClick={() => {
                  saveToLocalStorage(formData);
                  alert("Form saved successfully!");
                }}
                className="w-[50%] bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save Form
              </button>
            </div>
          </div>
          <FormGenerator onAddField={handleAddField} />
        </div>
        <div className="w-[70%] flex flex-col">
          <div className="flex flex-col w-[50%] mx-auto">
            <div className="flex items-center gap-2 pb-4 mb-2">
              <h2 className="text-2xl text-[#bf1650] font-semibold">
                Form Preview
              </h2>

              <button
                className="flex items-center justify-center border text-white rounded-md border-gray-300 bg-transparent hover:bg-gray-700 px-4 py-2"
                onClick={() => openNewTab()}
              >
                Open Form <Link2Icon className="w-6 h-6 hover:scale-110" />
              </button>
            </div>

            <FormPreview
              formData={formData}
              showRemoveButton={true}
              onRemoveField={handleRemoveField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
