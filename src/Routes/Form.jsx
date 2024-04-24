import React from "react";
import { useSearchParams } from "react-router-dom";
import { getFormById } from "../utils";
import FormPreview from "../components/FormPreview";

const Form = () => {
  const [searchParams] = useSearchParams();

  const formData = getFormById(searchParams.get("formId"));

  if (!formData) {
    return (
      <div className="flex w-full justify-center items-center">
        <div className="flex text-3xl text-red-600 font-semibold">
          Form does not exist!
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center mt-6 p-8">
      <div className="flex w-[50%]">
        <FormPreview formData={formData} />
      </div>
    </div>
  );
};

export default Form;
