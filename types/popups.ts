/**
 * Popup 컴포넌트 관련 타입 정의
 *
 * @description 모든 팝업 컴포넌트의 Props 인터페이스를 중앙화하여 관리합니다.
 * AI가 코드를 이해할 때 이 파일을 참조하면 팝업 구조를 빠르게 파악할 수 있습니다.
 */

/**
 * 기본 팝업 Props (isOpen, onClose)
 */
export interface BasePopupProps {
  /** 팝업 열림 상태 */
  isOpen: boolean;
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

// ============================================
// 상태 팝업 Props (Sidebar C194 메뉴)
// ============================================

/**
 * 고객 현황 팝업 Props
 */
export interface CustomerStatusPopupProps extends BasePopupProps {}

/**
 * 외국인 현황 팝업 Props
 */
export interface ForeignerStatusPopupProps extends BasePopupProps {}

/**
 * 동의서 현황 팝업 Props
 */
export interface AgreementStatusPopupProps extends BasePopupProps {}

/**
 * 실천지수 현황 팝업 Props
 */
export interface PracticeIndexStatusPopupProps extends BasePopupProps {}

/**
 * 대행사 현황 팝업 Props
 */
export interface AgencyStatusPopupProps extends BasePopupProps {}

/**
 * 녹취파일 관리 팝업 Props
 */
export interface RecordingFilePopupProps extends BasePopupProps {}

// ============================================
// 기능 팝업 Props
// ============================================

/**
 * 메뉴 및 기능 검색 팝업 Props
 */
export interface MenuSearchPopupProps extends BasePopupProps {}

/**
 * 통합 예약 서비스 팝업 Props
 */
export interface ReservationServicePopupProps extends BasePopupProps {}

/**
 * 파트 참조사항 팝업 Props
 */
export interface PartReferencePopupProps extends BasePopupProps {}

/**
 * 상태 관리 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface StatusManagementPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 처방전 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface PrescriptionPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 수납등록 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface PaymentPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 파트이동 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface MovePartPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 일일 시술 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface DailyProcedurePopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 귀가처리 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface CheckOutPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 접수하기 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface CheckInPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

/**
 * 상담예약 팝업 Props
 * @deprecated onClose만 있는 구버전 (isOpen 없음)
 */
export interface AppointmentPopupProps {
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
}

