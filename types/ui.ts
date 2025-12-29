import type { ReactNode } from "react";

export interface TipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

// Tooltip 기본 props (offset 없음)
export interface TooltipBaseProps {
  text: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Tooltip offset props (모두 제공)
export interface TooltipWithOffsetProps extends TooltipBaseProps {
  offsetX: number;
  offsetY: number;
}

// Tooltip props: offset이 모두 제공되거나 모두 제공되지 않음
export type TooltipProps = TooltipBaseProps | TooltipWithOffsetProps;

// 공통 필수 props
interface ToggleSwitchBaseProps {
  onLabel: string;
  offLabel: string;
  textSize?: "default" | "mini";
}

// 스타일 props (모두 제공)
interface ToggleSwitchStyleProps {
  width: string;
  height: string;
}

// 제어 컴포넌트 (Controlled Component) - 스타일 없음
export interface ToggleSwitchControlledProps extends ToggleSwitchBaseProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

// 제어 컴포넌트 (Controlled Component) - 스타일 있음
export interface ToggleSwitchControlledWithStyleProps
  extends ToggleSwitchControlledProps,
    ToggleSwitchStyleProps {}

// 비제어 컴포넌트 (Uncontrolled Component) - 스타일 없음
export interface ToggleSwitchUncontrolledProps extends ToggleSwitchBaseProps {
  defaultChecked: boolean;
  onChange: (value: boolean) => void;
}

// 비제어 컴포넌트 (Uncontrolled Component) - 스타일 있음
export interface ToggleSwitchUncontrolledWithStyleProps
  extends ToggleSwitchUncontrolledProps,
    ToggleSwitchStyleProps {}

// Union 타입으로 제어/비제어 컴포넌트 구분 (스타일 포함/미포함)
export type ToggleSwitchProps =
  | ToggleSwitchControlledProps
  | ToggleSwitchControlledWithStyleProps
  | ToggleSwitchUncontrolledProps
  | ToggleSwitchUncontrolledWithStyleProps;

// PageHeader 컴포넌트 props
export interface PageHeaderProps {
  title: string;
  onNoteClick?: () => void;
  isNoteSelected?: boolean;
  onAlarmClick?: () => void;
  isAlarmSelected?: boolean;
  onReservationClick?: () => void;
}

// ScrollableContainer 컴포넌트 props
export interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
  onOverflowChange?: (hasOverflow: boolean) => void;
}

// ListItem 컴포넌트 props
export interface ListItemProps {
  children?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// DraggableScrollContainer 컴포넌트 props
export interface DraggableScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
  scrollToEnd?: boolean;
  onDragStart?: (e: MouseEvent) => void;
  onDragEnd?: () => void;
}

// SlidePage 컴포넌트 props - 슬라이드 애니메이션이 있는 페이지 컨테이너
export interface SlidePageProps {
  children?: React.ReactNode;
  className?: string;
  transform?: string;
  zIndex?: number;
  style?: React.CSSProperties;
  onGoBack?: () => void;
  showBackButton?: boolean;
  title?: string;
  employeeName?: string;
  employeeRole?: string;
  employeeId?: string;
  customerName?: string;
  customerId?: string;
  showToggleSwitch?: boolean;
}

// Popup 컴포넌트 props
export interface PopupProps {
  /** 팝업 열림 상태 */
  isOpen: boolean;
  /** 팝업 닫기 핸들러 */
  onClose: () => void;
  /** 팝업 내용 */
  children: React.ReactNode;
  /** 추가 클래스명 */
  className?: string;
}

// PopupSectionBox 컴포넌트 props
export interface PopupSectionBoxProps {
  /** 컨테이너 내용 */
  children: ReactNode;
  /** X 좌표 (left) */
  x?: number | string;
  /** Y 좌표 (top) */
  y?: number | string;
  /** 너비 */
  width?: number | string;
  /** 높이 */
  height?: number | string;
  /** 추가 클래스명 */
  className?: string;
  /** C183 영역의 배경색상 (CSS 변수명 예: "white-25", "magenta-7" 또는 직접 색상 값) */
  borderBackgroundColor?: string;
}

// TabSelector 컴포넌트 props
export interface TabItem {
  title: string;
  link?: string;
}

export interface TabSelectorProps {
  items: TabItem[];
  multiple?: boolean;
  defaultValue?: number | number[];
  value?: number | number[];
  onChange?: (selected: number | number[]) => void;
  className?: string;
  width?: string | number;
}

// DropdownList 컴포넌트 타입
export interface DropdownListItem {
  /** 항목의 값 (고유 식별자) */
  value: string | number;
  /** 표시할 텍스트 */
  label: string;
  /** 추가 데이터 (선택사항) */
  data?: unknown;
}

export interface DropdownListProps {
  /** 드롭다운 항목 리스트 (JSON 데이터) */
  items: DropdownListItem[];
  /** 현재 선택된 값 */
  selectedValue?: string | number | null;
  /** 선택 변경 핸들러 */
  onSelect?: (item: DropdownListItem) => void;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 커스텀 클래스명 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}
