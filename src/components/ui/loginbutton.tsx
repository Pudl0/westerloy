'use client';

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils/utils';

interface LoginButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconPosition?: 'left' | 'right';
  showIcon?: boolean;
  children?: React.ReactNode;
}

export default function LoginButton({
  className,
  variant = 'default',
  size = 'md',
  iconPosition = 'left',
  showIcon = true,
  children = 'Zum Login',
}: LoginButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizeStyles = {
    sm: 'h-9 px-3 rounded-md text-sm',
    md: 'h-10 py-2 px-4 rounded-md',
    lg: 'h-11 px-8 rounded-md',
  };

  return (
    <Link
      href={{
        pathname: '/api/auth/signin',
      }}
      as={`/api/auth/signin`}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {showIcon && iconPosition === 'left' && (
        <LogIn className={cn('mr-2 h-5 w-5', isHovered ? 'animate-pulse' : '')} />
      )}
      <span>{children}</span>
      {showIcon && iconPosition === 'right' && (
        <LogIn className={cn('ml-2 h-5 w-5', isHovered ? 'animate-pulse' : '')} />
      )}
    </Link>
  );
}
