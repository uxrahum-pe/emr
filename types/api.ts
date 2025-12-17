/**
 * API 응답 타입 정의
 * DB 스키마와 프론트엔드 간의 타입 매핑을 명확히 하기 위한 타입 정의
 */

// ============================================
// 공통 타입
// ============================================

/** API 응답 기본 구조 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

/** API 에러 구조 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/** 페이지네이션 정보 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** 페이지네이션된 응답 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

// ============================================
// 방문일지 관련 타입 (DB 스키마 기반)
// ============================================

/** DB에서 가져온 방문일지 항목 (원시 데이터) */
export interface VisitLogRaw {
  id: string;
  visitDate: Date | string; // ISO string 또는 Date
  patientId: string;
  hospitalId?: string;
  hospitalName?: string;
  period?: string; // 기수 정보
  createdAt: Date | string;
  updatedAt: Date | string;
  // 추가 필드들...
}

/** 방문일지 로그 엔트리 (DB) */
export interface VisitLogEntryRaw {
  id: string;
  visitLogId: string;
  entryTime: Date | string;
  staffId: string;
  staffName: string;
  staffRole: string;
  content: string;
  status: "completed" | "pending" | "cancelled";
  createdAt: Date | string;
}

/** 향후일정 항목 (DB) */
export interface FutureScheduleRaw {
  id: string;
  patientId: string;
  scheduledDate: Date | string;
  scheduleType: "drug" | "camera" | "package" | "counseling" | "syringe";
  description: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: Date | string;
}

/** 패키지 정보 (DB) */
export interface PackageRaw {
  id: string;
  patientId: string;
  period: number; // 기수 (1, 2, 3...)
  startDate: Date | string;
  endDate?: Date | string;
  status: "ongoing" | "completed";
  hospitalId?: string;
  hospitalName?: string;
  duration?: number; // 일수
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ============================================
// 프론트엔드용 변환된 타입
// ============================================

/** 프론트엔드에서 사용하는 방문일지 항목 (변환된 형태) */
export interface VisitLogItem {
  id: string;
  visitDate: string; // YYYY-MM-DD 형식
  displayDate: string; // "12.15" 형식
  dayOfWeek: string; // "(월)" 형식
  hospital?: string;
  period?: string; // "2기" 형식
  entries?: VisitLogEntry[];
}

/** 방문일지 로그 엔트리 (프론트엔드) */
export interface VisitLogEntry {
  id: string;
  time: string; // "AM 11:15" 형식
  staffName: string;
  staffRole: string;
  content: string;
  status: "completed" | "pending" | "cancelled";
}

/** 향후일정 항목 (프론트엔드) */
export interface FutureScheduleItem {
  id: string;
  scheduledDate: string; // "2025.12.15" 형식
  scheduleType: "drug" | "camera" | "package" | "counseling" | "syringe";
  description: string;
  status: "scheduled" | "completed" | "cancelled";
  icon?: string; // CSS 클래스명
}

/** 패키지 정보 (프론트엔드) */
export interface PackageItem {
  id: string;
  period: string; // "3기" 형식
  startDate: string; // "2025." 형식
  endDate?: string; // "2025." 형식
  status: "ongoing" | "completed";
  hospital?: string;
  duration?: number;
  displayStatus?: string; // "진행중" 등
}

// ============================================
// API 엔드포인트별 응답 타입
// ============================================

/** 방문일지 목록 조회 응답 */
export interface GetVisitLogsResponse
  extends ApiResponse<PaginatedResponse<VisitLogRaw>> {}

/** 방문일지 상세 조회 응답 */
export interface GetVisitLogDetailResponse
  extends ApiResponse<{
    visitLog: VisitLogRaw;
    entries: VisitLogEntryRaw[];
    futureSchedules?: FutureScheduleRaw[];
  }> {}

/** 패키지 목록 조회 응답 */
export interface GetPackagesResponse extends ApiResponse<PackageRaw[]> {}

/** 향후일정 목록 조회 응답 */
export interface GetFutureSchedulesResponse
  extends ApiResponse<FutureScheduleRaw[]> {}

// ============================================
// 사용자 이벤트 로깅 관련 타입
// ============================================

/** 사용자 이벤트 배치 (DB) */
export interface UserEventBatchRaw {
  id: string;
  sessionId: string;
  userId: string | null;
  pagePath: string;
  events: Array<{
    type: string;
    data: Record<string, unknown>;
    timestamp: string;
  }>;
  eventCount: number;
  createdAt: Date | string;
}

/** 이벤트 저장 요청 */
export interface SaveEventsRequest {
  sessionId: string;
  userId?: string | null;
  pagePath: string;
  events: Array<{
    type: string;
    data: Record<string, unknown>;
    timestamp: string;
  }>;
  eventCount?: number;
}

/** 이벤트 저장 응답 */
export interface SaveEventsResponse extends ApiResponse<{ success: boolean }> {}

// ============================================
// 타입 변환 유틸리티 타입
// ============================================

/** DB Raw 타입을 프론트엔드 타입으로 변환하는 헬퍼 타입 */
export type ToFrontendType<T> = T extends VisitLogRaw
  ? VisitLogItem
  : T extends PackageRaw
  ? PackageItem
  : T extends FutureScheduleRaw
  ? FutureScheduleItem
  : T extends VisitLogEntryRaw
  ? VisitLogEntry
  : T;
