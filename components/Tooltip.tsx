'use client'

import { useState } from 'react'
import { TipState, TooltipProps } from '@/types/ui'

export default function Tooltip(props: TooltipProps) {
  const { text, children } = props
  const hasOffset = 'offsetX' in props && 'offsetY' in props
  const finalOffsetX = hasOffset ? props.offsetX : 16
  const finalOffsetY = hasOffset ? props.offsetY : 16
  const [tip, setTip] = useState<TipState>({ visible: false, text: '', x: 0, y: 0 })

  const showTip = () => setTip((prev) => ({ ...prev, visible: true, text }))
  const moveTip = (e: React.MouseEvent) =>
    setTip((prev) => ({
      ...prev,
      visible: true,
      x: e.clientX + finalOffsetX,
      y: e.clientY + finalOffsetY,
    }))
  const hideTip = () => setTip((prev) => ({ ...prev, visible: false }))

  return (
    <>
      <div onMouseEnter={showTip} onMouseMove={moveTip} onMouseLeave={hideTip}>
        {children}
      </div>
      {tip.visible && (
        <div className='tooltip-follow' style={{ left: tip.x, top: tip.y }}>
          {tip.text}
        </div>
      )}
    </>
  )
}

