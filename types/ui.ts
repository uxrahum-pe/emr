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
