import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#0e0e0e] border border-gray-800 p-4 rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}
