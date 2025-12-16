'use client'

import { useState, useEffect } from 'react'
import CustomerInfoPanel from '@/components/CustomerInfoPanel'
import VisitLogPanel from '@/components/VisitLogPanel'
import QuickActionsPanel from '@/components/QuickActionsPanel'

interface CustomerDetailPanelProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * 고객 통합 정보 모달 패널 컴포넌트
 * ListItem 클릭 시 나타나고, 블러 영역 클릭 시 닫힘
 */
export default function CustomerDetailPanel({ isOpen, onClose }: CustomerDetailPanelProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  
  // Section states
  const [sectionStates, setSectionStates] = useState<Record<string, boolean>>({
    basic: true,
    foreign: false,
    package: false,
    visit: false,
    treatment: false,
    prescription: false,
    additional: false
  })
  
  // Section toggle handler
  const handleSectionToggle = (sectionKey: string) => {
    setSectionStates(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  useEffect(() => {
    if (isOpen) {
      // 컴포넌트가 나타나면 바로 렌더링
      setIsVisible(true)
      // 브라우저가 초기 렌더링을 완료한 후 isOpened 클래스 추가 (애니메이션을 위해)
      // 작은 지연을 주어 브라우저가 초기 상태를 인식한 후 애니메이션 트리거
      const timer = setTimeout(() => {
        setIsOpened(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      // 닫을 때: isOpened 제거 후 0.3초 뒤 컴포넌트 제거
      setIsOpened(false)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    // C097 영역이 아닌 블러 처리된 영역 클릭 시
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className={`C096 ${isOpened ? 'isOpened' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className='C097' onClick={(e) => e.stopPropagation()}>
        <CustomerInfoPanel 
          sectionStates={sectionStates}
          onSectionToggle={handleSectionToggle}
          onClose={onClose}
        />
        <VisitLogPanel />
        <QuickActionsPanel />
      </div>
    </div>
  )
}

