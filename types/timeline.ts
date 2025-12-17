/**
 * Timeline 관련 타입 정의
 * 
 * 참고: 
 * - DB 타입은 @/types/api 참조
 * - 이 타입들은 프론트엔드 UI에서 사용하는 타입
 */

import { VisitLogItem, PackageItem, FutureScheduleItem } from '@/types/api'

export type TimelineViewMode = 'date' | 'package'

/**
 * 타임라인 날짜 항목 (프론트엔드용)
 * VisitLogItem과 호환되도록 설계됨
 */
export interface TimelineDateItem {
  id: string // 날짜 ID (예: '2025-12-15' 또는 '' for 향후일정)
  label: string
  date?: string // 표시용 날짜 (예: '12.15')
  dayOfWeek?: string // 요일 (예: '(월)')
  hospital?: string // 병원명
  period?: string // 기수 정보 (예: '2기')
}

/**
 * 타임라인 패키지 항목 (프론트엔드용)
 * PackageItem과 호환되도록 설계됨
 */
export interface TimelinePackageItem {
  id: string // 패키지 ID (예: 'package-3')
  period: string // 기수 (예: '3기')
  startDate: string // 시작일
  endDate?: string // 종료일
  status?: 'ongoing' | 'completed' // 진행중 | 완료
  hospital?: string // 병원명
  duration?: number // 경과/기간 일수
}

/**
 * VisitLogItem을 TimelineDateItem으로 변환하는 헬퍼 타입
 * API에서 받은 데이터를 UI 타입으로 변환할 때 사용
 */
export type VisitLogToTimelineDate = (item: VisitLogItem) => TimelineDateItem

/**
 * PackageItem을 TimelinePackageItem으로 변환하는 헬퍼 타입
 */
export type PackageToTimelinePackage = (item: PackageItem) => TimelinePackageItem

export interface TimelineContentItem {
  type: 'future-schedule' | 'date-header' | 'log-entry'
  date?: string
  packageId?: string
  content?: React.ReactNode
}

export interface TimelineScrollSyncConfig {
  viewMode: TimelineViewMode
  title: string
  hideFutureSchedule: boolean
  onDateSelect: (dateId: string) => void
  onPackageSelect: (packageId: string) => void
}
