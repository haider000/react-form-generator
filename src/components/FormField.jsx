import React from "react";

import {
  TextInput,
  TextArea,
  Dropdown,
  Checkbox,
  RadioButton,
} from "./inputComponents";

const FormField = ({ field }) => {
  switch (field.type) {
    case "textarea":
      return <TextArea attributes={field} />;
    case "dropdown":
      return <Dropdown attributes={field} />;
    case "checkbox":
      return <Checkbox attributes={field} />;
    case "radio":
      return <RadioButton attributes={field} />;
    default:
      return <TextInput attributes={field} />;
  }
};

export default FormField;
