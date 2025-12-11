export interface TipState {
  visible: boolean
  text: string
  x: number
  y: number
}

// Tooltip 기본 props (offset 없음)
export interface TooltipBaseProps {
  text: string
  children: React.ReactNode
}

// Tooltip offset props (모두 제공)
export interface TooltipWithOffsetProps extends TooltipBaseProps {
  offsetX: number
  offsetY: number
}

// Tooltip props: offset이 모두 제공되거나 모두 제공되지 않음
export type TooltipProps = TooltipBaseProps | TooltipWithOffsetProps

// 공통 필수 props
interface ToggleSwitchBaseProps {
  onLabel: string
  offLabel: string
}

// 스타일 props (모두 제공)
interface ToggleSwitchStyleProps {
  width: string
  height: string
}

// 제어 컴포넌트 (Controlled Component) - 스타일 없음
export interface ToggleSwitchControlledProps extends ToggleSwitchBaseProps {
  value: boolean
  onChange: (value: boolean) => void
}

// 제어 컴포넌트 (Controlled Component) - 스타일 있음
export interface ToggleSwitchControlledWithStyleProps extends ToggleSwitchControlledProps, ToggleSwitchStyleProps {}

// 비제어 컴포넌트 (Uncontrolled Component) - 스타일 없음
export interface ToggleSwitchUncontrolledProps extends ToggleSwitchBaseProps {
  defaultChecked: boolean
  onChange: (value: boolean) => void
}

// 비제어 컴포넌트 (Uncontrolled Component) - 스타일 있음
export interface ToggleSwitchUncontrolledWithStyleProps extends ToggleSwitchUncontrolledProps, ToggleSwitchStyleProps {}

// Union 타입으로 제어/비제어 컴포넌트 구분 (스타일 포함/미포함)
export type ToggleSwitchProps = 
  | ToggleSwitchControlledProps
  | ToggleSwitchControlledWithStyleProps
  | ToggleSwitchUncontrolledProps
  | ToggleSwitchUncontrolledWithStyleProps

