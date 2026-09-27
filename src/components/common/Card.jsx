import React from 'react';

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'p-5 sm:p-6',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-slate-200/90 shadow-2xs ${padding} ${
        hover ? 'hover:border-slate-300 transition-colors' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
