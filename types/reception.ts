/**
 * Reception Page 관련 타입 정의
 *
 * @description 원무 페이지에서 사용되는 모든 타입을 중앙화하여 관리합니다.
 * AI가 코드를 이해할 때 이 파일을 참조하면 전체 구조를 빠르게 파악할 수 있습니다.
 */

/**
 * 고객 클릭 핸들러 타입
 */
export interface CustomerClickHandler {
  (customerName: string, customerId: string): void;
}

/**
 * 직원 클릭 핸들러 타입
 */
export interface EmployeeClickHandler {
  (
    employeeName: string,
    employeeId: string,
    role: string,
    e: React.MouseEvent
  ): void;
}

/**
 * MainContent 컴포넌트 Props
 */
export interface MainContentProps {
  onCustomerClick?: CustomerClickHandler;
}

/**
 * Note/Alarm 핸들러 준비 콜백 타입
 */
export type HandlerReadyCallback = (handler: () => void) => void;

/**
 * NoteClickHandler 컴포넌트 Props
 */
export interface NoteClickHandlerProps {
  onHandlerReady: HandlerReadyCallback;
}

/**
 * AlarmClickHandler 컴포넌트 Props
 */
export interface AlarmClickHandlerProps {
  onHandlerReady: HandlerReadyCallback;
}

/**
 * CustomerStatusSection 컴포넌트 Props
 */
export interface CustomerStatusSectionProps {
  handleC032Click: (index: number, e: React.MouseEvent) => void;
  isSmallScreen: boolean;
  setIsSmallScreen: (value: boolean) => void;
  activeIndex: number | null;
  selectedTabs: number[];
  setSelectedTabs: (tabs: number[]) => void;
  selectedPendingTabs: number[];
  setSelectedPendingTabs: (tabs: number[]) => void;
  selectedSortTab: number;
  setSelectedSortTab: (tab: number) => void;
  isQuickActionsHovered: boolean;
  setIsQuickActionsHovered: (value: boolean) => void;
  isCustomerDetailOpen: boolean;
  setIsCustomerDetailOpen: (value: boolean) => void;
}

/**
 * 역할 카테고리 타입
 * @description 직원 역할에 따른 페이지 카테고리를 정의합니다.
 */
export type RoleCategory =
  | "employee"
  | "counselor"
  | "doctor"
  | "manager"
  | "assistant"
  | "team-leader"
  | "clerk";

/**
 * 역할 정보 타입
 */
export interface RoleInfo {
  category: RoleCategory;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}
