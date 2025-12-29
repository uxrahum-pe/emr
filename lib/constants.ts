/**
 * 프로젝트 전역 상수
 *
 * @description 프로젝트 전반에서 사용되는 상수를 중앙화하여 관리합니다.
 * 하드코딩된 값 대신 이 파일의 상수를 사용하세요.
 */

// ============================================
// 앱 설정
// ============================================

/** 앱 메타데이터 */
export const APP_CONFIG = {
  name: "EMR",
  fullName: "전자의무기록 관리 시스템",
  version: "1.0.0",
} as const;

/** 반응형 브레이크포인트 (px) */
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  ultraWide: 1920,
} as const;

// ============================================
// 애니메이션
// ============================================

/** 애니메이션 지속 시간 (ms) */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/** 슬라이드 애니메이션 설정 */
export const SLIDE_ANIMATION = {
  duration: 300,
  easing: "ease-in-out",
} as const;

// ============================================
// 페이지 라우트
// ============================================

/** 메인 페이지 경로 */
export const ROUTES = {
  dashboard: "/",
  reception: "/reception",
  counseling: "/counseling",
  preCare: "/pre-care",
  clinic: "/clinic",
  surgery: "/surgery",
  procedure: "/procedure",
  postCare: "/post-care",
  statistics: "/statistics",
  settings: "/settings",
} as const;

/** 사이드바 메뉴 아이템 */
export const SIDEBAR_MENU_ITEMS = [
  { href: "/", icon: "isDashboard", label: "대시보드" },
  { href: "/reception", icon: "isReception", label: "원무" },
  { href: "/counseling", icon: "isCounseling", label: "상담" },
  { href: "/pre-care", icon: "isPreCare", label: "전처치" },
  { href: "/clinic", icon: "isProcedure", label: "진료" },
  { href: "/surgery", icon: "isSurgery", label: "수술" },
  { href: "/procedure", icon: "isClinic", label: "시술" },
  { href: "/post-care", icon: "isPostCare", label: "후관리" },
  { href: "/statistics", icon: "isStatistics", label: "통계" },
] as const;

// ============================================
// 슬라이드 페이지 ID
// ============================================

/** 슬라이드 페이지 ID */
export const SLIDE_PAGE_IDS = {
  main: "main",
  myNotes: "my-notes",
  myAlarms: "my-alarms",
  customer: "customer",
  doctor: "doctor",
  counselor: "counselor",
  employee: "employee",
  manager: "manager",
  assistant: "assistant",
  teamLeader: "team-leader",
  clerk: "clerk",
} as const;

/** 미리 래핑된 슬라이드 페이지 ID 목록 */
export const PRE_WRAPPED_SLIDE_PAGE_IDS = [
  "my-alarms",
  "my-notes",
  "customer",
  "doctor",
  "counselor",
  "employee",
  "manager",
  "assistant",
  "team-leader",
  "clerk",
] as const;

// ============================================
// 사이드바 팝업
// ============================================

/** 사이드바 메뉴 팝업 타입 */
export const SIDEBAR_POPUP_TYPES = {
  customer: "customer",
  foreigner: "foreigner",
  agreement: "agreement",
  practiceIndex: "practiceIndex",
  agency: "agency",
  recordingFile: "recordingFile",
} as const;

export type SidebarPopupType = keyof typeof SIDEBAR_POPUP_TYPES | null;

// ============================================
// 직원 역할
// ============================================

/** 직원 역할 카테고리 */
export const ROLE_CATEGORIES = {
  employee: "employee",
  counselor: "counselor",
  doctor: "doctor",
  manager: "manager",
  assistant: "assistant",
  teamLeader: "team-leader",
  clerk: "clerk",
} as const;

/** 역할별 표시 이름 */
export const ROLE_LABELS: Record<string, string> = {
  employee: "직원",
  counselor: "상담사",
  doctor: "원장",
  manager: "매니저",
  assistant: "어시스턴트",
  "team-leader": "팀장",
  clerk: "서기",
} as const;

// ============================================
// 일정 타입
// ============================================

/** 향후 일정 타입 */
export const SCHEDULE_TYPES = {
  drug: "drug",
  camera: "camera",
  package: "package",
  counseling: "counseling",
  syringe: "syringe",
} as const;

/** 일정 타입별 표시 이름 */
export const SCHEDULE_TYPE_LABELS: Record<string, string> = {
  drug: "약물",
  camera: "촬영",
  package: "패키지",
  counseling: "상담",
  syringe: "주사",
} as const;

// ============================================
// 상태값
// ============================================

/** 방문 로그 상태 */
export const VISIT_LOG_STATUS = {
  completed: "completed",
  pending: "pending",
  cancelled: "cancelled",
} as const;

/** 패키지 상태 */
export const PACKAGE_STATUS = {
  ongoing: "ongoing",
  completed: "completed",
} as const;

/** 일정 상태 */
export const SCHEDULE_STATUS = {
  scheduled: "scheduled",
  completed: "completed",
  cancelled: "cancelled",
} as const;

// ============================================
// 탭/필터 기본값
// ============================================

/** 기본 선택 탭 */
export const DEFAULT_TABS = {
  selectedTabs: [0, 1, 2],
  selectedPendingTabs: [0, 1],
  selectedSortTab: 0,
} as const;

/** 정렬 순서 */
export const SORT_ORDER = {
  asc: "asc",
  desc: "desc",
} as const;

export type SortOrder = keyof typeof SORT_ORDER;

// ============================================
// API 설정
// ============================================

/** API 엔드포인트 */
export const API_ENDPOINTS = {
  graphql: "/api/graphql",
  events: "/api/events",
} as const;

/** API 캐시 설정 (ms) */
export const API_CACHE = {
  staleTime: 60 * 1000, // 1분
  gcTime: 5 * 60 * 1000, // 5분
  retryCount: 1,
} as const;

// ============================================
// 날짜 포맷
// ============================================

/** 날짜 포맷 문자열 */
export const DATE_FORMATS = {
  default: "yyyy-MM-dd",
  display: "yyyy.MM.dd",
  korean: "yyyy년 MM월 dd일",
  short: "MM.dd",
  dayOfWeek: "(E)",
  time: "HH:mm",
  dateTime: "yyyy-MM-dd HH:mm",
  amPm: "a h:mm",
} as const;

// ============================================
// UI 설정
// ============================================

/** 팝업 기본 설정 */
export const POPUP_DEFAULTS = {
  headerX: 260,
  headerY: 20,
  headerWidth: 1400,
} as const;

/** 스크롤 설정 */
export const SCROLL_CONFIG = {
  debounceMs: 150,
  threshold: 100,
} as const;

/** 이벤트 로거 설정 */
export const EVENT_LOGGER_CONFIG = {
  batchSize: 10,
  flushIntervalMs: 5000, // 5초
} as const;

// ============================================
// 타입 Export
// ============================================

export type RouteKey = keyof typeof ROUTES;
export type SlidePageId = keyof typeof SLIDE_PAGE_IDS;
export type RoleCategory = keyof typeof ROLE_CATEGORIES;
export type ScheduleType = keyof typeof SCHEDULE_TYPES;
export type VisitLogStatus = keyof typeof VISIT_LOG_STATUS;
export type PackageStatus = keyof typeof PACKAGE_STATUS;
export type ScheduleStatusType = keyof typeof SCHEDULE_STATUS;
