// src/components/ui/button.tsx
import React from 'react';

export function Button({ children, onClick, className = '' }: {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string
}) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold ${className}`}>
      {children}
    </button>
  );
}
