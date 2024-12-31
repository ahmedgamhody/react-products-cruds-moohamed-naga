/* eslint-disable @typescript-eslint/no-empty-object-type */
import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function Input({ ...rest }: IInputProps) {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md"
      {...rest}
    />
  );
}
