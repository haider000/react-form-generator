import React from "react";
import { cn } from "../utils";

export const TextInput = ({ attributes, className }) => {
  return (
    <div className="flex w-full flex-col space-y-2">
      <label className="text-white flex w-full text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {attributes.label}
        {attributes.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={attributes.type}
        name={attributes.label}
        required={attributes.required}
        {...{
          ...(attributes.min && { min: attributes.min }),
          ...(attributes.max && { max: attributes.max }),
          ...(attributes.minLength && { minLength: attributes.minLength }),
          ...(attributes.maxLength && { maxLength: attributes.maxLength }),
          ...(attributes.pattern && { pattern: attributes.pattern }),
        }}
        className={cn(
          "flex text-white h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder={attributes.label}
      />
    </div>
  );
};

export const TextArea = ({ attributes, className }) => {
  return (
    <div className="flex w-full flex-col space-y-2">
      <label className="text-white flex text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {attributes.label}
        {attributes.required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={attributes.label}
        required={attributes.required}
        {...{
          ...(attributes.min && { min: attributes.min }),
          ...(attributes.max && { max: attributes.max }),
          ...(attributes.minLength && { minLength: attributes.minLength }),
          ...(attributes.maxLength && { maxLength: attributes.maxLength }),
          ...(attributes.pattern && { pattern: attributes.pattern }),
        }}
        className={cn(
          "flex text-white h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        placeholder={attributes.label}
      ></textarea>
    </div>
  );
};

export const Dropdown = ({ attributes, className }) => {
  return (
    <div className="flex w-full flex-col space-y-2">
      <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {attributes.label}
        {attributes.required && <span className="text-red-500">*</span>}
      </label>

      <select
        required={attributes.required}
        name={attributes.label}
        width="100%"
        className={cn(
          "flex text-white h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <option value="">Select {attributes.label}</option>
        {attributes.options &&
          attributes.options.length > 0 &&
          attributes.options.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
      </select>
    </div>
  );
};

export const Checkbox = ({ attributes }) => {
  return (
    <div className="flex w-full items-center space-x-2">
      <input
        name={attributes.label}
        required={attributes.required}
        type="checkbox"
        className="peer h-4 w-4 shrink-0 rounded-md  shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {attributes.label}
        {attributes.required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

export const RadioButton = ({ attributes }) => {
  return (
    <div className="flex w-full items-center space-x-2">
      <input
        required={attributes.required}
        name={attributes.label}
        type="radio"
        className="border rounded"
      />
      <label className="text-white text-xl pb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {attributes.label}
        {attributes.required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};
