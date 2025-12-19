/**
 * PageHeader Store (Zustand)
 *
 * @description PageHeader의 클릭 핸들러들을 전역으로 관리하는 스토어입니다.
 * 각 페이지에서 중복 관리되던 핸들러들을 중앙화합니다.
 */

import { create } from "zustand";

/**
 * PageHeader Store State
 */
interface PageHeaderStoreState {
  /** 쪽지 클릭 핸들러 */
  noteClickHandler: (() => void) | undefined;
  /** 알림 클릭 핸들러 */
  alarmClickHandler: (() => void) | undefined;
  /** 통합 예약 서비스 클릭 핸들러 */
  reservationClickHandler: (() => void) | undefined;
}

/**
 * PageHeader Store Actions
 */
interface PageHeaderStoreActions {
  /** 쪽지 핸들러 설정 */
  setNoteClickHandler: (handler: (() => void) | undefined) => void;
  /** 알림 핸들러 설정 */
  setAlarmClickHandler: (handler: (() => void) | undefined) => void;
  /** 통합 예약 서비스 핸들러 설정 */
  setReservationClickHandler: (handler: (() => void) | undefined) => void;
  /** 모든 핸들러 초기화 */
  resetHandlers: () => void;
}

/**
 * PageHeader Store
 */
type PageHeaderStore = PageHeaderStoreState & PageHeaderStoreActions;

/**
 * PageHeader 전역 상태 스토어
 */
export const usePageHeaderStore = create<PageHeaderStore>((set) => ({
  // 초기 상태
  noteClickHandler: undefined,
  alarmClickHandler: undefined,
  reservationClickHandler: undefined,

  // Actions
  setNoteClickHandler: (handler) => set({ noteClickHandler: handler }),
  setAlarmClickHandler: (handler) => set({ alarmClickHandler: handler }),
  setReservationClickHandler: (handler) =>
    set({ reservationClickHandler: handler }),
  resetHandlers: () =>
    set({
      noteClickHandler: undefined,
      alarmClickHandler: undefined,
      reservationClickHandler: undefined,
    }),
}));
