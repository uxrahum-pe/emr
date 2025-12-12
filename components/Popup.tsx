'use client'

import { useEffect, useRef, useState, useCallback, ReactNode, ReactElement, cloneElement, isValidElement, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'

interface PopupProps {
  children: ReactNode
  popupContent?: ReactNode
  className?: string
  style?: React.CSSProperties
  offsetX?: number
  offsetY?: number
  width?: number
  height?: number
  isOpen?: boolean
  onClose?: () => void
}

export default function Popup({ children, popupContent, className, style, offsetX = 16, offsetY = 16, width, height, isOpen, onClose }: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupState, setPopupState] = useState({ visible: false, x: 0, y: 0 })
  const clickPositionRef = useRef<{ x: number; y: number } | null>(null)
  const isControlled = isOpen !== undefined
  const visible = isControlled ? (isOpen ?? false) : popupState.visible

  const movePopup = (e: React.MouseEvent) => {
    const clickPos = { x: e.clientX + offsetX, y: e.clientY + offsetY }
    clickPositionRef.current = clickPos
    if (isControlled) {
      // Controlled mode: 위치만 저장하고 부모 컴포넌트에서 상태 관리
      // 위치는 popupState에 저장해두고 useEffect에서 사용
      setPopupState(prev => ({ ...prev, x: clickPos.x, y: clickPos.y }))
      // 팝업 열기 콜백은 없고, isOpen prop으로만 제어
    } else {
      setPopupState({
        visible: true,
        x: clickPos.x,
        y: clickPos.y,
      })
    }
  }
  
  // Controlled mode에서 isOpen이 변경되면 위치 업데이트 (clickPositionRef가 있으면 사용)
  useEffect(() => {
    if (isControlled && isOpen) {
      // 클릭 위치가 있으면 사용, 없으면 기본 위치
      if (clickPositionRef.current) {
        setPopupState(prev => ({ ...prev, x: clickPositionRef.current!.x, y: clickPositionRef.current!.y }))
      } else {
        // 클릭 위치가 없으면 기본 위치 사용 (마우스 위치 대신 화면 중앙 근처)
        setPopupState(prev => ({ 
          ...prev, 
          x: typeof window !== 'undefined' ? window.innerWidth / 2 : offsetX, 
          y: typeof window !== 'undefined' ? window.innerHeight / 2 : offsetY 
        }))
      }
    }
  }, [isControlled, isOpen, offsetX, offsetY])
  const hidePopup = useCallback(() => {
    if (isControlled) {
      onClose?.()
    } else {
      setPopupState((prev) => ({ ...prev, visible: false }))
    }
    clickPositionRef.current = null
  }, [isControlled, onClose])

  useEffect(() => {
    if (!visible || !popupRef.current || !clickPositionRef.current) return

    const updatePosition = () => {
      const popup = popupRef.current
      if (!popup || !clickPositionRef.current) return

      // 실제 DOM 요소의 크기를 측정 (CSS 변수 시스템 반영)
      // getBoundingClientRect를 사용하면 CSS 변수가 적용된 실제 크기를 가져올 수 있음
      const popupRect = popup.getBoundingClientRect()
      const popupWidth = popupRect.width
      const popupHeight = popupRect.height
      
      // CSS 변수 --size-20을 사용 (마진)
      // 실제 계산된 값을 가져오기 위해 임시 요소 사용
      const marginElement = document.createElement('div')
      marginElement.style.width = 'var(--size-20)'
      marginElement.style.position = 'absolute'
      marginElement.style.visibility = 'hidden'
      document.body.appendChild(marginElement)
      const marginNum = marginElement.offsetWidth || 20
      document.body.removeChild(marginElement)
      
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // 원본 클릭 좌표를 기준으로 우측 하단에 팝업이 나타나도록
      let left = clickPositionRef.current.x
      let top = clickPositionRef.current.y

      // 화면을 벗어나면 마진을 주고 안으로 들어오게
      if (left + popupWidth + marginNum > viewportWidth) {
        left = viewportWidth - popupWidth - marginNum
      }
      if (left < marginNum) {
        left = marginNum
      }

      if (top + popupHeight + marginNum > viewportHeight) {
        top = viewportHeight - popupHeight - marginNum
      }
      if (top < marginNum) {
        top = marginNum
      }

      setPopupState((prev) => ({ ...prev, x: left, y: top }))
    }

    // 초기 위치 설정을 위해 약간의 지연 (CSS 변수 적용 및 레이아웃 완료 대기)
    const timeoutId = setTimeout(updatePosition, 0)
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(updatePosition)
    })
    
    // ResizeObserver로 팝업 크기 변경 감지 (CSS 변수 변경, 뷰포트 리사이즈 모두 포함)
    const resizeObserver = new ResizeObserver(() => {
      updatePosition()
    })
    resizeObserver.observe(popupRef.current)

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        hidePopup()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hidePopup()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [visible, hidePopup])

  if (typeof window === 'undefined') {
    // children만 렌더링 (SSR)
    if (isValidElement(children)) {
      const child = children as ReactElement<HTMLAttributes<HTMLElement>>
      const existingClassName = (child.props as HTMLAttributes<HTMLElement>)?.className || ''
      const existingStyle = (child.props as HTMLAttributes<HTMLElement>)?.style || {}
      
      return cloneElement(child, {
        className: className ? `${existingClassName} ${className}`.trim() : existingClassName,
        style: { ...existingStyle, ...(style || {}) },
      } as HTMLAttributes<HTMLElement>)
    }
    return <>{children}</>
  }

  const popupElement = visible ? (
    <>
      <div className='C062' onClick={hidePopup} />
      <div
        ref={popupRef}
        className='C063'
        style={{
          top: `${popupState.y}px`,
          left: `${popupState.x}px`,
          // width/height는 CSS 클래스에서 관리하거나, prop으로 전달되면 덮어씀
          ...(width && width > 0 && { width: `var(--size-${width})` }),
          ...(height && height > 0 && { height: `var(--size-${height})` }),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {popupContent}
      </div>
    </>
  ) : null

  // children이 React 요소인 경우 직접 이벤트 핸들러를 추가
  if (isValidElement(children)) {
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>
    const existingClassName = (child.props as HTMLAttributes<HTMLElement>)?.className || ''
    const existingStyle = (child.props as HTMLAttributes<HTMLElement>)?.style || {}
    const existingOnClick = (child.props as HTMLAttributes<HTMLElement>)?.onClick
    
    return (
      <>
        {cloneElement(child, {
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            // Controlled mode에서는 기존 onClick을 먼저 실행 (팝업 열기 상태 업데이트)
            if (isControlled && existingOnClick) {
              existingOnClick(e as React.MouseEvent<HTMLElement>)
              movePopup(e)
            } else {
              movePopup(e)
              if (existingOnClick) {
                existingOnClick(e as React.MouseEvent<HTMLElement>)
              }
            }
          },
          className: className ? `${existingClassName} ${className}`.trim() : existingClassName,
          style: { ...existingStyle, ...(style || {}) },
        } as HTMLAttributes<HTMLElement>)}
        {popupElement && createPortal(popupElement, document.body)}
      </>
    )
  }

  // children이 요소가 아닌 경우 wrapper div 사용
  return (
    <>
      <div 
        className={className}
        style={style}
        onClick={movePopup}
      >
        {children}
      </div>
      {popupContent && createPortal(popupContent, document.body)}
    </>
  )
}

