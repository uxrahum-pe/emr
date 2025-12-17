'use client'

import { ReactNode } from 'react'
import ScrollableContainer, { ScrollableContainerRef } from '@/components/ScrollableContainer'
import { TimelineViewMode } from '@/types/timeline'

interface TimelineContentProps {
  contentRef: React.RefObject<ScrollableContainerRef | null>
  viewMode: TimelineViewMode
  title: string
  showFutureSchedule?: boolean
  children?: ReactNode
}

/**
 * 타임라인 컨텐츠 컴포넌트 (C107)
 * 내원일지 내용, 예약 내용 등을 표시
 */
export default function TimelineContent({
  contentRef,
  viewMode,
  title,
  showFutureSchedule = true,
  children
}: TimelineContentProps) {
  return (
    <ScrollableContainer ref={contentRef} className='C107'>
      {children}
    </ScrollableContainer>
  )
}
