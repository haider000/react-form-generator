import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const saveToLocalStorage = (data) => {
  const savedForms = localStorage.getItem("allforms");
  if (savedForms) {
    const forms = JSON.parse(savedForms);
    const formIndex = forms.findIndex((form) => form.formId === data.formId);
    if (formIndex > -1) {
      forms[formIndex] = data;
    } else {
      forms.push(data);
    }
    localStorage.setItem("allforms", JSON.stringify(forms));
  } else {
    localStorage.setItem("allforms", JSON.stringify([data]));
  }
};

export const getFormById = (formId) => {
  const savedForms = localStorage.getItem("allforms");
  if (savedForms) {
    const forms = JSON.parse(savedForms);
    return forms.find((form) => form.formId === formId);
  }
 
  return null;
}