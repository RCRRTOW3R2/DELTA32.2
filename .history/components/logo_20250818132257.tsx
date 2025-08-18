import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'default' | 'dark' | 'light' | 'noBackground'
}

const Logo: React.FC<LogoProps> = ({ 
  className = 'h-8 w-auto', 
  variant = 'default' 
}) => {
  const getLogoSrc = () => {
    switch (variant) {
      case 'dark':
        return '/darklogo.png'
      case 'light':
        return '/lightlogo.png'
      case 'noBackground':
        return '/LOGOnoBack.png'
      default:
        return '/LOGO.png'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={getLogoSrc()}
        alt="Delta32 Logo"
        className="object-contain"
        style={{ filter: 'brightness(1.1)' }}
      />
    </div>
  )
}
export default Logo
