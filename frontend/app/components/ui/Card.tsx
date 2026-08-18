"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  border?: boolean;
  borderColor?: "blue" | "green" | "red" | "yellow" | "gray";
}

export default function Card({
  children,
  className = "",
  padding = "md",
  hover = false,
  border = false,
  borderColor = "blue"
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const borderClasses = {
    blue: "border-l-4 border-blue-500",
    green: "border-l-4 border-green-500",
    red: "border-l-4 border-red-500",
    yellow: "border-l-4 border-yellow-500",
    gray: "border-l-4 border-gray-400",
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md
        ${paddingClasses[padding]}
        ${border ? borderClasses[borderColor] : ""}
        ${hover ? "hover:shadow-lg transition-shadow duration-200" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
