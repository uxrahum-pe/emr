/**
 * Reception Store (Zustand)
 *
 * @description 원무 페이지의 상태를 관리하는 스토어입니다.
 * 원무 페이지 전용 상태를 중앙화하여 관리합니다.
 */

import { create } from "zustand";

/**
 * Reception Store State
 */
interface ReceptionStoreState {
  /** 작은 화면 모드 여부 */
  isSmallScreen: boolean;
  /** 활성 탭 인덱스 */
  activeIndex: number | null;
  /** 선택된 예약 탭들 */
  selectedTabs: number[];
  /** 선택된 대기 탭들 */
  selectedPendingTabs: number[];
  /** 선택된 정렬 탭 */
  selectedSortTab: number;
  /** Quick Actions 호버 상태 */
  isQuickActionsHovered: boolean;
  /** 고객 상세 패널 열림 상태 */
  isCustomerDetailOpen: boolean;
}

/**
 * Reception Store Actions
 */
interface ReceptionStoreActions {
  /** 작은 화면 모드 설정 */
  setIsSmallScreen: (value: boolean) => void;
  /** 활성 탭 인덱스 설정 */
  setActiveIndex: (index: number | null) => void;
  /** 선택된 예약 탭들 설정 */
  setSelectedTabs: (tabs: number[]) => void;
  /** 선택된 대기 탭들 설정 */
  setSelectedPendingTabs: (tabs: number[]) => void;
  /** 선택된 정렬 탭 설정 */
  setSelectedSortTab: (tab: number) => void;
  /** Quick Actions 호버 상태 설정 */
  setIsQuickActionsHovered: (value: boolean) => void;
  /** 고객 상세 패널 열림 상태 설정 */
  setIsCustomerDetailOpen: (value: boolean) => void;
  /** 모든 상태 초기화 */
  reset: () => void;
}

/**
 * Reception Store
 */
type ReceptionStore = ReceptionStoreState & ReceptionStoreActions;

/**
 * 초기 상태
 */
const initialState: ReceptionStoreState = {
  isSmallScreen: false,
  activeIndex: null,
  selectedTabs: [0, 1, 2],
  selectedPendingTabs: [0, 1],
  selectedSortTab: 0,
  isQuickActionsHovered: false,
  isCustomerDetailOpen: false,
};

/**
 * Reception 전역 상태 스토어
 */
export const useReceptionStore = create<ReceptionStore>((set) => ({
  ...initialState,

  // Actions
  setIsSmallScreen: (value) => set({ isSmallScreen: value }),
  setActiveIndex: (index) => set({ activeIndex: index }),
  setSelectedTabs: (tabs) => set({ selectedTabs: tabs }),
  setSelectedPendingTabs: (tabs) => set({ selectedPendingTabs: tabs }),
  setSelectedSortTab: (tab) => set({ selectedSortTab: tab }),
  setIsQuickActionsHovered: (value) => set({ isQuickActionsHovered: value }),
  setIsCustomerDetailOpen: (value) => set({ isCustomerDetailOpen: value }),
  reset: () => set(initialState),
}));
