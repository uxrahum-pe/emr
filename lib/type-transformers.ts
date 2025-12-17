/**
 * DB Raw 타입을 프론트엔드 타입으로 변환하는 유틸리티 함수
 * 
 * 이 파일은 DB 스키마와 프론트엔드 타입 간의 변환 로직을 중앙화하여 관리
 */

import {
  VisitLogRaw,
  VisitLogItem,
  PackageRaw,
  PackageItem,
  FutureScheduleRaw,
  FutureScheduleItem,
  VisitLogEntryRaw,
  VisitLogEntry
} from '@/types/api'

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 */
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

/**
 * 날짜를 "MM.DD" 형식으로 변환
 */
function formatDisplayDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${month}.${day}`
}

/**
 * 요일을 반환 (예: "(월)")
 */
function getDayOfWeek(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `(${days[d.getDay()]})`
}

/**
 * 시간을 "AM/PM HH:MM" 형식으로 변환
 */
function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const hours = d.getHours()
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const period = hours < 12 ? 'AM' : 'PM'
  const displayHours = hours % 12 || 12
  return `${period} ${displayHours}:${minutes}`
}

/**
 * VisitLogRaw를 VisitLogItem으로 변환
 */
export function transformVisitLog(raw: VisitLogRaw): VisitLogItem {
  const visitDate = formatDate(raw.visitDate)
  
  return {
    id: raw.id,
    visitDate,
    displayDate: formatDisplayDate(raw.visitDate),
    dayOfWeek: getDayOfWeek(raw.visitDate),
    hospital: raw.hospitalName,
    period: raw.period
  }
}

/**
 * VisitLogEntryRaw를 VisitLogEntry로 변환
 */
export function transformVisitLogEntry(raw: VisitLogEntryRaw): VisitLogEntry {
  return {
    id: raw.id,
    time: formatTime(raw.entryTime),
    staffName: raw.staffName,
    staffRole: raw.staffRole,
    content: raw.content,
    status: raw.status
  }
}

/**
 * PackageRaw를 PackageItem으로 변환
 */
export function transformPackage(raw: PackageRaw): PackageItem {
  const startDate = typeof raw.startDate === 'string' 
    ? raw.startDate 
    : raw.startDate.toISOString().split('T')[0].split('-')[0] + '.'
  
  const endDate = raw.endDate 
    ? (typeof raw.endDate === 'string'
        ? raw.endDate
        : raw.endDate.toISOString().split('T')[0].split('-')[0] + '.')
    : undefined

  return {
    id: raw.id,
    period: `${raw.period}기`,
    startDate,
    endDate,
    status: raw.status,
    hospital: raw.hospitalName,
    duration: raw.duration,
    displayStatus: raw.status === 'ongoing' ? '진행중' : '완료'
  }
}

/**
 * FutureScheduleRaw를 FutureScheduleItem으로 변환
 */
export function transformFutureSchedule(raw: FutureScheduleRaw): FutureScheduleItem {
  const iconMap: Record<string, string> = {
    drug: 'isDrug',
    camera: 'isCamera',
    package: 'isPackage',
    counseling: 'isLeaf',
    syringe: 'isSyringe'
  }

  return {
    id: raw.id,
    scheduledDate: typeof raw.scheduledDate === 'string'
      ? raw.scheduledDate
      : raw.scheduledDate.toISOString().split('T')[0],
    scheduleType: raw.scheduleType,
    description: raw.description,
    status: raw.status,
    icon: iconMap[raw.scheduleType]
  }
}

/**
 * 배열 변환 헬퍼
 */
export const transformArray = {
  visitLogs: (raws: VisitLogRaw[]): VisitLogItem[] => raws.map(transformVisitLog),
  packages: (raws: PackageRaw[]): PackageItem[] => raws.map(transformPackage),
  futureSchedules: (raws: FutureScheduleRaw[]): FutureScheduleItem[] => raws.map(transformFutureSchedule),
  visitLogEntries: (raws: VisitLogEntryRaw[]): VisitLogEntry[] => raws.map(transformVisitLogEntry)
}
