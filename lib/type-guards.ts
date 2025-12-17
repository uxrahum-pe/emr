/**
 * 타입 가드 함수들
 * 런타임에서 API 응답이나 DB 데이터의 타입을 검증
 */

import { 
  VisitLogRaw, 
  PackageRaw, 
  FutureScheduleRaw, 
  VisitLogEntryRaw,
  ApiResponse 
} from '@/types/api'

/**
 * API 응답이 성공인지 확인
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true && response.data !== undefined
}

/**
 * API 응답이 에러인지 확인
 */
export function isErrorResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: false; error: NonNullable<ApiResponse<T>['error']> } {
  return response.success === false || response.error !== undefined
}

/**
 * VisitLogRaw 타입 가드
 */
export function isVisitLogRaw(value: unknown): value is VisitLogRaw {
  if (typeof value !== 'object' || value === null) return false
  
  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'string' &&
    (obj.visitDate instanceof Date || typeof obj.visitDate === 'string') &&
    typeof obj.patientId === 'string'
  )
}

/**
 * PackageRaw 타입 가드
 */
export function isPackageRaw(value: unknown): value is PackageRaw {
  if (typeof value !== 'object' || value === null) return false
  
  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'string' &&
    typeof obj.patientId === 'string' &&
    typeof obj.period === 'number' &&
    (obj.startDate instanceof Date || typeof obj.startDate === 'string')
  )
}

/**
 * FutureScheduleRaw 타입 가드
 */
export function isFutureScheduleRaw(value: unknown): value is FutureScheduleRaw {
  if (typeof value !== 'object' || value === null) return false
  
  const obj = value as Record<string, unknown>
  return (
    typeof obj.id === 'string' &&
    typeof obj.patientId === 'string' &&
    (obj.scheduledDate instanceof Date || typeof obj.scheduledDate === 'string') &&
    typeof obj.scheduleType === 'string' &&
    typeof obj.description === 'string'
  )
}

/**
 * 배열이 특정 타입의 배열인지 확인하는 헬퍼
 */
export function isArrayOf<T>(
  arr: unknown,
  typeGuard: (value: unknown) => value is T
): arr is T[] {
  return Array.isArray(arr) && arr.every(typeGuard)
}
