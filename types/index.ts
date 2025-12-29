/**
 * 타입 중앙 Export 파일
 *
 * @description 모든 타입을 한 곳에서 import할 수 있도록 중앙화합니다.
 * AI가 타입을 파악할 때 이 파일 하나만 참조하면 됩니다.
 *
 * @example
 * // 개별 import 대신
 * import type { PageHeaderProps } from '@/types/ui'
 * import type { AsideProps } from '@/types/layout'
 *
 * // 중앙 import 사용
 * import type { PageHeaderProps, AsideProps } from '@/types'
 */

// ============================================
// UI 컴포넌트 타입
// ============================================
export type {
  TipState,
  TooltipBaseProps,
  TooltipWithOffsetProps,
  TooltipProps,
  ToggleSwitchControlledProps,
  ToggleSwitchControlledWithStyleProps,
  ToggleSwitchUncontrolledProps,
  ToggleSwitchUncontrolledWithStyleProps,
  ToggleSwitchProps,
  PageHeaderProps,
  ScrollableContainerProps,
  ListItemProps,
  DraggableScrollContainerProps,
  SlidePageProps,
  PopupProps,
  PopupSectionBoxProps,
  TabItem,
  TabSelectorProps,
} from "./ui";

// ============================================
// 레이아웃 타입
// ============================================
export type {
  SimplePageLayoutProps,
  AsideProps,
  AsideInnerProps,
  AsideSlidePageProps,
  PagePath,
  PagePathFlags,
  AsidePage,
} from "./layout";

export { PRE_WRAPPED_SLIDE_PAGE_IDS } from "./layout";

// ============================================
// API 응답 타입
// ============================================
export type {
  ApiResponse,
  ApiError,
  PaginationInfo,
  PaginatedResponse,
  // 방문일지 관련
  VisitLogRaw,
  VisitLogEntryRaw,
  FutureScheduleRaw,
  PackageRaw,
  VisitLogItem,
  VisitLogEntry,
  FutureScheduleItem,
  PackageItem,
  // API 응답
  GetVisitLogsResponse,
  GetVisitLogDetailResponse,
  GetPackagesResponse,
  GetFutureSchedulesResponse,
  // 이벤트 로깅
  UserEventBatchRaw,
  SaveEventsRequest,
  SaveEventsResponse,
  // 유틸리티
  ToFrontendType,
} from "./api";

// ============================================
// Reception 페이지 타입
// ============================================
export type {
  CustomerClickHandler,
  EmployeeClickHandler,
  MainContentProps,
  HandlerReadyCallback,
  NoteClickHandlerProps,
  AlarmClickHandlerProps,
  CustomerStatusSectionProps,
  RoleCategory,
  RoleInfo,
} from "./reception";

// ============================================
// Slide 컴포넌트 타입
// ============================================
export type {
  BaseSlideProps,
  MyNotesSlideProps,
  MyAlarmsSlideProps,
  CustomerReferenceSlideProps,
  DoctorSlidePageProps,
  EmployeeSlidePageProps,
  CounselorSlidePageProps,
} from "./slides";

// ============================================
// Popup 컴포넌트 타입
// ============================================
export type {
  BasePopupProps,
  PopupHeaderProps,
  // 상태 팝업
  CustomerStatusPopupProps,
  ForeignerStatusPopupProps,
  AgreementStatusPopupProps,
  PracticeIndexStatusPopupProps,
  AgencyStatusPopupProps,
  RecordingFilePopupProps,
  // 기능 팝업
  MenuSearchPopupProps,
  ReservationServicePopupProps,
  PartReferencePopupProps,
  StatusManagementPopupProps,
  PrescriptionPopupProps,
  PaymentPopupProps,
  MovePartPopupProps,
  DailyProcedurePopupProps,
  CheckOutPopupProps,
  CheckInPopupProps,
  AppointmentPopupProps,
} from "./popups";

// ============================================
// Timeline 타입
// ============================================
export type {
  TimelineViewMode,
  TimelineDateItem,
  TimelinePackageItem,
  VisitLogToTimelineDate,
  PackageToTimelinePackage,
  TimelineContentItem,
  TimelineScrollSyncConfig,
} from "./timeline";

// ============================================
// Package 타입
// ============================================
export type {
  PackageBody,
  PackageHeader,
  PackageItemStats,
  PackageItemPayment,
  PackageItemData,
} from "./package";

// ============================================
// Database 타입
// ============================================
export type { TypeGuard } from "./database";

// ============================================
// 공통 유틸리티 타입
// ============================================

/** children만 받는 컴포넌트 Props */
export interface ChildrenOnlyProps {
  children: React.ReactNode;
}

/** className을 옵션으로 받는 Props */
export interface WithClassName {
  className?: string;
}

/** style을 옵션으로 받는 Props */
export interface WithStyle {
  style?: React.CSSProperties;
}

/** 기본 컴포넌트 Props (className + style) */
export interface BaseComponentProps extends WithClassName, WithStyle {}

/** 클릭 핸들러를 받는 Props */
export interface WithOnClick {
  onClick?: (e: React.MouseEvent) => void;
}

/** ID를 필수로 받는 Props */
export interface WithId {
  id: string;
}

/** 비활성화 상태를 받는 Props */
export interface WithDisabled {
  disabled?: boolean;
}

/** 로딩 상태를 받는 Props */
export interface WithLoading {
  loading?: boolean;
}

/** 에러 상태를 받는 Props */
export interface WithError {
  error?: string | null;
}

// ============================================
// 타입 조합 헬퍼
// ============================================

/** 여러 Props를 조합하는 유틸리티 타입 */
export type CombineProps<T extends object[]> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends object
    ? Rest extends object[]
      ? First & CombineProps<Rest>
      : First
    : never
  : object;

/** Optional로 만드는 유틸리티 타입 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Required로 만드는 유틸리티 타입 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
