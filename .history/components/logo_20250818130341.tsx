import React from 'react'
interface LogoProps {
  className?: string
}
const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-8' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 60L40 10L70 60H10Z"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <text
          x="40"
          y="48"
          fontFamily="Inter, sans-serif"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          fill="currentColor"
        >
          32
        </text>
      </svg>
    </div>
  )
}
export default Logo
