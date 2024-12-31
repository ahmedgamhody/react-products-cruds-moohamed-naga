import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
export default function Button({
  children,
  className,
  width = "w-full",
  ...rest
}: IButtonProps) {
  return (
    <button
      className={`${className} rounded-md text-white ${width}  p-2`}
      {...rest}
    >
      {children}
    </button>
  );
}
