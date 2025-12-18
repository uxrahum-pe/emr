'use client'

import { useState, useRef, useEffect } from 'react'

interface ExpandableTextProps {
  text: string
  maxLines?: number
  className?: string
  expandButtonText?: string
  collapseButtonText?: string
}

export default function ExpandableText({
  text,
  maxLines = 4,
  className = '',
  expandButtonText = '[더보기]',
  collapseButtonText = '[접기]'
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight)
      const height = textRef.current.scrollHeight
      const maxHeight = lineHeight * maxLines
      setShowButton(height > maxHeight)
    }
  }, [text, maxLines])

  return (
    <div className={className}>
      <p 
        ref={textRef}
        className="T040"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'none' : maxLines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word'
        }}
      >
        {text}
      </p>
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginTop: 'var(--size-5)',
            background: 'none',
            border: 'none',
            color: 'var(--color-blue)',
            cursor: 'pointer',
            fontSize: 'var(--font-14)',
            padding: 0,
            textDecoration: 'underline'
          }}
        >
          {isExpanded ? collapseButtonText : expandButtonText}
        </button>
      )}
    </div>
  )
}




