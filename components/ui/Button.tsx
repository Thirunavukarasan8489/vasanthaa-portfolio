import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  href?: string;
  icon?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  href,
  icon = true,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C8A75A]";

  const variantClasses = {
    primary:
      "bg-[#C8A75A] text-[#021D15] hover:bg-[#D7BC76] px-6 py-3.5 font-semibold",
    secondary:
      "bg-[#053827] text-[#F7F4EC] hover:bg-[#0A4C38] border border-[#0A4C38] px-6 py-3.5",
    outline:
      "border border-[#C8A75A] text-[#F7F4EC] hover:bg-[#C8A75A] hover:text-[#021D15] px-6 py-3.5",
    text: "text-[#C8A75A] hover:text-[#D7BC76] underline-offset-4 hover:underline px-0 py-2",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        <span>{children}</span>
        {icon && <ArrowUpRight className="w-4 h-4" />}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span>{children}</span>
      {icon && <ArrowUpRight className="w-4 h-4" />}
    </button>
  );
}
