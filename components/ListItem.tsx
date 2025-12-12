'use client'

import { ReactNode } from 'react'

interface ListItemProps {
  children?: ReactNode
  leftContent?: ReactNode
  rightContent?: ReactNode
  className?: string
  onClick?: () => void
}

export default function ListItem({
  children,
  leftContent,
  rightContent,
  className = '',
  onClick,
}: ListItemProps) {
  const combinedClassName = `C034 ${className}`.trim()

  if (children) {
    return (
      <div 
        className={combinedClassName}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }

  return (
    <div 
      className={combinedClassName}
      onClick={onClick}
    >
      {leftContent && <div className='C035'>{leftContent}</div>}
      {rightContent && <div className='C037'>{rightContent}</div>}
    </div>
  )
}


