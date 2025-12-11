'use client'

import { useState } from 'react'
import { ToggleSwitchProps } from '@/types/ui'

export default function ToggleSwitch(props: ToggleSwitchProps) {
  const { onLabel, offLabel } = props
  const isControlled = 'value' in props
  const hasStyle = 'width' in props && 'height' in props
  const width = hasStyle ? props.width : undefined
  const height = hasStyle ? props.height : undefined
  
  const [internalValue, setInternalValue] = useState(
    isControlled ? false : (props.defaultChecked ?? false)
  )
  
  const isOff = isControlled 
    ? !props.value 
    : !internalValue

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isControlled) {
      // value는 isOn 상태를 나타냄 (true = isOn, false = isOff)
      // 토글된 후의 isOn 상태는 현재 value의 반대값
      const newIsOnValue = !props.value
      props.onChange(newIsOnValue)
    } else {
      const newIsOnValue = !internalValue
      setInternalValue(newIsOnValue)
      props.onChange?.(newIsOnValue)
    }
  }

  const widthStyle = width ? { width } : {}
  const heightStyle = height ? { height } : {}

  return (
    <div
      className={`C025 ${isOff ? 'isOff' : 'isOn'}`}
      onClick={handleToggle}
      style={{ ...widthStyle, ...heightStyle }}
    >
      <div className='C027'>
        <p className='T010'>{onLabel}</p>
        <p className='T010'>{offLabel}</p>
      </div>
      <div className='C026'></div>
    </div>
  )
}

