/**
 * CustomerStatus 컴포넌트 중앙 Export
 *
 * @description 고객 현황 관련 모든 컴포넌트와 타입을 한 곳에서 export합니다.
 *
 * @example
 * ```tsx
 * import {
 *   CustomerCard,
 *   CustomerStatusBlock,
 *   CustomerStatusHeader,
 *   getHeaderConfig,
 *   type CustomerCardData,
 * } from "@/components/customer-status";
 * ```
 */

// 컴포넌트
export { default as CustomerCard } from "./CustomerCard";
export { default as CustomerStatusBlock } from "./CustomerStatusBlock";
export { default as CustomerStatusHeader } from "./CustomerStatusHeader";
export { default as CustomerCheckInPanel } from "./CustomerCheckInPanel";
export { default as CustomerStatusSection } from "./CustomerStatusSection";

// 설정 함수
export {
  PART_INFO,
  PART_HEADER_CONFIGS,
  PART_STATUS_BLOCKS,
  STATUS_BUTTON_MAPPINGS,
  getAllowedButtonsForStatus,
  getHeaderConfig,
  getStatusBlocksConfig,
  getPartInfo,
} from "./configs";

// 타입
export type {
  // 파트
  PartId,
  PartInfo,
  // 고객 상태
  CustomerStatusId,
  CustomerStatus,
  BlockClassId,
  // 고객 데이터
  Gender,
  CustomerInfo,
  AssignedEmployee,
  CustomerCardData,
  CustomerTag,
  TimelineItem,
  // 상태 블록
  StatusBlockTab,
  StatusBlockConfig,
  StatusBlockStats,
  // 파트 설정
  PartStatusBlocksConfig,
  PartHeaderConfig,
  HeaderButton,
  // C152
  CheckInButtonId,
  StatusButtonMapping,
  CustomerCheckInPanelProps,
  // 컴포넌트 Props
  CustomerCardProps,
  CustomerStatusBlockProps,
  CustomerStatusHeaderProps,
  CustomerStatusSectionNewProps,
} from "./types";
