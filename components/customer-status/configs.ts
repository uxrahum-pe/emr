/**
 * 파트별 CustomerStatus 설정
 *
 * @description 각 파트(원무, 상담, 수술 등)별 고객 현황 설정을 정의합니다.
 * C021 내부 구조는 동일하지만 파트별로 블록 구성, 탭 등이 다릅니다.
 */

import type {
  PartId,
  PartInfo,
  PartHeaderConfig,
  PartStatusBlocksConfig,
  StatusBlockConfig,
  StatusButtonMapping,
  CheckInButtonId,
  CustomerStatusId,
  BlockClassId,
} from "./types";

// ============================================
// 파트 정보
// ============================================

export const PART_INFO: Record<PartId, PartInfo> = {
  reception: {
    id: "reception",
    name: "원무",
    iconClass: "isReception",
  },
  counseling: {
    id: "counseling",
    name: "상담",
    iconClass: "isCounseling",
  },
  preCare: {
    id: "preCare",
    name: "전처치",
    iconClass: "isPreCare",
  },
  clinic: {
    id: "clinic",
    name: "진료",
    iconClass: "isClinic",
  },
  surgery: {
    id: "surgery",
    name: "수술",
    iconClass: "isSurgery",
  },
  procedure: {
    id: "procedure",
    name: "시술",
    iconClass: "isProcedure",
  },
  postCare: {
    id: "postCare",
    name: "후관리",
    iconClass: "isPostCare",
  },
};

// ============================================
// 파트별 헤더 설정
// ============================================

export const PART_HEADER_CONFIGS: Record<PartId, PartHeaderConfig> = {
  reception: {
    partId: "reception",
    title: "고객 현황",
    showSearch: true,
    showSurveySearch: true,
    showDirectRegister: true,
  },
  counseling: {
    partId: "counseling",
    title: "고객 현황",
    showSearch: true,
    showSurveySearch: false,
    showDirectRegister: false,
  },
  preCare: {
    partId: "preCare",
    title: "고객 현황",
    showSearch: true,
    showSurveySearch: false,
    showDirectRegister: false,
  },
  clinic: {
    partId: "clinic",
    title: "고객 현황",
    showSearch: true,
    showSurveySearch: false,
    showDirectRegister: false,
  },
  surgery: {
    partId: "surgery",
    title: "고객 현황",
    showSearch: true,
    showSurveySearch: false,
    showDirectRegister: false,
  },
  procedure: {
    partId: "procedure",
    title: "고객 현황",
    showSearch: true,
    showSurveySearch: false,
    showDirectRegister: false,
  },
  postCare: {
    partId: "postCare",
    title: "고객 현황",
    showSearch: true,
    showSurveySearch: false,
    showDirectRegister: false,
  },
};

// ============================================
// 공통 상태 블록 설정
// ============================================

/** 예약 블록 베이스 */
const RESERVATION_BLOCK_BASE: Omit<StatusBlockConfig, "cssClass"> = {
  id: "reservation",
  title: "예약",
  iconClass: "isAlarmClock",
  showPinButton: true,
  multipleTabs: true,
};

/** 대기 블록 베이스 */
const PENDING_BLOCK_BASE: Omit<StatusBlockConfig, "cssClass"> = {
  id: "pending",
  title: "대기",
  iconClass: "isHourglass",
  showPinButton: true,
  multipleTabs: true,
};

/** 진료 블록 베이스 */
const CLINIC_BLOCK_BASE: Omit<StatusBlockConfig, "cssClass"> = {
  id: "inProgress",
  title: "진료",
  iconClass: "isClinic",
  showPinButton: true,
  multipleTabs: false,
};

/** 수납 블록 베이스 */
const PAYMENT_BLOCK_BASE: Omit<StatusBlockConfig, "cssClass"> = {
  id: "completed",
  title: "수납",
  iconClass: "isCoin",
  showPinButton: true,
  multipleTabs: false,
};

// ============================================
// 파트별 상태 블록 설정
// ============================================

export const PART_STATUS_BLOCKS: Record<PartId, PartStatusBlocksConfig> = {
  reception: {
    partId: "reception",
    blocks: [
      {
        ...RESERVATION_BLOCK_BASE,
        cssClass: "isReservation",
        tabs: [
          { title: "수술상담" },
          { title: "시술상담" },
          { title: "일반시술" },
        ],
      },
      {
        ...PENDING_BLOCK_BASE,
        cssClass: "isPending",
        tabs: [{ title: "수술상담" }, { title: "시술상담" }],
      },
      {
        ...CLINIC_BLOCK_BASE,
        cssClass: "isClinic",
        tabs: [{ title: "시간순" }, { title: "상태순" }],
      },
      {
        ...PAYMENT_BLOCK_BASE,
        cssClass: "isPayment",
        tabs: [{ title: "시간순" }, { title: "상태순" }],
      },
    ],
  },
  counseling: {
    partId: "counseling",
    blocks: [
      {
        ...RESERVATION_BLOCK_BASE,
        cssClass: "isReservation",
        tabs: [
          { title: "수술상담" },
          { title: "시술상담" },
          { title: "일반시술" },
        ],
      },
      {
        ...PENDING_BLOCK_BASE,
        cssClass: "isPending",
        tabs: [{ title: "신규접수" }, { title: "재접수" }],
      },
      {
        id: "inProgress",
        cssClass: "isInProgress",
        title: "상담진행",
        iconClass: "isPlay",
        showPinButton: false,
        multipleTabs: false,
      },
      {
        id: "completed",
        cssClass: "isCompleted",
        title: "상담완료",
        iconClass: "isCheck",
        showPinButton: false,
        multipleTabs: false,
      },
    ],
  },
  preCare: {
    partId: "preCare",
    blocks: [
      {
        ...PENDING_BLOCK_BASE,
        cssClass: "isPending",
        title: "전처치 대기",
      },
      {
        id: "inProgress",
        cssClass: "isInProgress",
        title: "전처치 진행",
        iconClass: "isPlay",
        showPinButton: false,
        multipleTabs: false,
      },
      {
        id: "completed",
        cssClass: "isCompleted",
        title: "전처치 완료",
        iconClass: "isCheck",
        showPinButton: false,
        multipleTabs: false,
      },
    ],
  },
  clinic: {
    partId: "clinic",
    blocks: [
      {
        ...PENDING_BLOCK_BASE,
        cssClass: "isPending",
        title: "진료 대기",
      },
      {
        id: "inProgress",
        cssClass: "isInProgress",
        title: "진료 진행",
        iconClass: "isPlay",
        showPinButton: false,
        multipleTabs: false,
      },
      {
        id: "completed",
        cssClass: "isCompleted",
        title: "진료 완료",
        iconClass: "isCheck",
        showPinButton: false,
        multipleTabs: false,
      },
    ],
  },
  surgery: {
    partId: "surgery",
    blocks: [
      {
        ...PENDING_BLOCK_BASE,
        cssClass: "isPending",
        title: "수술 대기",
        tabs: [{ title: "지방흡입" }, { title: "지방이식" }, { title: "기타" }],
      },
      {
        id: "inProgress",
        cssClass: "isInProgress",
        title: "수술 진행",
        iconClass: "isPlay",
        showPinButton: false,
        multipleTabs: false,
      },
      {
        id: "completed",
        cssClass: "isCompleted",
        title: "수술 완료",
        iconClass: "isCheck",
        showPinButton: false,
        multipleTabs: false,
      },
    ],
  },
  procedure: {
    partId: "procedure",
    blocks: [
      {
        ...PENDING_BLOCK_BASE,
        cssClass: "isPending",
        title: "시술 대기",
      },
      {
        id: "inProgress",
        cssClass: "isInProgress",
        title: "시술 진행",
        iconClass: "isPlay",
        showPinButton: false,
        multipleTabs: false,
      },
      {
        id: "completed",
        cssClass: "isCompleted",
        title: "시술 완료",
        iconClass: "isCheck",
        showPinButton: false,
        multipleTabs: false,
      },
    ],
  },
  postCare: {
    partId: "postCare",
    blocks: [
      {
        ...PENDING_BLOCK_BASE,
        cssClass: "isPending",
        title: "후관리 대기",
      },
      {
        id: "inProgress",
        cssClass: "isInProgress",
        title: "후관리 진행",
        iconClass: "isPlay",
        showPinButton: false,
        multipleTabs: false,
      },
      {
        id: "completed",
        cssClass: "isCompleted",
        title: "후관리 완료",
        iconClass: "isCheck",
        showPinButton: false,
        multipleTabs: false,
      },
    ],
  },
};

// ============================================
// 고객 상태별 C152 버튼 매핑
// ============================================

/** 고객 상태별 허용 버튼 */
export const STATUS_BUTTON_MAPPINGS: StatusButtonMapping[] = [
  {
    statusId: "reservation",
    allowedButtons: ["checkIn", "appointment", "status"],
  },
  {
    statusId: "pending",
    allowedButtons: ["movePart", "status", "appointment"],
  },
  {
    statusId: "inProgress",
    allowedButtons: ["movePart", "status", "dailyProcedure", "prescription"],
  },
  {
    statusId: "completed",
    allowedButtons: ["payment", "checkOut", "status"],
  },
  {
    statusId: "holding",
    allowedButtons: ["status", "appointment"],
  },
  {
    statusId: "cancelled",
    allowedButtons: ["status", "appointment"],
  },
];

/**
 * 고객 상태에 따른 허용 버튼 ID 목록 반환
 */
export function getAllowedButtonsForStatus(
  statusId: CustomerStatusId
): CheckInButtonId[] {
  const mapping = STATUS_BUTTON_MAPPINGS.find((m) => m.statusId === statusId);
  return mapping?.allowedButtons || [];
}

/**
 * 파트 ID에 따른 헤더 설정 반환
 */
export function getHeaderConfig(partId: PartId): PartHeaderConfig {
  return PART_HEADER_CONFIGS[partId];
}

/**
 * 파트 ID에 따른 상태 블록 설정 반환
 */
export function getStatusBlocksConfig(partId: PartId): PartStatusBlocksConfig {
  return PART_STATUS_BLOCKS[partId];
}

/**
 * 파트 정보 반환
 */
export function getPartInfo(partId: PartId): PartInfo {
  return PART_INFO[partId];
}
