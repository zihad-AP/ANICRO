import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  title,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-800/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary: 'bg-teal-800 hover:bg-teal-900 text-white shadow-2xs border border-teal-900 active:bg-teal-950 font-semibold tracking-wide',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs active:bg-slate-100 font-medium',
    outline: 'bg-white hover:bg-teal-50/70 text-teal-900 border border-teal-700/50 active:bg-teal-100/60 font-medium',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent font-medium'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-xs px-3.5 py-2 gap-2',
    lg: 'text-xs sm:text-sm px-4 py-2.5 gap-2'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className={iconSizes[size] || iconSizes.md} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={iconSizes[size] || iconSizes.md} />}
    </button>
  );
}
