/**
 * usePageHeaderHandlers Hook
 *
 * @description PageHeader의 클릭 핸들러들을 관리하는 커스텀 훅입니다.
 * Zustand 스토어를 사용하여 핸들러를 등록하고 가져옵니다.
 */

import { useCallback } from "react";
import { usePageHeaderStore } from "@/stores/usePageHeaderStore";

/**
 * PageHeader 핸들러 관리 훅
 */
export function usePageHeaderHandlers() {
  const noteClickHandler = usePageHeaderStore(
    (state) => state.noteClickHandler
  );
  const alarmClickHandler = usePageHeaderStore(
    (state) => state.alarmClickHandler
  );
  const reservationClickHandler = usePageHeaderStore(
    (state) => state.reservationClickHandler
  );

  const setNoteClickHandler = usePageHeaderStore(
    (state) => state.setNoteClickHandler
  );
  const setAlarmClickHandler = usePageHeaderStore(
    (state) => state.setAlarmClickHandler
  );
  const setReservationClickHandler = usePageHeaderStore(
    (state) => state.setReservationClickHandler
  );

  const handleNoteHandlerReady = useCallback(
    (handler: () => void) => {
      setNoteClickHandler(handler);
    },
    [setNoteClickHandler]
  );

  const handleAlarmHandlerReady = useCallback(
    (handler: () => void) => {
      setAlarmClickHandler(handler);
    },
    [setAlarmClickHandler]
  );

  const handleReservationHandlerReady = useCallback(
    (handler: () => void) => {
      setReservationClickHandler(handler);
    },
    [setReservationClickHandler]
  );

  return {
    noteClickHandler,
    alarmClickHandler,
    reservationClickHandler,
    handleNoteHandlerReady,
    handleAlarmHandlerReady,
    handleReservationHandlerReady,
  };
}
