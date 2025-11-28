import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "full";
}

export default function Container({ 
  children, 
  className = "", 
  size = "large" // Por defecto será el equivalente a container-large
}: ContainerProps) {
  
  // Definimos los anchos máximos según Client-First
  const sizes = {
    small: "max-w-[48rem]",      // ~768px (Ideal para textos de blog)
    medium: "max-w-[64rem]",     // ~1024px (Contenido estándar)
    large: "max-w-[1280px]",     // ~1280px (Tu estándar actual)
    full: "max-w-full",
  };

  return (
    <div 
      className={`
        w-full mx-auto px-5 md:px-8 lg:px-10 
        ${sizes[size]} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}