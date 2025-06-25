import { cn } from "@/lib/utils";
import React from "react";
type TextAreaProps = {
register: any;
errors: any;
label: string;
name: string;
helperText?: string;
};
export default function MealTextArea({
register,
errors,
label,
name,
helperText = "",
}: TextAreaProps) {
return (
<div className="col-span-full">
  <label
    htmlFor={name}
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    {label}
  </label>
  <div className="mt-2">
    <textarea
      id={name}
      {...register(`${name}`, { required: true })}
      rows={5}
      className={cn(
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 text-sm",
        errors[`${name}`] && "focus:ring-red-500"
      )}
    />
    {errors[`${name}`] && (
      <span className="text-xs text-red-600">Category Description is required</span>
    )}
  </div>
  {helperText && (
    <p className="mt-1 text-sm leading-6 text-gray-600">{helperText}</p>
  )}
</div>
);
}
 