/**
 * CustomerStatus 컴포넌트 공용 타입 정의
 *
 * @description 고객 현황 섹션(C021)에서 사용되는 모든 타입을 정의합니다.
 * 원무, 상담, 수술 등 모든 파트에서 공통으로 사용됩니다.
 */

import { ReactNode } from "react";

// ============================================
// 파트 타입
// ============================================

/** 파트 ID */
export type PartId =
  | "reception" // 원무
  | "counseling" // 상담
  | "preCare" // 전처치
  | "clinic" // 진료
  | "surgery" // 수술
  | "procedure" // 시술
  | "postCare"; // 후관리

/** 파트 정보 */
export interface PartInfo {
  id: PartId;
  name: string; // 한글 이름 (예: "원무")
  iconClass: string; // CSS 아이콘 클래스 (예: "isReception")
}

// ============================================
// 고객 상태 타입
// ============================================

/** 고객 상태 카테고리 ID */
export type CustomerStatusId =
  | "reservation" // 예약
  | "pending" // 대기
  | "inProgress" // 진행중
  | "completed" // 완료
  | "holding" // 보류
  | "cancelled"; // 취소

/** 블록 CSS 클래스 ID (실제 렌더링용) */
export type BlockClassId =
  | "isReservation"
  | "isPending"
  | "isClinic"
  | "isPayment"
  | "isInProgress"
  | "isCompleted";

/** 고객 상태 정보 */
export interface CustomerStatus {
  id: CustomerStatusId;
  name: string; // 한글 이름 (예: "예약")
  iconClass: string; // CSS 아이콘 클래스
  colorClass?: string; // 색상 클래스 (예: "isRed")
}

// ============================================
// 고객 데이터 타입
// ============================================

/** 성별 */
export type Gender = "male" | "female";

/** 고객 기본 정보 */
export interface CustomerInfo {
  id: string; // 고객 ID
  name: string; // 고객 이름
  gender: Gender; // 성별
  age: number; // 나이
  visitCount: number; // 기수 (1기, 2기...)
  chartNumber?: string; // 차트 번호
}

/** 담당 직원 정보 */
export interface AssignedEmployee {
  id: string;
  name: string;
  role: string; // 직책 (상담사, 원장 등)
}

/** 고객 현황 카드 데이터 */
export interface CustomerCardData {
  customer: CustomerInfo;
  status: CustomerStatusId;
  scheduledTime?: string; // 예정 시간 (예: "AM 10:30")
  scheduledAction?: string; // 예정/이관/접수/시작 등
  serviceType?: string; // 서비스 유형 (예: "시술 신환 상담")
  serviceTypeColor?: string; // 서비스 유형 색상 클래스
  assignedEmployee?: AssignedEmployee; // 담당 직원
  fromPart?: string; // 이관 출발 파트 (예: "진료파트")
  delayMinutes?: number; // 지연 시간 (분)
  delayColor?: string; // 지연 색상 클래스 (isRed, isYellow, isGreen)
  delayText?: string; // 지연 텍스트 (예: "31분 지연.", "5분 후 도착 예정.")
  waitingMinutes?: number; // 대기 시간 (분)
  waitingColor?: string; // 대기 색상 클래스
  totalWaitingMinutes?: number; // 총 대기 시간 (분)
  totalWaitingColor?: string; // 총 대기 색상 클래스
  notes?: string; // 참고사항
  tags?: CustomerTag[]; // 태그들
  isForeigner?: boolean; // 외국인 여부
  nationality?: string; // 국적
  language?: string; // 사용 언어
  interpreter?: string; // 통역사
  timeline?: TimelineItem[]; // 타임라인 (C041)
  // 수납 관련
  paymentAmount?: number; // 수납 금액
  discountAmount?: number; // 할인 금액
  contractTotal?: number; // 계약금 총액
  depositAmount?: number; // 예약금
  contractDiscount?: number; // 계약 할인
  paymentCategory?: string; // 수납구분
  // 진료 관련
  procedureName?: string; // 시술명
  elapsedTime?: string; // 경과 시간
  estimatedTime?: string; // 예상 시간
  orderNumber?: number; // 순번
  vitalCompleted?: boolean; // Vital 입력 완료 여부
}

/** 고객 태그 */
export interface CustomerTag {
  label: string;
  type?: "default" | "warning" | "info" | "success";
}

/** 타임라인 아이템 (C042) */
export interface TimelineItem {
  iconClass: string; // isRibbon, isSyringe, isPaperPlane 등
  time: string; // "AM 10:22"
  description: string; // "상태 변경 시술시작."
  statusIconClass?: string; // isChecked, isMyLocation 등
}

// ============================================
// 상태 블록 타입 (C031)
// ============================================

/** 상태 블록 탭 아이템 */
export interface StatusBlockTab {
  title: string;
  value?: string;
}

/** 상태 블록 설정 */
export interface StatusBlockConfig {
  id: CustomerStatusId;
  cssClass: BlockClassId; // CSS 클래스 (isReservation, isClinic 등)
  title: string; // 블록 제목 (예: "예약")
  iconClass: string; // 아이콘 클래스 (예: "isAlarmClock")
  tabs?: StatusBlockTab[]; // 필터 탭들
  showPinButton?: boolean; // 고정 버튼 표시 여부
  multipleTabs?: boolean; // 다중 탭 선택 가능 여부
}

/** 상태 블록 통계 */
export interface StatusBlockStats {
  waiting?: number; // 대기 수
  delayed?: number; // 지연 수
  inProgress?: number; // 진행중 수
  completed?: number; // 완료 수
  total?: number; // 전체 수
}

// ============================================
// 파트별 설정 타입
// ============================================

/** 파트별 상태 블록 배열 설정 */
export interface PartStatusBlocksConfig {
  partId: PartId;
  blocks: StatusBlockConfig[];
}

/** 파트별 헤더 설정 */
export interface PartHeaderConfig {
  partId: PartId;
  title: string; // 헤더 타이틀 (예: "고객 현황")
  showSearch?: boolean; // 고객 통합 검색 표시
  showSurveySearch?: boolean; // 설문지 & 바코드 검색 표시
  showDirectRegister?: boolean; // 고객 직접 등록 표시
  extraButtons?: HeaderButton[]; // 추가 버튼들
}

/** 헤더 버튼 */
export interface HeaderButton {
  id: string;
  label: string;
  iconClass?: string;
  onClick?: () => void;
}

// ============================================
// C152 접수 버튼 타입
// ============================================

/** 접수 버튼 ID */
export type CheckInButtonId =
  | "checkIn" // 접수하기
  | "movePart" // 파트이동
  | "status" // 상태관리
  | "appointment" // 상담예약
  | "dailyProcedure" // 일일시술&처방
  | "prescription" // 처방전
  | "payment" // 수납등록
  | "checkOut"; // 귀가처리

/** 고객 상태별 허용 버튼 매핑 */
export interface StatusButtonMapping {
  statusId: CustomerStatusId;
  allowedButtons: CheckInButtonId[];
}

/** C152 Props */
export interface CustomerCheckInPanelProps {
  isOpen: boolean;
  isFolded?: boolean;
  customerStatus?: CustomerStatusId;
  allowedButtonIds?: CheckInButtonId[];
}

// ============================================
// 컴포넌트 Props 타입
// ============================================

/** CustomerCard Props */
export interface CustomerCardProps {
  data: CustomerCardData;
  onClick?: (customer: CustomerInfo) => void;
  onEmployeeClick?: (employee: AssignedEmployee, e: React.MouseEvent) => void;
  isCompact?: boolean; // 작은 화면 모드
  scrollToEnd?: boolean; // 타임라인 끝으로 스크롤
}

/** CustomerStatusBlock Props */
export interface CustomerStatusBlockProps {
  config: StatusBlockConfig;
  stats: StatusBlockStats;
  customers: CustomerCardData[];
  isActive?: boolean;
  isFolded?: boolean;
  isSmallScreen?: boolean;
  selectedTabs?: number[];
  onTabChange?: (tabs: number[]) => void;
  onHeaderClick?: (e: React.MouseEvent) => void;
  onCustomerClick?: (customer: CustomerInfo) => void;
  onEmployeeClick?: (employee: AssignedEmployee, e: React.MouseEvent) => void;
}

/** CustomerStatusHeader Props */
export interface CustomerStatusHeaderProps {
  config: PartHeaderConfig;
  isSmallScreen: boolean;
  onScreenSizeChange: (isSmall: boolean) => void;
  onSearchClick?: () => void;
  onSurveySearchClick?: () => void;
  onDirectRegisterClick?: () => void;
}

/** CustomerStatusSection Props (리팩토링 후) */
export interface CustomerStatusSectionNewProps {
  partId: PartId;
  onCustomerClick?: (customer: CustomerInfo) => void;
  onEmployeeClick?: (employee: AssignedEmployee, e: React.MouseEvent) => void;
}
