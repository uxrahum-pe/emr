/**
 * Slide 컴포넌트 관련 타입 정의
 *
 * @description 모든 슬라이드 컴포넌트의 Props 인터페이스를 중앙화하여 관리합니다.
 * AI가 코드를 이해할 때 이 파일을 참조하면 슬라이드 구조를 빠르게 파악할 수 있습니다.
 */

/**
 * 기본 슬라이드 Props (Aside에서 전달되는 공통 props)
 */
export interface BaseSlideProps {
  /** 뒤로 가기 핸들러 (Aside에서 전달) */
  onGoBack?: () => void;
  /** 뒤로 가기 버튼 표시 여부 (Aside에서 전달) */
  showBackButton?: boolean;
  /** Transform 스타일 (Aside에서 전달) */
  transform?: string;
  /** Z-index (Aside에서 전달) */
  zIndex?: number;
}

/**
 * 내 쪽지 보기 Slide Props
 */
export interface MyNotesSlideProps extends BaseSlideProps {}

/**
 * 내 알림 보기 Slide Props
 */
export interface MyAlarmsSlideProps extends BaseSlideProps {}

/**
 * 고객 참조사항 Slide Props
 */
export interface CustomerReferenceSlideProps extends BaseSlideProps {
  /** 고객 이름 */
  customerName: string;
  /** 고객 ID */
  customerId: string;
}

/**
 * 원장 일정 Slide Props
 */
export interface DoctorSlidePageProps extends BaseSlideProps {
  /** 원장 이름 */
  doctorName?: string;
  /** 원장 ID */
  doctorId?: string;
}

/**
 * 직원 일정 Slide Props
 */
export interface EmployeeSlidePageProps extends BaseSlideProps {
  /** 직원 이름 */
  employeeName?: string;
  /** 직원 ID */
  employeeId?: string;
  /** 직원 역할 */
  employeeRole?: string;
}

/**
 * 상담사 일정 Slide Props
 */
export interface CounselorSlidePageProps extends BaseSlideProps {
  /** 상담사 이름 */
  counselorName?: string;
  /** 상담사 ID */
  counselorId?: string;
}

