'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollableContainerProps {
  children: ReactNode
  className?: string
  height?: string
  onOverflowChange?: (hasOverflow: boolean) => void
}

export default function ScrollableContainer({
  children,
  className = '',
  height,
  onOverflowChange,
}: ScrollableContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let resizeTimeoutId: ReturnType<typeof setTimeout> | null = null
    
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const element = scrollContainerRef.current
        const hasOverflow = element.scrollHeight > element.clientHeight
        
        if (hasOverflow) {
          element.classList.add('isOverflowed')
        } else {
          element.classList.remove('isOverflowed')
        }

        onOverflowChange?.(hasOverflow)
      }
    }

    const debouncedCheckOverflow = () => {
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId)
      }
      resizeTimeoutId = setTimeout(() => {
        checkOverflow()
      }, 150)
    }

    checkOverflow()

    const resizeObserver = new ResizeObserver(debouncedCheckOverflow)
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current)
    }

    window.addEventListener('resize', debouncedCheckOverflow)

    return () => {
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', debouncedCheckOverflow)
    }
  }, [onOverflowChange, height])

  const containerStyle = height ? { height } : undefined
  const combinedClassName = `C038 ${className}`.trim()

  return (
    <div 
      ref={scrollContainerRef} 
      className={combinedClassName}
      style={containerStyle}
    >
      {children}
    </div>
  )
}


